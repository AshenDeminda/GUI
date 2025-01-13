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

const server = app.listen(3000);
