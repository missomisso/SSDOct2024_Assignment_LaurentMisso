const User = require("../models/user");
const jwt = require("jsonwebtoken");
// const secretKey = process.env.JWT_SECRET || "your-secret-key"; 


// ✅ Register User
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // ✅ Check if user already exists
        const existingUser = await user.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists." });
        }

        // ✅ Register new user
        await user.registerUser(username, email, password);
        res.status(201).json({ success: true, message: "User registered successfully!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error registering user." });
    }
};

// ✅ Login User
const login = async (req, res) => {
    console.log("Login request received with method:", req.method);
    console.log("Request body:", req.body);

    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Method Not Allowed. Use POST instead of GET." });
    }

    try {
        const { email, password } = req.body;
        console.log("Attempting to log in:", email);

        const user = await User.verifyUser(email, password);
        if (!user) {  
            console.log("Invalid credentials.");
            return res.status(401).json({ success: false, message: "Invalid credentials." });
        }

        console.log("User Verified, Generating JWT...");
        const token = jwt.sign({ userId: user.UserID, email: user.Email }, "your-secret-key", { expiresIn: "1h" });

        res.json({ success: true, message: "Login successful!", token });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ success: false, message: "Internal server error.", error: error.message });
    }
};


const authenticate = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ success: false, message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), secretKey);
        req.user = decoded; // Store user info for use in protected routes
        next(); // Continue to the next middleware or route handler
    } catch (error) {
        res.status(400).json({ success: false, message: "Invalid token." });
    }
};

module.exports = { register, login, authenticate };
