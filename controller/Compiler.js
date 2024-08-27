const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

exports.CplusplusRunner = async (code, input, randomfilename) => {
  const res = {
    err: false,
    msg: "",
  };
  return new Promise((resolve, reject) => {
    const fileName = `${randomfilename}.cpp`;
    saveFile(fileName, code)
      .then(() => {
        fs.writeFile(`${randomfilename}.txt`, input, function (err) {
          if (err) {
            console.log(err);
            reject();
          }
        });

        const filePath = path.join(__dirname, `../${randomfilename}.cpp`);
        console.log("cpp file -> " + filePath);
        const startTime = Date.now();

        // Generate a random executable name
        const randomExecName = `${Math.random()
          .toString(36)
          .substring(2, 15)}.out`; // Avoid potential conflicts

        // Compile with the random executable name
        exec(
          `sudo g++ -o ${randomfilename} ${filePath}`,
          (err, stdout, stderr) => {
            const elapsedTime = Date.now() - startTime;
            if (err) {
              console.error(`exec error: ${err}`);
              resolve({
                err: true,
                output: err,
                error: stderr,
              });
            }

            console.log("compilation done..");

            // Execute the renamed executable
            exec(
              `sudo ./${randomfilename} < ${randomfilename}.txt`,
              (err, stdout, stderr) => {
                if (err) {
                  console.log("ERROR " + err);
                  resolve({
                    err: true,
                    output: err.cmd,
                    error: stderr,
                  });
                }
                if (stdout.endsWith("\n")) {
                  console.log("output \n ", stdout);
                  resolve({
                    err: false,
                    output: stdout.slice(0, -1),
                    time: elapsedTime,
                  });
                } else {
                  console.log("output: \n ", stdout);
                  resolve({
                    err: false,
                    output: stdout,
                    time: elapsedTime,
                  });
                }

                // Optionally clean up the temporary executable (consider security implications)
                // fs.unlinkSync(randomExecName); // Uncomment if desired
              }
            );
          }
        );
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

exports.CRunner = async (code, input, randomfilenameforc) => {
  return new Promise((resolve, reject) => {
    const cFileName = `${randomfilenameforc}.c`;
    const cFilePath = path.join(__dirname, `../${cFileName}`);
    
    
    saveFile(cFilePath, code)
      .then(() => {
        
        const inputFilePath = `${randomfilenameforc}.txt`;
        fs.writeFile(inputFilePath, input, function (err) {
          if (err) {
            console.log(err);
            reject(err);
          }

          console.log("Input file saved: " + inputFilePath);

          
          const execName = `${randomfilenameforc}.out`;
          const compileCommand = `gcc -o ${execName} ${cFilePath}`;

          console.log("Compiling with command: " + compileCommand);

          const startTime = Date.now();
          exec(compileCommand, (err, stdout, stderr) => {
            const compileTime = Date.now() - startTime;
            if (err) {
              console.error(`Compilation error: ${err}`);
              resolve({
                err: true,
                output: err.message,
                error: stderr,
                time: compileTime,
              });
            } else {
              console.log("Compilation successful.");

              
              const executeCommand = `./${execName} < ${inputFilePath}`;
              console.log("Executing with command: " + executeCommand);

              const execStartTime = Date.now();
              exec(executeCommand, (err, stdout, stderr) => {
                const execTime = Date.now() - execStartTime;
                if (err) {
                  console.error(`Execution error: ${err}`);
                  resolve({
                    err: true,
                    output: err.message,
                    error: stderr,
                    time: execTime,
                  });
                } else {
                  console.log("Execution successful.");
                  const output = stdout.trim(); 

                  resolve({
                    err: false,
                    output: output,
                    time: execTime,
                  });
                }

               
                // fs.unlinkSync(cFilePath); // Uncomment if desired
                // fs.unlinkSync(inputFilePath); // Uncomment if desired
                // fs.unlinkSync(execName); // Uncomment if desired
              });
            }
          });
        });
      })
      .catch((err) => {
        console.error("Error saving files: ", err);
        resolve({
          err: true,
          output: "Internal Server Error",
        });
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
        const startTime = Date.now();
        exec(
          "python3 " + filePath + " < " + inputPath,
          (err, stdout, stderr) => {
            const elapsedTime = Date.now() - startTime;

            if (err) {
              console.error(`exec error: ${err}`);
              resolve({
                err: true,
                output: err.cmd,
                error: stderr,
              });
            }
            if (stdout.endsWith("\n")) {
              resolve({
                err: false,
                output: stdout.slice(0, -1),
                time: elapsedTime,
              });
            } else {
              resolve({
                err: false,
                output: stdout,
                time: elapsedTime,
              });
            }
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
        const startTime = Date.now();
        exec("node " + filePath + " < " + inputPath, (err, stdout, stderr) => {
          const elapsedTime = Date.now() - startTime;
          if (err) {
            console.error(`exec error: ${err}`);
            resolve({
              err: true,
              output: err.cmd,
              error: stderr,
            });
          }
          if (stdout.endsWith("\n")) {
            resolve({
              err: false,
              output: stdout.slice(0, -1),
              time: elapsedTime,
            });
          } else {
            resolve({
              err: false,
              output: stdout,
              time: elapsedTime,
            });
          }
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

exports.JavaRunner = async (code, input, randomfilenameforjava) => {
  const res = {
    err: false,
    msg: "",
  };
  return new Promise((resolve, reject) => {
  

    
    const tempDir = path.join(__dirname, `${randomfilenameforjava}`);
    fs.mkdirSync(tempDir, { recursive: true });

    const fileName = path.join(tempDir, "Main.java");

    
    fs.writeFile(fileName, code, (err) => {
      if (err) {
        console.error("Error writing Java file:", err);
        fs.rmdirSync(tempDir, { recursive: true }); 
        reject({ err: true, output: "Error writing Java file" });
        return;
      }

      
      const inputFile = path.join(tempDir, "input.txt");
      fs.writeFile(inputFile, input, (err) => {
        if (err) {
          console.error("Error writing input file:", err);
          fs.rmdirSync(tempDir, { recursive: true }); 
          reject({ err: true, output: "Error writing input file" });
          return;
        }

        console.log("Java file written:", fileName);
        const startTime = Date.now();

        
        exec(
          `javac ${fileName} && cd ${tempDir} && java Main < ${inputFile}`,
          (err, stdout, stderr) => {
            const elapsedTime = Date.now() - startTime;
            if (err) {
              console.error("Compilation/Execution error:", err);
              fs.rmdirSync(tempDir, { recursive: true }); 
              resolve({ err: true, output: err.cmd, error: stderr });
              return;
            }

            console.log("Execution successful");
            if (stdout.endsWith("\n")) {
              resolve({
                err: false,
                output: stdout.slice(0, -1),
                time: elapsedTime,
              });
            } else {
              resolve({
                err: false,
                output: stdout,
                time: elapsedTime,
              });
            }

            
            fs.rmdirSync(tempDir, { recursive: true });
          }
        );
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
