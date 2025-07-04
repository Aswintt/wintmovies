"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Search, Menu, X } from "lucide-react";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Popular", href: "/popular" },
    { label: "Top Rated", href: "/toprated" },
    { label: "Upcoming", href: "/upcoming" },
  ];

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search/${encodeURIComponent(search.trim())}`);
      setSearch("");
      setMenuOpen(false);
    }
  };

  return (
    <header className="bg-[#121212] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Hamburger */}
        <div className="flex items-center w-full justify-between md:w-auto">
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-wide uppercase text-yellow-400"
          >
            WintMovies
          </Link>

          <button
            className="md:hidden text-gray-200 hover:text-white"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-3">
          {navItems.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                  isActive
                    ? "bg-yellow-400 text-black"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Search */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center border border-gray-700 rounded-md overflow-hidden bg-[#1f1f1f] w-1/3"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search movies..."
            className="w-full px-3 py-2 bg-transparent text-sm focus:outline-none text-white placeholder-gray-400"
          />
          <button
            type="submit"
            className="px-3 py-2 bg-yellow-400 text-black hover:bg-yellow-300 transition"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Mobile Nav & Search */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4">
          <nav className="flex flex-col gap-2">
            {navItems.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                    isActive
                      ? "bg-yellow-400 text-black"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <form
            onSubmit={handleSearch}
            className="flex items-center border border-gray-700 rounded-md overflow-hidden bg-[#1f1f1f]"
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search movies..."
              className="w-full px-3 py-2 bg-transparent text-sm focus:outline-none text-white placeholder-gray-400"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-yellow-400 text-black hover:bg-yellow-300 transition"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;
