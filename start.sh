#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting Complaint Management System...${NC}"

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo -e "\n${RED}PostgreSQL is not installed. Please install it first.${NC}"
    exit 1
fi

# Set up .env file if it doesn't exist
if [ ! -f "./backend/.env" ]; then
    echo -e "\n${BLUE}Creating .env file for backend...${NC}"
    echo "PORT=3001
DATABASE_URL=postgresql://postgres:password@localhost:5432/complaints
NODE_ENV=development" > ./backend/.env
    echo -e "${GREEN}Created .env file. Please update the DATABASE_URL if needed.${NC}"
fi

# Install dependencies
echo -e "\n${BLUE}Installing backend dependencies...${NC}"
cd backend && npm install
echo -e "${GREEN}Backend dependencies installed.${NC}"

echo -e "\n${BLUE}Installing frontend dependencies...${NC}"
cd ../frontend && npm install
echo -e "${GREEN}Frontend dependencies installed.${NC}"

# Start backend and frontend in separate terminals
echo -e "\n${BLUE}Starting backend server...${NC}"
cd ../backend && npm run dev &
BACKEND_PID=$!

echo -e "\n${BLUE}Starting frontend development server...${NC}"
cd ../frontend && npm run dev &
FRONTEND_PID=$!

# Handle shutdown
cleanup() {
    echo -e "\n${BLUE}Shutting down servers...${NC}"
    kill $BACKEND_PID
    kill $FRONTEND_PID
    exit 0
}

trap cleanup SIGINT

echo -e "\n${GREEN}Both servers are running:${NC}"
echo -e "Frontend: http://localhost:3000"
echo -e "Backend API: http://localhost:3001"
echo -e "\n${BLUE}Press Ctrl+C to stop both servers${NC}"

# Keep script running
wait 