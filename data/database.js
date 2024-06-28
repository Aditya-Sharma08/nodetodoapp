const mongoose = require("mongoose");

exports.connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "todolist",
    })
    .then((c) =>
      console.log(`DB connected Successfully with ${c.connection.host}`)
    )
    .catch((e) => console.log(e));
};
