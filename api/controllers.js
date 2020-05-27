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
  getAllReports: async (req, res) => {
    try {
      const reports = await getReports(DATA_PATH);
      res.json(reports);
    } catch (error) {
      res.status(500).send("Something went wrong, please try later.");
    }
  },
  getReport: async (req, res) => {
    const id = Number(req.params.id);
    try {
      const reports = await getReports(DATA_PATH);
      const findReport = reports.find((report) => report.id === id);
      if (!findReport) {
        res.status(404).send(`There are no reports with the ID:${id}`).end;
        return;
      }
      res.json(findReport);
    } catch (error) {
      res.status(500).send("Something went wrong, please try later.");
    }
  },
};

async function getReports(dataPath) {
  const content = await readFile(dataPath, "utf-8");
  const data = JSON.parse(content);
  const reports = data.reports;
  return reports;
}
module.exports = controllers;
