import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HowItWorksSection from "@/components/landing/HowItWorksSection";

const HowItWorks = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-1 pt-16">
                <HowItWorksSection />
            </main>
            <Footer />
        </div>
    );
};

export default HowItWorks;
