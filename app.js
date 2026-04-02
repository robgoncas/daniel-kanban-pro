const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));


app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.set("view options", { layout: "layouts/layout" });

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/dashboard", (req, res) => {

  const data = fs.readFileSync(path.join(__dirname, "data.json"), "utf-8");

  const parsedData = JSON.parse(data);

  res.render("dashboard", parsedData);
});

app.post("/nueva-tarjeta", (req, res) => {

  const { title } = req.body;

  const data = fs.readFileSync(path.join(__dirname, "data.json"), "utf-8");
  const parsedData = JSON.parse(data);

  parsedData.boards[0].lists[0].cards.push({ title });

  fs.writeFileSync(
    path.join(__dirname, "data.json"),
    JSON.stringify(parsedData, null, 2)
  );
  res.redirect("/dashboard");
});

app.listen(PORT, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});