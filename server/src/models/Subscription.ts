import mongoose, { Schema, Document, Model } from 'mongoose';

interface ISubscription extends Document {
    email: string;
}

const SubscriptionSchema: Schema<ISubscription> = new Schema({
    email: { type: String, required: true, unique: true }
});

const SubscriptionModel: Model<ISubscription> = mongoose.model<ISubscription>('Subscription', SubscriptionSchema);

export default SubscriptionModel;
