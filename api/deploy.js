export default async function handler(req, res) {
  // Hanya izinkan method POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { sub, domain, path, content, email } = req.body;

  // Validasi data yang masuk
  if (!sub || !path || !content) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // KONFIGURASI REPO KAMU
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Pastikan sudah diisi di Environment Variables Vercel
  const OWNER = "candratrirama-cell";
  const REPO = "Racloud";
  
  // Tentukan folder tujuan berdasarkan subdomain
  // File akan disimpan di: deployments/subdomain/namafile.ext
  const GITHUB_PATH = `deployments/${sub}/${path}`;

  try {
    // 1. Cek apakah file sudah ada (untuk mendapatkan SHA jika ingin update)
    let sha;
    const checkFile = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/${GITHUB_PATH}`,
      {
        headers: { Authorization: `token ${GITHUB_TOKEN}` }
      }
    );

    if (checkFile.status === 200) {
      const fileData = await checkFile.json();
      sha = fileData.sha;
    }

    // 2. Upload/Update file ke GitHub
    const uploadRes = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/${GITHUB_PATH}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Deploy ${sub} by ${email}`,
          content: content, // Content sudah dalam base64 dari frontend
          sha: sha // Masukkan SHA kalau file sudah ada
        }),
      }
    );

    const result = await uploadRes.json();

    if (uploadRes.ok) {
      return res.status(200).json({ message: 'Success', data: result });
    } else {
      console.error("GitHub Error:", result);
      return res.status(uploadRes.status).json({ message: result.message || 'GitHub Upload Failed' });
    }

  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
