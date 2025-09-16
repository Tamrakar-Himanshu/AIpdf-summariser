"use client";
import React, { useState } from "react";
import { Send } from "lucide-react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    priority: "low",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

// Handle form submit - DEBUG VERSION (Admin email only)
  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      alert("⚠️ Please fill all required fields.");
      return;
    }

    setIsLoading(true);
    try {
      console.log("Environment variables check:");
      console.log("SERVICE_ID:", process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID);
      console.log("ADMIN_TEMPLATE_ID:", process.env.NEXT_PUBLIC_EMAIL_ADMIN_TEMPLATE_ID);
      console.log("PUBLIC_KEY:", process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY);

      console.log("Sending admin email with data:", {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        priority: formData.priority,
        message: formData.message,
      });

      // 1️⃣ Send to Admin (you) - ONLY THIS FOR NOW
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAIL_ADMIN_TEMPLATE_ID as string,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          priority: formData.priority,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY as string
      );

      console.log("Admin email sent successfully!");
      alert("✅ Admin email sent successfully!");
      
      // COMMENT OUT AUTO-REPLY FOR TESTING
      /*
      console.log("Sending auto-reply email with data:", {
        email: formData.email,
        name: formData.name,
      });

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID as string,
        {
          email: formData.email,
          name: formData.name,
        },
        process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY as string
      );

      console.log("Auto-reply email sent successfully!");
      */

      setFormData({
        name: "",
        email: "",
        subject: "",
        priority: "low",
        message: "",
      });
    } catch (error) {
      console.error("Email sending failed:", error);
      console.error("Full error object:", JSON.stringify(error, null, 2));
      alert(`❌ Failed to send message: ${error instanceof Error ? error.message : error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white/60 backdrop-blur-xl shadow-xl rounded-2xl border border-gray-200/50">
      <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        Contact Us
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Have a question or need help? Send us a message and we'll get back to
        you.
      </p>

      <form className="space-y-6">
        {/* Name + Email */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white/80 shadow-sm"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white/80 shadow-sm"
              placeholder="john@example.com"
            />
          </div>
        </div>

        {/* Subject + Priority */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Subject *
            </label>
            <input
              type="text"
              name="subject"
              required
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white/80 shadow-sm"
              placeholder="How can we help?"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white/80 shadow-sm"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Message *
          </label>
          <textarea
            name="message"
            required
            rows={6}
            value={formData.message}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white/80 shadow-sm resize-none"
            placeholder="Tell us about your question or how we can help..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending Message...
            </>
          ) : (
            <>
              Send Message
              <Send className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
