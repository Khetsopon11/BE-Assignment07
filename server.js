const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' }); 
const { setServers } = require("node:dns/promises");
setServers(["1.1.1.1", "8.8.8.8"]);

const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser')
const hospitals = require('./routes/hospitals');
const auth = require('./routes/auth');
const appointments = require('./routes/appointments');
connectDB(); 

const app = express();
app.set('query parser','extended');
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/appointments',appointments);
app.use('/api/v1/auth', auth);
app.use('/api/v1/hospitals', hospitals);
app.use('/api/v1/hospitals/:hospitalId/appointments', appointments);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log('Server running in', process.env.NODE_ENV, 'mode on port', PORT));

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});