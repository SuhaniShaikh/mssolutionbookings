const express = require("express");
const mongoose = require("mongoose");
const bookingRoutes = require("./routes/booking");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/mini_project", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/bookings", bookingRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
