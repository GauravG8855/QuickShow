import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/DB.js';
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"

const app = express();

const PORT = 3000;

app.use(clerkMiddleware())
await connectDB();

app.use(express.json())
app.use(cors())

app.get('/', (req, res)=> res.send("server is live"))
app.use("/api/inngest", serve({ client: inngest, functions }));

app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
});