import mongoose, { Schema, Document, Model } from 'mongoose';

// Define an interface representing a document in MongoDB.
interface IReview {
    name: string;
    rating: number;
}

export interface ITour extends Document {
    id: mongoose.ObjectId;
    title: string;
    city: string;
    address: string;
    distance: number;
    price: number;
    maxGroupSize: number;
    desc: string;
    reviews: IReview[];
    avgRating: number;
    file: string;
    featured: boolean;
    startFrom: string;  // New field
    startTime: string;  // New field
    arrivalTime: string; // New field
    activities: string[]; // New field
    breakfast: boolean; // New field
    lunch: boolean; // New field
    dinner: boolean; // New field
    departureCity: string; // New field
    transportMode: string; // New field
    tourGuide: boolean; // New field
}

// Define the schema for the review subdocument.
const ReviewSchema: Schema<IReview> = new Schema({
    name: { type: String },
    rating: { type: Number }
});

// Define the schema for the tour model.
const TourSchema: Schema<ITour> = new Schema({
    title: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    distance: { type: Number, required: true },
    price: { type: Number, required: true },
    maxGroupSize: { type: Number, required: true },
    desc: { type: String, required: true },
    reviews: { type: [ReviewSchema], default: [{ name: "", rating: 0 }] },
    avgRating: { type: Number, default: 0 },
    file: { type: String, required: true },
    featured: { type: Boolean, default: false },
    startFrom: { type: String, required: true },
    startTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    activities: { type: [String], required: true },
    breakfast: { type: Boolean, default: false },
    lunch: { type: Boolean, default: false },
    dinner: { type: Boolean, default: false },
    departureCity: { type: String, required: true },
    transportMode: { type: String, required: true },
    tourGuide: { type: Boolean, default: false }
});

// Create the model using the schema and the document interface.
const TourModel: Model<ITour> = mongoose.model<ITour>('Tour', TourSchema);

export default TourModel;
