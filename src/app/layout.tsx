
import type {Metadata} from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { MainNav } from '@/components/common/main-nav';
import { Chatbot } from '@/components/common/chatbot';
import { Toaster } from '@/components/ui/toaster';
import Link from 'next/link';
import { Bot } from 'lucide-react';
import { FirebaseClientProvider } from '@/firebase';

export const metadata: Metadata = {
  title: 'DeepLearn Pro',
  description: 'Learn Machine Learning and Deep Learning with AI assistance.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=Kalam:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased")}>
        <FirebaseClientProvider>
          <SidebarProvider>
            <MainNav />
            <SidebarInset>
              <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:hidden">
                <SidebarTrigger />
                <Link href="/" className="font-headline text-lg font-semibold flex items-center gap-2">
                  <Bot className="h-6 w-6 text-primary" />
                  DeepLearn Pro
                </Link>
                <div className="w-7"></div> {/* Spacer to balance trigger */}
              </header>
              <main className="flex-1 p-4 sm:p-6 lg:p-8">
                {children}
              </main>
            </SidebarInset>
            <Chatbot />
          </SidebarProvider>
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
