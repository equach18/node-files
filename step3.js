const fs = require("fs");
const process = require("process");
const axios = require("axios");

function cat(path, out) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.error(`Error: ${path}: ${err}`);
      process.exit(1);
    } else {
      handleOut(data, out);
    }
  });
}

async function webCat(url, out) {
  try {
    let response = await axios.get(url);
    handleOut(response.data, out);
  } catch (err) {
    console.error(`Error: ${url}: ${err}`);
    process.exit(1);
  }
}


// returns true if path is url
function isUrl(path) {
  try {
    new URL(path);
    return true;
  } catch (err) {
    return false;
  }
}

function handleOut(text, out) {
  if (out) {
    fs.writeFile(out, text, "utf8", (err) => {
      if (err) {
        console.error(`Unable to write to ${out}: ${err}`);
      }
    });
  } else {
    console.log(text);
  }
}

let path;
let out;

if (process.argv[2] === '--out') {
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}
isUrl(path) ? webCat(path, out) : cat(path, out);
