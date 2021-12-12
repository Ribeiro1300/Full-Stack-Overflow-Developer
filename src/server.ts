import "./setup";
import app from "./app";

const port = +process.env.PORT || 4000;

app.listen(port, () => {
  console.log("Server running on port " + process.env.PORT);
  console.log("database url " + process.env.DATABASE_URL);
});
