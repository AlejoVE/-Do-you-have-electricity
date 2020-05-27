"use strict";

const fs = require("fs");
const path = require("path");
const tv4 = require("tv4");
const config = require("../config");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const SCHEMA_PATH = path.join(
  __dirname,
  "/..",
  config.DATA_DIR,
  "/report-schema.json"
);
const File_SCHEMA = require(SCHEMA_PATH);
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
  addReport: async (req, res) => {
    const newReport = {
      id: 0,
      have_electricity: req.body.have_electricity,
      city: req.body.city,
      state: req.body.state,
      date: "",
    };

    try {
      const content = await readFile(DATA_PATH, "utf-8");
      const data = JSON.parse(content);

      newReport.id = data.nextId;
      data.nextId++;

      const date_time = new Date();
      const formattedDate = `${date_time.toDateString()} ${date_time.toLocaleTimeString()}`;
      newReport.date = formattedDate;

      const isValid = tv4.validate(newReport, File_SCHEMA);

      if (!isValid) {
        const error = tv4.error;
        console.error(error);

        res.status(400).json({
          error: {
            message: error.message,
          },
        });
        return;
      }

      data.reports.push(newReport);
      const newFileDataString = JSON.stringify(data, null, "  ");

      await writeFile(DATA_PATH, newFileDataString);

      res.json(newReport);
    } catch (error) {
      console.log(error);
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
