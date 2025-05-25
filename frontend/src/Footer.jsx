import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#B56868] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="mr-3">
                <svg
                  width="40"
                  height="44"
                  viewBox="0 0 40 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M34.4528 23.3388L40 19.0413V32.0331L38.4962 34.281L21.3868 44H18.6132L1.57059 34.281L0 31.2066V11.8017L1.57059 9.42149L18.6132 0H21.8881L40 10.4132V13.7851L21.8881 28.0992H18.6132L11.4954 24.3967V18.2149L19.883 22.2149L32.2473 12.3636L19.883 5.61983L5.61404 13.7851V30.0826L20.2506 38.0826L34.4528 30.0826V23.3388Z"
                    fill="url(#paint0_linear_140_108)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_140_108"
                      x1="20"
                      y1="0"
                      x2="20"
                      y2="44"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FFD700" />
                      <stop offset="1" stopColor="#C6AD33" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h2 className="text-2xl font-semibold font-['Poppins']">
                checkmykicks
              </h2>
            </div>
            <p className="text-white/75 text-base leading-relaxed mb-6">
              Checkmykicks is Southeast Asia's most reliable platform dedicated
              to sneaker authentication. We help you verify the authenticity of
              your sneakers so you can buy, sell, or collect with
              confidence—free from the worry of fakes. Trust our experts to keep
              your sneaker game legit.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-orange-100 hover:text-white transition-colors duration-300"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-orange-100 hover:text-white transition-colors duration-300"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-orange-100 hover:text-white transition-colors duration-300"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.35-1.052-2.35-2.35 0-1.297 1.053-2.35 2.35-2.35 1.298 0 2.351 1.053 2.351 2.35 0 1.298-1.053 2.35-2.351 2.35zm7.718 0c-1.297 0-2.35-1.052-2.35-2.35 0-1.297 1.053-2.35 2.35-2.35 1.298 0 2.351 1.053 2.351 2.35 0 1.298-1.053 2.35-2.351 2.35z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-orange-100 hover:text-white transition-colors duration-300"
              >
                <span className="sr-only">Pinterest</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.096.119.11.219.081.339-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.163-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-bold text-white/75 mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-white/75 hover:text-white transition-colors duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/75 hover:text-white transition-colors duration-300"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/75 hover:text-white transition-colors duration-300"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/75 hover:text-white transition-colors duration-300"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-bold text-white/75 mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-white/75 hover:text-white transition-colors duration-300"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/75 hover:text-white transition-colors duration-300"
                >
                  Upload for Legit Check
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/75 hover:text-white transition-colors duration-300"
                >
                  Sneaker Authentication Guide
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/75 hover:text-white transition-colors duration-300"
                >
                  What We Verify
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/75 hover:text-white transition-colors duration-300"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/75 hover:text-white transition-colors duration-300"
                >
                  Authentication Standards
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/75 hover:text-white transition-colors duration-300"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/75 hover:text-white transition-colors duration-300"
                >
                  Sneaker Tags
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-bold text-white/75 mb-4">Social</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-white/75 hover:text-white transition-colors duration-300"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/75 hover:text-white transition-colors duration-300"
                >
                  Twitter (X)
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/75 hover:text-white transition-colors duration-300"
                >
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/75 hover:text-white transition-colors duration-300"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              © 2024 CheckMyKicks. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a
                href="#"
                className="text-white/60 hover:text-white text-sm transition-colors duration-300"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-white text-sm transition-colors duration-300"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-white text-sm transition-colors duration-300"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
