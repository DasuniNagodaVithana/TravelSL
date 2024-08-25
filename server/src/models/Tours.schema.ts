import mongoose, { Schema, Document, Model } from 'mongoose';

// Define an interface representing a document in MongoDB.
interface IReview {
    name: string;
    rating: number;
}

interface ITour extends Document {
    id: mongoose.ObjectId;
    title: string;
    city: string;
    address: string;
    distance: number;
    price: number;
    maxGroupSize: number;
    desc: string;
    reviews: IReview[];
    //reviews: string;
    avgRating: number;
    file: string;
    featured: boolean;
}

// Define the schema for the review subdocument.
const ReviewSchema: Schema<IReview> = new Schema({
    name: { type: String},
    rating: { type: Number}
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
    reviews: { type: [ReviewSchema], default: [{name:"",rating:0}]},
    //reviews: { type: String, default:""},
    avgRating: { type: Number, default: 0 },
    file: { type: String, required: true },
    featured: { type: Boolean, default: false }
});

// Create the model using the schema and the document interface.
const TourModel: Model<ITour> = mongoose.model<ITour>('Tour', TourSchema);

export default TourModel;
