import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import EmployeeModel from "./src/models/Employee";


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://kariyawasampawanya:4yWSfNNL5UbMC01z@cluster0.lddeo.mongodb.net/")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json("Login Successful");
        } else {
          res.json("Invalid Password");
        }
      } else {
        res.json("No record exists");
      }
    })
    .catch((err: unknown) => {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    });
});

app.post("/register", (req: Request, res: Response) => {
  EmployeeModel.create(req.body)
    .then(employee => res.json(employee))
    .catch((err: unknown) => {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    });
});



app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

app.post("/forgot-password", (req: Request, res: Response) => {
    const { email } = req.body;
    EmployeeModel.findOne({ email: email })
      .then(user => {
        if (user) {
            res.json("User not existed");
          
            res.json("Invalid Password");
          
        } else {
          res.json("No record exists");
        }
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          res.status(500).json({ error: err.message });
        } else {
          res.status(500).json({ error: "An unknown error occurred" });
        }
      });
  });
  