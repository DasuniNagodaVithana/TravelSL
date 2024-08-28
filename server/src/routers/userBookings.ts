// routes/userBookings.ts

import express, { Request, Response } from 'express';
import UserBooking from '../models/UserBooking.schema';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const bookingData = req.body;

    // Create a new booking instance with the provided data
    const booking = new UserBooking(bookingData);
    await booking.save();

    res.status(201).json({ message: 'Booking saved successfully.' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
