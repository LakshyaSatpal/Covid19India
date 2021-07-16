const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 80;
const staticPath = path.join(__dirname, "../public");
app.use(express.static(staticPath));

app.set("view engine", "hbs");
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
