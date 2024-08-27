import mongoose from 'mongoose';
import TourModel, { ITour } from '../server/src/models/Tours.schema'; // Correct path and import

// Connect to your MongoDB database
mongoose.connect('mongodb+srv://kariyawasampawanya:4yWSfNNL5UbMC01z@cluster0.lddeo.mongodb.net/', {})
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Database connection error:', err));

// Define default values for the new fields
const defaultValues: Partial<ITour> = {
    startFrom: 'Default Starting Location',
    startTime: '08:00 AM',
    arrivalTime: '05:00 PM',
    activities: ['Sightseeing', 'Hiking'],
    breakfast: true,
    lunch: true,
    dinner: false,
    departureCity: 'Default Departure City',
    transportMode: 'Bus',
    tourGuide: true,
};

// Update the existing documents with the new fields
const updateTours = async () => {
    try {
        await TourModel.updateMany({}, { $set: defaultValues });
        console.log('Existing tour documents updated successfully!');
    } catch (error) {
        console.error('Error updating documents:', error);
    } finally {
        mongoose.connection.close();
    }
};

updateTours();
