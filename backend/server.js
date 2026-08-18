/*eslint-disable no-undef*/

const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("Tirupur Fashion Hub Backend is Running 🚀");
});

// Signup API
app.post("/api/signup", (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const sql = `
        INSERT INTO users (name, email, phone)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [name, email, phone], (err, result) => {
        if (err) {
            console.error("❌ Signup error:", err);

            if (err.code === "ER_DUP_ENTRY") {
                return res.status(409).json({
                    message: "Email already registered"
                });
            }

            return res.status(500).json({
                message: "Database error"
            });
        }

        res.status(201).json({
            message: "Account created successfully!",
            userId: result.insertId
        });
    });
});

// Customer Login API
app.post("/api/login", (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            message: "Email is required"
        });
    }

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error("❌ Login error:", err.message);

            return res.status(500).json({
                message: "Database error"
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                message: "Please sign up first or enter the correct email."
            });
        }

        const user = results[0];

        res.json({
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        });
    });
});

// Vendor Registration API
app.post("/api/vendor-register", (req, res) => {
    const {
        shopName,
        ownerName,
        email,
        phone,
        address,
        password,
        categories
    } = req.body;

    if (
        !shopName ||
        !ownerName ||
        !email ||
        !phone ||
        !address ||
        !password ||
        !categories ||
        categories.length === 0
    ) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const sql = `
        INSERT INTO vendors
        (shop_name, owner_name, email, phone, address, categories, password)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const categoryData = JSON.stringify(categories);

    console.log("📦 Vendor data received:");
    console.log("shopName:", shopName);
    console.log("ownerName:", ownerName);
    console.log("email:", email);
    console.log("phone:", phone);
    console.log("address:", address);
    console.log("categories:", categories);
    console.log("password:", password);
    console.log("categoryData:", categoryData);

    console.log("🧮 SQL:", sql);
    console.log("🧮 Number of values:", [
    shopName,
    ownerName,
    email,
    phone,
    address,
    categoryData,
    password
    ].length);
        (err, result) => {
            if (err) {
                console.error("❌ Vendor registration error:", err.message);

                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(409).json({
                        message: "Vendor email already registered"
                    });
                }

                return res.status(500).json({
                    message: "Database error"
                });
            }

            res.status(201).json({
                message: "Vendor registered successfully!",
                vendorId: result.insertId
            });
        }
);


// Start server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`🚀 Backend running on http://localhost:${PORT}`);
});