import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import { Request, Response } from "express";
import TourModel from "../src/models/Tours.schema"; // Ensure this path is correct

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY as string,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
  region: process.env.S3_BUCKET_REGION as string,
});

// Set up Multer to use S3 for storage
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

// Route to handle image upload and tour creation
app.post(
  "/tours",
  upload.single("photo"),
  async (req: Request, res: Response) => {
    const { body, file } = req;

    if (!file) {
      return res.status(400).json({ Status: "Error", message: "Photo is required" });
    }

    try {
      const newTour = new TourModel({
        ...body,
        photo: (file as any).location, // The location of the uploaded image in S3
      });

      await newTour.save();

      res.status(201).json({ Status: "Success", tour: newTour });
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(500).json({ Status: "Error", error: err.message });
      } else {
        res.status(500).json({ Status: "Error", error: "An unknown error occurred" });
      }
    }
  }
);
