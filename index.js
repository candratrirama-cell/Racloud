/**
 * Ollaps Flum Core Application Engine
 * Platform AI Multi-fungsi Terintegrasi Nexray API
 */

// Inisialisasi ikon dari pustaka Lucide
lucide.createIcons();

// --- STATE MANAGEMENT ---
let currentChatModel = 'ollag'; // Nilai standar model chat aktif
let chatHistory = [];           // Array memori untuk menampung konteks percakapan berkelanjutan

// --- TEXTAREA DYNAMIC HEIGHT ---
// Mengatur tinggi kolom input teks secara dinamis mengikuti panjang ketikan pengguna (gaya ChatGPT)
const tx = document.getElementById("chat-input");
if (tx) {
    tx.addEventListener("input", function() {
        this.style.height = "auto";
        this.style.height = (this.scrollHeight) + "px";
    });
}

// --- GLOBAL KEYBOARD SHORTCUTS ---
// Kombinasi tombol Ctrl + K (atau Cmd + K di Mac) untuk memicu fungsi pembersihan memori chat
window.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        resetChat();
    }
});

// --- 1. CORE NAVIGATION / TAB SWITCHER ---
function switchTab(tabName) {
    // Sembunyikan seluruh container tab yang ada
    document.querySelectorAll('.tab-content').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('flex');
    });
    
    // Tampilkan tab yang dipilih dengan mode flex untuk mempertahankan posisi bottom-docked UI
    const activeTab = document.getElementById(`tab-${tabName}`);
    activeTab.classList.remove('hidden');
    activeTab.classList.add('flex');

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
    
    // Skema warna aksen spesifik berdasarkan fitur yang diakses demi estetika UI profesional
    const colors = { chat: 'emerald', 'image-mod': 'purple', 'image-gen': 'blue', music: 'amber' };
    const currentColor = colors[tabName];

    // Berikan gaya aktif premium pada elemen tombol navigasi terpilih
    if(dtBtn) {
        dtBtn.className = `nav-btn-dt flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold w-full transition bg-zinc-800 text-white border border-zinc-700/40`;
        dtBtn.querySelector('i').className = `w-4 h-4 text-${currentColor}-400`;
    }
    if(mbBtn) {
        mbBtn.className = `nav-btn-mb flex flex-col items-center gap-1 text-white transition`;
        mbBtn.querySelector('i').className = `w-4 h-4 text-${currentColor}-400`;
    }
}

// --- 2. AI CONVERSATIONAL ASSISTANT FEATURE ---
function setChatModel(model) {
    currentChatModel = model;
    const btnOllag = document.getElementById('model-ollag');
    const btnOllfux = document.getElementById('model-ollfux');

    // Mutasi visual tab pemilih model chat (OllaG atau Ollfux)
    if(model === 'ollag') {
        btnOllag.className = "px-4 py-1.5 rounded-lg text-[11px] font-bold tracking-wide transition bg-zinc-800 text-white border border-zinc-700/30 shadow-sm";
        btnOllfux.className = "px-4 py-1.5 rounded-lg text-[11px] font-bold tracking-wide transition text-zinc-400 hover:text-zinc-200";
    } else {
        btnOllfux.className = "px-4 py-1.5 rounded-lg text-[11px] font-bold tracking-wide transition bg-zinc-800 text-white border border-zinc-700/30 shadow-sm";
        btnOllag.className = "px-4 py-1.5 rounded-lg text-[11px] font-bold tracking-wide transition text-zinc-400 hover:text-zinc-200";
    }
}

function resetChat() {
    // Kosongkan array memori lokal
    chatHistory = [];
    const wrapper = document.getElementById('chat-messages-wrapper');
    
    // Kembalikan tampilan chat ke kondisi awal (Intro Welcome Message)
    wrapper.innerHTML = `
        <div class="flex gap-4 items-start bg-zinc-800/20 p-5 rounded-2xl border border-zinc-800/50">
            <div class="bg-gradient-to-tr from-emerald-600 to-teal-500 p-2 rounded-xl text-white shrink-0 shadow-md">
                <i data-lucide="bot" class="w-3.5 h-3.5"></i>
            </div>
            <div class="space-y-1">
                <p class="font-bold text-xs text-zinc-400">Ollaps Flum Intelligence</p>
                <p class="text-xs text-zinc-300 leading-relaxed">Sesi obrolan baru dikosongkan. Ada yang bisa saya bantu sekarang?</p>
            </div>
        </div>
    `;
    lucide.createIcons();
    alert('Sesi memori obrolan berhasil dibersihkan.');
}

async function sendChatMessage() {
    const inputEl = document.getElementById('chat-input');
    const text = inputEl.value.trim();
    if (!text) return; // Validasi cegah pengiriman string kosong

    const messagesWrapper = document.getElementById('chat-messages-wrapper');
    const chatContainer = document.getElementById('chat-container');

    // Rekam pesan pengguna ke dalam riwayat memori kontekstual
    chatHistory.push({ role: 'user', content: text });

    // Tampilkan balon chat pengguna ke layar secara elegan
    const userMsgHtml = `
        <div class="flex gap-4 items-start max-w-xl justify-end ml-auto">
            <div class="bg-zinc-800/80 border border-zinc-700/50 px-4 py-3 rounded-2xl shadow-sm">
                <p class="text-xs text-zinc-200 leading-relaxed">${escapeHtml(text)}</p>
            </div>
        </div>
    `;
    messagesWrapper.insertAdjacentHTML('beforeend', userMsgHtml);
    
    // Reset elemen input text
    inputEl.value = '';
    inputEl.style.height = "auto";
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // Tampilkan placeholder respons bot dengan status loading "Menganalisis..."
    const botId = 'bot-' + Date.now();
    const botPlaceholderHtml = `
        <div class="flex gap-4 items-start bg-zinc-800/10 p-5 rounded-2xl border border-zinc-800/40" id="${botId}">
            <div class="bg-zinc-800 p-2 rounded-xl text-zinc-400 shrink-0 border border-zinc-700/30"><i data-lucide="bot" class="w-3.5 h-3.5"></i></div>
            <div class="flex-1 space-y-1.5">
                <p class="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">${currentChatModel === 'ollag' ? 'OllaG 1.5' : 'Ollfux 1.0'}</p>
                <div class="text-xs text-zinc-500 flex items-center gap-1.5 animate-pulse font-medium">
                    <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Menganalisis konteks obrolan...
                </div>
            </div>
        </div>
    `;
    messagesWrapper.insertAdjacentHTML('beforeend', botPlaceholderHtml);
    lucide.createIcons();
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // STRATEGI PENYAMBUNG KONTEKS CHAT (Memori Percakapan)
    // Menyusun string runut yang merangkum percakapan lampau agar dipahami oleh model AI
    let contextPrompt = "";
    chatHistory.forEach(msg => {
        contextPrompt += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
    });
    contextPrompt += "Assistant:"; // Memberi instruksi implisit kepada AI untuk melanjutkan teks

    // Penentuan endpoint API Nexray berdasarkan model pilihan pengguna
    let url = '';
    if (currentChatModel === 'ollag') {
        url = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(contextPrompt)}`;
    } else {
        url = `https://api.nexray.eu.cc/ai/turbochat?text=${encodeURIComponent(contextPrompt)}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Ekstraksi data secara aman mengantisipasi variasi struktur skema JSON dari API
        let reply = data.result || data.response || data.text || JSON.stringify(data);
        
        // Membersihkan prefix 'Assistant:' jika tidak sengaja keluar pada teks mentah respons AI
        reply = reply.replace(/^(Assistant:\s*|Bot:\s*)/i, '');

        // Rekam balasan bot ke dalam riwayat memori untuk percakapan selanjutnya
        chatHistory.push({ role: 'assistant', content: reply });
        
        // Gantikan status loading pulsing dengan konten teks jawaban asli dari AI
        document.getElementById(botId).querySelector('.animate-pulse').outerHTML = `
            <p class="text-xs text-zinc-200 leading-relaxed whitespace-pre-line">${reply}</p>
        `;
    } catch (error) {
        document.getElementById(botId).querySelector('.animate-pulse').outerHTML = `
            <p class="text-xs text-red-400 font-medium">Gagal memproses respons. Silakan periksa jaringan Anda.</p>
        `;
    }
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// --- 3. INPAINT IMAGE MODIFICATION FEATURE (POST METHOD) ---
async function processImageModification() {
    const fileInput = document.getElementById('mod-image-input');
    const paramInput = document.getElementById('mod-param-input');
    
    if (fileInput.files.length === 0 || !paramInput.value.trim()) {
        alert('Harap lengkapi berkas gambar dan instruksi parameter!');
        return;
    }

    showLoading('Meregenerasi objek gambar...');
    
    // Penyusunan multipart/form-data untuk metode POST ke API
    const formData = new FormData();
    formData.append('image', fileInput.files[0]);
    formData.append('param', paramInput.value.trim());

    try {
        const response = await fetch('https://api.nexray.eu.cc/ai/gptimage', { 
            method: 'POST', 
            body: formData 
        });
        
        const contentType = response.headers.get("content-type");
        let imageUrl = '';

        // Deteksi bentuk respons (apakah tautan JSON atau stream biner gambar langsung)
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const data = await response.json();
            imageUrl = data.result || data.url;
        } else {
            const blob = await response.blob();
            imageUrl = URL.createObjectURL(blob);
        }

        if(imageUrl) {
            document.getElementById('mod-result-img').src = imageUrl;
            document.getElementById('mod-result').classList.remove('hidden');
        } else {
            alert('Gagal mendistribusikan modifikasi media.');
        }
    } catch (error) {
        alert('Koneksi sistem ke server modifikasi terputus.');
    } finally {
        hideLoading();
    }
}

// --- 4. GENERATIVE STUDIO IMAGE FEATURE ---
async function generateImage() {
    const engine = document.getElementById('gen-image-engine').value;
    const prompt = document.getElementById('gen-image-prompt').value.trim();

    if (!prompt) {
        alert('Deskripsi prompt wajib diisi!');
        return;
    }

    showLoading('Melakukan rendering visualisasi...');
    let url = `https://api.nexray.eu.cc/ai/${engine}?prompt=${encodeURIComponent(prompt)}`;

    try {
        const response = await fetch(url);
        const contentType = response.headers.get("content-type");
        let resultImgUrl = '';

        if (contentType && contentType.indexOf("application/json") !== -1) {
            const data = await response.json();
            resultImgUrl = data.result || data.url;
        } else {
            const blob = await response.blob();
            resultImgUrl = URL.createObjectURL(blob);
        }

        if (resultImgUrl) {
            document.getElementById('gen-result-img').src = resultImgUrl;
            document.getElementById('gen-result').classList.remove('hidden');
        } else {
            alert('Gagal memuat aset gambar dari repositori.');
        }
    } catch (error) {
        alert('Gangguan pada arsitektur server gambar.');
    } finally {
        hideLoading();
    }
}

// --- 5. AUDIO SUNO MUSIC GENERATOR FEATURE ---
async function generateMusic() {
    const prompt = document.getElementById('music-prompt').value.trim();
    if(!prompt) {
        alert('Masukkan deskripsi aransemen musik!');
        return;
    }

    showLoading('Mengonversi partitur audio...');
    const url = `https://api.nexray.eu.cc/ai/suno?prompt=${encodeURIComponent(prompt)}`;

    try {
        const response = await fetch(url);
        const contentType = response.headers.get("content-type");
        let audioUrl = '';

        if (contentType && contentType.indexOf("application/json") !== -1) {
            const data = await response.json();
            audioUrl = data.result || data.audio_url || data.url; 
        } else {
            const blob = await response.blob();
            audioUrl = URL.createObjectURL(blob);
        }

        if(audioUrl) {
            const audioEl = document.getElementById('music-result-audio');
            audioEl.src = audioUrl;
            document.getElementById('music-result').classList.remove('hidden');
            audioEl.load(); // Refresh komponen pemutar HTML5 audio
        } else {
            alert('Format audio tidak valid atau link rusak.');
        }
    } catch (error) {
        alert('Gagal menghubungi core audio engine.');
    } finally {
        hideLoading();
    }
}

// --- GLOBAL HELPERS / UTILITIES ---
function showLoading(text) {
    document.getElementById('loading-text').innerText = text;
    document.getElementById('loading-overlay').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loading-overlay').classList.add('hidden');
}

function escapeHtml(string) {
    // Fungsi sanitasi teks untuk mencegah ancaman XSS saat me-render input user ke dokumen HTML
    return String(string)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Interseptor tombol keyboard Enter pada textarea chat
document.getElementById('chat-input').addEventListener('keydown', function(e) {
    // Jalankan pengiriman pesan hanya jika menekan Enter biasa (bukan Shift + Enter)
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendChatMessage();
    }
});
