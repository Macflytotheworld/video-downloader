import express from "express";
import { exec } from "child_process";
import fs from "fs";

const app = express();
app.use(express.json());

app.post("/download", (req, res) => {
  const { url } = req.body;
  const file = "/tmp/video.mp4";

  exec(`yt-dlp -f mp4 -o "${file}" "${url}"`, (err) => {
    if (err) {
      return res.status(500).json({ error: "download_failed" });
    }

    res.sendFile(file, () => {
      fs.unlinkSync(file);
    });
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Downloader ativo na porta", PORT);
});
