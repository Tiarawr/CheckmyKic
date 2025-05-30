import { motion } from "framer-motion";

export default function WhyChooseUs() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <section
        id="why"
        className="w-full bg-white py-16 px-4 sm:px-8 md:px-16 lg:px-24"
      >
        <h2 className="text-[#46ADAC] text-4xl sm:text-5xl font-semibold font-poppins text-center mb-12">
          Why Choose Us?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {/* Skilled Authenticators */}
          <div className="flex flex-col items-center">
            <img
              src="shopping-jewelry-diamond-2--diamond-money-payment-finance-wealth--Streamline-Core.svg"
              className="w-20 h-20 mb-4"
              alt="Skilled Authenticators Icon"
            />
            <h3 className="text-[#B56868] text-xl font-semibold font-poppins mb-2">
              Skilled Authenticators
            </h3>
            <p className="text-[#444343] text-base font-open">
              Every authentication is handled by professionals who focus on
              accuracy and attention to detail.
            </p>
          </div>

          {/* Authenticity Certificate */}
          <div className="flex flex-col items-center">
            <img
              src="programming-script-2--language-programming-code--Streamline-Core.svg"
              className="w-20 h-20 mb-4"
              alt="Authenticity Certificate Icon"
            />
            <h3 className="text-[#B56868] text-xl font-semibold font-poppins mb-2">
              Authenticity Certificate
            </h3>
            <p className="text-[#444343] text-base font-open">
              Get fast, dependable results along with an official authenticity
              certificate for your item.
            </p>
          </div>

          {/* Easy Communication */}
          <div className="flex flex-col items-center">
            <img
              src="mail-chat-bubble-typing-square--messages-message-bubble-typing-square-chat--Streamline-Core.svg"
              className="w-20 h-20 mb-4"
              alt="Easy Communication Icon"
            />
            <h3 className="text-[#B56868] text-xl font-semibold font-poppins mb-2">
              Easy Communication
            </h3>
            <p className="text-[#444343] text-base font-open">
              Reach out to our team anytime via live chat or email — we’re
              available 24/7 to support you.
            </p>
          </div>

          {/* Experienced Team */}
          <div className="flex flex-col items-center">
            <img
              src="phone-signal-full--phone-mobile-device-signal-wireless-smartphone-iphone-bar-bars-full-android--Streamline-Core.svg"
              className="w-20 h-20 mb-4"
              alt="Experienced Team Icon"
            />
            <h3 className="text-[#B56868] text-xl font-semibold font-poppins mb-2">
              Experienced Team
            </h3>
            <p className="text-[#444343] text-base font-open">
              Our authenticators bring over 6 years of expertise and
              continuously improve accuracy through ongoing research and
              training.
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
