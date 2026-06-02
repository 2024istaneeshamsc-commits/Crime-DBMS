const db = require('./database');

async function addMonthColumn() {
    try {
        console.log("Checking if 'Month' column exists...");
        const [columns] = await db.execute("SHOW COLUMNS FROM crimereports LIKE 'Month'");
        
        if (columns.length === 0) {
            console.log("Adding 'Month' column to 'crimereports' table...");
            await db.execute("ALTER TABLE crimereports ADD COLUMN Month VARCHAR(20)");
            console.log("Column 'Month' added successfully!");
        } else {
            console.log("Column 'Month' already exists.");
        }
        
        process.exit(0);
    } catch (err) {
        console.error("Error updating database:", err.message);
        process.exit(1);
    }
}

addMonthColumn();
