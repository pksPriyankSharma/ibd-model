import { spawn } from "child_process";

const runModel = async (req, res) => {
  try {
    const { args } = req.body; // Get the arguments from the request body

    // Prepare the Python process
    const pythonProcess = spawn("python", ["model.py", ...args]);

    let result = "";
    pythonProcess.stdout.on("data", (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    pythonProcess.on("close", (code) => {
      if (code === 0) {
        res.status(200).send({ result });
      } else {
        res.status(500).send({ error: "Python script error" });
      }
    });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "ERROR" });
  }
};

export { runModel };
