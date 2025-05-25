import React from "react";

export default function Review() {
  const reviews = [
    {
      id: 1,
      initials: "AS",
      text: "All my customers trust my store more after I show them authentications from CheckMyKicks. My return customers have doubled since I started including authenticity reports.",
    },
    {
      id: 2,
      initials: "MN",
      text: "“As a long-time sneaker collector, CheckMyKicks gave me peace of mind after a bad experience with fakes. Their team is fast, detailed, and super helpful—totally worth it for anyone who takes authenticity seriously.”",
    },
    {
      id: 3,
      initials: "YM",
      text: "Can you guys authenticate Jordan 4s? Just bought a pair online and want to be sure.",
    },
    {
      id: 4,
      initials: "HT",
      text: "These guys are legit! CheckMyKicks helped me get proof that a pair I bought was fake — I used it to get a refund!",
    },
    {
      id: 5,
      initials: "EA",
      text: "The guides are really helpful. I used them before even submitting for a check.",
    },
    {
      id: 6,
      initials: "DF",
      text: "I’ve had a great experience so far and I like the fact they offer some free checks as well.",
    },
    {
      id: 7,
      initials: "IB",
      text: "“CheckMyKicks has been a major upgrade for our sneaker business. Their fast and reliable authentication reports boosted buyer trust, lowered returns, and helped increase our overall sales. Highly recommended for any reseller.”",
    },
    { id: 8, initials: "AG", text: "I Like This WEB checkmykicks" },
  ];

  return (
    <section id="review" className="py-16 px-4 md:px-8 lg:px-16 bg-stone-50">
      <h2 className="text-center text-4xl md:text-5xl font-semibold text-[#46ADAC] mb-12">
        Reviews
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map(({ id, initials, text }) => (
          <div
            key={id}
            className="bg-white rounded-2xl border border-stone-300 p-6 flex flex-col"
          >
            <div className="flex items-center mb-4">
              <img src="#" alt={initials} className="w-12 h-12" />
              <span className="ml-3 text-xl font-semibold">{initials}</span>
            </div>
            <p className="text-black text-base font-normal font-['Poppins']">
              {text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
