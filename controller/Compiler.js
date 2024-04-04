const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

exports.CplusplusRunner = async (code, input) => {
  const res = {
    err: false,
    msg: "",
  };
  return new Promise((resolve, reject) => {
    const fileName = "b.cpp";
    saveFile(fileName, code)
      .then(() => {
        fs.writeFile("inputb.txt", input, function (err) {
          if (err) {
            console.log(err);
            reject();
          }
        });

        const filePath = path.join(__dirname, "../b.cpp");
        console.log("cpp file -> " + filePath);

        exec("sudo g++ " + filePath, (err, stdout, stderr) => {

          if (err) {
            console.error(`exec error: ${err}`);
            resolve({
              err: true,
              output: err,
              error: stderr,
            });
          }

          console.log("compilation done..");
          const cppstarttime = Date.now()
          exec("sudo ./a.out < " + "inputb.txt", (err, stdout, stderr) => {
            const cppelapsedtime = Date.now() - cppstarttime
            if (err) {
              console.log("ERROR " + err);
              resolve({
                err: true,
                output: err,
                error: stderr,
              });
            }

            console.log("output \n ", stdout);
            resolve({
              err: false,
              output: stdout,
              time:cppelapsedtime
            });
          });
        });
      })
      .catch((e) => {
        console.log("error saving file " + e);
        const err = {
          err: true,
          output: "Internal Server Error!",
        };
        resolve(err);
      });
  });
};

exports.CRunner = async (code, input) => {
  return new Promise((resolve, reject) => {
    const fileName = "a.c";
    saveFile(fileName, code)
      .then(() => {
        fs.writeFile("inputa.txt", input, function (err) {
          if (err) {
            console.log(err);
            reject();
          }
        });

        const filePath = path.join(__dirname, "../a.c");
        console.log("c file -> " + filePath);

        exec("gcc " + filePath, (err, stdout, stderr) => {
          if (err) {
            console.error(`exec error: ${err}`);
            resolve({
              err: true,
              output: err,
              error: stderr,
            });
          }

          console.log("Compilation done");
          const cstarttime = Date.now()
          exec("./a.out < " + "inputa.txt", (err, stdout, stderr) => {
            const celapsedtime = Date.now() - cstarttime
            if (err) {
              console.log("error " + err);
              resolve({
                err: true,
                output: err,
                error: stderr,
              });
            }

            console.log("output: \n ", stdout);
            resolve({
              err: false,
              output: stdout,
              time: celapsedtime
            });
          });
        });
      })
      .catch(() => {
        console.log("error while saving the file \n" + saveFileRes);
        const err = {
          err: true,
          output: "Internal Server Error!",
        };
        resolve(err);
      });
  });
};

exports.PythonRunner = async (code, input) => {
  const res = {
    err: false,
    msg: "",
  };
  return new Promise((resolve, reject) => {
    const fileName = "c.py";
    saveFile(fileName, code)
      .then(() => {
        fs.writeFile("inputc.txt", input, function (err) {
          if (err) {
            console.log(err);
            reject();
          }
        });

        const filePath = path.join(__dirname, "../c.py");
        console.log("python file -> " + filePath);
        const inputPath = path.join(__dirname, "../inputc.txt");
        const pythonstartTime = Date.now();
        exec(
          "python3 " + filePath + " < " + inputPath,
          (err, stdout, stderr) => {
            const pythonelapsedtime = Date.now() - pythonstartTime;
           console.log(pythonelapsedtime);
            if (err) {
              console.error(`exec error: ${err}`);
              resolve({
                err: true,
                output: err,
                error: stderr,
              });
            }
            
            resolve({
              err: false,
              output: stdout,
              time: pythonelapsedtime
            });
          }
        );
      })
      .catch(() => {
        console.log("error saving python file \n" + saveFileRes);
        const err = {
          err: true,
          output: "Internal Server Error!",
        };
        resolve(err);
      });
  });
};

exports.JavaScriptRunner = async (code, input) => {
  const res = {
    err: false,
    msg: "",
  };
  return new Promise((resolve, reject) => {
    const fileName = "d.js";
    saveFile(fileName, code)
      .then(() => {
        fs.writeFile("inputd.txt", input, function (err) {
          if (err) {
            console.log(err);
            reject();
          }
        });

        const filePath = path.join(__dirname, "../d.js");
        console.log("javascript file -> " + filePath);
        const inputPath = path.join(__dirname, "../inputd.txt");
        const javascriptstarttime = Date.now()
        exec("node " + filePath + " < " + inputPath, (err, stdout, stderr) => {
          const jselapsedtime = Date.now() - javascriptstarttime;
          console.log(jselapsedtime);
          if (err) {
            console.error(`exec error: ${err}`);
            resolve({
              err: true,
              output: err,
              error: stderr,
            });
          }
          resolve({
            err: false,
            output: stdout,
            time: jselapsedtime
          });
        });
      })
      .catch(() => {
        console.log("error saving javascript file \n" + saveFileRes);
        const err = {
          err: true,
          output: "Internal Server Error!",
        };
        resolve(err);
      });
  });
};

exports.JavaRunner = async (code, input) => {
  const res = {
    err: false,
    msg: "",
  };
  return new Promise((resolve, reject) => {
    const fileName = "Main.java";
    fs.writeFile(fileName, code, (err) => {
      if (err) {
        console.error("Error writing Java file:", err);
        reject({ err: true, output: "Error writing Java file" });
        return;
      }

      fs.writeFile("input.txt", input, (err) => {
        if (err) {
          console.error("Error writing input file:", err);
          reject({ err: true, output: "Error writing input file" });
          return;
        }

        console.log("Java file written:", fileName);
        exec("javac " + fileName, (err, stdout, stderr) => {
          if (err) {
            console.error("Compilation error:", err);
            resolve({ err: true, output: err });
            return;
          }

          console.log("Compilation successful");
          const javastarttime = Date.now()
          exec("java Main < input.txt", (err, stdout, stderr) => {
            const javaelapsedtime = Date.now() - javastarttime
            if (err) {
              console.error("Execution error:", err);
              resolve({ err: true, output: err });
              return;
            }

            console.log("Execution successful");
            resolve({ err: false, output: stdout, time:javaelapsedtime});
          });
        });
      });
    });
  });
};
const saveFile = async (name, data) => {
  return new Promise((resolve, reject) => {
    console.log("saving ...");
    fs.writeFile(name, data || null, function (err) {
      if (err) {
        console.log(err);
        reject();
      } else {
        console.log("file saved");
        resolve();
      }
    });
  });
};
