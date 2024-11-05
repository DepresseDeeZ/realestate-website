import React from "react";
import { Link } from "react-router-dom";
import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from "../properties/data";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Explore real estate opportunities with us?
        </h2>
        <p className="text-gray-600 mb-8">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni, ducimus iste?
        </p>
        <hr className="border-gray-300 mb-8" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold text-gray-900">Estate<span className="font-semibold">Hub</span></span>
            </Link>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec ante velit. Ut dignissim massa vel ipsum placerat malesuada.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="bg-primary text-white px-6 py-2 rounded-r-full hover:bg-primary-dark transition duration-300">
                Subscribe
              </button>
            </div>
          </div>
          
          {FOOTER_LINKS.map((column, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link to="/" className="text-gray-600 hover:text-gray-900 transition duration-300">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{FOOTER_CONTACT_INFO.title}</h3>
            {FOOTER_CONTACT_INFO.links.map((link, index) => (
              <p key={index} className="text-gray-600 mb-2">
                <span className="font-semibold">{link.label}:</span> {link.value}
              </p>
            ))}
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-300">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">&copy; 2024 EstateHub. All rights reserved.</p>
            <div className="flex space-x-4">
              {SOCIALS.links.map((link, index) => (
                <Link key={index} to="/" className="text-gray-600 hover:text-gray-900 transition duration-300">
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;