import express from 'express';
import cors from 'cors';

import companyRoutes from './routes/companyRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import userRoutes from './routes/userRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import transfertStatisticsRoutes from './routes/transfertStatsRoutes.js';
import itemStatisticsRoutes from './routes/itemStatsRoutes.js';
import authorization from './middlewares/authorization.js';
import auth from './middlewares/auth.js';
import roles from './models/roles.js';
import loginRoutes from './routes/loginRoutes.js';
import cookieParser from 'cookie-parser';
import config from './config.js'

const app = express();

// Middlewares

app.use(cors({
  credentials: true,
  origin: config.cors
}));

// Parse POST's body to Json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Login
app.use('/api/login', loginRoutes);

// Company
app.use('/api/company', auth, companyRoutes);

// Event
app.use('/api/event', auth, eventRoutes);

// User
app.use('/api/user', auth, authorization(roles.COMPANY), userRoutes);

// Role
app.use('/api/role', auth, authorization(roles.COMPANY), roleRoutes);

// Item
app.use('/api/item', auth, authorization(roles.COMPANY), itemRoutes);

// TransfertStatistics
app.use('/api/transfertStats', auth, transfertStatisticsRoutes);

// ItemStatistics
app.use('/api/itemStats', auth, itemStatisticsRoutes);

// Return 404 if no midlleware catch the request
app.use((req, res) => res.status(404).json({ error: req.url + ' does not exist' }));

export default app;
