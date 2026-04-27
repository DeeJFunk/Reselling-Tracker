const express = require('express');
const app = express();
const PORT = 8080;
const cors = require('cors');
const pool = require('./db');

// Setting the export default to JSON
app.use(cors());
app.use(express.json())

//ROUTES//

//API HEALTH CHECK
app.get("/api", async (req, res) => {
    try {
        res.json("API HEALTH CHECK: PASSES!");   
    } catch (error) {
        console.log(error);
    }
});

// GET a specific product by ID
app.get("/product/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const item = await pool.query("SELECT * FROM product WHERE product_id = $1", [id]);
        res.json(item.rows[0]);
    } catch(error) {
        console.error(error);
    }
});

// Tells us the server is running / nothing exploded whilst initializing
app.listen(
    PORT,
    async () => {
        console.log(`Server running on port ${PORT}`);
    }
);