// @ts-check
const fs = require("fs");
const jokesData = require("./jokes.json");
const Handlebars = require("handlebars");
const {
  random,
  generateImage,
  readBase64File,
  updateProfileBanner,
} = require("./utils");

const TEMPLATE_FILE = "./template/index.html";
const OUT_FILE = "./out.png";

(async function () {
  const randomJoke = jokesData.jokes[random(0, jokesData.jokes.length - 1)];

  const template = Handlebars.compile(
    fs.readFileSync(TEMPLATE_FILE, { encoding: "utf-8" })
  );

  await generateImage(template({ q: randomJoke.q, a: randomJoke.a }));
  const data = readBase64File(OUT_FILE);

  await updateProfileBanner(data);
})();
