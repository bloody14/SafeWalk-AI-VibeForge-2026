import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SafeWalk AI — Urban Route Awareness Platform',
  description: 'AI-assisted urban route awareness comparing street lighting, footfall proxies, and community observations for safer navigation.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="antialiased selection:bg-emerald-500 selection:text-night-950">
        {children}
      </body>
    </html>
  );
}
