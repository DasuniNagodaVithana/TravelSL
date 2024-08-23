import express, { Request, Response } from 'express';
import SubscriptionModel from '../models/Subscription';

const router = express.Router();

router.post('/subscribe', async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        await SubscriptionModel.create({ email });
        res.json({ message: "Subscription successful" });
    } catch (err) {
        if (err.code === 11000) {
            // Duplicate key error
            res.status(400).json({ error: "Email already subscribed" });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
});

export default router;
