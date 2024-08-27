const express = require("express");
const app = express();
const Submitrouter = require("./routes/routes");

const cors = require("cors");

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

//Home route test commit
app.get('/', (req, res)=>{
  res.json({messagae:"Hi, Server is working fine!!"})
})
app.use("/api/v1", Submitrouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});

