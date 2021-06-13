const fs = require("fs");
const { config } = require("dotenv");
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

(async function () {
  const data = readBase64File("./test.png");

  await updateProfileBanner(data);
})();
