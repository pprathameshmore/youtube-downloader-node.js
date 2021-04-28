require("dotenv").config();
const express = require("express");

const { downloadQueue } = require("./downloader");

const app = express();

const PORT = 3000;

app.use(express.json());

app.post("/downloads", async (req, res) => {
  try {
    const { url } = req.body;
    await downloadQueue.add({ url });
    return res.send("Downloading...");
  } catch (error) {
    throw error;
  }
});

app.listen(PORT, () => {
  console.log("Server is running on", PORT);
});
