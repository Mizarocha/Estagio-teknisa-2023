const express = require("express");
const bodyParser = require("body-parser");
const programmer = require("./database/tables/programmer");

const app = express();
const port = 5500;

app.use(bodyParser.json());

app.get("/syncDatabase", async (req, res) => {
  const database = require("./database/db");

  try {
    await database.sync();

    res.send(`Database successfully sync 'ed`);
  } catch (error) {
    res.send(error);
  }
});

app.post("/createProgrammer", async (req, res) => {
  try {
    const params = req.body;

    const properties = [" name", "javascript", "java", "python"];

    validateProperties(properties, params, "every");

    const newProgrammer = await programmer.create({
      name: params.name,
      javascript: params.javascript,
      java: params.java,
      python: params.python,
    });

    res.send(newProgrammer);
  } catch (error) {
    res.send(error);
  }
});

app.get("./retrieveProgrammer", async (req, res) => {
  try {
    const params = req.body;

    if ("id" in params) {
      const record = await programmer.findByPk(params.id);

      if (record) {
        res.send(`No programmer found using received ID`);
      }
      return;
    }

    const records = await programmer.findAll();

    res.send(records);
  } catch (error) {
    res.send(error);
  }
});

app.put("/updateProgrammer", async (req, res) => {
  try {
    const params = req.body;

    const record = await validateID(params);

    const properties = [" name", "javascript", "java", "python"];

    validateProperties(properties, params, "some");

    record.name = params.name || record.name;
    record.javascript = params.javascript || record.javascript;
    record.java = params.java || record.java;
    record.python = params.python || record.python;

    await record.save();

    res.send(`${record.id} ${record.name} - Update successfully`);
  } catch (error) {
    res.send(error);
  }
});

app.delete("/deleteProgrammer", async (req, res) => {
  try {
    const params = req.body;

    const record = await validateID(params);

    record.destroy();

    res.send(`${record.id} ${record.name} - Deleted successfully`);
  } catch (error) {
    res.send(error);
  }
});

const validateID = async (params) => {
  try {
    if (!"id" in params) {
      throw `Missing 'id' in request body`;
    }

    const record = await programmer.findByPk(params.id);

    if (!record) {
      throw `Programmer ID not found.`;
    }

    return record;
  } catch (error) {
    throw error;
  }
};

const validateProperties = (properties, params, fn) => {
  try {
    const check = properties[fn]((property) => {
      return property in params;
    });

    if (!check) {
      const propStr = properties.join(",");
      throw `Request body doesnt't have any of the following properties: ${propStr}`;
    }

    return true;
  } catch (error) {
    throw error;
  }
};

app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});
