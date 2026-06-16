/**
 * OLLAPS FLUM INTERACTIVE LOGIC ENGINE (index.js)
 * Nexray Infrastructure Framework V1.5 - Multi Logo & Audio URL Link Parser Verified
 */

// STATE MANAGEMENT UTAMA
let currentChatModel = 'ollag'; 

// INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
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
    document.querySelectorAll('.tab-content').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('flex');
    });
    
    const activeTab = document.getElementById(`tab-${tabName}`);
    if (activeTab) {
        activeTab.classList.remove('hidden');
        activeTab.classList.add('flex');
    }

    document.querySelectorAll('.nav-btn-dt').forEach(btn => {
        btn.className = "nav-btn-dt flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold w-full transition text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-200";
    });
    
    document.querySelectorAll('.nav-btn-mb').forEach(btn => {
        btn.className = "nav-btn-mb flex flex-col items-center gap-1 text-zinc-500 transition";
    });

    const dtBtn = document.getElementById(`btn-${tabName}-dt`);
    const mbBtn = document.getElementById(`btn-${tabName}-mb`);
    
    const colors = { chat: 'emerald', 'image-mod': 'purple', 'image-gen': 'blue', logo: 'cyan', music: 'amber' };
    const currentColor = colors[tabName] || 'emerald';

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

    const userMsgHtml = `
        <div class="flex gap-4 items-start justify-end">
            <div class="bg-zinc-800 p-4 rounded-2xl border border-zinc-700/30 max-w-[85%]">
                <p class="text-xs text-zinc-200 leading-relaxed">${escapeHtml(msg)}</p>
            </div>
        </div>
    `;
    wrapper.insertAdjacentHTML('beforeend', userMsgHtml);
    inputEl.value = ''; 

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
        lucide.createIcons(); 
        
        const container = document.getElementById('chat-container');
        if (container) container.scrollTop = container.scrollHeight;
    }, 1200);
}

// Keyboard Shortcut listener
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
    setTimeout(() => {
        hideLoading();
        const resultDiv = document.getElementById('mod-result');
        const resultImg = document.getElementById('mod-result-img');
        resultImg.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop";
        resultDiv.classList.remove('hidden');
    }, 2500);
}

// --- 5. STUDIO GAMBAR ENGINE ---
function generateImage() {
    const engine = document.getElementById('gen-image-engine').value;
    const prompt = document.getElementById('gen-image-prompt').value.trim();

    if (!prompt) {
        alert('Deskripsi imajinasi/prompt gambar tidak boleh kosong!');
        return;
    }

    showLoading(`Menyusun partikel visual via engine ${engine}...`);
    setTimeout(() => {
        hideLoading();
        const resultDiv = document.getElementById('gen-result');
        const resultImg = document.getElementById('gen-result-img');
        resultImg.src = "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop";
        resultDiv.classList.remove('hidden');
    }, 3000);
}

// --- 6. LOGO GENERATOR OLLAGO 131 (FIXED FOR 3 MULTIPLE LINKS IN JSON) ---
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
        const data = await response.json();
        
        // Menangkap data array link (menangani berbagai penamaan properti di JSON)
        const logoLinks = data.result || data.urls || data.images || data;

        const gridContainer = document.getElementById('logo-grid-container');
        const resultContainer = document.getElementById('logo-result');

        if (Array.isArray(logoLinks) && logoLinks.length > 0) {
            gridContainer.innerHTML = ''; // Bersihkan rendering lama

            // Lakukan perulangan data array untuk menaruh ke-3 link gambar ke dalam struktur Grid
            logoLinks.forEach((link, index) => {
                const imgHtml = `
                    <div class="relative group bg-zinc-950 p-1.5 rounded-xl border border-zinc-800 flex flex-col justify-between">
                        <img src="${link}" alt="Opsi Logo ${index + 1}" class="w-full h-auto object-contain rounded-lg border border-zinc-900 shadow-md">
                        <a href="${link}" target="_blank" class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center rounded-lg">
                            <span class="text-[9px] bg-zinc-900 text-zinc-200 px-2 py-1 rounded-md font-bold tracking-wide border border-zinc-700">Buka HD</span>
                        </a>
                    </div>
                `;
                gridContainer.insertAdjacentHTML('beforeend', imgHtml);
            });

            resultContainer.classList.remove('hidden');
        } else if (typeof logoLinks === 'string') {
            // Pengaman jika sewaktu-waktu API hanya mengembalikan single string URL tunggal
            gridContainer.innerHTML = `
                <div class="col-span-3 bg-zinc-950 p-1.5 rounded-xl border border-zinc-800">
                    <img src="${logoLinks}" class="max-h-56 mx-auto object-contain rounded-lg">
                </div>
            `;
            resultContainer.classList.remove('hidden');
        } else {
            alert('Format JSON berubah atau link gambar tidak ditemukan.');
        }
    } catch (error) {
        console.error('Logo generation error:', error);
        alert('Gagal mengambil data dari API Logo.');
    } finally {
        hideLoading();
    }
}

// --- 7. AUDIO MUSIC GENERATOR (FIXED FOR URL LINK IN JSON) ---
async function generateMusic() {
    const prompt = document.getElementById('music-prompt').value.trim();

    if (!prompt) {
        alert('Konsep aransemen atau tema musik wajib diisi!');
        return;
    }

    showLoading('Mengonversi teks menjadi gelombang audio harmonis...');
    const url = `https://api.nexray.eu.cc/ai/suno?prompt=${encodeURIComponent(prompt)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Membaca property link string URL dari dalam response JSON
        const audioUrl = data.result || data.url || data.audio;

        if (audioUrl) {
            const resultDiv = document.getElementById('music-result');
            const resultAudio = document.getElementById('music-result-audio');
            
            resultAudio.src = audioUrl;
            resultDiv.classList.remove('hidden');
            resultAudio.load(); // Reload elemen audio HTML5 untuk membaca source link baru
        } else {
            alert('Format JSON berubah atau link audio tidak ditemukan.');
        }
    } catch (error) {
        console.error('Music generation error:', error);
        alert('Gagal mengambil data dari API Musik.');
    } finally {
        hideLoading();
    }
}

// UTILITY FUNCTION (Anti-XSS)
function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}
