const db = require('./database');

const statesCities = {
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi'],
    'Delhi': ['New Delhi', 'East Delhi', 'West Delhi', 'South Delhi'],
    'Karnataka': ['Bengaluru', 'Mysore', 'Hubballi', 'Mangalore'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruppur'],
    'Rajasthan': ['Jaipur', 'Jodhpur', 'Kota', 'Udaipur'],
    'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol'],
    'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur']
};

const crimeScenes = ['Main Road', 'Residential Area', 'Public Park', 'Shopping Mall', 'Parking Lot', 'Railway Station', 'Old Town', 'Market Area'];
const tools = ['None', 'Knife', 'Stick', 'Firearm', 'Metal Pipe', 'Chain', 'Screwdriver'];
const victims = ['Rahul Sharma', 'Anjali Gupta', 'Priya Verma', 'Amit Patel', 'Sneha Reddy', 'Vikram Singh', 'Suresh Kumar', 'Deepa Nair'];
const accused = ['Rajesh Kumar', 'Unknown Group', 'Sunil Yadav', 'Mahesh Das', 'Sameer Khan', 'Karan Johar', 'Vijay Mallya', 'Unknown Male'];
const stories = [
    'Suspect snatched a gold chain and fled on a motorbike.',
    'Dispute over property led to a physical altercation.',
    'Shopkeeper reported a burglary during late night hours.',
    'Mobile phone snatching incident reported near the bus stop.',
    'Vandalism of public property by a group of unidentified individuals.',
    'Attempted robbery at a convenience store foiled by local residents.',
    'Argument over parking space turned violent.',
    'Fraudulent transaction reported by a local bank customer.'
];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const statuses = ['Pending', 'Closed'];

async function seedDatabase() {
    try {
        console.log("Seeding 25 crime records...");
        
        const states = Object.keys(statesCities);
        
        for (let i = 0; i < 25; i++) {
            const state = states[Math.floor(Math.random() * states.length)];
            const city = statesCities[state][Math.floor(Math.random() * statesCities[state].length)];
            const scene = crimeScenes[Math.floor(Math.random() * crimeScenes.length)];
            const tool = tools[Math.floor(Math.random() * tools.length)];
            const victim = victims[Math.floor(Math.random() * victims.length)];
            const acc = accused[Math.floor(Math.random() * accused.length)];
            const story = stories[Math.floor(Math.random() * stories.length)];
            const year = 2023 + Math.floor(Math.random() * 2); // 2023 or 2024
            const month = months[Math.floor(Math.random() * months.length)];
            const status = statuses[Math.floor(Math.random() * statuses.length)];

            const query = `INSERT INTO crimereports 
                (State, City, CrimeScene, ToolUsed, VictimName, AccusedName, Story, Year, Month, Status) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            await db.execute(query, [state, city, scene, tool, victim, acc, story, year, month, status]);
        }

        console.log("Successfully inserted 25 records!");
        process.exit(0);
    } catch (err) {
        console.error("Error seeding database:", err.message);
        process.exit(1);
    }
}

seedDatabase();
