import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import EmployeeModel from "./src/models/Employee";
import SubscriptionModel from "./src/models/Subscription";
import TourScehmaModel from "./src/models/Tours.schema";
import aws from "aws-sdk";
import multer from "multer"; 
import multerS3 from "multer-s3";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import 'dotenv/config';


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


//////////////////////////////////////////////////////////////

const s3 = new S3Client({
  region: process.env.S3_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY as string,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME as string,
    acl: "public-read",
    key: function (req: Request, file: Express.Multer.File, cb: Function) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
  }),
});


// upload the tour images to mongodb ans s3 bucket
app.post(
  "/tours",
  upload.single("file"),
  async (req: Request, res: Response) => {
    const { body, file } = req;
    console.log(req);
    if (!file) {
      return res.status(400).json({ Status: "Error", message: "Photo is required" });
    }

    try {
      const newTour = new TourScehmaModel({
        ...body,
        file: (file as any).location, // The location of the uploaded image in S3
      });

      await newTour.save();

      res.status(201).json({ Status: "Success", tour: newTour });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log("review doesn't work")
        res.status(500).json({ Status: "Error", error: err.message });
      } else {
        res.status(500).json({ Status: "Error", error: "An unknown error occurred" });
      }
    }
  }
);

// Route to fetch tours based on the featured property
app.get("/tours/featured/:featured", async (req: Request, res: Response) => {
  const { featured } = req.params;
  const isFeatured = featured === 'true'; // Convert string to boolean

  try {
    const tours = await TourScehmaModel.find({ featured: isFeatured });
    res.status(200).json(tours);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ Status: "Error", error: err.message });
    } else {
      res.status(500).json({ Status: "Error", error: "An unknown error occurred" });
    }
  }
});

/////////////////////////////////////////////////////////////////////////////////////




app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
