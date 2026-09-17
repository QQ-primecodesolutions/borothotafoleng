// ─────────────────────────────────────────────────
// Company info — THE single source of truth.
//
// ⚠️  TODO BEFORE LAUNCH: `phone`, `whatsapp` and `email` below are still
// placeholders. Replace them here and they update everywhere on the site,
// including the Schema.org business listing in src/app/layout.tsx.
//   - phone:    display format, e.g. "+27 58 713 0000"
//   - whatsapp: digits only, country code first, no "+", e.g. "27587130000"
// ─────────────────────────────────────────────────
export const COMPANY = {
  name: "Borotho Tafoleng Cleaning and Maintenance (Pty) Ltd",
  shortName: "Borotho Tafoleng",
  tagline: "Empowering Youth. Delivering Excellence. Creating Cleaner Spaces.",
  phone: "+27 00 000 0000",
  whatsapp: "270000000000",
  email: "info@borothotafoleng.co.za",
  facebook: "https://facebook.com/borothotafoleng",
  address: "QwaQwa, Phuthaditjhaba, Free State, 9866, South Africa",
  cipc: "Registered with CIPC",
  // Postal breakdown, kept apart so the Schema.org block stays in sync too.
  locality: "Phuthaditjhaba",
  region: "Free State",
  postalCode: "9866",
  country: "ZA",
  foundingYear: "2024",
  url: "https://borothotafoleng.co.za",
} as const;

/** `tel:` href built from COMPANY.phone (strips spaces). */
export const PHONE_HREF = `tel:${COMPANY.phone.replace(/\s/g, "")}`;

/** `mailto:` href for the company inbox. */
export const EMAIL_HREF = `mailto:${COMPANY.email}`;

/** Pre-filled WhatsApp link. Pass a custom message for context-specific CTAs. */
export function whatsappUrl(
  message = `Hello ${COMPANY.shortName}! I'm interested in your cleaning services.`
) {
  return `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** True while the contact details above are still the scaffolded placeholders. */
export const CONTACT_DETAILS_ARE_PLACEHOLDERS =
  COMPANY.whatsapp === "270000000000";

// Navigation items — consumed by the navbar, the mobile menu and the footer.
export const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

// Services
export const SERVICES = [
  { title: "School Cleaning", icon: "GraduationCap", image: "/images/services/school-cleaning.png", description: "Comprehensive cleaning for schools, ensuring a safe and hygienic learning environment for students and staff." },
  { title: "Office Cleaning", icon: "Building2", image: "/images/services/office-cleaning.png", description: "Professional office cleaning services that boost productivity and create a welcoming workspace." },
  { title: "Residential Cleaning", icon: "Home", image: "/images/services/residential-cleaning.png", description: "Thorough home cleaning services tailored to your schedule, giving you a spotless living space." },
  { title: "Church Cleaning", icon: "Church", image: "/images/services/church-cleaning.png", description: "Respectful and meticulous cleaning of worship spaces, maintaining the sanctity of your church." },
  { title: "Commercial Cleaning", icon: "Store", image: "/images/services/commercial-cleaning.png", description: "Reliable commercial cleaning for shops, retail spaces, and business premises." },
  { title: "Deep Cleaning", icon: "Sparkles", image: "/images/services/deep-cleaning.png", description: "Intensive deep cleaning that reaches every corner, perfect for seasonal or post-renovation clean-ups." },
  { title: "Event Cleaning", icon: "PartyPopper", image: "/images/services/event-cleaning.png", description: "Pre and post-event cleaning services ensuring venues are pristine before and after gatherings." },
  { title: "Appliance Cleaning", icon: "Refrigerator", image: "/images/services/appliance-cleaning.png", description: "Specialized appliance cleaning including fridges, ovens, and other household equipment." },
];

// Detailed services (for services section)
export const DETAILED_SERVICES = [
  {
    title: "School Cleaning",
    icon: "GraduationCap",
    image: "/images/services/school-cleaning.png",
    shortDesc: "Safe, hygienic learning environments",
    description: "We understand the importance of a clean learning environment. Our school cleaning services cover classrooms, hallways, bathrooms, offices, and common areas. We use child-safe cleaning products and follow strict health protocols to ensure students and staff thrive in a spotless space.",
    benefits: ["Child-safe cleaning products", "Classroom & hallway cleaning", "Bathroom sanitisation", "Window cleaning", "Floor polishing & maintenance", "Waste management"],
  },
  {
    title: "Office Cleaning",
    icon: "Building2",
    image: "/images/services/office-cleaning.png",
    shortDesc: "Productive, welcoming workspaces",
    description: "A clean office boosts productivity and morale. Our team delivers daily, weekly, or monthly office cleaning tailored to your needs. From desks and floors to kitchens and bathrooms, we ensure your workspace is always fresh and professional.",
    benefits: ["Daily or scheduled cleaning", "Desk & workstation cleaning", "Kitchen & breakroom cleaning", "Bathroom sanitisation", "Carpet & floor care", "Waste removal & recycling"],
  },
  {
    title: "Residential Cleaning",
    icon: "Home",
    image: "/images/services/residential-cleaning.png",
    shortDesc: "Spotless homes, happy families",
    description: "Enjoy a clean home without the hassle. Our residential cleaning services are flexible and thorough, covering everything from kitchens and bathrooms to bedrooms and living areas. We treat your home with the same care and respect as our own.",
    benefits: ["Regular & deep cleaning", "Kitchen deep clean", "Bathroom sanitisation", "Dusting & vacuuming", "Laundry & ironing", "Move in/out cleaning"],
  },
  {
    title: "Church Cleaning",
    icon: "Church",
    image: "/images/services/church-cleaning.png",
    shortDesc: "Respectful worship space care",
    description: "We provide respectful, thorough cleaning for places of worship. Our team understands the significance of these spaces and ensures every pew, altar, and floor is treated with care and reverence, creating a welcoming atmosphere for congregants.",
    benefits: ["Pew & seating cleaning", "Altar & sanctuary care", "Floor polishing & cleaning", "Window cleaning", "Bathroom cleaning", "Event preparation cleaning"],
  },
  {
    title: "Commercial & Shop Cleaning",
    icon: "Store",
    image: "/images/services/commercial-cleaning.png",
    shortDesc: "Professional business premises",
    description: "First impressions matter. Our commercial cleaning services keep your shop, showroom, or business premises looking their best. We work around your business hours to minimise disruption and maximise cleanliness.",
    benefits: ["Shop front & display cleaning", "Floor maintenance", "Window cleaning", "Stock room organisation", "Bathroom cleaning", "After-hours cleaning available"],
  },
  {
    title: "Deep Cleaning",
    icon: "Sparkles",
    image: "/images/services/deep-cleaning.png",
    shortDesc: "Intensive, thorough clean",
    description: "Sometimes a regular clean isn't enough. Our deep cleaning service tackles every hidden corner, stubborn stain, and build-up. Perfect for seasonal cleaning, post-renovation, or when you simply need your space restored to its best.",
    benefits: ["Kitchen appliance deep clean", "Grout & tile scrubbing", "Carpet deep cleaning", "Window track cleaning", "Cabinet & shelf cleaning", "Sanitisation & disinfection"],
  },
  {
    title: "Event Cleaning",
    icon: "PartyPopper",
    image: "/images/services/event-cleaning.png",
    shortDesc: "Pristine venues, before & after",
    description: "Hosting an event? Let us handle the cleaning before and after. From weddings and parties to conferences and community gatherings, our team ensures your venue is spotless for guests and promptly cleaned afterwards.",
    benefits: ["Pre-event venue preparation", "Post-event clean-up", "Floor sweeping & mopping", "Table & chair cleaning", "Waste removal", "Quick turnaround service"],
  },
  {
    title: "Appliance & Fridge Cleaning",
    icon: "Refrigerator",
    image: "/images/services/appliance-cleaning.png",
    shortDesc: "Specialised appliance care",
    description: "Keep your appliances running efficiently and hygienically. Our specialised appliance cleaning covers fridges, ovens, microwaves, washing machines, and more. We remove grease, grime, and bacteria to extend the life of your appliances.",
    benefits: ["Fridge deep clean & defrost", "Oven & stove degreasing", "Microwave sanitisation", "Washing machine cleaning", "Dishwasher cleaning", "Preventative maintenance tips"],
  },
  {
    title: "Move In / Move Out Cleaning",
    icon: "Truck",
    image: "/images/gallery/gallery-8.jpg",
    shortDesc: "Stress-free transitions",
    description: "Moving is stressful enough without worrying about cleaning. Our move in/move out cleaning service ensures properties are thoroughly cleaned and inspection-ready, whether you're leaving or arriving.",
    benefits: ["Full property deep clean", "Appliance cleaning", "Window cleaning inside & out", "Carpet cleaning", "Bathroom deep sanitisation", "Inspection-ready standards"],
  },
];

// Stats
export const STATS = [
  { value: 15, suffix: "+", label: "Youth Employed", icon: "Users" },
  { value: 100, suffix: "%", label: "Committed to Quality", icon: "ShieldCheck" },
  { value: 1, suffix: "", label: "CIPC Registered", icon: "FileCheck" },
  { value: 9, suffix: "+", label: "Services Offered", icon: "Sparkles" },
];

// ─────────────────────────────────────────────────
// Credentials — factual trust signals, every one of them verifiable.
//
// This stands where the photo gallery used to be. The gallery was filled with
// AI-generated images presented as completed jobs, which it isn't honest to
// publish. Bring the gallery back once there are real photos of real work
// (with the client's permission to publish them).
// ─────────────────────────────────────────────────
export const CREDENTIALS = [
  {
    title: "A registered company",
    description:
      "Borotho Tafoleng Cleaning and Maintenance is a (Pty) Ltd registered with the CIPC — you are contracting with a formally constituted South African business.",
    icon: "FileCheck",
  },
  {
    title: "Youth-owned and youth-run",
    description:
      "Founded and staffed by 15 matriculated young people from QwaQwa. Every booking funds local employment rather than an outside contractor.",
    icon: "Users",
  },
  {
    title: "Safe products, proper protocols",
    description:
      "Child-safe cleaning products and strict health protocols on school and church sites, so the spaces our community shares stay safe to use.",
    icon: "ShieldCheck",
  },
  {
    title: "Scheduled around you",
    description:
      "Daily, weekly or monthly contracts, with after-hours cleaning available for offices and shops so your business is never disrupted.",
    icon: "Clock",
  },
];

// Why Choose Us
export const WHY_CHOOSE_US = [
  { title: "Local Business", description: "Proudly based in QwaQwa, we understand the needs of our community and deliver services tailored to our local environment.", icon: "MapPin" },
  { title: "Youth Empowerment", description: "Every service you book helps create employment for young people in QwaQwa, building a brighter future for our community.", icon: "Heart" },
  { title: "Reliable Team", description: "Our dedicated team of 15+ young professionals is trained, trustworthy, and committed to delivering excellence every time.", icon: "Clock" },
  { title: "Affordable Pricing", description: "We offer competitive rates without compromising on quality. Professional cleaning that fits your budget.", icon: "BadgeDollarSign" },
  { title: "Professional Service", description: "CIPC registered and fully compliant, we maintain the highest standards of professionalism in every job we undertake.", icon: "Award" },
  { title: "Attention to Detail", description: "We believe the difference is in the details. Our thorough approach ensures nothing is overlooked.", icon: "Eye" },
];

// About timeline
export const TIMELINE = [
  { year: "2024", title: "Company Founded", description: "15 matriculated young people from QwaQwa came together with a shared vision to create employment and provide professional cleaning services." },
  { year: "2024", title: "CIPC Registration", description: "Officially registered as Borotho Tafoleng Cleaning and Maintenance (Pty) Ltd with the Companies and Intellectual Property Commission." },
  { year: "2024", title: "First Contracts", description: "Secured our first cleaning contracts with local schools and offices, proving our commitment to quality service." },
  { year: "2025", title: "Growing Impact", description: "Expanded our client base to include churches, residential clients, and commercial properties. Our team continues to grow." },
  { year: "2025", title: "Community Recognition", description: "Recognised by the QwaQwa community for our dedication to youth empowerment and professional cleaning standards." },
];

// About values
export const VALUES = [
  { title: "Excellence", description: "We strive for the highest standards in every cleaning task, no matter how big or small.", icon: "Star" },
  { title: "Integrity", description: "We operate with honesty, transparency, and accountability in all our business dealings.", icon: "Shield" },
  { title: "Community", description: "We are rooted in our community and committed to making QwaQwa a better place.", icon: "Users" },
  { title: "Innovation", description: "We embrace modern cleaning techniques and methods to deliver superior results.", icon: "Lightbulb" },
  { title: "Teamwork", description: "Together we achieve more. Our strength lies in our unity and collaboration.", icon: "Handshake" },
  { title: "Sustainability", description: "We use environmentally friendly products and practices wherever possible.", icon: "Leaf" },
];

// Team members
export const TEAM = [
  { name: "Leadership Team", role: "Company Founders", description: "Our founding team of 15 matriculated young people from QwaQwa who turned a vision into reality.", image: "/images/team/team-photo.png" },
];

// FAQs
export const FAQS = [
  { question: "What areas do you service?", answer: "We are based in QwaQwa, Phuthaditjhaba in the Free State and service the surrounding areas including Maluti-a-Phofung municipality. We are open to servicing clients within a reasonable radius of our base." },
  { question: "Are you a registered company?", answer: "Yes! Borotho Tafoleng Cleaning and Maintenance (Pty) Ltd is fully registered with CIPC (Companies and Intellectual Property Commission of South Africa)." },
  { question: "What cleaning products do you use?", answer: "We use professional-grade, environmentally friendly cleaning products that are safe for children, pets, and the environment. All our products meet South African safety standards." },
  { question: "How do I request a quote?", answer: "You can request a free quote by filling out our online quote form, calling us directly, or sending a WhatsApp message. We'll get back to you within 24 hours with a competitive quotation." },
  { question: "Do you offer flexible scheduling?", answer: "Absolutely! We work around your schedule. Whether you need daily, weekly, monthly, or one-time cleaning, we can accommodate your preferred times, including after-hours for offices." },
  { question: "What makes you different from other cleaning companies?", answer: "We are a youth-owned, community-driven business. Every cleaning service you book directly creates employment for young people in QwaQwa. We combine professional standards with a genuine passion for community development." },
  { question: "How many people are on your team?", answer: "Our team consists of 15+ trained young professionals, all from the QwaQwa area. We are growing and continuously training new team members to expand our capacity." },
  { question: "Do you provide your own cleaning equipment?", answer: "Yes, we come fully equipped with all necessary cleaning supplies, tools, and equipment. You don't need to provide anything." },
];
