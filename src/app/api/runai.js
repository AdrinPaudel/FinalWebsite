"use server"; // Tells Next.js that this logic should run on the server

import { exec } from "child_process";
import path from "path";
export async function runPythonScript(datastr) {
  //clear
  const pythonScriptPath = path.join(process.cwd(), "AI", "poly1.py");
  //clear
  const command = `python3 ${pythonScriptPath} "${datastr}"`;
  console.log(command)
  //clear
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error executing Python script: ${error.message}`);
      }
      if (stderr) {
        reject(`Python script stderr: ${stderr}`);
      }
      resolve(stdout);
    });
  });
}
