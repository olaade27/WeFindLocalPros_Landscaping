"use client";
import Image from 'next/image'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    details: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service, // Include service
          jobDetails: formData.details,
        }),
      });

      if (response.ok) {
       fbq("track", "Lead", {
          service: formData.service,
          value: 1,          // optional
          currency: "CAD",   // optional
        });
        alert("✅ Your request has been submitted!");
        setFormData({ name: "", email: "", phone: "", service: "", details: "" });
      } else {
        const errorText = await response.text(); // optional for debugging
        console.error("Submission failed:", errorText);
        alert("❌ Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">

      {/* Hero Section (gradient banner) */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Find Trusted Landscapers Near You
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-6">
          Skip the hassle of calling around. Get <span className="font-semibold">3 free quotes</span> from
          verified local landscapers in under 24 hours.
        </p>
        <a href="#form" className="bg-white text-green-700 font-semibold px-6 py-3 rounded-2xl shadow hover:bg-green-100 transition">
          Get My Free Quotes
        </a>
      </section>

      {/* Incentive Section */}
      <section className="py-12 px-6 bg-green-100 text-center text-black shadow-md">
        <h2 className="text-2xl font-bold mb-4">Why Request a Quote With Us?</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="p-6 rounded-xl bg-green-200 shadow">
            <h3 className="font-bold mb-2">Save Time</h3>
            <p className="font-semibold">No need to search — we connect you instantly to top landscapers.</p>
          </div>
          <div className="p-6 rounded-xl bg-green-200 shadow">
            <h3 className="font-bold mb-2">Trusted Pros</h3>
            <p className="font-semibold">All landscapers are vetted and reviewed by local homeowners.</p>
          </div>
          <div className="p-6 rounded-xl bg-green-200 shadow">
            <h3 className="font-bold mb-2">Best Prices</h3>
            <p className="font-semibold">Get 3 free quotes so you can compare and pick the best deal.</p>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-12 px-6 bg-white text-center text-black">
        <h2 className="text-2xl font-bold mb-4">Building Trust With Homeowners Across the GTA</h2>
        <p className="max-w-3xl mx-auto text-lg font-medium mb-6">
          We’re actively growing a network of <span className="font-bold text-green-700">local, reliable landscapers </span> 
          across the GTA. Our goal is to make it easy for homeowners to quickly find 
          and compare quotes from professionals right in their city.
        </p>
        <p className="text-md text-gray-700">
          From simple lawn care to full landscaping projects, we’re here to connect you 
          with trusted pros who are ready to get the job done right.
        </p>
      </section>

      {/* Image Section (Placeholder for portfolio/gallery) */}
     <section className="py-12 px-6 bg-green-50 text-center text-black">
  <h2 className="text-2xl font-bold mb-6">Our Work</h2>
  <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
    
    {/* Image 1 */}
    <div className="relative w-full h-64 rounded-lg shadow">
      <Image
        src="/assets/images/yard2.png"
        alt="Image 1 of a fully mowed yard"
        fill
        className="object-cover rounded-lg"
      />
    </div>

    {/* Image 2 */}
    <div className="relative w-full h-64 rounded-lg shadow">
      <Image
        src="/assets/images/hedgeTriming.jpg"
        alt="Image 2 of a trimmed hedge"
        fill
        className="object-cover rounded-lg"
      />
    </div>

    {/* Image 3 */}
    <div className="relative w-full h-64 rounded-lg shadow">
      <Image
        src="/assets/images/yardCleanup.jpg"
        alt="Image 3 of a cleanup yard"
        fill
        className="object-cover rounded-lg"
      />
    </div>

  </div>
</section>

      {/* Form Section */}
      <section id="form" className="flex-1 py-16 px-6 bg-green-50 text-black">
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Request Free Quotes</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg font-semibold"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg font-semibold"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg font-semibold"
            />
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg font-semibold"
            >
              <option value="">Select Service</option>
              <option value="lawn">Lawn Mowing</option>
              <option value="hedge">Hedge Trimming</option>
              <option value="cleanup">Yard Cleanup</option>
              <option value="landscape">Full Landscaping</option>
              <option value="other">Other</option> 
            </select>
            <textarea
              name="details"
              placeholder="Tell us more about your project..."
              value={formData.details}
              onChange={handleChange}
              rows="4"
              className="w-full border p-3 rounded-lg font-semibold"
            />
            <button
              type="submit"
              className="w-full bg-green-700 text-white font-semibold py-3 rounded-lg shadow hover:bg-green-800 transition"
            >
              Get My Free Quotes
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
