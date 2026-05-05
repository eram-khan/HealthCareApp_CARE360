const express = require('express')
const mongoose = require('mongoose');
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const http = require('http');
require('dotenv').config();
require('./config/passport')
const passportLib = require('passport');

const response = require('./middleware/response');
const languageDetector = require('./middleware/languageDetector');



const app = express();
const server = http.createServer(app);

//helmet is a security middleware for Express 
//It helps protect your app by settings various HTTP headers
app.use(helmet());

//morgan is an HTTP request logger middleware
app.use(morgan('dev'))
app.use(cors({
    origin: (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean) || '*',
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//used response
app.use(response);
app.use(languageDetector);

//Initialize passport
app.use(passportLib.initialize());

//Mongodb connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', require('./routes/auth'))
app.use('/api/doctor', require('./routes/doctor'))
app.use('/api/patient', require('./routes/patient'))
app.use('/api/appointment', require('./routes/appointment'))
app.use('/api/payment', require('./routes/payment'))
app.use('/api/chat', require('./routes/chat'))
app.use('/api/emergency', require('./routes/emergency'))
app.use('/api/ngo', require('./routes/ngo'))
app.use('/api/contact', require('./routes/contact'))
app.use('/api/subscribe', require('./routes/subscribe'))

app.get('/health', (req, res) => res.ok({ time: new Date().toISOString() }, 'OK'))


const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Server listening on ${PORT}`));