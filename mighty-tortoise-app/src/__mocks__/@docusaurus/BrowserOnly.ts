import { ReactNode } from 'react';

export default function BrowserOnly({
  children,
}: {
  children: () => ReactNode;
}) {
  return children();
}
