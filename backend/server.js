require("dotenv").config();
const app = require("./src/app");
const PORT = 3000;

app.listen(PORT, (req, res) => {
  console.log(`Server running on ${PORT} PORT`);
});
