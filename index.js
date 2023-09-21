const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
// const postRoute = require("./routes/posts");

dotenv.config();

// async function connectToMongoDB() {
//   const client = new MongoClient(process.env.MONGO_URL);

//   try {
//     await client.connect();
//     console.log("Connected to MongoDb successfully");
//   } catch (error) {
//     console.error("Connected to MongoDb faile", error);
//   } finally {
//     // Đảm bảo đóng kết nối sau khi hoàn thành
//     await client.close();
//     console.log("Connect to mongodb close");
//   }

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Kết nối thành công đến MongoDB");

    // Thực hiện các hoạt động trên cơ sở dữ liệu
    // ...
  } catch (error) {
    console.error("Lỗi kết nối MongoDB:", error);
  }
}

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
// app.use("/api/posts", postRoute);

app.listen(8800, () => {
  console.log("Backend server is running!");
});
connectToMongoDB();
