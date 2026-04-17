import { NextResponse } from 'next/server';

export const config = {
  matcher: [
    // Jalankan middleware untuk semua jalur kecuali api, _next, dan file statis
    '/((?!api|_next|static|[\\w-]+\\.\\w+).*)',
  ],
};

export default function middleware(req) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host');

  // Ambil subdomain (misal: klyo dari klyo.rzone.web.id)
  const chunks = hostname.split('.');
  
  // Jika hostname adalah rzone.web.id atau localhost, jangan lakukan apa-apa (tampilkan dashboard)
  if (chunks.length <= 2 || hostname.includes('localhost') || hostname.startsWith('www.')) {
    return NextResponse.next();
  }

  const subdomain = chunks[0];

  // REWRITE: Arahkan ke file index.html milik user di GitHub
  // Kita arahkan secara internal ke URL mentah GitHub agar Vercel nampilin isinya
  const targetUrl = `https://raw.githubusercontent.com/candratrirama-cell/Racloud/main/deployments/${subdomain}/index.html`;

  // Opsional: Log untuk memantau di Vercel Logs
  console.log(`Routing ${hostname} to ${targetUrl}`);

  return NextResponse.rewrite(new URL(targetUrl));
}
