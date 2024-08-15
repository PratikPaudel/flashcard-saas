import {NextResponse} from "next/server";
import Stripe from 'stripe';
export async function POST (req) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    
}