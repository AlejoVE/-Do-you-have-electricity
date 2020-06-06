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
const DATA_PATH = path.join(__dirname, "..", "data/courses.json");

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
      state: req.body.state,
      city: req.body.city,
      street_address: req.body.street_address,
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
  modifyReport: async (req, res) => {
    const reportToUpdateId = Number(req.params.id);

    try {
      const content = await readFile(DATA_PATH, "utf-8");
      const data = JSON.parse(content);
      const reports = data.reports;
      const findReport = reports.find(
        (report) => report.id === reportToUpdateId
      );
      if (!findReport) {
        res.status(404).send("Not found");
        return;
      }

      findReport.city = req.body.city;
      findReport.state = req.body.state;
      findReport.have_electricity = req.body.have_electricity;
      findReport.street_address = req.body.street_address;

      const date_time = new Date();
      const formattedDate = `${date_time.toDateString()} ${date_time.toLocaleTimeString()}`;
      findReport.date = formattedDate;

      const isValid = tv4.validate(findReport, File_SCHEMA);

      if (!isValid) {
        const error = tv4.error;
        console.error(error);

        res.status(400).json({
          error: {
            message: error.message,
            dataPath: error.dataPath,
          },
        });
        return;
      }

      const newFileDataString = JSON.stringify(data, null, "  ");

      await writeFile(DATA_PATH, newFileDataString);

      res.json(findReport);
    } catch (error) {
      console.log(error);
      res.status(500).send("Something went wrong, please try later.");
    }
  },
  deleteReport: async (req, res) => {
    const idToDelete = Number(req.params.id);

    try {
      const DataString = await readFile(DATA_PATH, "utf-8");
      const fileData = JSON.parse(DataString);

      const entryToDelete = fileData.reports.find(
        (report) => report.id === idToDelete
      );

      if (entryToDelete) {
        const index = fileData.reports.indexOf(entryToDelete);
        fileData.reports.splice(index, 1);

        const newFileDataString = JSON.stringify(fileData, null, "  ");

        await writeFile(DATA_PATH, newFileDataString);

        res.json(entryToDelete);
      } else {
        res.send(`no report with id ${idToDelete}`);
      }
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
