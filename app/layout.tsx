import './globals.css';
import type {Metadata} from 'next';
import TanStackProvider from '../components/TanStackProvider/TanStackProvider';
import {Roboto} from 'next/font/google';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import AuthProvider from '../components/AuthProvider/AuthProvider';

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-roboto",
    display: "swap",
});

export const metadata: Metadata = {
    title: "NoteHub",
    description: "Note list app",
    openGraph: {
      title: `NoteHub`,
      description: "Note list app",
      url: `https://notehub.com`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "Note App image",
        },
      ],
    type: "article",
  },
};


export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <AuthProvider>
            <Header />

            <main>
              {children}
              {modal}
            </main>

            <Footer />
            
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}