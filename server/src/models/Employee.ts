// src/models/Employee.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

interface IEmployee extends Document {
    name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    resetToken?: string;
    resetTokenExpiry?: Date;
}

const EmployeeSchema: Schema<IEmployee> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date }
});

const EmployeeModel: Model<IEmployee> = mongoose.model<IEmployee>('Employee', EmployeeSchema);

export default EmployeeModel;
