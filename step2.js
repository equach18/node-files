const fs = require("fs");
const process = require("process");
const axios = require("axios");
function cat(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.error(`Error: ${path}: ${err}`);
      process.exit(1);
    } else {
      console.log(data);
    }
  });
}

async function webCat(url) {
  try {
    let response = await axios.get(url);
    console.log(response.data);
  } catch (err) {
    console.error(`Error: ${url}: ${err}`);
    process.exit(1);
  }
}

let path = process.argv[2];

// returns true if path is url
function isUrl(path) {
  try {
    new URL(path);
    return true;
  } catch (err) {
    return false;
  }
}

if (isUrl(path)) {
  webCat(path);
} else {
  cat(path);
}
