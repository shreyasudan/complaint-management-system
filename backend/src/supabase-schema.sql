-- Create complaints table
CREATE TABLE IF NOT EXISTS complaints (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  complaint TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create an index for faster querying by status
CREATE INDEX IF NOT EXISTS idx_complaints_status ON complaints(status);

-- Create sample data (optional)
INSERT INTO complaints (name, email, complaint, status, created_at)
VALUES 
  ('John Doe', 'john.doe@example.com', 'The product arrived damaged.', 'Pending', CURRENT_TIMESTAMP - INTERVAL '2 days'),
  ('Jane Smith', 'jane.smith@example.com', 'My order is taking too long to arrive.', 'Resolved', CURRENT_TIMESTAMP - INTERVAL '5 days'); 