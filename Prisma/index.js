import express from "express";
import cors from 'cors';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res) => {
    try {

        await prisma.user.create({data: req.body});
    } catch (e) {
        if (e.code == "P2002") {
            res.status(409).send({ message: "email already exists" });
            return;
        }
    }
  res.status(200).send({ message: "signup successful" });
});

app.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Compare the provided password with the stored password
        if (user.password !== password) {
            return res.status(401).send({ message: "Invalid email or password" });
        }

        // On successful login
        res.status(200).send({ message: "Sign-in successful", user: { id: user.id, full_name: user.full_name } });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "An error occurred" });
    }
});


const server = app.listen(3000);