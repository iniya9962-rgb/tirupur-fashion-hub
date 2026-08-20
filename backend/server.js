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

    console.log("🧮 Number of values:", [
    shopName,
    ownerName,
    email,
    phone,
    address,
    categoryData,
    password
].length);

    db.query(
        sql,
        [
            shopName,
            ownerName,
            email,
            phone,
            address,
            categoryData,
            password
        ],
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
});

// Vendor Login API
app.post("/api/vendor-login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    const sql = `
        SELECT id, shop_name, owner_name, email, phone, address, categories
        FROM vendors
        WHERE email = ? AND password = ?
    `;

    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error("❌ Vendor login error:", err.message);

            return res.status(500).json({
                message: "Database error"
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                message: "Invalid vendor email or password"
            });
        }

        const vendor = results[0];

        res.json({
            message: "Vendor login successful",
            vendor: {
                id: vendor.id,
                shopName: vendor.shop_name,
                ownerName: vendor.owner_name,
                email: vendor.email,
                phone: vendor.phone,
                address: vendor.address,
                categories: JSON.parse(vendor.categories)
            }
        });
    });
});

// Add Product API
app.post("/api/products", (req, res) => {
    const {
        vendorId,
        vendorEmail,
        vendorName,
        name,
        category,
        price,
        stock,
        description,
        image,
        fabric,
        gsm,
        sleeveType,
        neckType,
        fit,
        pattern,
        sareeLength,
        blousePiece,
        occasion,
        washCare,
        collarType,
        hoodType,
        pocketType,
        waistType,
        length,
        stretchable,
        ageGroup,
        kurtaLength,
        bottomType,
        dupattaIncluded,
        styleType,
        waistRise,
        trendType,
        brand,
        exportGrade,
        condition,
        moq
    } = req.body;

    if (
        !vendorId ||
        !vendorEmail ||
        !vendorName ||
        !name ||
        !category ||
        !price ||
        !stock ||
        !description
    ) {
        return res.status(400).json({
            message: "Required product fields are missing"
        });
    }

    const sql = `
        INSERT INTO products (
            vendor_id,
            vendor_email,
            vendor_name,
            name,
            category,
            price,
            stock,
            description,
            image,
            fabric,
            gsm,
            sleeve_type,
            neck_type,
            fit,
            pattern,
            saree_length,
            blouse_piece,
            occasion,
            wash_care,
            collar_type,
            hood_type,
            pocket_type,
            waist_type,
            length,
            stretchable,
            age_group,
            kurta_length,
            bottom_type,
            dupatta_included,
            style_type,
            waist_rise,
            trend_type,
            brand,
            export_grade,
            condition_type,
            moq
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        vendorId,
        vendorEmail,
        vendorName,
        name,
        category,
        price,
        stock,
        description,
        image || null,
        fabric || null,
        gsm || null,
        sleeveType || null,
        neckType || null,
        fit || null,
        pattern || null,
        sareeLength || null,
        blousePiece || null,
        occasion || null,
        washCare || null,
        collarType || null,
        hoodType || null,
        pocketType || null,
        waistType || null,
        length || null,
        stretchable || null,
        ageGroup || null,
        kurtaLength || null,
        bottomType || null,
        dupattaIncluded || null,
        styleType || null,
        waistRise || null,
        trendType || null,
        brand || null,
        exportGrade || null,
        condition || null,
        moq || null
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("❌ Add product error:", err.message);

            return res.status(500).json({
                message: "Database error"
            });
        }

        res.status(201).json({
            message: "Product added successfully!",
            productId: result.insertId
        });
    });
});

// Update Product API
app.put("/api/products/:id", (req, res) => {
    const { id } = req.params;

    const {
        name,
        category,
        price,
        stock,
        description,
        image,
        fabric,
        gsm,
        sleeveType,
        neckType,
        fit,
        pattern,
        sareeLength,
        blousePiece,
        occasion,
        washCare,
        collarType,
        hoodType,
        pocketType,
        waistType,
        length,
        stretchable,
        ageGroup,
        kurtaLength,
        bottomType,
        dupattaIncluded,
        styleType,
        waistRise,
        trendType,
        brand,
        exportGrade,
        condition,
        moq
    } = req.body;

    if (
        !name ||
        !category ||
        !price ||
        !stock ||
        !description
    ) {
        return res.status(400).json({
            message: "Required product fields are missing"
        });
    }

    const sql = `
        UPDATE products
        SET
            name = ?,
            category = ?,
            price = ?,
            stock = ?,
            description = ?,
            image = ?,
            fabric = ?,
            gsm = ?,
            sleeve_type = ?,
            neck_type = ?,
            fit = ?,
            pattern = ?,
            saree_length = ?,
            blouse_piece = ?,
            occasion = ?,
            wash_care = ?,
            collar_type = ?,
            hood_type = ?,
            pocket_type = ?,
            waist_type = ?,
            length = ?,
            stretchable = ?,
            age_group = ?,
            kurta_length = ?,
            bottom_type = ?,
            dupatta_included = ?,
            style_type = ?,
            waist_rise = ?,
            trend_type = ?,
            brand = ?,
            export_grade = ?,
            condition_type = ?,
            moq = ?
        WHERE id = ?
    `;

    const values = [
        name,
        category,
        price,
        stock,
        description,
        image || null,
        fabric || null,
        gsm || null,
        sleeveType || null,
        neckType || null,
        fit || null,
        pattern || null,
        sareeLength || null,
        blousePiece || null,
        occasion || null,
        washCare || null,
        collarType || null,
        hoodType || null,
        pocketType || null,
        waistType || null,
        length || null,
        stretchable || null,
        ageGroup || null,
        kurtaLength || null,
        bottomType || null,
        dupattaIncluded || null,
        styleType || null,
        waistRise || null,
        trendType || null,
        brand || null,
        exportGrade || null,
        condition || null,
        moq || null,
        id
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("❌ Update product error:", err.message);

            return res.status(500).json({
                message: "Database error"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product updated successfully!"
        });
    });
});

// Get products for logged-in vendor
app.get("/api/products/vendor/:vendorId", (req, res) => {
    const { vendorId } = req.params;

    const sql = `
        SELECT *
        FROM products
        WHERE vendor_id = ?
        ORDER BY id DESC
    `;

    db.query(sql, [vendorId], (err, results) => {
        if (err) {
            console.error("❌ Get products error:", err.message);

            return res.status(500).json({
                message: "Database error"
            });
        }

        res.json(results);
    });
});

// Delete Product API
app.delete("/api/products/:id", (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM products WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("❌ Delete product error:", err.message);

            return res.status(500).json({
                message: "Database error"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product deleted successfully!"
        });
    });
});

// Get all products for customers
app.get("/api/products", (req, res) => {
    const sql = `
        SELECT *
        FROM products
        ORDER BY id DESC
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("❌ Get all products error:", err.message);

            return res.status(500).json({
                message: "Database error"
            });
        }

        res.json(results);
    });
});

// Place order
app.post("/api/orders", (req, res) => {
    const {
        customerId,
        customerEmail,
        customerName,
        customerPhone,
        vendorId,
        productId,
        productName,
        category,
        price,
        quantity,
        image,
        status
    } = req.body;

    if (!customerId || !vendorId || !productId || !quantity) {
        return res.status(400).json({
            message: "Required order fields are missing"
        });
    }

    const sql = `
        INSERT INTO orders (
            customer_id,
            customer_email,
            customer_name,
            customer_phone,
            vendor_id,
            product_id,
            product_name,
            category,
            price,
            quantity,
            image,
            status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        customerId,
        customerEmail || null,
        customerName || null,
        customerPhone || null,
        vendorId,
        productId,
        productName || null,
        category || null,
        price || 0,
        quantity,
        image || null,
        status || "Pending"
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("❌ Place order error:", err.message);

            return res.status(500).json({
                message: "Database error"
            });
        }

        res.status(201).json({
            message: "Order placed successfully!",
            orderId: result.insertId
        });
    });
});

// Get customer orders
app.get("/api/orders/customer/:customerId", (req, res) => {
    const { customerId } = req.params;

    const sql = `
        SELECT *
        FROM orders
        WHERE customer_id = ?
        ORDER BY id DESC
    `;

    db.query(sql, [customerId], (err, results) => {
        if (err) {
            console.error("❌ Get customer orders error:", err.message);

            return res.status(500).json({
                message: "Database error"
            });
        }

        res.json(results);
    });
});

// Get vendor orders
app.get("/api/orders/vendor/:vendorId", (req, res) => {
    const { vendorId } = req.params;

    const sql = `
        SELECT o.*
        FROM orders o
        LEFT JOIN products p ON p.id = o.product_id
        WHERE o.vendor_id = ? OR p.vendor_id = ?
        ORDER BY o.id DESC
    `;

    db.query(sql, [vendorId, vendorId], (err, results) => {
        if (err) {
            console.error("❌ Get vendor orders error:", err.message);

            return res.status(500).json({
                message: "Database error"
            });
        }

        res.json(results);
    });
});

// Update order status
app.put("/api/orders/:orderId", (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({
            message: "Status is required"
        });
    }

    const sql = `
        UPDATE orders
        SET status = ?
        WHERE id = ?
    `;

    db.query(sql, [status, orderId], (err, result) => {
        if (err) {
            console.error("❌ Update order error:", err.message);

            return res.status(500).json({
                message: "Database error"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.json({
            message: "Order status updated successfully!"
        });
    });
});

// Start server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`🚀 Backend running on port ${PORT}`);
});