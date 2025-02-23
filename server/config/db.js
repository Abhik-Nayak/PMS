import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test Connection
pool.connect()
  .then(() => console.log("Connected to PostgreSQL Database"))
  .catch((err) => console.error("Database connection error:", err));

  pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
  });
  
  const createTables = async () => {
    const query = `
      CREATE TABLE IF NOT EXISTS User (
        userId SERIAL PRIMARY KEY,
        cognitoId VARCHAR(255) UNIQUE,
        username VARCHAR(100) NOT NULL,
        profilePictureUrl TEXT,
        teamId INT
      );
  
      CREATE TABLE IF NOT EXISTS Project (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        startDate TIMESTAMP,
        endDate TIMESTAMP
      );
  
      CREATE TABLE IF NOT EXISTS Task (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(50),
        priority VARCHAR(50),
        tags TEXT,
        startDate TIMESTAMP,
        dueDate TIMESTAMP,
        points INT,
        projectId INT REFERENCES Project(id),
        authorUserId INT REFERENCES User(userId),
        assignedUserId INT
      );
  
      CREATE TABLE IF NOT EXISTS Comment (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        taskId INT REFERENCES Task(id),
        userId INT REFERENCES User(userId)
      );
  
      CREATE TABLE IF NOT EXISTS Attachment (
        id SERIAL PRIMARY KEY,
        fileURL TEXT NOT NULL,
        fileName VARCHAR(255),
        taskId INT REFERENCES Task(id),
        uploadedById INT REFERENCES User(userId)
      );
  
      CREATE TABLE IF NOT EXISTS TaskAssignment (
        id SERIAL PRIMARY KEY,
        userId INT REFERENCES User(userId),
        taskId INT REFERENCES Task(id)
      );
  
      CREATE TABLE IF NOT EXISTS Team (
        id SERIAL PRIMARY KEY,
        teamName VARCHAR(255) NOT NULL,
        productOwnerUserId INT REFERENCES User(userId),
        projectManagerUserId INT REFERENCES User(userId)
      );
  
      CREATE TABLE IF NOT EXISTS ProjectTeam (
        id SERIAL PRIMARY KEY,
        teamId INT REFERENCES Team(id),
        projectId INT REFERENCES Project(id)
      );
    `;
  
    try {
      await pool.query(query);
      console.log('Tables created successfully');
    } catch (error) {
      console.error('Error creating tables:', error);
    }
  };
  
//   createTables();
  
  export default pool;
