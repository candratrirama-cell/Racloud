<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ollaps Flum - Platform AI Multiguna Gratis Tanpa Batas</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: #0b0b0c;
        }

        /* Animasi halu/glow efek di background */
        .glow-bg {
            position: absolute;
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(0,0,0,0) 70%);
            top: -10%;
            left: 50%;
            transform: translateX(-50%);
            z-index: 0;
            pointer-events: none;
        }
    </style>
</head>
<body class="text-zinc-200 antialiased overflow-x-hidden">

    <!-- Efek Glow Latar Belakang -->
    <div class="glow-bg"></div>

    <!-- 1. NAVIGATION BAR -->
    <nav class="relative z-10 border-b border-zinc-900 bg-[#0b0b0c]/80 backdrop-blur-md sticky top-0">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <!-- Logo -->
            <div class="flex items-center gap-2.5">
                <div class="bg-gradient-to-tr from-emerald-500 to-teal-400 p-2 rounded-xl text-black font-bold shadow-lg shadow-emerald-500/10">
                    <i data-lucide="sparkles" class="w-4 h-4 text-zinc-950"></i>
                </div>
                <div>
                    <span class="text-sm font-bold text-white tracking-tight">Ollaps Flum</span>
                    <span class="text-[9px] text-emerald-400 font-bold block -mt-1 tracking-wider uppercase">Olla Ecosystem</span>
                </div>
            </div>

            <!-- Nav Link (Desktop Only) -->
            <div class="hidden md:flex items-center gap-8 text-xs font-semibold text-zinc-400">
                <a href="#fitur" class="hover:text-white transition">Fitur Unggulan</a>
                <a href="#kenapa-olla" class="text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1">
                    <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span> Kenapa Olla?
                </a>
                <a href="#teknologi" class="hover:text-white transition">Infrastruktur</a>
            </div>

            <!-- Call to Action Button -->
            <div>
                <a href="Dashboard.html" class="inline-flex items-center gap-2 bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg shadow-white/5">
                    Mulai Sekarang <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                </a>
            </div>
        </div>
    </nav>

    <!-- 2. HERO SECTION -->
    <header class="relative z-10 max-w-4xl mx-auto text-center px-4 pt-20 pb-16 md:pt-28 md:pb-24 space-y-6">
        <div class="inline-flex items-center gap-2 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 rounded-full text-[10px] font-bold text-emerald-400 uppercase tracking-widest mx-auto">
            <span class="flex h-2 w-2 relative">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Platform AI Masa Depan
        </div>
        <h1 class="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            Satu Ekosistem Pintar.<br>
            <span class="bg-gradient-to-r from-emerald-400 via-teal-200 to-emerald-500 bg-clip-text text-transparent">Multi-Fungsi Tanpa Batas.</span>
        </h1>
        <p class="text-zinc-400 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
            Akses Chat Bot cerdas, generator musik, hingga manipulasi objek gambar AI tercanggih di dunia langsung dari satu dasbor terpadu.
        </p>
        <div class="pt-4 flex flex-col sm:flex-row justify-center items-center gap-3">
            <a href="Dashboard.html" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition shadow-lg shadow-emerald-600/20">
                <i data-lucide="terminal" class="w-4 h-4"></i> Masuk Ke Workspace AI
            </a>
            <a href="#fitur" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800/80 border border-zinc-800 text-zinc-300 font-bold text-xs px-6 py-3.5 rounded-xl transition">
                Jelajahi Fitur
            </a>
        </div>
    </header>

    <!-- 3. MAIN HIGHLIGHT SECTION: "KENAPA HARUS OLLA??" -->
    <section id="kenapa-olla" class="relative z-10 max-w-5xl mx-auto px-4 py-16">
        <div class="bg-gradient-to-b from-zinc-900/80 to-zinc-950 border border-zinc-800/60 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <!-- Hiasan Efek Cahaya Belakang -->
            <div class="absolute -right-20 -top-20 w-60 h-60 bg-emerald-500/10 blur-[80px] pointer-events:none;"></div>
            
            <div class="grid md:grid-cols-5 gap-8 items-center">
                <div class="md:col-span-3 space-y-4">
                    <div class="text-emerald-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                        <i data-lucide="help-circle" class="w-4 h-4"></i> KEUNGGULAN UTAMA
                    </div>
                    <h2 class="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                        Kenapa Harus Olla?? 🤔
                    </h2>
                    <p class="text-zinc-300 text-sm leading-relaxed font-medium">
                        Karena di Olla, kamu bisa menggunakan teknologi AI premium berspesifikasi tinggi <span class="text-white font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/40 text-emerald-400">secara GRATIS tanpa batasan kuota harian!</span>
                    </p>
                    <p class="text-zinc-400 text-xs leading-relaxed">
                        Kami percaya bahwa kecerdasan buatan harus bisa diakses oleh siapa saja—baik untuk kebutuhan belajar, bekerja, ataupun berkreasi seni—tanpa perlu berlangganan kartu kredit atau terganggu limit token.
                    </p>
                </div>
                <div class="md:col-span-2 grid grid-cols-1 gap-3 w-full">
                    <div class="bg-[#141416]/60 border border-zinc-800 p-4 rounded-xl flex items-start gap-3.5">
                        <div class="bg-emerald-950 p-2 rounded-lg text-emerald-400 shrink-0"><i data-lucide="infinity" class="w-4 h-4"></i></div>
                        <div>
                            <h4 class="text-xs font-bold text-white mb-0.5">100% Unlimited Access</h4>
                            <p class="text-[11px] text-zinc-500">Kirim pesan dan generate media sebanyak yang Anda mau.</p>
                        </div>
                    </div>
                    <div class="bg-[#141416]/60 border border-zinc-800 p-4 rounded-xl flex items-start gap-3.5">
                        <div class="bg-emerald-950 p-2 rounded-lg text-emerald-400 shrink-0"><i data-lucide="credit-card" class="w-4 h-4"></i></div>
                        <div>
                            <h4 class="text-xs font-bold text-white mb-0.5">Tanpa Biaya Tersembunyi</h4>
                            <p class="text-[11px] text-zinc-500">Tidak perlu skema premium, trial habis, atau paywall yang mengganggu.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 4. CAPABILITIES / FITUR UTAMA -->
    <section id="fitur" class="relative z-10 max-w-5xl mx-auto px-4 py-12 space-y-12">
        <div class="text-center space-y-2">
            <h3 class="text-xs font-bold text-zinc-500 uppercase tracking-widest">Multi-Functional Stack</h3>
            <h2 class="text-xl md:text-2xl font-bold text-white tracking-tight">Kekuatan Multi-Sistem AI dalam Genggaman</h2>
        </div>

        <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <!-- Box 1: Chat AI -->
            <div class="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-2xl space-y-4 hover:border-emerald-500/30 transition">
                <div class="w-9 h-9 bg-emerald-950 rounded-xl flex items-center justify-center text-emerald-400"><i data-lucide="message-square" class="w-4 h-4"></i></div>
                <div class="space-y-1">
                    <h4 class="text-xs font-bold text-white">AI Assistant</h4>
                    <p class="text-[11px] text-zinc-400 leading-relaxed">Dilengkapi model OllaG 1.5 (GPT 3.5 Turbo) & Ollfux 1.0 yang dibekali memori kontekstual bersambung.</p>
                </div>
            </div>
            <!-- Box 2: Object Mod -->
            <div class="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-2xl space-y-4 hover:border-purple-500/30 transition">
                <div class="w-9 h-9 bg-purple-950 rounded-xl flex items-center justify-center text-purple-400"><i data-lucide="blocks" class="w-4 h-4"></i></div>
                <div class="space-y-1">
                    <h4 class="text-xs font-bold text-white">Ubah Objek Gambar</h4>
                    <p class="text-[11px] text-zinc-400 leading-relaxed">Ganti baju, tambah aksesoris, atau manipulasi elemen foto apa saja hanya dengan instruksi teks instruktif.</p>
                </div>
            </div>
            <!-- Box 3: Studio Gambar -->
            <div class="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-2xl space-y-4 hover:border-blue-500/30 transition">
                <div class="w-9 h-9 bg-blue-950 rounded-xl flex items-center justify-center text-blue-400"><i data-lucide="palette" class="w-4 h-4"></i></div>
                <div class="space-y-1">
                    <h4 class="text-xs font-bold text-white">Studio Gambar AI</h4>
                    <p class="text-[11px] text-zinc-400 leading-relaxed">Render imajinasi melalui model Ollagama 2.1 (Magicstudio) atau arsitektur Ollagama 5.3 Orcasta (Ideogram).</p>
                </div>
            </div>
            <!-- Box 4: Music Gen -->
            <div class="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-2xl space-y-4 hover:border-amber-500/30 transition">
                <div class="w-9 h-9 bg-amber-950 rounded-xl flex items-center justify-center text-amber-400"><i data-lucide="music-4" class="w-4 h-4"></i></div>
                <div class="space-y-1">
                    <h4 class="text-xs font-bold text-white">Generator Musik</h4>
                    <p class="text-[11px] text-zinc-400 leading-relaxed">Ciptakan aransemen lagu berkualitas tinggi berkat sokongan core audio engine terkemuka Ollmu 1.0 Suno.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- 5. INFRASTRUCTURE PARTNERSHIP -->
    <section id="teknologi" class="max-w-4xl mx-auto px-4 py-16 text-center border-t border-zinc-900">
        <p class="text-[10px] font-bold text-zinc-500 tracking-widest uppercase mb-4">Didukung Oleh Infrastruktur Cloud Terbaik</p>
        <div class="flex justify-center items-center gap-6 text-zinc-400 font-bold text-xs tracking-wider">
            <span class="bg-zinc-900/50 px-3 py-1.5 rounded-lg border border-zinc-800/50">NEXRAY CORE API</span>
            <span class="text-zinc-600">&bull;</span>
            <span class="bg-zinc-900/50 px-3 py-1.5 rounded-lg border border-zinc-800/50">VERCEL NETWORKS</span>
        </div>
    </section>

    <!-- 6. FOOTER -->
    <footer class="bg-[#080809] border-t border-zinc-900 text-zinc-600 text-[11px] py-6 text-center">
        <div class="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p>&copy; 2026 Ollaps Flum Ecosystem. Dilindungi Hak Cipta.</p>
            <p class="font-medium text-zinc-500">Created with Passion for Democratizing AI.</p>
        </div>
    </footer>

    <script>
        // Jalankan render icon Lucide agar tampil rapi
        lucide.createIcons();
    </script>
</body>
</html>
