import './global.css';

export const metadata = {
  title: 'KUL Alternative Client',
  description: 'Alternative client for KUL',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
