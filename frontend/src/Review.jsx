import React from "react";
import { Star } from "lucide-react";

const ReviewCard = ({ initials, rating, review, maxStars = 5 }) => {
  const renderStars = () => {
    return Array.from({ length: maxStars }).map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-300 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xl font-semibold font-['Poppins']">
            {initials}
          </span>
        </div>
      </div>
      <p className="text-black text-base font-normal font-['Poppins'] leading-relaxed flex-grow mb-4">
        {review}
      </p>
      <div className="flex gap-1">{renderStars()}</div>
    </div>
  );
};

const ReviewsSection = () => {
  const reviews = [
    {
      initials: "AS",
      rating: 4,
      review:
        "All my customers trust my store more after I show them authentications from CheckMyKicks. My return customers have doubled since I started including authenticity reports.",
    },
    {
      initials: "MN",
      rating: 3,
      review:
        "Can you guys authenticate Jordan 4s? Just bought a pair online and want to be sure.",
    },
    {
      initials: "YM",
      rating: 4,
      review:
        '"As a long-time sneaker collector, CheckMyKicks gave me peace of mind after a bad experience with fakes. Their team is fast, detailed, and super helpful—totally worth it for anyone who takes authenticity seriously."',
    },
    {
      initials: "EA",
      rating: 5,
      review:
        "The guides are really helpful. I used them before even submitting for a check.",
    },
    {
      initials: "HT",
      rating: 5,
      review:
        "These guys are legit! CheckMyKicks helped me get proof that a pair I bought was fake — I used it to get a refund!",
    },
    {
      initials: "DF",
      rating: 4,
      review:
        "I've had a great experience so far and I like the fact they offer some free checks as well.",
    },
    {
      initials: "IB",
      rating: 4,
      review:
        '"CheckMyKicks has been a major upgrade for our sneaker business. Their fast and reliable authentication reports boosted buyer trust, lowered returns, and helped increase our overall sales. Highly recommended for any reseller."',
    },
    {
      initials: "AG",
      rating: 5,
      review: "I Like This WEB checkmykicks",
    },
  ];

  return (
    <div className="w-full bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-semibold font-['Poppins'] text-emerald-400 leading-tight">
            Reviews
          </h2>
        </div>

        {/* Reviews Grid - Masonry Style Layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {reviews.map((review, index) => (
            <div key={index} className="break-inside-avoid mb-6">
              <ReviewCard
                initials={review.initials}
                rating={review.rating}
                review={review.review}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
