// src/models/Employee.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

// Define an interface representing a document in MongoDB.
interface IEmployee extends Document {
    name: string;
    email: string;
    password: string;
    resetToken?: string;
    resetTokenExpiry?: Date;
}

// Define the schema for the employee model.
const EmployeeSchema: Schema<IEmployee> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date }
});

// Create the model using the schema and the document interface.
const EmployeeModel: Model<IEmployee> = mongoose.model<IEmployee>('Employee', EmployeeSchema);

export default EmployeeModel;
