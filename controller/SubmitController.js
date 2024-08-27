const { generateRandomString } = require("../utils/generaterandom");
const compiler = require("./Compiler");
const deleteController = require("./deleteController");

const path = require("path");

exports.HandleSubmit = async (req, res) => {
  const { code, input, lang } = req.body;

  switch (lang) {
    case "cpp":
      let randomfilename = generateRandomString(15);
      return compiler
        .CplusplusRunner(code, input, randomfilename)
        .then((data) => {
          console.log("successful compilation " + data);
          console.log("sending " + data);
          res.json(data);
          deleteController.deleteFile(
            path.join(__dirname, `../${randomfilename}.txt`)
          );
          deleteController.deleteFile(
            path.join(__dirname, `../${randomfilename}.cpp`)
          );
          deleteController.deleteFile(
            path.join(__dirname, `../${randomfilename}.out`)
          );
          deleteController.deleteFile(
            path.join(__dirname, `../${randomfilename}`)
          );
          deleteController.deleteFile(path.join(__dirname, "../a.exe"));
        })
        .catch((err) => {
          console.log("error:  " + err);
          deleteController.deleteFile(
            path.join(__dirname, `../${randomfilename}.txt`)
          );
          deleteController.deleteFile(
            path.join(__dirname, `../${randomfilename}.out`)
          );
          deleteController.deleteFile(
            path.join(__dirname, `../${randomfilename}.cpp`)
          );
          deleteController.deleteFile(
            path.join(__dirname, `../${randomfilename}`)
          );
        });
    case "c":
      let randomfilenameforc = generateRandomString(15);
      return compiler
        .CRunner(code, input,randomfilenameforc)
        .then((data) => {
          console.log("successful compilation " + data);
          console.log("sending " + data);
          res.json(data);
          deleteController.deleteFile(path.join(__dirname, `../${randomfilenameforc}.txt`));
          deleteController.deleteFile(path.join(__dirname, `../${randomfilenameforc}.out`));

          deleteController.deleteFile(path.join(__dirname, `../${randomfilenameforc}.c`));
          deleteController.deleteFile(path.join(__dirname, `../${randomfilenameforc}.exe`));
        })
        .catch((err) => {
          console.log("error: " + err);
          deleteController.deleteFile(path.join(__dirname, `../${randomfilenameforc}.txt`));
          deleteController.deleteFile(path.join(__dirname, `../${randomfilenameforc}.out`));
          deleteController.deleteFile(path.join(__dirname, `../${randomfilenameforc}.c`));
          deleteController.deleteFile(path.join(__dirname, `../${randomfilenameforc}.exe`));
        });

    case "python":
      return compiler
        .PythonRunner(code, input)
        .then((data) => {
          console.log("Successful execute " + data);
          console.log("sending " + data);
          res.json(data);
          deleteController.deleteFile(path.join(__dirname, "../inputc.txt"));
          deleteController.deleteFile(path.join(__dirname, "../c.py"));
        })
        .catch((err) => {
          console.log("error:  " + err);
          deleteController.deleteFile(path.join(__dirname, "../inputc.txt"));
          deleteController.deleteFile(path.join(__dirname, "../c.py"));
        });
    case "javascript":
      return compiler
        .JavaScriptRunner(code, input)
        .then((data) => {
          console.log("Successful execute " + data);
          console.log("sending " + data);
          res.json(data);
          deleteController.deleteFile(path.join(__dirname, "../inputd.txt"));
          deleteController.deleteFile(path.join(__dirname, "../d.js"));
        })
        .catch((err) => {
          console.log("error:  " + err);
          deleteController.deleteFile(path.join(__dirname, "../inputd.txt"));
          deleteController.deleteFile(path.join(__dirname, "../d.js"));
        });
        case "java":
          let randomfilenameforjava = generateRandomString(15);
          return compiler
            .JavaRunner(code, input, randomfilenameforjava)
            .then((data) => {
              console.log("successful compilation " + data);
              console.log("sending " + data);
              res.json(data);
              // deleteController.deleteFile(path.join(__dirname, "../input.txt"));
              // deleteController.deleteFile(path.join(__dirname, "../Main.java"));
              // deleteController.deleteFile(path.join(__dirname, "../Main.class"));
            })
            .catch((err) => {
              console.log("error:  " + err);
              // deleteController.deleteFile(path.join(__dirname, "../input.txt"));
              // deleteController.deleteFile(path.join(__dirname, "../Main.java"));
            });
  }
};
