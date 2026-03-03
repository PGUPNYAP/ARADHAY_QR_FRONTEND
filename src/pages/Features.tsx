import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeaturesSection from "@/components/landing/FeaturesSection";

const Features = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-1 pt-16">
                <FeaturesSection />
            </main>
            <Footer />
        </div>
    );
};

export default Features;
