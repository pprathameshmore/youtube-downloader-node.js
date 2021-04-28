const Bull = require("bull");
const ytdl = require("ytdl-core");
const fs = require("fs");

const downloadQueue = new Bull("downloads queue", {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  },
});

downloadQueue.process(async function (job, done) {
  const url = job.data.url;

  const title = Math.random().toString();

  ytdl(url)
    .pipe(fs.createWriteStream(`./downloads/${title}.mp4`))
    .on("finish", () => {
      console.log("Downloaded");
      done();
    })
    .on("error", (error) => {
      console.log(error);
      done(error);
    });
});

module.exports = {
  downloadQueue,
};
