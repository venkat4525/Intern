import { Apple, HeartPulse, Hospital, PackageCheck, Sparkles, Stethoscope, Sun, Truck, Accessibility, House, Gift } from "lucide-react";

export const marketplaceCategories = [
  { slug: "medicines", name: "Medicines", description: "Prescription support, OTC and wellness essentials.", icon: HeartPulse, accent: "bg-rose-50" },
  { slug: "medical-equipment", name: "Medical Equipment", description: "Equipment available for purchase or rental.", icon: Hospital, accent: "bg-sky-50" },
  { slug: "mobility", name: "Mobility & Rehabilitation", description: "Support products for safer movement and recovery.", icon: Accessibility, accent: "bg-violet-50" },
  { slug: "pooja", name: "Daily Pooja Essentials", description: "Daily worship items and complete pooja supplies.", icon: Sun, accent: "bg-orange-50" },
  { slug: "care-box", name: "Festival Care Boxes", description: "Thoughtfully assembled boxes for festivals and vrathas.", icon: Gift, accent: "bg-yellow-50" },
  { slug: "wellness", name: "Health & Wellness", description: "Nutrition, monitoring and everyday wellbeing.", icon: Apple, accent: "bg-lime-50" },
  { slug: "home-care", name: "Home Care", description: "Comfort, hygiene and daily living support.", icon: House, accent: "bg-emerald-50" },
];
export const medicineGroups = ["Prescription Medicines", "OTC Medicines", "Diabetes Care", "Blood Pressure Care", "Pain Relief", "First Aid", "Vitamins", "Ayurvedic Care"];
export const purchaseEquipment = ["Wheelchairs", "Walkers", "Walking Sticks", "BP Monitors", "Glucometers", "Nebulizers", "Oxygen Concentrators", "Hospital Beds"];
export const rentalEquipment = ["Hospital Beds", "Oxygen Concentrators", "Wheelchairs", "Patient Lifts", "Air Mattresses", "Recliner Chairs", "Suction Machines", "Bedside Commodes"];
export const poojaGroups = ["Agarbatti", "Camphor", "Cotton Wicks", "Kumkum & Turmeric", "Diyas & Lamps", "Ghee & Oil", "Kalasha Items", "Daily Pooja Kits", "Flowers & Leaves", "Panchamrutha Kits"];

export const festivalBoxes = [
  { name: "Deepavali Grand Lakshmi Pooja & Gifting Box", includes: ["Terracotta & brass diyas", "Lakshmi pooja samagri", "Rangoli colors", "500g Dry fruits pack"] },
  { name: "Pongal & Sankranti Harvest Care Box", includes: ["Clay pot decoration", "Organic raw rice & jaggery", "Fresh turmeric tie", "Pooja kit"] },
  { name: "Holi Organic & Herbal Colors Box", includes: ["5 Herbal gulal packs", "Coconut skin protection oil", "Thandai mix", "Stain-free colors"] },
  { name: "Navaratri & Dussehra Grand Golu Box", includes: ["9-Day pooja samagri", "Ayudha pooja kit", "Kumkum guest packets", "Sundal pulse kit"] },
  { name: "Krishna Janmashtami Celebration Box", includes: ["Krishna footprint stencil", "Brass butter pot", "Tulsi wicks", "Prasadam mix"] },
  { name: "Ganesha Chaturthi Essentials Box", includes: ["Pooja samagri", "Durva arrangement support", "Modak mix", "Camphor", "Kumkum & turmeric", "Cotton wicks"] },
  { name: "Varalakshmi Vratham Box", includes: ["Kalasha essentials", "Sacred thread", "Bangles", "Betel leaves & nuts", "Kumkum & turmeric", "Pooja guide"] },
  { name: "Ugadi Celebration Box", includes: ["Ugadi pachadi ingredients", "Mango-leaf torana support", "Pooja samagri", "Traditional pantry essentials"] },
  { name: "Satyanarayana Pooja Box", includes: ["Complete pooja samagri", "Kalasha items", "Prasadam essentials", "Pooja checklist"] },
  { name: "Ayudha Pooja Box", includes: ["Vehicle and tool pooja kit", "Lemon & pumpkin checklist", "Flowers", "Kumkum & turmeric", "Camphor"] },
  { name: "Raksha Bandhan Box", includes: ["Rakhi", "Kumkum & rice", "Sweets", "Gift-ready packaging"] },
  { name: "Shravana Month Box", includes: ["Weekly pooja essentials", "Vratha supplies", "Lamps & wicks", "Kumkum & turmeric", "Pooja checklist"] },
];

export const futureServices = [
  { name: "Doctor Consultation", icon: Stethoscope },
  { name: "Home Nursing", icon: HeartPulse },
  { name: "Lab Tests at Home", icon: Sparkles },
  { name: "Ambulance Support", icon: Truck },
  { name: "Physiotherapy", icon: Accessibility },
  { name: "SOS Devices", icon: PackageCheck },
];
