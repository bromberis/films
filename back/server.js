const mongoose = require("mongoose");
const app = require("./app");

const DB =
  "mongodb+srv://dbfilms:2Fo0t2OrHovUqbJv@cluster0.q6fgl.mongodb.net/films?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB connected");
  });

const port = 3005;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
