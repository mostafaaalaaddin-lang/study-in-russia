import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { Nav } from '@/components/Nav';
import { CurrencyProvider } from '@/lib/currency';
import { ThemeProvider, THEME_SCRIPT } from '@/lib/theme';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'Study in Russia — scholarships, housing and living costs',
  description:
    'A planning tool for international applicants to Russian universities: Open Doors and the government quota, university shortlisting, a city-by-city living cost calculator and a motivation letter reviewer.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Applies the stored theme before the first paint so the page never
            flashes light on its way to dark. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-screen">
        <ThemeProvider>
          <CurrencyProvider>
            <Nav />
            <main>{children}</main>
            <footer className="no-print mt-16 border-t border-ink-200 bg-surface">
              <div className="mx-auto max-w-7xl px-4 py-8">
                <div className="flex flex-wrap items-start justify-between gap-6">
                  <div className="max-w-3xl">
                    <p className="text-sm font-semibold text-ink-900">{SITE.name}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">
                      An independent planning tool built from published information on the official
                      programme sites. It is not affiliated with any university, with
                      Rossotrudnichestvo or with the Open Doors organisers. Every deadline, amount
                      and rule here should be confirmed against the official source linked alongside
                      it before you act on it.
                    </p>
                  </div>
                  <div className="text-sm">
                    <p className="text-ink-500">
                      Designed and built by{' '}
                      <span className="font-semibold text-ink-900">{SITE.author}</span>
                    </p>
                    <Link
                      href="/about"
                      className="mt-1 inline-block font-medium text-flag-blue hover:underline"
                    >
                      About this project
                    </Link>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-4 border-t border-ink-100 pt-5 text-sm">
                  <a
                    className="font-medium text-flag-blue hover:underline"
                    href="https://od.globaluni.ru"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    od.globaluni.ru
                  </a>
                  <a
                    className="font-medium text-flag-blue hover:underline"
                    href="https://education-in-russia.com"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    education-in-russia.com
                  </a>
                  <a
                    className="font-medium text-flag-blue hover:underline"
                    href="https://studyinrussia.ru/en/"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    studyinrussia.ru
                  </a>
                  <span className="ml-auto text-ink-400">
                    &copy; {SITE.year} {SITE.author}
                  </span>
                </div>
              </div>
            </footer>
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
