
import PricingTabs from './pricingtabs';
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