import PricingTabs from './pricingtabs';
import Landing from './landing';
import Features from "./features";

export const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: { origin: 'http://localhost:3000' },
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
            </div>
        </main>
    );
}