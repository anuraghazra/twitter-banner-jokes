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

function updateProfileBanner(data) {
  await twitterClient.accountsAndUsers.accountUpdateProfileBanner({
    banner: file,
  });
}
function readBase64File(path) {
  return fs.readFileSync(path, { encoding: "base64" });
}

(async function () {
  const data = readBase64File("./test.png");

  updateProfileBanner(data);
})();
