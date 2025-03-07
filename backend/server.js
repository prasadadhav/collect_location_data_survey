const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Save submitted markers
app.post("/save", (req, res) => {
    const data = req.body;

    // Read existing data
    fs.readFile("data.json", (err, fileData) => {
        let existingData = [];
        if (!err) {
            try {
                existingData = JSON.parse(fileData);
            } catch (e) {
                console.error("Error parsing JSON:", e);
            }
        }

        // Append new data
        existingData.push(data);

        // Save back to file
        fs.writeFile("data.json", JSON.stringify(existingData, null, 2), (err) => {
            if (err) {
                console.error("Error saving data:", err);
                return res.status(500).send("Failed to save data");
            }
            res.status(200).send("Data saved successfully");
        });
    });
});

// Serve static frontend
app.use(express.static("../frontend"));

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
