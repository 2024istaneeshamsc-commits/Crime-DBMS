-- 1. Create the database (the 'Room')
CREATE DATABASE IF NOT EXISTS crime_db;

-- 2. Tell MySQL we want to use this room
USE crime_db;

-- 3. Create the table (the 'Storage Cabinet')
CREATE TABLE IF NOT EXISTS crimes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    crime_scene VARCHAR(255),
    tool_used VARCHAR(100),
    victim_name VARCHAR(100),
    accused_name VARCHAR(100),
    status VARCHAR(50) DEFAULT 'Pending',
    year INT,
    state VARCHAR(100),
    story TEXT
);