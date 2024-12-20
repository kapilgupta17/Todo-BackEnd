# Todo-BackEnd (Express.js API)

This is the backend API for the Todo App. It is built using **Node.js**, **Express**, and **Prisma ORM** to interact with the database.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- MySQL database running locally or remotely

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/todo-backend.git
cd todo-backend
```

### 2. Install the Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file at the root of the project and add the following environment variables:
```bash
DATABASE_URL="mysql://username:password@localhost:3306/todo_db"
```
Replace `username` and `password` with your MySQL credentials. Make sure the database (`todo_db`) exists or it will be created by Prisma.

### 4. Initialize the Database with Prisma
Prisma will handle the database schema, migrations, and interactions.

#### Step 1: Run Prisma Migrations
Make sure the `.env` file is set correctly before running the following command:
```bash
npx prisma migrate dev --name init
```
This will:
- Apply migrations to the database.
- Generate Prisma Client to interact with the database.

#### Step 2: Seed the Database (Optional)
If you want to seed the database with initial data, you can create a `prisma/seed.ts` file or use any data seeding script as needed.

To run the seed:
```bash
npx prisma db seed
```

### 5. Start the Server
```bash
npm run dev
```
The server will now be running on [http://localhost:3001](http://localhost:3001).
