import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";  // Import bcrypt
import EmployeeModel from "./src/models/Employee";
import SubscriptionModel from "./src/models/Subscription";

import TourScehmaModel from "./src/models/Tours.schema";
import BookingModel from "./src/models/Booking.schema";
import userBookingsRouter from './src/routers/userBookings';
import aws from "aws-sdk";
import multer from "multer"; 
import multerS3 from "multer-s3";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import 'dotenv/config';



const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3003' })); // Allow requests from port 3003
app.use('/userBookings', userBookingsRouter);

// Connect to MongoDB
mongoose.connect("mongodb+srv://kariyawasampawanya:4yWSfNNL5UbMC01z@cluster0.lddeo.mongodb.net/")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tourslusj@gmail.com', // Your email
    pass: 'aocptaolufrsnpjs' // App password generated from Gmail
  }
});

app.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email })
    .then(async user => {
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          res.json({ Status: "Success", userId: user._id }); // Return success status and user ID
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
app.post("/register", async (req: Request, res: Response) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash the password
    const employee = await EmployeeModel.create({ ...req.body, password: hashedPassword });
    res.json(employee);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ Status: "Error", error: err.message });
    } else {
      res.status(500).json({ Status: "Error", error: "An unknown error occurred" });
    }
  }
});

// Forgot password route
app.post("/forgot-password", (req: Request, res: Response) => {
  const { email } = req.body;
  EmployeeModel.findOne({ email: email })
    .then(user => {
      if (user) {
        // Generate a password reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour expiry

        // Update the user record with the reset token and expiry
        user.resetToken = resetToken;
        user.resetTokenExpiry = resetTokenExpiry;
        user.save();

        // Send the reset token to the user's email
        const mailOptions = {
          to: user.email,
          from: 'tourslusj@gmail.com',
          subject: 'Password Reset',
          text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
            `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
            `http://localhost:3003/reset-password/${resetToken}\n\n` +
            `If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
            res.status(500).json({ Status: "Error", message: "Failed to send email" });
          } else {
            res.json({ Status: "Success", message: "Password reset instructions sent" });
          }
        });
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

app.post("/reset-password/:token", (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;  // Ensure the correct variable name

  EmployeeModel.findOne({ resetToken: token, resetTokenExpiry: { $gt: new Date() } })
    .then(async user => {
      if (!user) {
        return res.status(400).json({ Status: "Error", message: "Password reset token is invalid or has expired" });
      }

      // Ensure you are passing both the password and the number of salt rounds
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpiry = undefined;

      user.save()
        .then(() => res.json({ Status: "Success", message: "Password has been reset" }))
        .catch((err: unknown) => {
          if (err instanceof Error) {
            res.status(500).json({ Status: "Error", error: err.message });
          } else {
            res.status(500).json({ Status: "Error", error: "An unknown error occurred" });
          }
        });
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


app.get("/profile", (req: Request, res: Response) => {
  const userId = req.query.userId as string;  // Use query parameter for user ID

  EmployeeModel.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ Status: "Error", message: "User not found" });
      }
      res.json({ Status: "Success", user });
    })
    .catch((err: unknown) => {
      if (err instanceof Error) {
        res.status(500).json({ Status: "Error", error: err.message });
      } else {
        res.status(500).json({ Status: "Error", error: "An unknown error occurred" });
      }
    });
});


app.put("/profile", (req: Request, res: Response) => {
  const userId = req.body.userId;  // Get user ID from the request body
  const { name, phone, address } = req.body;

  EmployeeModel.findByIdAndUpdate(userId, { name, phone, address }, { new: true })
    .then(user => {
      if (!user) {
        return res.status(404).json({ Status: "Error", message: "User not found" });
      }
      res.json({ Status: "Success", message: "Profile updated successfully", user });
    })
    .catch((err: unknown) => {
      if (err instanceof Error) {
        res.status(500).json({ Status: "Error", error: err.message });
      } else {
        res.status(500).json({ Status: "Error", error: "An unknown error occurred" });
      }
    });
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
});

 

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
//Tour Details//
app.get('/tours/:_id', async (req: Request, res: Response) => {
  const { _id } = req.params;
  console.log(`Fetching tour with ID: ${_id}`); // Log the ID

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ Status: "Error", message: "Invalid tour ID format" });
  }

  try {
    const tour = await TourScehmaModel.findById(_id);
    if (!tour) {
      return res.status(404).json({ Status: "Error", message: "Tour not found" });
    }
    res.status(200).json(tour);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ Status: "Error", error: err.message });
    } else {
      res.status(500).json({ Status: "Error", error: "An unknown error occurred" });
    }
  }
});

// Route to get all tours
app.get('/tours', async (req, res) => {
  try {
    const tours = await TourScehmaModel.find(); // Fetch all tours from the database
    res.json(tours);
  } catch (err) {
    console.error('Error fetching tours:', err);
    res.status(500).json({ message: 'Failed to fetch tours' });
  }
});

//Search Results 
app.get('/tours/search', async (req, res) => {
  try {
    const { location, distance, maxGroupSize } = req.query;

    let filters: any = {};

    if (location) {
      filters.city = { $regex: location, $options: 'i' }; // Case-insensitive match
    }
    if (distance) {
      filters.distance = { $lte: Number(distance) };
    }
    if (maxGroupSize) {
      filters.maxGroupSize = { $gte: Number(maxGroupSize) };
    }

    const tours = await TourScehmaModel.find(filters);
    res.json(tours);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.listen(3001, () => {
  console.log("Server is running on port 3001");
});