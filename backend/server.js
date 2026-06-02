const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

// States and Cities Data - ALL CITIES OF EACH STATE
const statesCities = {
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Aurangabad', 'Nashik', 'Kolhapur', 'Sangli', 'Satara', 'Solapur', 'Akola', 'Amravati', 'Yavatmal', 'Wardha', 'Chandrapur', 'Jalgaon', 'Dhule', 'Nandurbar', 'Buldhana', 'Washim', 'Parbhani', 'Latur', 'Hingoli', 'Beed', 'Raigad', 'Raipur', 'Thane', 'Ratnagiri', 'Sindhudurg'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Jamnagar', 'Junagadh', 'Bhavnagar', 'Anand', 'Gandhinagar', 'Mehsana', 'Morvi', 'Navsari', 'Patan', 'Porbandar', 'Surendranagar', 'Botad', 'Kheda', 'Mahisagar', 'Gir Somnath', 'Vapi', 'Silvassa', 'Daman', 'Diu'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Ghaziabad', 'Noida', 'Allahabad', 'Meerut', 'Bareilly', 'Moradabad', 'Saharanpur', 'Gorakhpur', 'Jhansi', 'Mathura', 'Aligarh', 'Etah', 'Muzaffarnagar', 'Shamli', 'Firozabad', 'Mainpuri'],
    'Delhi': ['New Delhi', 'Central Delhi', 'East Delhi', 'West Delhi', 'North Delhi', 'South Delhi', 'Northeast Delhi', 'Dwarka', 'North West Delhi'],
    'Karnataka': ['Belligavi', 'Belloor', 'Belmatti', 'Belur', 'Benakanhalli', 'Benalla', 'Benarughatta', 'Benasugara', 'Bendakere', 'Bendamudi', 'Bendekeri', 'Bendepalli', 'Bendepalli', 'Bendepete', 'Bendepudi', 'Bendepudur', 'Bendepuli', 'Bendepulike', 'Bendepunipatna', 'Bengaluru', 'Bangalore', 'Mysore', 'Hubballi', 'Mangalore', 'Belgaum', 'Tumkur', 'Udupi', 'Bijapur', 'Dharwad', 'Hassan', 'Chikmagalur', 'Kolar', 'Davangere', 'Gulbarga', 'Shimoga', 'Kodagu', 'Uttara Kannada', 'Raichur', 'Koppal', 'Gadag', 'Chitradurga', 'Mandya', 'Chamarajanagar', 'Bidar', 'Vikarabad'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruppur', 'Salem', 'Kancheepuram', 'Thoothukudi', 'Vellore', 'Tirunelveli', 'Erode', 'Villupuram', 'Karur', 'Dindigul', 'Ramanathapuram', 'Perambalur', 'Puducherry', 'Cuddalore', 'Tiruvannamalai', 'Ranipet', 'Chengalpattu'],
    'Rajasthan': ['Jaipur', 'Jodhpur', 'Kota', 'Udaipur', 'Ajmer', 'Bikaner', 'Alwar', 'Bhilwara', 'Nagaur', 'Pali', 'Banswara', 'Barmer', 'Chittorgarh', 'Sikar', 'Dausa', 'Dholpur', 'Dungarpur', 'Hanumangarh', 'Jaisalmer', 'Jhalawar', 'Jhunjhunu', 'Karauli', 'Kraut', 'Pilanpur'],
    'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Bardhaman', 'Darjeeling', 'Malda', 'Jalpaiguri', 'Cooch Behar', 'Murshidabad', 'Birbhum', 'Purulia', 'Bankura', 'Medinipur', 'South 24 Parganas', 'North 24 Parganas', 'Nadia', 'Hooghly', 'Burdwan'],
    'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 'Madhubani', 'Araria', 'Begusarai', 'Katihar', 'Munger', 'Purnea', 'Siwan', 'Sitamarhi', 'Saharsa', 'Sahebganj', 'Jehanabad', 'Aurangabad', 'Nalanda', 'Lakhisarai', 'Kishanganj']
};

// 0. GET CITIES BY STATE (with "Others" at the end)
app.get('/cities/:state', async (req, res) => {
    try {
        const state = req.params.state;
        let cities = statesCities[state] || [];
        // Add "Other" at the end for manual entry
        cities = [...cities, 'Other'];
        res.json({ state, cities });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

// 0.5 GET ALL STATES
app.get('/states', async (req, res) => {
    try {
        const states = Object.keys(statesCities);
        res.json(states);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

// 1. ADD CRIME RECORD
app.post('/add-crime', async (req, res) => {
    const { state, city, scene, tool, victim, accused, story, year, month, status } = req.body;
    try {
        // Updated to include Year, Month, and Status
        const query = `INSERT INTO crimereports 
            (State, City, CrimeScene, ToolUsed, VictimName, AccusedName, Story, Year, Month, Status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        await db.execute(query, [state, city, scene, tool, victim, accused, story, year, month, status || 'Pending']);
        res.status(200).send("Record Added!");
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

// 1.5 GET ALL CRIME RECORDS
app.get('/all-crimes', async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM crimereports ORDER BY ID DESC");
        res.json(rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// 2. SEARCH BY STATE
app.get('/search/:state', async (req, res) => {
    try {
        // Match the 'State' column from your screenshot
        const [rows] = await db.execute("SELECT * FROM crimereports WHERE State = ?", [req.params.state]);
        res.json(rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// 3. SHOW TOTAL CRIMES
app.get('/total', async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT COUNT(*) as total FROM crimereports");
        res.json(rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// 4. LOGIN ENDPOINT
const users = [
    { username: 'user1', password: 'pass1', role: 'read' },
    { username: 'user2', password: 'pass2', role: 'readwrite' },
    { username: 'admin', password: 'admin123', role: 'admin' }
];

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.json({ success: true, role: user.role, username: user.username });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// 5. DELETE RECORD (Admin only)
app.delete('/delete-crime/:id', async (req, res) => {
    try {
        await db.execute("DELETE FROM crimereports WHERE ID = ?", [req.params.id]);
        res.send("Record Deleted!");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// 6. UPDATE RECORD (Admin only)
app.put('/update-crime/:id', async (req, res) => {
    const { scene, tool, victim, accused, story, status } = req.body;
    try {
        await db.execute(
            "UPDATE crimereports SET CrimeScene=?, ToolUsed=?, VictimName=?, AccusedName=?, Story=?, Status=? WHERE id=?",
            [scene, tool, victim, accused, story, status, req.params.id]
        );
        res.send("Record Updated!");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// 7. UPDATE STATUS ONLY (Admin only)
app.put('/update-status/:id', async (req, res) => {
    const { status } = req.body;
    try {
        await db.execute(
            "UPDATE crimereports SET Status=? WHERE id=?",
            [status, req.params.id]
        );
        res.send("Status Updated!");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

const server = app.listen(8800, () => {
    console.log("Server is running on http://localhost:8800");
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error("❌ Port 8800 is already in use. Run: taskkill /IM node.exe /F  then restart.");
    } else {
        console.error("❌ Server error:", err.message);
    }
    process.exit(1);
});