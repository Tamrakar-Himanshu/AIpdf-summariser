"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react"; // Import Chevron icons
import Link from "next/link";
import { Plan, plans } from "../data/plans";
import { useState } from "react";

// Define props explicitly for clarity, extending Plan interface
interface PricingCardProps extends Plan {}

function PricingCard({
  id,
  name,
  price,
  description,
  items,
  paymentLink,
  expandedContent, // Destructure the new prop
}: PricingCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovering, setIsHovering] = useState(false); // Keep for button animation

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const getButtonGradient = () => {
    // Original gradient for non-hovered state
    const defaultGradient =
      "bg-gradient-to-r from-rose-800 to-rose-500 hover:from-black hover:to-rose-800";

    // Custom hover gradients
    if (isHovering) {
      if (id === "basic") {
        return "bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-500 hover:to-blue-700";
      } else if (id === "pro") {
        return "bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-500 hover:to-purple-700";
      }
    }
    return defaultGradient; // Fallback to default if no specific hover gradient or not hovering
  };

  return (
    <div
      className={cn(
        "border-2 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between", // Added flex properties
        "border-rose-500", // Default border color
        isExpanded ? "md:scale-105 shadow-xl border-rose-700" : "" // Visual cue when expanded
      )}
      onClick={toggleExpand} // Click anywhere on the card to toggle
      style={{ cursor: "pointer" }} // Indicate interactivity
    >
      <div>
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-gray-600 mb-10">{description}</p>
        <p className="text-4xl font-extrabold mb-14">
          ${price}
          <span className="text-lg font-semibold">/Month</span>
        </p>
        <ul className="list-disc list-inside mb-6 text-sm">
          {items.map((item, index) => (
            <li key={index} className="text-gray-700">
              {item}
            </li>
          ))}
        </ul>

        {/* Expanded Content Section */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-500 ease-in-out",
            isExpanded ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0" // Controls expand/collapse
          )}
        >
          {expandedContent && expandedContent.length > 0 && (
            <>
              <h4 className="font-semibold text-gray-800 mb-2">
                More Features:
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {expandedContent.map((item, index) => (
                  <li key={`expanded-${index}`}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {/* Spacer to push button to bottom, or adjust styling as needed */}
      <div className="mt-auto pt-6">
        <Link
          href={paymentLink}
          className={cn(
            "w-full rounded-lg flex items-center justify-center gap-2 text-white border-2 py-2 transition-all duration-300",
            getButtonGradient()
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={(e) => e.stopPropagation()} // Prevent card expansion when clicking the link
        >
          <div className="flex font-semibold items-center justify-center gap-2">
            <p>Choose {name}</p>
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>
        {/* Toggle Indicator */}
        <div className="flex justify-center mt-4">
          {isExpanded ? (
            <ChevronUp className="w-6 h-6 text-gray-500 transition-transform duration-300" />
          ) : (
            <ChevronDown className="w-6 h-6 text-gray-500 transition-transform duration-300" />
          )}
        </div>
      </div>
    </div>
  );
}

export const PricingSection = () => {
  return (
    <section className="py-12 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Flexible Pricing for Every Need
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Select the perfect plan to boost your productivity. Click on a card
            to see more details!
          </p>
        </div>
        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {" "}
          {/* Adjusted gap */}
          {plans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};
