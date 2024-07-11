import express from "express";
import bodyParser from "body-parser";
import User from "./models/users.js";
import Flight from "./models/flights.js";
import mongoose from "mongoose";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import Razorpay from "razorpay";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import dotenv from "dotenv";
dotenv.config();

const app = express();
let port = 3000;
// import { authenticateToken } from "./middleware.js";

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

// const MONGO_URL = "mongodb://127.0.0.1:27017/Real-Time-Flight-Booking-App";
const MONGO_URL = process.env.MONGO_URL;
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
  credentials: true,
};

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));

// Setup session
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

// // setup passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: "http://localhost:3000/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log(profile)
      try {
        const user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          const newUser = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: profile.id,
            image: profile.photos[0].value
          });
          await newUser.save();
          return done(null, newUser);
        } else {
          return done(null, user);
        }
      } catch (error) {
        console.log("Profile not fetched", error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// initial google oauth login
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
    successRedirect: "http://localhost:5173/googleLogin",
  })
);

app.get("/loginGoogle", (req, res) => {
  // console.log(req.user)
  if (req.user) {
    const token = req.user.email;
    // console.log(token)
    return res.send({ status: "success", token });
  } else {
    return res.send({ status: "error", message: "User not authenticated" });
  }
});

app.get("/logoutGoogle", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    // req.session = null; // Clear the session manually
    // res.send("Logged out");
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send("Error logging out");
      }
      res.clearCookie('connect.sid'); // Clear session cookie if used
      res.send("Logged out");
    });
  });
});


// Payment Gateway Razorpay
app.post("/api/payment", async (req, res) => {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  const options = {
    amount: req.body.amount * 100, // Razorpay requires the amount in paise
    currency: "INR",
    receipt: "Happy_Journey_" + Math.random().toString(36).substr(2, 9),
  };
  try {
    const order = await razorpay.orders.create(options);
    res.status(200).send({
      success: true,
      msg: "Order Created",
      order_id: order.id,
      amount: req.body.amount,
      key_id: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error(err);
    res.status(400).send("Failed to create order");
  }
});

// Routing
app.post("/login", (req, res) => {
  console.log(req.user);
  let { email: inputEmail, password: inputPassword } = req.body;
  // console.log(inputEmail, inputPassword);
  User.findOne({ email: inputEmail })
    .then((user) => {
      if (!user) {
        console.log("Invalid Credentials: User not found");
        return res.send("notFound");
      }
      if (user.password === inputPassword) {
        console.log("Login Successful");
        const token = inputEmail;
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
          const token = inputEmail;
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

app.get("/api/user/:email", async (req, res) => {
  const { email: inputEmail }  = req.params;
  User.findOne({ email: inputEmail }).then((user) => {
    if(user) res.json(user);
    else res.send("Not Found")
  })
})

app.get('/', (req, res) => {
  res.send('Welcome to flight booking backend!!')
})

app.listen(port, () => {
  console.log(`app is listening at port ${port}`);
});
