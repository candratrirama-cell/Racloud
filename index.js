// Initialize Lucide Icons
lucide.createIcons();

// State Application
let currentChatModel = 'ollag'; // Default model chat

// Auto resize textarea input chat mirip chatgpt
const tx = document.getElementById("chat-input");
if (tx) {
    tx.addEventListener("input", function() {
        this.style.height = "auto";
        this.style.height = (this.scrollHeight) + "px";
    });
}

// 1. Navigation / Tab Switcher
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    // Show selected tab
    document.getElementById(`tab-${tabName}`).classList.remove('hidden');

    // Reset button styles
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('bg-[#2f2f2f]', 'text-white');
        btn.classList.add('text-gray-400');
    });
    // Highlight active button
    document.getElementById(`btn-${tabName}`).classList.add('bg-[#2f2f2f]', 'text-white');
    document.getElementById(`btn-${tabName}`).classList.remove('text-gray-400');
}

// 2. Chat AI Feature
function setChatModel(model) {
    currentChatModel = model;
    const btnOllag = document.getElementById('model-ollag');
    const btnOllfux = document.getElementById('model-ollfux');

    if(model === 'ollag') {
        btnOllag.className = "px-3 py-1.5 rounded-lg text-xs font-medium transition bg-[#2f2f2f] text-white";
        btnOllfux.className = "px-3 py-1.5 rounded-lg text-xs font-medium transition text-gray-400 hover:text-white";
    } else {
        btnOllfux.className = "px-3 py-1.5 rounded-lg text-xs font-medium transition bg-[#2f2f2f] text-white";
        btnOllag.className = "px-3 py-1.5 rounded-lg text-xs font-medium transition text-gray-400 hover:text-white";
    }
}

async function sendChatMessage() {
    const inputEl = document.getElementById('chat-input');
    const text = inputEl.value.trim();
    if (!text) return;

    const chatContainer = document.getElementById('chat-container');

    // 1. Append User Message to UI
    const userMsgHtml = `
        <div class="flex gap-4 items-start max-w-3xl justify-end ml-auto">
            <div class="bg-emerald-600/10 border border-emerald-500/20 p-4 rounded-2xl max-w-[85%]">
                <p class="text-sm text-gray-100 leading-relaxed">${escapeHtml(text)}</p>
            </div>
        </div>
    `;
    chatContainer.insertAdjacentHTML('beforeend', userMsgHtml);
    inputEl.value = '';
    inputEl.style.height = "auto"; // Reset height
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // 2. Append Placeholder Bot Message (Loading State)
    const botId = 'bot-' + Date.now();
    const botPlaceholderHtml = `
        <div class="flex gap-4 items-start bg-[#2f2f2f]/20 p-4 rounded-2xl border border-[#2f2f2f]" id="${botId}">
            <div class="bg-emerald-600 p-2 rounded-lg text-white shrink-0"><i data-lucide="bot" class="w-4 h-4"></i></div>
            <div class="flex-1 space-y-2">
                <p class="text-xs font-semibold text-emerald-500 uppercase">${currentChatModel === 'ollag' ? 'OllaG 1.5' : 'Ollfux 1.0'}</p>
                <div class="text-sm text-gray-400 animate-pulse">Mengetik...</div>
            </div>
        </div>
    `;
    chatContainer.insertAdjacentHTML('beforeend', botPlaceholderHtml);
    lucide.createIcons();
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // 3. Hit API
    let url = '';
    if (currentChatModel === 'ollag') {
        url = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(text)}`;
    } else {
        url = `https://api.nexray.eu.cc/ai/turbochat?text=${encodeURIComponent(text)}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Asumsi struktur data json dari API langsung mengembalikan teks atau di dalam objek result/response
        const reply = data.result || data.response || data.text || JSON.stringify(data);
        
        // Update Bot UI Placeholder with exact result
        document.getElementById(botId).querySelector('.animate-pulse').outerHTML = `
            <p class="text-sm text-gray-200 leading-relaxed whitespace-pre-line">${reply}</p>
        `;
    } catch (error) {
        document.getElementById(botId).querySelector('.animate-pulse').outerHTML = `
            <p class="text-sm text-red-400">Gagal memproses data. Silakan coba lagi nanti.</p>
        `;
    }
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// 3. Modify Image Feature
async function processImageModification() {
    const fileInput = document.getElementById('mod-image-input');
    const paramInput = document.getElementById('mod-param-input');
    
    if (fileInput.files.length === 0 || !paramInput.value.trim()) {
        alert('Harap unggah gambar dan isi instruksi parameter!');
        return;
    }

    showLoading('Memodifikasi objek gambar...');

    const formData = new FormData();
    formData.append('image', fileInput.files[0]);
    formData.append('param', paramInput.value.trim());

    try {
        const response = await fetch('https://api.nexray.eu.cc/ai/gptimage', {
            method: 'POST',
            body: formData
        });

        // Response API ini umumnya bisa langsung mengembalikan blob gambar atau url JSON. 
        // Implementasi di bawah berasumsi API mengembalikan blob Gambar langsung / JSON URL.
        const contentType = response.headers.get("content-type");
        let imageUrl = '';

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
            alert('Gagal memproses perubahan gambar.');
        }

    } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan koneksi API.');
    } finally {
        hideLoading();
    }
}

// 4. Generate Image Feature
async function generateImage() {
    const engine = document.getElementById('gen-image-engine').value;
    const prompt = document.getElementById('gen-image-prompt').value.trim();

    if (!prompt) {
        alert('Prompt tidak boleh kosong!');
        return;
    }

    showLoading('Sedang melukis gambar imajinasimu...');

    let url = `https://api.nexray.eu.cc/ai/${engine}?prompt=${encodeURIComponent(prompt)}`;

    try {
        const response = await fetch(url);
        
        // Memeriksa response apakah file biner gambar langsung atau JSON berkas URL
        const contentType = response.headers.get("content-type");
        let resultImgUrl = '';

        if (contentType && contentType.indexOf("application/json") !== -1) {
            const data = await response.json();
            resultImgUrl = data.result || data.url;
        } else {
            // Jika API merespon langsung dengan raw image stream
            const blob = await response.blob();
            resultImgUrl = URL.createObjectURL(blob);
        }

        if (resultImgUrl) {
            document.getElementById('gen-result-img').src = resultImgUrl;
            document.getElementById('gen-result').classList.remove('hidden');
        } else {
            alert('Tidak dapat memuat gambar.');
        }

    } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan pada server AI.');
    } finally {
        hideLoading();
    }
}

// 5. Generate Music Feature
async function generateMusic() {
    const prompt = document.getElementById('music-prompt').value.trim();
    if(!prompt) {
        alert('Tuliskan genre/tema musik terlebih dahulu!');
        return;
    }

    showLoading('Membuat aransemen musik AI...');

    const url = `https://api.nexray.eu.cc/ai/suno?prompt=${encodeURIComponent(prompt)}`;

    try {
        const response = await fetch(url);
        const contentType = response.headers.get("content-type");
        let audioUrl = '';

        if (contentType && contentType.indexOf("application/json") !== -1) {
            const data = await response.json();
            // Sesuaikan key JSON dari Suno API Nexray jika mengembalikan object
            audioUrl = data.result || data.audio_url || data.url; 
        } else {
            const blob = await response.blob();
            audioUrl = URL.createObjectURL(blob);
        }

        if(audioUrl) {
            const audioEl = document.getElementById('music-result-audio');
            audioEl.src = audioUrl;
            document.getElementById('music-result').classList.remove('hidden');
            audioEl.load();
        } else {
            alert('Format audio tidak valid / Gagal memproses musik.');
        }

    } catch (error) {
        console.error(error);
        alert('Error saat menghubungi server musik.');
    } finally {
        hideLoading();
    }
}

// Helpers Utilities
function showLoading(text) {
    document.getElementById('loading-text').innerText = text;
    document.getElementById('loading-overlay').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loading-overlay').classList.add('hidden');
}

function escapeHtml(string) {
    return String(string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Listen Enter Key on Textarea Chat (tanpa shift enter)
document.getElementById('chat-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendChatMessage();
    }
});
