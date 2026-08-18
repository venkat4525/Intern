export interface Product {
  id: string;
  name: string;
  category: "medicines" | "medical-equipment" | "pooja" | "care-box" | "wellness" | "home-care";
  categoryLabel: string;
  price: number;
  mrp: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  specifications: string[];
  inStock: boolean;
  featured?: boolean;
  enquiryType?: "purchase";
  unit?: string;
}

export const products: Product[] = [
  // --- MEDICAL EQUIPMENT ---
  {
    id: "bp-monitor-digital",
    name: "Omron Automatic Digital BP Monitor",
    category: "medical-equipment",
    categoryLabel: "Medical Equipment",
    price: 1849,
    mrp: 2490,
    rating: 4.8,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
    description: "Fully automatic blood pressure monitor with Intellisense technology for accurate, comfortable readings at home.",
    specifications: [
      "Intellisense Technology for painless inflation",
      "Memory storage for 60 readings",
      "Cuff wrapping guide indicator",
      "Hypertension color indicator",
      "3-year warranty included"
    ],
    inStock: true,
    featured: true,
    enquiryType: "purchase",
    unit: "1 Unit"
  },
  {
    id: "fingertip-oximeter",
    name: "Dr. Trust Professional Fingertip Pulse Oximeter",
    category: "medical-equipment",
    categoryLabel: "Medical Equipment",
    price: 899,
    mrp: 1499,
    rating: 4.7,
    reviewsCount: 98,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80",
    description: "Accurately measures oxygen saturation (SpO2) and pulse rate in seconds with a bright OLED display.",
    specifications: [
      "OLED display with dual color view",
      "Measures SpO2, Pulse Rate & Perfusion Index",
      "Auto power off after 8 seconds",
      "Water-resistant IP22 rating"
    ],
    inStock: true,
    featured: true,
    enquiryType: "purchase",
    unit: "1 Unit"
  },
  {
    id: "mesh-nebulizer-portable",
    name: "Handheld Mesh Portable Nebulizer Machine",
    category: "medical-equipment",
    categoryLabel: "Medical Equipment",
    price: 1499,
    mrp: 2200,
    rating: 4.6,
    reviewsCount: 64,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    description: "Ultra-quiet handheld nebulizer for adults and children, suitable for respiratory therapy at home or while traveling.",
    specifications: [
      "Vaporization rate ≥ 0.2 ml/min",
      "Low noise < 25 dB operation",
      "Dual mask set (Adult & Child masks)",
      "USB rechargeable battery"
    ],
    inStock: true,
    enquiryType: "purchase",
    unit: "1 Kit"
  },
  {
    id: "glucometer-kit",
    name: "Accu-Chek Active Blood Glucose Monitor Kit",
    category: "medical-equipment",
    categoryLabel: "Medical Equipment",
    price: 1199,
    mrp: 1599,
    rating: 4.9,
    reviewsCount: 215,
    image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=600&q=80",
    description: "Fast 5-second blood glucose monitoring kit with 10 free test strips and lancing device.",
    specifications: [
      "Test time: 5 seconds",
      "Sample volume: 1-2 μl blood",
      "500 test memory with date and time",
      "Pre and post meal markers"
    ],
    inStock: true,
    featured: true,
    enquiryType: "purchase",
    unit: "1 Kit (with 10 Strips)"
  },
  {
    id: "foldable-wheelchair-premium",
    name: "Ergonomic Lightweight Foldable Wheelchair",
    category: "medical-equipment",
    categoryLabel: "Mobility Support",
    price: 5499,
    mrp: 7500,
    rating: 4.8,
    reviewsCount: 53,
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80",
    description: "Heavy-duty powder coated steel foldable wheelchair with comfortable padded seat and attendant brakes.",
    specifications: [
      "Foldable frame for compact transport",
      "Weight capacity up to 110 kg",
      "Dual braking system (User & Attendant)",
      "Detachable leg rests"
    ],
    inStock: true,
    enquiryType: "purchase",
    unit: "1 Unit"
  },
  {
    id: "aluminum-walker-foldable",
    name: "Height Adjustable Aluminum Folding Walker",
    category: "medical-equipment",
    categoryLabel: "Mobility Support",
    price: 1299,
    mrp: 1800,
    rating: 4.7,
    reviewsCount: 76,
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=600&q=80",
    description: "Lightweight anodized aluminum walking frame with single-button folding mechanism and non-slip rubber tips.",
    specifications: [
      "Reciprocal walking frame feature",
      "Height adjustable from 30 to 37 inches",
      "Weight capacity up to 100 kg",
      "Soft foam hand grips"
    ],
    inStock: true,
    enquiryType: "purchase",
    unit: "1 Unit"
  },

  // --- MEDICINES & WELLNESS ---
  {
    id: "multivitamin-senior-care",
    name: "Multivitamin & Mineral Supplement for Seniors (60 Tabs)",
    category: "medicines",
    categoryLabel: "Medicines & Supplements",
    price: 549,
    mrp: 799,
    rating: 4.7,
    reviewsCount: 88,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80",
    description: "Specially formulated daily essential vitamins, Vitamin D3, B12, Calcium, and Zinc tailored for adults aged 50+.",
    specifications: [
      "23 essential nutrients for immunity & joint strength",
      "Supports bone density and memory focus",
      "Vegetarian coated easy-swallow tablets",
      "60 Tablets (2 months supply)"
    ],
    inStock: true,
    featured: true,
    enquiryType: "purchase",
    unit: "Bottle of 60 Tabs"
  },
  {
    id: "joint-pain-oil-ayurvedic",
    name: "Ayurvedic Pain Relief Ortho Oil (200 ml)",
    category: "wellness",
    categoryLabel: "Health & Wellness",
    price: 349,
    mrp: 499,
    rating: 4.8,
    reviewsCount: 167,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80",
    description: "Fast-acting herbal oil infusion with Mahanarayan oil and Eucalyptus for joint, knee, and muscular pain relief.",
    specifications: [
      "Contains 100% pure Ayurvedic extracts",
      "Deep penetrating warmth for stiffness relief",
      "Non-sticky quick absorption",
      "Net Volume: 200 ml"
    ],
    inStock: true,
    enquiryType: "purchase",
    unit: "200 ml Bottle"
  },

  // --- POOJA & FESTIVAL CARE BOXES ---
  {
    id: "pooja-camphor-pure-bhimseni",
    name: "Pure Bhimseni Camphor for Daily Pooja (250g)",
    category: "pooja",
    categoryLabel: "Daily Pooja Essentials",
    price: 299,
    mrp: 450,
    rating: 4.9,
    reviewsCount: 204,
    image: "/images/pure-bhimseni-camphor.png",
    description: "100% natural edible-grade Bhimseni Camphor flakes with long-lasting divine aroma and zero toxic residue.",
    specifications: [
      "100% pure natural pine tree extract",
      "Leaves zero ash or black residue",
      "Calming aromatherapy & spiritual purity",
      "Airtight jar packaging"
    ],
    inStock: true,
    featured: true,
    enquiryType: "purchase",
    unit: "250g Jar"
  },
  {
    id: "general-puja-essentials-box",
    name: "General Puja Essentials & Sacred Ritual Care Box",
    category: "care-box",
    categoryLabel: "Festival Care Boxes",
    price: 899,
    mrp: 1199,
    rating: 4.9,
    reviewsCount: 140,
    image: "/images/general-puja-box.jpg",
    description: "Complete all-in-one sacred ritual kit with turmeric, kumkum, sandalwood, akshata rice, camphor, incense sticks, cotton wicks, oil/ghee lamp accessories, flowers, coconut, betel leaves, areca nuts, banana leaves, and kalasha items.",
    specifications: [
      "Turmeric, Kumkum, Sandalwood paste & Akshata rice",
      "Bhimseni Camphor, Incense sticks & Cotton wicks",
      "Pooja Oil/Ghee lamp accessories & Kalasha items",
      "Coconut, Betel leaves, Areca nuts & Banana leaves guidance"
    ],
    inStock: true,
    featured: true,
    enquiryType: "purchase",
    unit: "Complete All-in-One Box"
  },
  {
    id: "ganesha-chaturthi-care-box",
    name: "Ganesha Chaturthi Complete Pooja Care Box",
    category: "care-box",
    categoryLabel: "Festival Care Boxes",
    price: 1499,
    mrp: 1999,
    rating: 5.0,
    reviewsCount: 78,
    image: "/images/ganesha-pooja-box.png",
    description: "Thoughtfully assembled festival pack containing all required 21 items for traditional Ganesha Pooja.",
    specifications: [
      "Includes Pure Camphor, Kumkum, Turmeric, Cotton Wicks, Sacred Thread",
      "Incense sticks (Agarbatti), Pooja Oil, Brass Lamp accessories",
      "Eco-friendly clay idol guidance checklist",
      "Doorstep delivery for family & parents"
    ],
    inStock: true,
    featured: true,
    enquiryType: "purchase",
    unit: "Complete Box"
  },
  {
    id: "varalakshmi-vratham-care-box",
    name: "Varalakshmi Vratham Sacred Care Box",
    category: "care-box",
    categoryLabel: "Festival Care Boxes",
    price: 1299,
    mrp: 1750,
    rating: 4.9,
    reviewsCount: 65,
    image: "/images/varalakshmi-vratham-box.png",
    description: "Curated collection of traditional vratha essentials, Kalasha accessories, sacred threads, and pooja offerings.",
    specifications: [
      "Kalasha decoration items & Sacred Threads",
      "Natural Kumkum, Turmeric, Chandan paste",
      "Traditional brass lamps wicks & Pooja oil",
      "Step-by-step vratha ritual checklist included"
    ],
    inStock: true,
    enquiryType: "purchase",
    unit: "Complete Box"
  },
  {
    id: "deepavali-grand-celebration-box",
    name: "Deepavali (Diwali) Grand Lakshmi Pooja & Gifting Care Box",
    category: "care-box",
    categoryLabel: "Festival Care Boxes",
    price: 1699,
    mrp: 2199,
    rating: 5.0,
    reviewsCount: 112,
    image: "/images/deepavali-pooja-box.jpg",
    description: "Complete Diwali festival kit with brass diyas, organic wicks, pure pooja oil, rangoli colours, Lakshmi pooja kit, and premium dry-fruit gifting pack.",
    specifications: [
      "12 Handmade terracotta & brass diyas",
      "Lakshmi-Ganesha pooja samagri & incense",
      "Natural vibrant rangoli color powders",
      "500g Premium dry fruit gifting box included"
    ],
    inStock: true,
    featured: true,
    enquiryType: "purchase",
    unit: "Complete Festival Box"
  },
  {
    id: "pongal-sankranti-celebration-box",
    name: "Traditional Harvest Pongal & Sankranti Care Box",
    category: "care-box",
    categoryLabel: "Festival Care Boxes",
    price: 1399,
    mrp: 1799,
    rating: 4.9,
    reviewsCount: 94,
    image: "/images/pongal-harvest-box.jpg",
    description: "Authentic harvest festival care box featuring clay pot accessories, raw rice, organic jaggery, cardamom, turmeric plant ties, and festive pooja essentials.",
    specifications: [
      "Traditional clay pot decoration & tying thread",
      "Organic raw rice & premium organic jaggery",
      "Fresh ginger & turmeric plant ties",
      "Complete harvest thanksgiving pooja kit"
    ],
    inStock: true,
    featured: true,
    enquiryType: "purchase",
    unit: "Complete Festival Box"
  },
  {
    id: "holi-organic-colors-care-box",
    name: "Holi Herbal & Eco-Friendly Colors Care Box",
    category: "care-box",
    categoryLabel: "Festival Care Boxes",
    price: 999,
    mrp: 1399,
    rating: 4.8,
    reviewsCount: 86,
    image: "/images/holi-care-box.jpg",
    description: "Safe & skin-friendly Holi celebration box containing 100% natural herbal gulal powders, organic skin protection oil, and festive thandai mix.",
    specifications: [
      "5 Packs of 100% non-toxic herbal gulal (Cornstarch base)",
      "Pure cold-pressed coconut oil for skin protection",
      "Traditional thandai spice powder mix",
      "Stain-free & lab-tested skin safe materials"
    ],
    inStock: true,
    featured: true,
    enquiryType: "purchase",
    unit: "Complete Celebration Box"
  },
  {
    id: "navaratri-dussehra-golu-box",
    name: "Navaratri & Dussehra Grand Golu Pooja Box",
    category: "care-box",
    categoryLabel: "Festival Care Boxes",
    price: 1599,
    mrp: 2099,
    rating: 5.0,
    reviewsCount: 105,
    image: "/images/navaratri-golu-box.jpg",
    description: "Comprehensive 9-day Navaratri & Dussehra pooja kit including Golu lighting, daily kumkum packets, prasadam sundal ingredients, and Ayudha pooja essentials.",
    specifications: [
      "9-Day daily pooja wicks, camphor & oil packs",
      "Ayudha pooja vehicle & tool blessing items",
      "Traditional kumkum & turmeric guest packets",
      "Organic sundal pulse sampler & pooja guide"
    ],
    inStock: true,
    featured: true,
    enquiryType: "purchase",
    unit: "Complete 9-Day Box"
  },
  {
    id: "krishna-janmashtami-care-box",
    name: "Krishna Janmashtami Devotional Celebration Box",
    category: "care-box",
    categoryLabel: "Festival Care Boxes",
    price: 1199,
    mrp: 1599,
    rating: 4.9,
    reviewsCount: 89,
    image: "/images/krishna-janmashtami-box.jpg",
    description: "Charming Janmashtami celebration pack complete with Little Krishna footprint stencils, butter pot decor, sacred flute, tulsi wicks, and prasadam kit.",
    specifications: [
      "Little Krishna footprint floor stencil & rangoli paste",
      "Miniature brass butter pot & decorative peacock feather",
      "Pure Bhimseni camphor, tulsi wicks & butter lamp oil",
      "Easy homemade butter-ghee prasadam recipe guide"
    ],
    inStock: true,
    featured: true,
    enquiryType: "purchase",
    unit: "Complete Festival Box"
  },

  // --- HOME CARE ---
  {
    id: "adult-diapers-tape-style-l",
    name: "Friends Classic Adult Diapers (Large - 10 Count)",
    category: "home-care",
    categoryLabel: "Home Care & Hygiene",
    price: 599,
    mrp: 750,
    rating: 4.8,
    reviewsCount: 156,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    description: "High absorbency leak-proof tape style adult diapers for maximum comfort, dignity, and overnight protection.",
    specifications: [
      "Up to 8-10 hours leakage protection",
      "Wetness indicator strip",
      "Anti-bacterial absorbent core",
      "Waist size: 38 - 54 inches (Large)"
    ],
    inStock: true,
    featured: true,
    enquiryType: "purchase",
    unit: "Pack of 10"
  },
  {
    id: "anti-slip-bathroom-mat",
    name: "Safety Anti-Slip Bathroom Rubber Suction Mat",
    category: "home-care",
    categoryLabel: "Home Care & Safety",
    price: 499,
    mrp: 699,
    rating: 4.7,
    reviewsCount: 112,
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80",
    description: "Extra long non-slip suction bath mat designed to prevent slips and falls for seniors in wet bathrooms.",
    specifications: [
      "Hundreds of high-strength bottom suction cups",
      "Drainage holes prevent water pooling",
      "Mildew resistant BPA-free material",
      "Dimensions: 100 cm x 40 cm"
    ],
    inStock: true,
    enquiryType: "purchase",
    unit: "1 Mat"
  }
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (!category || category === "all") return products;
  return products.filter((p) => p.category === category);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q)
  );
}
