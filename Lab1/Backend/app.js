const express = require('express');
const statusRoutes = require('./routes/status');
const alertRoutes = require('./routes/alerts');
const historyRoutes = require('./routes/history');
const { PORT } = require('./config');

const app = express();

app.use(express.json());
app.use('/api/status', statusRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/history', historyRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Fire alert backend is running',
    endpoints: ['/api/status', '/api/alerts', '/api/history']
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Backend server listening on port ${PORT}`);
  });
}

module.exports = app;
