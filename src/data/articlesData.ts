import fm from 'front-matter';

export interface Article {
  id: string;
  title: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  imageUrl?: string;
  content?: string;
}

// Helper function to derive an article's ID from its file path.
// This is crucial for grouping markdown files with their assets.
function getArticleIdFromPath(path: string): string {
  const pathParts = path.split('/');
  const articlesIndex = pathParts.indexOf('articles');

  if (articlesIndex === -1) {
    // Fallback for unexpected path structures
    const filename = pathParts[pathParts.length - 1];
    return filename.substring(0, filename.lastIndexOf('.'));
  }

  // Path segments relative to the 'articles' directory.
  // e.g., ['tech', 'my-post.md'] or ['my-post', 'index.md']
  const relativePathParts = pathParts.slice(articlesIndex + 1);
  const lastPart = relativePathParts[relativePathParts.length - 1];

  // If the file is an index file (e.g., 'index.md'), the ID is the path of its parent directory.
  // This handles: 'articles/my-post/index.md' -> 'my-post'
  if (lastPart.startsWith('index.')) {
    return relativePathParts.slice(0, -1).join('/');
  }

  // For any other file, the ID is the full relative path to the file, without its extension.
  const filenameWithoutExt = lastPart.substring(0, lastPart.lastIndexOf('.'));
  const directoryPath = relativePathParts.slice(0, -1);
  return [...directoryPath, filenameWithoutExt].join('/');
}

// 1. Dynamically import all markdown and image files from your content directory.
const markdownModules = import.meta.glob('../content/articles/**/*.{md,mdx}', {
  eager: true,
  import: 'default',
  query: '?raw'
}) as Record<string, string>;

const imageModules = import.meta.glob('../content/articles/**/*.{png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default'
}) as Record<string, string>;

const assetImageModules = import.meta.glob('../assets/Article_Assets/**/*.{png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

// Create a lookup map for easier access by filename
const assetImagesMap: Record<string, string> = Object.entries(assetImageModules).reduce(
  (map, [path, url]) => {
    const filename = path.split('/').pop();
    if (filename) {
      map[filename] = url;
    }
    return map;
  },
  {} as Record<string, string>
);

// 2. Create a lookup map to group images by the article they belong to.
const articleImagesMap: Record<string, Record<string, string>> = Object.entries(imageModules).reduce(
  (map, [path, url]) => {
    const id = getArticleIdFromPath(path);
    if (!map[id]) {
      map[id] = {};
    }
    map[id][path] = url;
    return map;
  },
  {} as Record<string, Record<string, string>>
);

// 3. Parse each markdown file into an Article object.
export const articlesStack: Article[] = Object.entries(markdownModules).map(([filepath, rawContent]) => {
  const id = getArticleIdFromPath(filepath);
  const { attributes, body } = fm<Partial<Article>>(rawContent);
  const imagesForThisArticle = articleImagesMap[id] || {};
  
  let finalImageUrl: string | undefined;
  let imagePathToResolve: string | undefined = attributes.imageUrl;

  // If no imageUrl in frontmatter, search the body for an Obsidian or Markdown image link.
  if (!imagePathToResolve) {
    // Obsidian wikilink image: ![[image.png]]
    const wikilinkMatch = /!\[\[([^|\]]+)/.exec(body);
    if (wikilinkMatch && wikilinkMatch[1]) {
      imagePathToResolve = wikilinkMatch[1].trim();
    } else {
      // Standard markdown image: !alt
      const markdownMatch = /!\[[^\]]*\]\(([^)]+)\)/.exec(body);
      if (markdownMatch && markdownMatch[1]) {
        imagePathToResolve = markdownMatch[1];
      }
    }
  }

  // If we found an image path (from frontmatter or body), try to resolve it.
  if (imagePathToResolve) {
    const imagePath = imagePathToResolve;
    const imageName = imagePath.split('/').pop();

    // Case 1: The path is an absolute URL (external) or a root-relative path for an asset in the `public` directory.
    if (imagePath.startsWith('http') || imagePath.startsWith('/')) {
      finalImageUrl = imagePath;
    }
    // Case 2: The image name exists in our global asset map.
    else if (imageName && assetImagesMap[imageName]) {
      finalImageUrl = assetImagesMap[imageName];
    }
     else {
      // Case 3: The path is relative to the article file itself (e.g., "./image.jpg").
      // We search for an image within this article's co-located assets.
      const cleanImagePath = imagePath.replace(/^\.\//, ''); // remove leading './'
      const foundImageKey = Object.keys(imagesForThisArticle).find(key => key.endsWith('/' + cleanImagePath));
      if (foundImageKey) {
        finalImageUrl = imagesForThisArticle[foundImageKey];
      }
    }
  }

  // If we still don't have an image, use the first one we found in the folder as a fallback.
  if (!finalImageUrl) {
    const allImageUrlsForArticle = Object.values(imagesForThisArticle);
    if (allImageUrlsForArticle.length > 0) {
      finalImageUrl = allImageUrlsForArticle[0];
    }
  }

  return {
    id,
    title: attributes.title || 'Untitled',
    date: attributes.date || 'No Date',
    author: attributes.author || 'Joshua Zive',
    category: attributes.category || 'UNCATEGORIZED',
    excerpt: attributes.excerpt || '',
    imageUrl: finalImageUrl,
    content: body,
  };
});

// 4. Sort articles by date, newest first.
articlesStack.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
