"use strict";

const fs = require("fs");
const path = require("path");
const tv4 = require("tv4");
const config = require("../config");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const SCHEMA = path.join(
  __dirname,
  "/..",
  config.DATA_DIR,
  "/report-schema.json"
);
const DATA_PATH = path.join(
  __dirname,
  "/..",
  config.DATA_DIR,
  "/reports-data.json"
);

const controllers = {
  hello: (req, res) => {
    res.json({ message: "hello!" });
  },
  getReports: async (req, res) => {
    try {
      const content = await readFile(DATA_PATH, "utf-8");
      const data = JSON.parse(content);
      const reports = data.reports;
      res.json(reports);
    } catch (error) {
      res.status(500).send("Something went wrong, please try later.");
    }
  },
};

module.exports = controllers;
