import Link from 'next/link';
import Image from 'next/image'; // We might use this later for illustrative images

// Placeholder for icons - in a real project, you'd use an icon library like Heroicons or Lucide React
const PlaceholderIcon = ({ className }: { className?: string }) => (
  <svg className={`w-16 h-16 text-green-500 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v11.494m0 0A8.991 8.991 0 0012 21c4.418 0 8-3.134 8-7 0-3.866-3.582-7-8-7S4 7.134 4 11c0 3.866 3.582 7 8 7z"></path></svg>
);



// 2. Hero Section Component
const HeroSection = () => (
  <section className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 py-20 md:py-32">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 mb-6 leading-tight">
        Cook Smarter, Live Healthier.
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
        Your intelligent kitchen assistant for personalized meal planning, efficient inventory management, and insightful nutrition tracking. Say goodbye to food waste and hello to delicious, healthy meals!
      </p>
      <Link href="/signup" className="bg-green-600 hover:bg-green-700 text-white font-bold px-10 py-4 rounded-lg text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out">
        Get Started For Free
      </Link>
    </div>
  </section>
);

// 3. Features Section Component
const FeaturesSection = () => {
  const features = [
    {
      title: "Intelligent Meal Preparation",
      description: "Receive recipe recommendations based on available ingredients, manage checklists, and find ingredient substitutions easily.",
      longDescription: "Our Meal Preparation Assistant helps you plan daily menus quickly and relevantly to your kitchen's contents, with recipes categorized for easy navigation.",
      // icon: <ActualIconComponent1 />
    },
    {
      title: "Smart Ingredient Inventory",
      description: "Track your food items, get alerts for expiring products, and reduce waste with recipes tailored to use what you have.",
      longDescription: "Manage your ingredients efficiently, preventing food waste with manual or barcode entry, and an expiration calendar that suggests recipes for items nearing their end date.",
      // icon: <ActualIconComponent2 />
    },
    {
      title: "Daily Nutrition Tracking",
      description: "Monitor your nutritional intake, set dietary preferences and allergy alerts, and gain insights for a healthier lifestyle.",
      longDescription: "Understand your consumption quality with daily nutrition accumulation from cooked meals, preference settings for diets and allergies, and alerts if your intake deviates from recommended or personal targets.",
      // icon: <ActualIconComponent3 />
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">Why Smart Cooking Recipe?</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-xl mx-auto">
            We help you make the most out of your kitchen, supporting your health and a sustainable lifestyle.
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
      <Link href="/signup" className="bg-white hover:bg-gray-100 text-green-600 font-bold px-10 py-4 rounded-lg text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out">
        Sign Up Now - It's Free!
      </Link>
    </div>
  </section>
);


// 5. Footer Component
const Footer = () => (
  <footer className="bg-gray-800 text-white py-10">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p className="mb-2">&copy; {new Date().getFullYear()} Smart Cooking Recipe. <br/>Developed by Willy Jonathan Arsyad & Agil Mughni.</p>
      <p className="text-sm text-gray-400">A PPL Project for Universitas Syiah Kuala.</p>
      <div className="mt-4 space-x-4">
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