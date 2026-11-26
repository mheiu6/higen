import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS so client running on another port can talk to server
app.use(cors());
app.use(express.json());

// Health check endpoint to verify backend is running
app.get('/api/health', (req, res) => {
  res.json({
    status: 'alles gut',
    message: 'Backend server is online!',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`[OS Simulator Server] Running on http://localhost:${PORT}`);
});
