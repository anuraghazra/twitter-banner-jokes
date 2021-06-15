const fs = require("fs");
const { config } = require("dotenv");
const puppeteer = require("puppeteer");
const { TwitterClient } = require("twitter-api-client");
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
  return Math.floor(min + Math.random() * (max - min));
}

async function generateImage(html) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setViewport({ width: 1500, height: 500 });
  await page.evaluateHandle("document.fonts.ready");
  await page.setContent(html);
  await page.screenshot({ path: "out.png" });
  await browser.close();
}

module.exports = { updateProfileBanner, readBase64File, random, generateImage };
