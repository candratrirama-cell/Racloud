/**
 * OLLAPS FLUM INTERACTIVE LOGIC ENGINE (index.js)
 * Nexray Infrastructure Framework V1.5
 */

// STATE MANAGEMENT UTAMA
let currentChatModel = 'ollag'; // Default model aktif: 'ollag' atau 'ollfux'

// INITIALIZATION (Menjalankan Lucide Icons di Awal Muat Halaman)
document.addEventListener("DOMContentLoaded", () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    // Set fokus awal ke textarea input chat jika ada
    const chatInput = document.getElementById('chat-input');
    if (chatInput) chatInput.focus();
});

// --- 1. GLOBAL UI & HUB LOADING CONTROLS ---
function showLoading(message = "Sedang Memproses...") {
    const overlay = document.getElementById('loading-overlay');
    const loadingText = document.getElementById('loading-text');
    if (overlay && loadingText) {
        loadingText.innerText = message.toUpperCase();
        overlay.classList.remove('hidden');
    }
}

function hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.classList.add('hidden');
}

// --- 2. NAVIGATION SYSTEM (TAB SWITCHER) ---
function switchTab(tabName) {
    // Sembunyikan seluruh kontainer tab yang ada
    document.querySelectorAll('.tab-content').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('flex');
    });
    
    // Tampilkan tab aktif yang dipilih
    const activeTab = document.getElementById(`tab-${tabName}`);
    if (activeTab) {
        activeTab.classList.remove('hidden');
        activeTab.classList.add('flex');
    }

    // Kembalikan semua tombol navigasi desktop ke status tidak aktif (default)
    document.querySelectorAll('.nav-btn-dt').forEach(btn => {
        btn.className = "nav-btn-dt flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold w-full transition text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-200";
    });
    
    // Kembalikan semua tombol navigasi mobile ke status tidak aktif (default)
    document.querySelectorAll('.nav-btn-mb').forEach(btn => {
        btn.className = "nav-btn-mb flex flex-col items-center gap-1 text-zinc-500 transition";
    });

    const dtBtn = document.getElementById(`btn-${tabName}-dt`);
    const mbBtn = document.getElementById(`btn-${tabName}-mb`);
    
    // Skema warna aksen dinamis berdasarkan warna yang telah dikonfigurasi di HTML
    const colors = { chat: 'emerald', 'image-mod': 'purple', 'image-gen': 'blue', logo: 'cyan', music: 'amber' };
    const currentColor = colors[tabName] || 'emerald';

    // Aktifkan visual premium untuk tombol terpilih
    if (dtBtn) {
        dtBtn.className = `nav-btn-dt flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold w-full transition bg-zinc-800 text-white border border-zinc-700/40`;
        const icon = dtBtn.querySelector('i');
        if (icon) icon.className = `w-4 h-4 text-${currentColor}-400`;
    }
    if (mbBtn) {
        mbBtn.className = `nav-btn-mb flex flex-col items-center gap-1 text-white transition`;
        const icon = mbBtn.querySelector('i');
        if (icon) icon.className = `w-4 h-4 text-${currentColor}-400`;
    }
}

// --- 3. AI ASSISTANT CHAT BOT ENGINE ---
function setChatModel(model) {
    currentChatModel = model;
    
    // Reset style kelas tombol model selector
    const btnOllag = document.getElementById('model-ollag');
    const btnOllfux = document.getElementById('model-ollfux');
    
    if (btnOllag && btnOllfux) {
        btnOllag.className = "px-4 py-1.5 rounded-lg text-[11px] font-bold tracking-wide transition text-zinc-400 hover:text-zinc-200";
        btnOllfux.className = "px-4 py-1.5 rounded-lg text-[11px] font-bold tracking-wide transition text-zinc-400 hover:text-zinc-200";
        
        const activeBtn = document.getElementById(`model-${model}`);
        if (activeBtn) {
            activeBtn.className = "px-4 py-1.5 rounded-lg text-[11px] font-bold tracking-wide transition bg-zinc-800 text-white border border-zinc-700/30 shadow-sm";
        }
    }
}

function sendChatMessage() {
    const inputEl = document.getElementById('chat-input');
    const wrapper = document.getElementById('chat-messages-wrapper');
    const msg = inputEl ? inputEl.value.trim() : '';

    if (!msg) return;

    // Append pesan pengguna ke dalam feed obrolan
    const userMsgHtml = `
        <div class="flex gap-4 items-start justify-end">
            <div class="bg-zinc-800 p-4 rounded-2xl border border-zinc-700/30 max-w-[85%]">
                <p class="text-xs text-zinc-200 leading-relaxed">${escapeHtml(msg)}</p>
            </div>
        </div>
    `;
    wrapper.insertAdjacentHTML('beforeend', userMsgHtml);
    inputEl.value = ''; // Reset input area

    // Simulasi respons bot cerdas berdasarkan model yang aktif
    showLoading('AI sedang merumuskan jawaban...');
    setTimeout(() => {
        hideLoading();
        const modelLabel = currentChatModel === 'ollag' ? 'OllaG 1.5 (GPT-3.5)' : 'Ollfux 1.0 (Turbochat)';
        const botMsgHtml = `
            <div class="flex gap-4 items-start bg-zinc-800/10 p-5 rounded-2xl border border-zinc-800/30">
                <div class="bg-gradient-to-tr from-emerald-600 to-teal-500 p-2 rounded-xl text-white shrink-0 shadow-md">
                    <i data-lucide="bot" class="w-3.5 h-3.5"></i>
                </div>
                <div class="space-y-1">
                    <p class="font-bold text-xs text-zinc-400">${modelLabel}</p>
                    <p class="text-xs text-zinc-300 leading-relaxed">Ini adalah simulasi respons memori kontekstual dari infrastruktur Nexray menggunakan model ${modelLabel} untuk memproses instruksi: "${escapeHtml(msg)}".</p>
                </div>
            </div>
        `;
        wrapper.insertAdjacentHTML('beforeend', botMsgHtml);
        lucide.createIcons(); // Re-render ikon robot baru
        
        // Auto scroll otomatis ke dasar feed obrolan
        const container = document.getElementById('chat-container');
        if (container) container.scrollTop = container.scrollHeight;
    }, 1200);
}

// Shortcut Keyboard: Kirim pesan lewat Enter (bukan Shift+Enter) & reset lewat Ctrl+K
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey && document.activeElement.id === 'chat-input') {
        e.preventDefault();
        sendChatMessage();
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        resetChat();
    }
});

function resetChat() {
    const wrapper = document.getElementById('chat-messages-wrapper');
    if (wrapper) {
        wrapper.innerHTML = `
            <div class="flex gap-4 items-start bg-zinc-800/20 p-5 rounded-2xl border border-zinc-800/50">
                <div class="bg-gradient-to-tr from-emerald-600 to-teal-500 p-2 rounded-xl text-white shrink-0 shadow-md">
                    <i data-lucide="bot" class="w-3.5 h-3.5"></i>
                </div>
                <div class="space-y-1">
                    <p class="font-bold text-xs text-zinc-400">Ollaps Flum Intelligence</p>
                    <p class="text-xs text-zinc-300 leading-relaxed">Memori sesi telah dibersihkan. Mari mulai diskusi baru yang kompleks atau tanyakan apa saja yang Anda butuhkan.</p>
                </div>
            </div>
        `;
        lucide.createIcons();
    }
}

// --- 4. INPAINT MODIFICATION ENGINE ---
function processImageModification() {
    const imgInput = document.getElementById('mod-image-input');
    const paramInput = document.getElementById('mod-param-input').value.trim();

    if (imgInput.files.length === 0 || !paramInput) {
        alert('Mohon unggah berkas gambar sumber dan isi instruksi perubahan!');
        return;
    }

    showLoading('Melakukan kalkulasi struktur inpaint...');
    // Simulasi Render Manipulasi Gambar
    setTimeout(() => {
        hideLoading();
        const resultDiv = document.getElementById('mod-result');
        const resultImg = document.getElementById('mod-result-img');
        
        // Contoh placeholder hasil visual modifikasi
        resultImg.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop";
        resultDiv.classList.remove('hidden');
    }, 2500);
}

// --- 5. STUDIO GAMBAR ENGINE (OLLAGAMA CORE) ---
function generateImage() {
    const engine = document.getElementById('gen-image-engine').value;
    const prompt = document.getElementById('gen-image-prompt').value.trim();

    if (!prompt) {
        alert('Deskripsi imajinasi/prompt gambar tidak boleh kosong!');
        return;
    }

    showLoading(`Menyusun partikel visual via engine ${engine}...`);
    // Simulasi Komposisi Generative Gambar AI
    setTimeout(() => {
        hideLoading();
        const resultDiv = document.getElementById('gen-result');
        const resultImg = document.getElementById('gen-result-img');
        
        // Contoh placeholder hasil visual AI Studio
        resultImg.src = "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop";
        resultDiv.classList.remove('hidden');
    }, 3000);
}

// --- 6. LOGO GENERATOR OLLAGO 131 FEATURE (API INTEGRATED) ---
async function generateLogo() {
    const prompt = document.getElementById('logo-prompt').value.trim();

    if (!prompt) {
        alert('Deskripsi konsep atau nama logo wajib diisi!');
        return;
    }

    showLoading('Mentransformasi sketsa vektor logo...');
    const url = `https://api.nexray.eu.cc/ai/sologo?prompt=${encodeURIComponent(prompt)}`;

    try {
        const response = await fetch(url);
        const contentType = response.headers.get("content-type");
        let resultImgUrl = '';

        // Deteksi tipe konten respons dari API
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const data = await response.json();
            resultImgUrl = data.result || data.url || data.image;
        } else {
            // Jika API mengembalikan file biner gambar langsung secara stream
            const blob = await response.blob();
            resultImgUrl = URL.createObjectURL(blob);
        }

        if (resultImgUrl) {
            const resultImg = document.getElementById('logo-result-img');
            const resultContainer = document.getElementById('logo-result');
            
            resultImg.src = resultImgUrl;
            resultContainer.classList.remove('hidden');
        } else {
            alert('Gagal mengekstrak tautan visual logo dari repositori.');
        }
    } catch (error) {
        console.error('Logo generation error:', error);
        alert('Terjadi kegagalan komunikasi dengan endpoint server Ollago 131.');
    } finally {
        hideLoading();
    }
}

// --- 7. AUDIO MUSIC GENERATOR (SUNO AUDIO ENGINE) ---
function generateMusic() {
    const prompt = document.getElementById('music-prompt').value.trim();

    if (!prompt) {
        alert('Konsep aransemen atau tema musik wajib diisi!');
        return;
    }

    showLoading('Mengonversi teks menjadi gelombang audio harmonis...');
    // Simulasi Pembuatan Audio
    setTimeout(() => {
        hideLoading();
        const resultDiv = document.getElementById('music-result');
        const resultAudio = document.getElementById('music-result-audio');
        
        // Menggunakan berkas audio tiruan audio sintetis
        resultAudio.src = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
        resultDiv.classList.remove('hidden');
    }, 4000);
}

// UTILITY FUNCTION (Mencegah kerentanan XSS pada injeksi kode obrolan)
function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}
