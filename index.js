// @ts-check
const fs = require("fs");
const { config } = require("dotenv");
const { TwitterClient } = require("twitter-api-client");
const jokesData = require("./jokes.json");
const Handlebars = require("handlebars");
const puppeteer = require("puppeteer");

config();

const twitterClient = new TwitterClient({
  apiKey: process.env.TWITTER_API_KEY,
  apiSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

async function updateProfileBanner(data) {
  try {
    await twitterClient.accountsAndUsers.accountUpdateProfileBanner({
      banner: data,
    });
  } catch (err) {
    console.log(err);
  }
}
function readBase64File(path) {
  return fs.readFileSync(path, { encoding: "base64" });
}

function random(min, max) {
  return Math.floor(min + Math.random() * max);
}

(async function () {
  const randomJoke = jokesData.jokes[random(0, jokesData.jokes.length - 1)];

  const template = Handlebars.compile(
    fs.readFileSync("./template/index.html", { encoding: "utf-8" })
  );

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  page.setViewport({ width: 1500, height: 500 });
  await page.setContent(template({ q: randomJoke.q, a: randomJoke.a }));
  await page.screenshot({ path: "test.png" });
  await browser.close();

  const data = readBase64File("./test.png");

  await updateProfileBanner(data);
})();
