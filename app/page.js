
import PricingTabs from './PricingTabs';
import Landing from './landing';
import Features from "./features";

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