// /api/deploy.js
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { sub, content, email } = req.body;
    
    // TOKEN DIAMBIL DARI VERCEL ENVIRONMENT VARIABLE (AMAN!)
    const GITHUB_TOKEN = process.env.GIT_TOKEN; 
    const GITHUB_REPO = "username/repo-kamu"; 

    try {
        const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/deployments/${sub}/index.html`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: `XND Deploy: ${sub} by ${email}`,
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
