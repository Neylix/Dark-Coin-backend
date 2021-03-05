import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import companyRoutes from './routes/companyRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
// import userRoutes from './routes/userRoutes.js';
import loginRoutes from './routes/loginRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import transfertStatisticsRoutes from './routes/transfertStatsRoutes.js';
import itemStatisticsRoutes from './routes/itemStatsRoutes.js';

const app = express();

// Middlewares

app.use(cors());

// Parse POST's body to Json
app.use(bodyParser.json());

// Company
app.use('/api/company', companyRoutes);

// Event
app.use('/api/event', eventRoutes);

// User
// app.use('/api/user', userRoutes);

app.use('/api/login', loginRoutes);

// Role
app.use('/api/role', roleRoutes);

// TransfertStatistics
app.use('/api/transfertStats',transfertStatisticsRoutes);

// ItemStatistics
app.use('/api/itemStats',itemStatisticsRoutes);

// Return 404 if no midlleware catch the request
app.use((req, res) => {
  res.status(404).json({ error: req.url + ' does not exist' });
});

export default app;
