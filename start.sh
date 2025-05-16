#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting Complaint Management System...${NC}"

# Get the script directory
PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$PROJECT_DIR"

# Check for PostgreSQL and add to PATH if possible
if [ -d "/Applications/Postgres.app" ]; then
    echo -e "${GREEN}PostgreSQL.app found. Adding to PATH...${NC}"
    export PATH=$PATH:/Applications/Postgres.app/Contents/Versions/latest/bin
fi

# Check if psql is available
if ! command -v psql &> /dev/null; then
    echo -e "\n${RED}PostgreSQL command line tools are not in PATH. Please ensure PostgreSQL is properly installed.${NC}"
    echo -e "${RED}See README.md for manual setup instructions.${NC}"
    exit 1
fi

# Get current user for Postgres connection
CURRENT_USER=$(whoami)

# Set up .env file if it doesn't exist
if [ ! -f "$PROJECT_DIR/backend/.env" ]; then
    echo -e "\n${BLUE}Creating .env file for backend...${NC}"
    cat > "$PROJECT_DIR/backend/.env" << EOF
PORT=3001
DATABASE_URL=postgresql://${CURRENT_USER}@localhost:5432/complaints
NODE_ENV=development
EOF
    echo -e "${GREEN}Created .env file with connection string for user: ${CURRENT_USER}${NC}"
fi

# Create database if it doesn't exist
echo -e "\n${BLUE}Checking if database exists...${NC}"
if ! psql -lqt | cut -d \| -f 1 | grep -qw complaints; then
    echo -e "${BLUE}Creating complaints database...${NC}"
    createdb complaints
    echo -e "${GREEN}Database 'complaints' created.${NC}"
else
    echo -e "${GREEN}Database 'complaints' already exists.${NC}"
fi

# Apply database schema
echo -e "\n${BLUE}Applying database schema...${NC}"
cd "$PROJECT_DIR/backend" && psql -d complaints -f src/db-schema.sql
echo -e "${GREEN}Database schema applied.${NC}"

# Install dependencies
echo -e "\n${BLUE}Installing backend dependencies...${NC}"
npm install
echo -e "${GREEN}Backend dependencies installed.${NC}"

echo -e "\n${BLUE}Installing frontend dependencies...${NC}"
cd "$PROJECT_DIR/frontend" && npm install
echo -e "${GREEN}Frontend dependencies installed.${NC}"

# Start backend and frontend in separate terminals
echo -e "\n${BLUE}Starting backend server...${NC}"
cd "$PROJECT_DIR/backend" && npm run dev &
BACKEND_PID=$!

echo -e "\n${BLUE}Starting frontend development server...${NC}"
cd "$PROJECT_DIR/frontend" && npm run dev &
FRONTEND_PID=$!

# Handle shutdown
cleanup() {
    echo -e "\n${BLUE}Shutting down servers...${NC}"
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT

echo -e "\n${GREEN}Both servers are running:${NC}"
echo -e "Frontend: http://localhost:3000"
echo -e "Backend API: http://localhost:3001"
echo -e "\n${BLUE}Press Ctrl+C to stop both servers${NC}"

# Keep script running
wait 