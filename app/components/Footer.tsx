"use client";
import React from "react";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#121212] text-gray-400 border-t border-gray-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Links */}
        <div className="flex flex-wrap gap-6 text-sm font-medium justify-center md:justify-start">
          <Link href="/about" className="hover:text-white transition">
            About
          </Link>
          <Link href="/privacy" className="hover:text-white transition">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-white transition">
            Terms
          </Link>
          <Link href="/contact" className="hover:text-white transition">
            Contact
          </Link>
          <Link href="/help" className="hover:text-white transition">
            Help
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-xs text-center md:text-right text-gray-500">
          © {year} <span className="text-white font-semibold">Aswin</span>. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
