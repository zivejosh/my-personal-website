import React from 'react';

export function CopyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="currentColor" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
      <path d="M0 2.75C0 1.784.784 1 1.75 1h2.5a.75.75 0 0 1 0 1.5h-2.5a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25V8.5a.75.75 0 0 1 1.5 0v4.75c0 .966-.784 1.75-1.75 1.75H1.75A1.75 1.75 0 0 1 0 13.25V2.75z"></path>
      <path d="M11.75 1h2.5A1.75 1.75 0 0 1 16 2.75v10.5A1.75 1.75 0 0 1 14.25 15h-2.5a.75.75 0 0 1 0-1.5h2.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25h-2.5a.75.75 0 0 1 0-1.5z"></path>
    </svg>
  );
}

export function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="currentColor" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
      <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z"></path>
    </svg>
  );
}
