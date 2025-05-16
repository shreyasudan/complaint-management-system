-- Drop table if exists
DROP TABLE IF EXISTS complaints;

-- Create complaints table
CREATE TABLE complaints (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  complaint TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 