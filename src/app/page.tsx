import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { siteConfig } from '@/lib/config';

export const dynamic = "force-dynamic";

const Page = () => {
  return (
    <div className="bg-gradient-to-b from-gray-950 text-white min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">{siteConfig.name}</h1>
          <p className="text-xl mb-8">{siteConfig.description}</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Discover Your Perfect Palette
          </button>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4">Features</h2>
          <ul className="space-y-4">
            <li>Live UI Preview: Instantly see how colors look in real-time.</li>
            <li>Customizable Palettes: Create and save your own color schemes.</li>
            <li>Accessibility Checker: Ensure your colors are accessible to all users.</li>
          </ul>
        </section>

        {/* Pricing Section */}
        <section>
          <h2 className="text-3xl font-bold mb-4">Pricing</h2>
          <p>Explore our flexible pricing plans to suit your needs.</p>
          <div className="mt-8">
            <div className="bg-gray-800 p-6 rounded-lg mb-4">
              <h3 className="text-2xl font-bold mb-2">Free Plan</h3>
              <p>Access basic features at no cost.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-2">Pro Plan</h3>
              <p>Unlock advanced features for professionals.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Page;