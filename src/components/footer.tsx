"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import {
  COMPANY,
  NAV_ITEMS,
  SERVICES,
  PHONE_HREF,
  EMAIL_HREF,
  whatsappUrl,
} from "@/lib/constants";

// Both lists are derived, so adding a section or a service in constants.ts
// flows through to the footer automatically.
const quickLinks = NAV_ITEMS.map(({ label, href }) => ({
  label,
  href: href.replace(/^#/, ""),
}));

const services = SERVICES.slice(0, 6).map((service) => service.title);

export function Footer() {
  const scrollToSection = (href: string) => {
    const el = document.getElementById(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openQuoteModal = () => {
    window.dispatchEvent(new CustomEvent("open-quote-modal"));
  };

  return (
    <footer className="bg-brand-dark text-gray-300">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/logo/logo.png"
                alt="Borotho Tafoleng Logo"
                width={40}
                height={40}
                className="h-10 w-10 rounded-xl object-contain"
              />
              <div className="flex flex-col">
                <span className="font-heading text-base font-bold text-white leading-tight">
                  Borotho Tafoleng
                </span>
                <span className="text-[10px] text-gray-400 leading-tight">
                  Cleaning & Maintenance
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Your trusted partner for professional cleaning services in
              QwaQwa, Free State. Youth-owned, community-driven, and committed
              to excellence.
            </p>
            <p className="text-sm font-medium text-brand-blue-light">
              "Empowering Youth, Delivering Cleanliness"
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="group flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Our Services
            </h3>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service}>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={PHONE_HREF}
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5">
                    <Phone className="h-4 w-4 text-brand-blue-light" />
                  </div>
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5">
                    <MessageCircle className="h-4 w-4 text-[#25D366]" />
                  </div>
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={EMAIL_HREF}
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5">
                    <Mail className="h-4 w-4 text-brand-blue-light" />
                  </div>
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <a
                  href={COMPANY.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5">
                    <Facebook className="h-4 w-4 text-[#1877F2]" />
                  </div>
                  Facebook
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 mt-0.5">
                  <MapPin className="h-4 w-4 text-brand-blue-light" />
                </div>
                <span>{COMPANY.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500 text-center md:text-left">
              © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
              {" · "}
              <Link
                href="/privacy"
                className="hover:text-white transition-colors underline underline-offset-2"
              >
                Privacy Policy
              </Link>
            </p>
            <p className="text-xs text-gray-500 text-center md:text-right">
              Built with ❤️ for Borotho Tafoleng Cleaning & Maintenance.
              Developed and Maintained by{" "}
              <span className="text-brand-blue-light font-medium">
                PrimeCode Solutions
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
