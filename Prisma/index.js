import express from "express";
import cors from 'cors';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

// Signup endpoint
app.post("/signup", async (req, res) => {
    try {
        const user = await prisma.user.create({ data: req.body });
        res.status(200).send({ message: "Signup successful", user });
    } catch (e) {
        if (e.code === "P2002") {
            res.status(409).send({ message: "Email already exists" });
            return;
        }
        res.status(500).send({ message: "Error during signup" });
    }
});

// Signin endpoint
app.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || user.password !== password) {
            return res.status(401).send({ message: "Invalid email or password" });
        }
        res.status(200).send({ message: "Sign-in successful", user });
    } catch (error) {
        res.status(500).send({ message: "An error occurred" });
    }
});

// Get user data endpoint
app.get("/user", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).send({ message: "Unauthorized" });

    try {
        const user = await prisma.user.findUnique({ where: { id: Number(token) } });
        if (!user) return res.status(404).send({ message: "User not found" });
        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to fetch user data" });
    }
});

// Update profile endpoint
app.put("/settings/update-profile", async (req, res) => {
    const { id, name, email, location, job, age } = req.body;
    try {
        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: { full_name: name, email, location, job, age: parseInt(age, 10) },
        });
        res.status(200).send({ message: "Profile updated", user });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to update profile" });
    }
});

// Change password endpoint
app.put("/settings/change-password", async (req, res) => {
    const { id, currentPassword, newPassword } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { id: Number(id) } });
        if (!user || user.password !== currentPassword) {
            return res.status(401).send({ message: "Incorrect current password" });
        }
        await prisma.user.update({
            where: { id: Number(id) },
            data: { password: newPassword },
        });
        res.status(200).send({ message: "Password updated" });
    } catch (error) {
        res.status(500).send({ message: "Failed to change password" });
    }
});

// Update currency endpoint
app.put("/settings/update-currency", async (req, res) => {
    const { id, currency, currencyFormat } = req.body;
    try {
        await prisma.user.update({
            where: { id: Number(id) },
            data: { currency, currencyFormat },
        });
        res.status(200).send({ message: "Currency settings updated" });
    } catch (error) {
        res.status(500).send({ message: "Failed to update currency settings" });
    }
});

// Delete account endpoint
app.delete("/settings/delete-account", async (req, res) => {
    const { id, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { id: Number(id) } });
        if (!user || user.password !== password) {
            return res.status(401).send({ message: "Incorrect password" });
        }
        await prisma.user.delete({ where: { id: Number(id) } });
        res.status(200).send({ message: "Account deleted" });
    } catch (error) {
        res.status(500).send({ message: "Failed to delete account" });
    }
});

// Add transaction endpoint
app.post("/transaction", async (req, res) => {
    try {
        const transaction = await prisma.transaction.create({ data: req.body });
        res.status(200).send(transaction);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Failed to add transaction" });
    }
});

// Get transactions endpoint
app.get("/transaction", async (req, res) => {
    const { user } = req.query;
    const userId = Number(user);
    if (isNaN(userId)) {
        res.status(400).send({ message: "Invalid user ID" });
    } else {
        try {
            const transactions = await prisma.transaction.findMany({ where: { userId } });
            res.json(transactions);
        } catch (error) {
            res.status(500).send({ message: "Failed to fetch transactions" });
        }
    }
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});