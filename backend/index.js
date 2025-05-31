const fs = require('fs')
const express = require('express')
const cors = require('cors')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.get('/categories', (req, res) => {
    try {
        const categories = JSON.parse(fs.readFileSync('database/categories.json', 'utf-8'));
        res.json(categories);
    } catch (error) {
        console.error("Hiba a kategóriák beolvasásakor:", error);
        res.status(500).json({ error: "Hiba történt a kategóriák beolvasása közben." });
    }
});

app.get('/read/:filename', (req, res) => {
    const content = JSON.parse(fs.readFileSync(`database/${req.params.filename}.json`, 'utf-8'));
    res.json(content);
});

app.post('/save/:filename', (req, res) => {
    fs.writeFileSync(`database/${req.params.filename}.json`, JSON.stringify(req.body.data));
    res.json(req.body.data);
});

app.listen(8080, () => {
    console.log("Server is running on port 8080.");
});