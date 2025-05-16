import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Define complaint type
interface Complaint {
  id?: number;
  name: string;
  email: string;
  complaint: string;
  status?: string;
  created_at?: Date;
}

// API Routes

// Get all complaints
app.get('/complaints', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM complaints ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ error: 'Failed to fetch complaints' });
  }
});

// Submit new complaint
app.post('/complaints', async (req: Request, res: Response) => {
  try {
    const { name, email, complaint } = req.body as Complaint;

    // Validate input
    if (!name || !email || !complaint) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const result = await pool.query(
      'INSERT INTO complaints (name, email, complaint) VALUES ($1, $2, $3) RETURNING *',
      [name, email, complaint]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error submitting complaint:', error);
    res.status(500).json({ error: 'Failed to submit complaint' });
  }
});

// Update complaint status
app.patch('/complaints/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['Pending', 'Resolved'].includes(status)) {
      return res.status(400).json({ error: 'Valid status is required' });
    }

    const result = await pool.query(
      'UPDATE complaints SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating complaint:', error);
    res.status(500).json({ error: 'Failed to update complaint' });
  }
});

// Delete complaint
app.delete('/complaints/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM complaints WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    res.json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    console.error('Error deleting complaint:', error);
    res.status(500).json({ error: 'Failed to delete complaint' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app; 