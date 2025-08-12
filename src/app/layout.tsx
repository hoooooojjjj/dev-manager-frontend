import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dev Manager",
  description: "Dev Full Managing Service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
