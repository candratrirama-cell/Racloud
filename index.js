// index.js (Vercel Serverless Function)
import { IncomingForm } from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false, // Dimatikan agar formidable bisa membaca form data gambar secara native
  },
};

export default async function handler(req, res) {
  const { method, query } = req;

  // Endpoint 1: GET Request untuk Chat, Image, dan Music
  if (method === 'GET') {
    const { type, model, text, prompt } = query;

    try {
      let targetUrl = '';

      if (type === 'chat') {
        if (model === 'ollag') {
          targetUrl = `https://api.nexray.eu.cc/ai/gpt-3.5-turbo?text=${encodeURIComponent(text)}`;
        } else if (model === 'ollfux') {
          targetUrl = `https://api.nexray.eu.cc/ai/turbochat?text=${encodeURIComponent(text)}`;
        }
      } else if (type === 'image') {
        if (model === 'ollagama2') {
          targetUrl = `https://api.nexray.eu.cc/ai/magicstudio?prompt=${encodeURIComponent(prompt)}`;
        } else if (model === 'ollagama5') {
          targetUrl = `https://api.nexray.eu.cc/ai/ideogram?prompt=${encodeURIComponent(prompt)}`;
        }
      } else if (type === 'music') {
        targetUrl = `https://api.nexray.eu.cc/ai/suno?prompt=${encodeURIComponent(prompt)}`;
      }

      if (!targetUrl) return res.status(400).json({ error: 'Parameter tidak valid' });

      // Fetch data dari API Nexray
      const response = await fetch(targetUrl);
      
      // Jika tipenya gambar/music dan mereturn stream data mentah (binary/image/audio URL)
      const contentType = response.headers.get('content-type');
      
      if (contentType && (contentType.includes('image') || contentType.includes('audio'))) {
         // Kirim URL balikan nexray langsung sebagai object respons terstruktur
         return res.status(200).json({ url: targetUrl });
      }

      // Jika response text/json biasa (seperti chat)
      const dataText = await response.text();
      return res.status(200).json({ result: dataText });

    } catch (error) {
      return res.status(500).json({ error: 'Terjadi kesalahan pada internal Server Proxy' });
    }
  }

  // Endpoint 2: POST Request untuk Ubah Objek Gambar (gptimage)
  if (method === 'POST' && req.url.includes('edit-image')) {
    const form = new IncomingForm();

    return form.parse(req, async (err, fields, files) => {
      if (err) return res.status(500).json({ error: 'Gagal memproses berkas gambar' });

      try {
        const file = files.image[0] || files.image;
        const paramText = fields.param[0] || fields.param;

        // Siapkan FormData untuk di-forward ke nexray
        const nexrayForm = new FormData();
        const fileBuffer = fs.readFileSync(file.filepath);
        const blob = new Blob([fileBuffer], { type: file.mimetype });
        
        nexrayForm.append('image', blob, file.originalFilename);
        nexrayForm.append('param', paramText);

        const response = await fetch('https://api.nexray.eu.cc/ai/gptimage', {
          method: 'POST',
          body: nexrayForm,
        });

        // Asumsikan responsenya mengembalikan file gambar terproses secara langsung atau payload JSON
        // Di sini kita return langsung URL-nya
        return res.status(200).json({ url: 'https://api.nexray.eu.cc/ai/gptimage?param=' + encodeURIComponent(paramText) });
        
      } catch (error) {
        return res.status(500).json({ error: 'Gagal menghubungi server Nexray' });
      }
    });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
