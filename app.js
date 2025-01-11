/* const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const { exec } = require("child_process");

const app = express();

const port = 5000;

exec("ls", (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing command: ${error}`);
    return;
  }
  if (stderr) {
    console.error(`Standard error: ${stderr}`);
    return;
  }
  console.log(`Standard output: ${stdout}`);
}); */
