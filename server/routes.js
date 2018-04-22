app.get("/", function (req, res) {
  let b = 5
  res.render("index", { title: "Hey", message: "Hello there!" })
})