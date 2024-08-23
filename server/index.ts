import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import EmployeeModel from "./src/models/Employee";
import SubscriptionModel from "./src/models/Subscription"; // Import the Subscription model

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3003' })); // Allow requests from port 3003

// Connect to MongoDB
mongoose.connect("mongodb+srv://kariyawasampawanya:4yWSfNNL5UbMC01z@cluster0.lddeo.mongodb.net/")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Login route
app.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json({ Status: "Success" }); // Return success status
        } else {
          res.json({ Status: "Error", message: "Invalid Password" });
        }
      } else {
        res.json({ Status: "Error", message: "No record exists" });
      }
    })
    .catch((err: unknown) => {
      if (err instanceof Error) {
        res.status(500).json({ Status: "Error", error: err.message });
      } else {
        res.status(500).json({ Status: "Error", error: "An unknown error occurred" });
      }
    });
});

// Register route
app.post("/register", (req: Request, res: Response) => {
  EmployeeModel.create(req.body)
    .then(employee => res.json(employee))
    .catch((err: unknown) => {
      if (err instanceof Error) {
        res.status(500).json({ Status: "Error", error: err.message });
      } else {
        res.status(500).json({ Status: "Error", error: "An unknown error occurred" });
      }
    });
});

// Forgot password route
app.post("/forgot-password", (req: Request, res: Response) => {
  const { email } = req.body;
  EmployeeModel.findOne({ email: email })
    .then(user => {
      if (user) {
        // Handle forgot password logic
        res.json("Password reset instructions sent");
      } else {
        res.json("No record exists");
      }
    })
    .catch((err: unknown) => {
      if (err instanceof Error) {
        res.status(500).json({ Status: "Error", error: err.message });
      } else {
        res.status(500).json({ Status: "Error", error: "An unknown error occurred" });
      }
    });
});

// Subscription route
app.post("/subscribe", async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ Status: "Error", message: "Email is required" });
  }

  try {
    const existingSubscription = await SubscriptionModel.findOne({ email: email });
    if (existingSubscription) {
      return res.json({ Status: "Error", message: "Email already subscribed" });
    }
    await SubscriptionModel.create({ email });
    res.json({ Status: "Success", message: "Subscription successful" });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ Status: "Error", error: err.message });
    } else {
      res.status(500).json({ Status: "Error", error: "An unknown error occurred" });
    }
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
