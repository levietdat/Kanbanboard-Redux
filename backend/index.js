import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
const urlDB =
  "mongodb+srv://admin:12345@cluster0.eivdlji.mongodb.net/?retryWrites=true&w=majority";
  mongoose.connect(urlDB, { useUnifiedTopology: true})
          .then(()=>{
            console.log("Connected to MongoDB")
          })
          .catch((err)=>{
            console.log("Error connecting to MongoDB: " + err.message);
          })
import router from "./routes/work.js";
import mongoose from "mongoose";
app.use("/work",router);

app.listen(port, () => {
  console.log("listening on port " + port);
});
