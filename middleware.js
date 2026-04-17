import { NextResponse } from 'next/server';

export const config = {
  matcher: [
    // Jalankan middleware untuk semua request kecuali file statis & API
    '/((?!api|_next|static|[\\w-]+\\.\\w+).*)',
  ],
};

export default function middleware(req) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host');

  // Pisahkan subdomain (misal: test.rzone.web.id -> test)
  const chunks = hostname.split('.');
  const subdomain = chunks.length >= 3 ? chunks[0] : null;

  // Jika tidak ada subdomain atau itu domain utama/www, biarkan saja
  if (!subdomain || subdomain === 'www' || hostname.includes('localhost')) {
    return NextResponse.next();
  }

  // Arahkan traffic secara internal ke folder deployments di GitHub kamu
  // Catatan: Pastikan di Repo GitHub kamu strukturnya adalah deployments/nama-subdomain/index.html
  return NextResponse.rewrite(
    new URL(`https://raw.githubusercontent.com/candratrirama-cell/Racloud/main/deployments/${subdomain}${url.pathname === '/' ? '/index.html' : url.pathname}`, req.url)
  );
}
