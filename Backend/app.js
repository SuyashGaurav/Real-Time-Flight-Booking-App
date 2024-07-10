import express from "express";
import User from "./models/users.js";
import Flight from "./models/flights.js";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import { authenticateToken } from "./middleware.js";

const JWT_SECRET = "a1b2c3d4";

const MONGO_URL = "mongodb://127.0.0.1:27017/Real-Time-Flight-Booking-App";
async function main() {
  await mongoose.connect(MONGO_URL);
}
main()
  .then((data) => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

//Cors options
const corsOptions = {
  origin: "http://localhost:5173",
};

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
let port = 3000;

app.get("/", (req, res) => {
  res.send("Flights...");
});

// Routing
app.post("/login", (req, res) => {
  let { email: inputEmail, password: inputPassword } = req.body;
  console.log(inputEmail, inputPassword);
  // check frontend
  User.findOne({ email: inputEmail })
    .then((user) => {
      if (!user) {
        console.log("Invalid Credentials: User not found");
        return res.send("notFound");
      }
      if (user.password === inputPassword) {
        console.log("Login Successful");
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
          expiresIn: "1h",
        });
        return res.json({ status: "success", token });
      } else {
        console.log("Invalid Credentials: Incorrect password");
        return res.send("invalidPassword");
      }
    })
    .catch((err) => {
      console.error("Error during login:", err);
      return res.send("failed");
    });
});

// Post
app.post("/register", (req, res) => {
  let { name, email, password } = req.body;
  let inputEmail = email;
  User.findOne({ email: inputEmail }).then((user) => {
    if (user) {
      console.log("User already exists.");
      return res.send("exists");
    } else {
      const newUser = new User(req.body);
      newUser
        .save()
        .then(() => {
          console.log("Registration successful");
          const token = jwt.sign({ userId: email }, JWT_SECRET, {
            expiresIn: "1h",
          });
          return res.json({ status: "success", token });
        })
        .catch((err) => {
          console.log("Registration failed: ", err);
          return res.send("failed");
        });
    }
  });
});

app.get("/api/flights", async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// // Parameter
app.get("/api/flights/:id", async (req, res) => {
  let { id } = req.params;
  // console.log(id)
  try {
    const details = await Flight.findById(id);
    // console.log(details)
    res.json(details);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.patch("/api/flights/:id/lock-seat", async (req, res) => {
  const { seat } = req.body;
  try {
    const flight = await Flight.findById(req.params.id);
    if (flight) {
      flight.locks[seat] = 1;
      await flight.save();
      res.json(flight);
    } else {
      res.status(404).send("Flight not found");
    }
  } catch (err) {
    console.error("Error updating flight:", err);
    res.status(500).send(err);
  }
});

app.patch("/api/flights/:id/unlock-seat", async (req, res) => {
  const { seat } = req.body;
  try {
    const flight = await Flight.findById(req.params.id);
    if (flight) {
      flight.locks[seat] = 0;
      await flight.save();
      res.json(flight);
    } else {
      res.status(404).send("Flight not found");
    }
  } catch (err) {
    console.error("Error updating flight:", err);
    res.status(500).send(err);
  }
});

app.patch("/api/flights/:id/seat-book", async (req, res) => {
  const { seat } = req.body;
  try {
    const flight = await Flight.findById(req.params.id);
    if (flight) {
      flight.seats[seat] = 1;
      await flight.save();
      res.json(flight);
    } else {
      res.status(404).send("Flight not found");
    }
  } catch (err) {
    console.error("Error booking seat:", err);
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`app is listening at port ${port}`);
});
