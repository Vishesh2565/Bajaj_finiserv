const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data;

        console.log('Received data:', data);

        // Check if data is an array
        if (!Array.isArray(data)) {
            return res.status(400).json({ error: 'Data should be an array' });
        }

        // Check if array elements are strings
        if (!data.every(item => typeof item === 'string')) {
            return res.status(400).json({ error: 'All elements in the array should be strings' });
        }

        // Processing logic
        const numbers = data.filter(item => !isNaN(item)).map(Number);
        const alphabets = data.filter(item => /^[a-zA-Z]+$/.test(item));
        const highest_lowercase_alphabet = alphabets
            .filter(item => item === item.toLowerCase())
            .sort()
            .reverse()[0] || null;

        res.json({
            roll_number: "Your Roll Number Here",
            numbers,
            alphabets,
            highest_lowercase_alphabet
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
