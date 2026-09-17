"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { NAV_ITEMS } from "@/lib/constants";

// Derived from the single nav definition in constants.ts — the section ids here
// are the bare element ids ("home"), not the "#home" anchors.
const navLinks = NAV_ITEMS.map(({ label, href }) => ({
  label,
  href: href.replace(/^#/, ""),
}));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((link) => link.href);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const el = document.getElementById(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  const openQuoteModal = () => {
    window.dispatchEvent(new CustomEvent("open-quote-modal"));
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-4 md:px-8">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-2 group"
          >
            <Image
              src="/images/logo/logo.png"
              alt="Borotho Tafoleng Logo"
              width={44}
              height={44}
              className="h-9 w-9 md:h-10 md:w-10 rounded-xl object-contain transition-transform group-hover:scale-105"
              priority
            />
            <div className="hidden sm:flex flex-col">
              <span
                className={`font-heading text-sm md:text-base font-bold leading-tight ${
                  scrolled ? "text-brand-blue" : "text-white"
                }`}
              >
                Borotho Tafoleng
              </span>
              <span
                className={`text-[10px] md:text-xs leading-tight ${
                  scrolled ? "text-gray-500" : "text-white/80"
                }`}
              >
                Cleaning & Maintenance
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === link.href
                    ? scrolled
                      ? "text-brand-blue"
                      : "text-white"
                    : scrolled
                    ? "text-gray-600 hover:text-brand-blue hover:bg-blue-50"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
                {activeSection === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className={`absolute bottom-0 left-2 right-2 h-0.5 rounded-full ${
                      scrolled ? "bg-brand-blue" : "bg-white"
                    }`}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Button
              onClick={openQuoteModal}
              className={`hidden md:inline-flex rounded-xl px-5 py-2.5 font-semibold text-sm transition-all ${
                scrolled
                  ? "bg-brand-blue hover:bg-brand-blue-dark text-white shadow-lg shadow-brand-blue/25"
                  : "bg-white text-brand-blue hover:bg-white/90 shadow-lg"
              }`}
            >
              Get a Quote
            </Button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className={`lg:hidden flex items-center justify-center h-10 w-10 rounded-xl transition-colors ${
                scrolled
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetContent side="right" className="w-[300px] sm:w-[360px] p-0">
              <SheetHeader className="p-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/logo/logo.png"
                    alt="Borotho Tafoleng Logo"
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-xl object-contain"
                  />
                  <div>
                    <SheetTitle className="font-heading text-xl font-bold text-brand-blue">
                      Borotho Tafoleng
                    </SheetTitle>
                    <p className="text-sm text-muted-foreground">
                      Cleaning & Maintenance
                    </p>
                  </div>
                </div>
              </SheetHeader>

              <div className="flex flex-col p-4 gap-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <SheetClose asChild>
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                          activeSection === link.href
                            ? "bg-brand-blue/10 text-brand-blue"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        {link.label}
                      </button>
                    </SheetClose>
                  </motion.div>
                ))}
              </div>

              <div className="p-4 mt-auto border-t border-gray-100">
                <Button
                  onClick={openQuoteModal}
                  className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white rounded-xl py-3 font-semibold"
                >
                  Get a Quote
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </AnimatePresence>
    </>
  );
}
