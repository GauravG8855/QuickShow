import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/DB.js';
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
import showRouter from './routes/showRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import userRouter from './routes/userRoutes.js';
import { stripeWebhooks } from './controllers/stripeWebhook.js';

const app = express();

const PORT = 3000;

app.use(clerkMiddleware())
await connectDB();

app.use('/api/stripe', express.raw({type: 'application/json'}), stripeWebhooks)

app.use(express.json())
app.use(cors())

app.get('/', (req, res)=> res.send("server is live"))
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use('/api/show', showRouter)
app.use('/api/booking',bookingRouter)
app.use('/api/admin',adminRouter)
app.use('/api/user',userRouter)

app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
});