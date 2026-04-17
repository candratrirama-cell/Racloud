// /api/deploy.js
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    // Menangkap parameter 'path' dari dashboard
    const { sub, path, content, email } = req.body;
    
    const GITHUB_TOKEN = process.env.GIT_TOKEN; 
    const GITHUB_REPO = "candratrirama-cell/Racloud"; // Ganti dengan repo milikmu

    // File diletakkan di deployments/[subdomain]/[jalur-file-asli]
    const fullPath = `deployments/${sub}/${path}`;

    try {
        const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${fullPath}`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: `XND Multi-file Deploy: ${fullPath} by ${email}`,
                content: content
            })
        });

        const data = await response.json();
        if (response.ok) {
            res.status(200).json({ success: true });
        } else {
            res.status(400).json({ error: data.message });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
