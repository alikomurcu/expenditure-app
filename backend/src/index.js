const express = require('express');
const cors = require('cors');
const app = express();
// const expenditureRoutes = require('./routes/expenditure'); // Import routes
const expenseRoutes = require('./routes/expense.route');

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse incoming JSON payloads

const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI || 'mongodb://expenditure_mongo:27017/expenditure-db';


// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1); // Exit on failure
    }
};

connectDB()
.then(() => console.log("MongoDB connected successfully"))
.catch((error) => console.log("MongoDB connection error: ", error));

// Use the expenditure routes
// app.use('/api/expenditures', expenditureRoutes); // Correct middleware usage
app.use('/api/expenses', expenseRoutes); // Use the expense routes

// Default route for testing
app.get('/', (req, res) => {
    res.send('Hello to all from Dockerized Node.js and Express!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
