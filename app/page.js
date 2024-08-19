import PricingTabs from './pricingtabs';
import Landing from './landing';
import Features from "./features";
import getStripe from "@/utils/get-stripe";
import TextExtractor from "@/app/components/TextExtractor/TextExtractor";

export const handleSubmit = async (subscriptionType) => {
    const checkoutSession = await fetch('/api/checkout_session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            origin: 'http://localhost:3000',
        },
        body: JSON.stringify({ subscriptionType }),
    });
    const checkoutSessionJson = await checkoutSession.json();

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSessionJson.id,
    });

    if (error) {
        console.warn(error.message);
    }
};

export default function Home() {
    return (
        <main>
            <div>
                <Landing />
                <Features />
                <PricingTabs />
                <TextExtractor />
            </div>
        </main>
    );
}