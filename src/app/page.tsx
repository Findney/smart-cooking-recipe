import Link from 'next/link';
import Image from 'next/image'; // We might use this later for illustrative images
import { Button } from "@/components/ui/button";


// Placeholder for icons - in a real project, you'd use an icon library like Heroicons or Lucide React
const PlaceholderIcon = ({ className }: { className?: string }) => (
  <svg className={`w-16 h-16 text-green-500 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v11.494m0 0A8.991 8.991 0 0012 21c4.418 0 8-3.134 8-7 0-3.866-3.582-7-8-7S4 7.134 4 11c0 3.866 3.582 7 8 7z"></path></svg>
);

// 1. Navbar Component
const isLoggedIn = false; // Ganti dengan state/selector/auth actual

const Navbar = () => (
  <header className="bg-white shadow-md sticky top-0 z-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex-shrink-0">
          <Link href="/" className="text-3xl font-bold text-green-600">
            Smart Cooking Recipe
          </Link>
        </div>
        <nav className="hidden md:flex space-x-6 items-center">
          {!isLoggedIn ? (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button variant="default" asChild>
                <Link href="/signup">Sign Up Free</Link>
              </Button>
            </>
          ) : (
            <Link href="/profile">
              <img
                src="/profile-photo.jpg"
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-green-600 hover:ring-2 ring-green-400 transition"
              />
            </Link>
          )}
        </nav>
        <div className="md:hidden">
          {!isLoggedIn ? (
            <Button size="sm" asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          ) : (
            <Link href="/profile">
              <img
                src="/profile-photo.jpg"
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover border border-green-500"
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  </header>
);


// 2. Hero Section Component
const HeroSection = () => (
  <section className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 py-20 md:py-32">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 mb-6 leading-tight">
        Cook Smarter, Live Healthier.
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
        Your intelligent kitchen assistant for personalized meal planning, efficient inventory management, and insightful nutrition tracking. Say goodbye to food waste and hello to delicious, healthy meals! [cite: 7, 8, 9, 10, 16]
      </p>
      <Button variant="default" size="lg" asChild>
        <Link href="/signup">Get Started For Free</Link>
      </Button>

    </div>
  </section>
);

// 3. Features Section Component
const FeaturesSection = () => {
  const features = [
    {
      title: "Intelligent Meal Preparation",
      description: "Receive recipe recommendations based on available ingredients, manage checklists, and find ingredient substitutions easily. [cite: 8, 27, 30]",
      longDescription: "Our Meal Preparation Assistant helps you plan daily menus quickly and relevantly to your kitchen's contents, with recipes categorized for easy navigation. [cite: 4, 27, 28]",
      // icon: <ActualIconComponent1 />
    },
    {
      title: "Smart Ingredient Inventory",
      description: "Track your food items, get alerts for expiring products, and reduce waste with recipes tailored to use what you have. [cite: 8, 36, 40, 42]",
      longDescription: "Manage your ingredients efficiently, preventing food waste with manual or barcode entry, and an expiration calendar that suggests recipes for items nearing their end date. [cite: 4, 36, 39, 40, 42]",
      // icon: <ActualIconComponent2 />
    },
    {
      title: "Daily Nutrition Tracking",
      description: "Monitor your nutritional intake, set dietary preferences and allergy alerts, and gain insights for a healthier lifestyle. [cite: 8, 44, 45, 47]",
      longDescription: "Understand your consumption quality with daily nutrition accumulation from cooked meals, preference settings for diets and allergies, and alerts if your intake deviates from recommended or personal targets. [cite: 4, 44, 45, 46, 47, 48]",
      // icon: <ActualIconComponent3 />
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">Why Smart Cooking Recipe?</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-xl mx-auto">
            We help you make the most out of your kitchen, supporting your health and a sustainable lifestyle. [cite: 9, 10, 16]
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature) => (
            <div key={feature.title} className="bg-gray-50 p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <div className="flex justify-center mb-6">
                <PlaceholderIcon />
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-3 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-sm mb-4 text-center">{feature.description}</p>
              <p className="text-gray-500 text-xs hidden sm:block text-center">{feature.longDescription}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 4. Call to Action Section (Optional, can be merged or enhanced)
const CallToActionSection = () => (
  <section className="py-20 bg-green-600">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Transform Your Cooking?</h2>
      <p className="text-lg text-green-100 mb-10 max-w-xl mx-auto">
        Join thousands of smart cooks who are planning better, eating healthier, and wasting less.
      </p>
      <Button variant="outline" size="lg" className="bg-white text-green-600 hover:bg-gray-100" asChild>
        <Link href="/signup">Sign Up Now - It's Free!</Link>
      </Button>

    </div>
  </section>
);


// 5. Footer Component
const Footer = () => (
  <footer className="bg-gray-800 text-white py-10">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p className="mb-2">&copy; {new Date().getFullYear()} Smart Cooking Recipe. Developed by Willy Jonathan Arsyad & Agil Mughni. [cite: 2]</p>
      <p className="text-sm text-gray-400">An PPL Project for Universitas Syiah Kuala. [cite: 1, 3]</p>
      <div className="mt-4 space-x-4">
        {/* Add links to Privacy Policy, Terms of Service if they exist */}
        {/* <Link href="/privacy" className="hover:text-green-400">Privacy Policy</Link>
        <Link href="/terms" className="hover:text-green-400">Terms of Service</Link> */}
      </div>
    </div>
  </footer>
);

// Main Landing Page Export
export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
}