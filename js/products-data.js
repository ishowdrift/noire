/**
 * NOIRÉ — Product Catalog Database
 * High-fashion fictional contemporary streetwear catalog.
 */

const NOIRE_PRODUCTS = [
  {
    id: "prod-01",
    name: "Obsidian Oversized Tee",
    subtitle: "Heavyweight Combed Cotton 320 GSM",
    category: "tees",
    categoryLabel: "T-Shirts",
    collection: "after-dark",
    collectionLabel: "After Dark / 01",
    price: 145,
    isNew: true,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 38,
    primaryImage: "assets/images/products/tee-obsidian-1.jpg",
    gallery: [
      "assets/images/products/tee-obsidian-1.jpg",
      "assets/images/products/tee-obsidian-2.jpg",
      "assets/images/products/tee-void-1.jpg"
    ],
    sizes: [
      { size: "XS", available: true },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: false }
    ],
    description: "An architectural essential cut from custom-milled 320 GSM organic combed cotton. Engineered with dropped shoulders, an elongated boxy torso, and an reinforced 1.2-inch ribbed collar that preserves shape through relentless wear.",
    specs: {
      material: "100% GOTS-Certified Organic Combed Cotton",
      weight: "320 GSM Heavyweight Jersey",
      fit: "Oversized Architectural Drape",
      origin: "Crafted in Kojima, Japan",
      care: "Cold delicate cycle. Hang dry in shade. Do not tumble dry."
    },
    color: "Matte Obsidian Black",
    colorHex: "#0c0c0e"
  },
  {
    id: "prod-02",
    name: "Signal Graphic Tee",
    subtitle: "High-Density Cybernetic Screenprint",
    category: "tees",
    categoryLabel: "T-Shirts",
    collection: "signal-void",
    collectionLabel: "Signal Void Capsule",
    price: 160,
    isNew: true,
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 24,
    primaryImage: "assets/images/products/tee-signal-1.jpg",
    gallery: [
      "assets/images/products/tee-signal-1.jpg",
      "assets/images/products/tee-signal-2.jpg"
    ],
    sizes: [
      { size: "XS", available: false },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: true }
    ],
    description: "Conceived as an artifact of digital nocturnalism. Features high-density silicon typographic screenprints at chest and spine, rendered in razor Electric Cobalt and bone white against an ultra-absorbent deep graphite weave.",
    specs: {
      material: "100% Ring-Spun Compact Cotton",
      weight: "290 GSM",
      fit: "Relaxed Boxy Fit",
      origin: "Crafted in Porto, Portugal",
      care: "Iron inside out. Machine wash cold with like darks."
    },
    color: "Signal Void / Cobalt",
    colorHex: "#111420"
  },
  {
    id: "prod-03",
    name: "Void Raw-Edge Tee",
    subtitle: "Distressed Seam Heavy Jersey",
    category: "tees",
    categoryLabel: "T-Shirts",
    collection: "essentials-core",
    collectionLabel: "Essentials Core",
    price: 135,
    isNew: false,
    isFeatured: false,
    rating: 4.7,
    reviewsCount: 19,
    primaryImage: "assets/images/products/tee-void-1.jpg",
    gallery: [
      "assets/images/products/tee-void-1.jpg",
      "assets/images/products/tee-void-2.jpg"
    ],
    sizes: [
      { size: "XS", available: true },
      { size: "S", available: true },
      { size: "M", available: false },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: false }
    ],
    description: "Subtle raw-edge hem finishes along the cuffs and waistband create an intentional unfinished edge that matures and softens over time. Garment-washed with volcanic minerals for a deep tactile graphite patina.",
    specs: {
      material: "100% Mercerized Cotton",
      weight: "280 GSM",
      fit: "Sculptural Relaxed",
      origin: "Crafted in Kojima, Japan",
      care: "Hand wash cold recommended. Lay flat to dry."
    },
    color: "Washed Carbon",
    colorHex: "#18181c"
  },
  {
    id: "prod-04",
    name: "Eclipse Heavyweight Hoodie",
    subtitle: "520 GSM French Terry Architecture",
    category: "hoodies",
    categoryLabel: "Hoodies",
    collection: "after-dark",
    collectionLabel: "After Dark / 01",
    price: 265,
    isNew: true,
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 62,
    primaryImage: "assets/images/products/hoodie-eclipse-1.jpg",
    gallery: [
      "assets/images/products/hoodie-eclipse-1.jpg",
      "assets/images/products/hoodie-eclipse-2.jpg"
    ],
    sizes: [
      { size: "XS", available: true },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: false }
    ],
    description: "The definitive NOIRÉ silhouette. Crafted from dense 520 GSM unbrushed loopback French terry with an architectural crossover double-lined hood that holds its structure without drawstrings. Clean internal side seam pockets maintain an unblemished frontal plane.",
    specs: {
      material: "100% Heavy French Terry Organic Cotton",
      weight: "520 GSM Ultra-Dense Weave",
      fit: "Substantial Boxy Silhouette with Ergonomic Arms",
      origin: "Crafted in Milan, Italy",
      care: "Dry clean or wash cold inside-out. Do not machine dry."
    },
    color: "Pitch Obsidian",
    colorHex: "#09090b"
  },
  {
    id: "prod-05",
    name: "Afterdark Zip Hoodie",
    subtitle: "Two-Way Oxidized Chrome Hardware",
    category: "hoodies",
    categoryLabel: "Hoodies",
    collection: "after-dark",
    collectionLabel: "After Dark / 01",
    price: 290,
    isNew: false,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 41,
    primaryImage: "assets/images/products/hoodie-afterdark-1.jpg",
    gallery: [
      "assets/images/products/hoodie-afterdark-1.jpg",
      "assets/images/products/hoodie-afterdark-2.jpg"
    ],
    sizes: [
      { size: "XS", available: false },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: false },
      { size: "XXL", available: false }
    ],
    description: "Engineered for technical versatility. Features a custom two-way oxidized gunmetal zipper, reinforced elbow darting, and deep ergonomic hand chambers. Ribbed thumbhole cuffs integrated into the wrist seams provide cold-weather insulation.",
    specs: {
      material: "100% Luxury French Terry with Elastane Cuff Ribbing",
      weight: "480 GSM",
      fit: "Drop Shoulder Structured Box Fit",
      origin: "Crafted in Porto, Portugal",
      care: "Zip before washing. Cool wash cycle."
    },
    color: "Nocturne Graphite",
    colorHex: "#121216"
  },
  {
    id: "prod-06",
    name: "Kuro Minimalist Crewneck",
    subtitle: "Raglan Arm Construction",
    category: "hoodies",
    categoryLabel: "Hoodies",
    collection: "essentials-core",
    collectionLabel: "Essentials Core",
    price: 210,
    isNew: false,
    isFeatured: false,
    rating: 4.8,
    reviewsCount: 29,
    primaryImage: "assets/images/products/crewneck-kuro-1.jpg",
    gallery: [
      "assets/images/products/crewneck-kuro-1.jpg",
      "assets/images/products/crewneck-kuro-2.jpg"
    ],
    sizes: [
      { size: "XS", available: true },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: true }
    ],
    description: "Stripped of all superficial adornment. An elevated crewneck sweater with seamless raglan articulation across the shoulders, heavy reinforced collar rib, and a subtle debossed tonal crest along the left wrist ribbing.",
    specs: {
      material: "90% Organic Cotton, 10% Cashmere Blend",
      weight: "420 GSM",
      fit: "Tailored Relaxed",
      origin: "Crafted in Biella, Italy",
      care: "Specialist wool/cotton cycle or dry clean."
    },
    color: "Smoky Charcoal",
    colorHex: "#1c1c22"
  },
  {
    id: "prod-07",
    name: "Monochrome Utility Jacket",
    subtitle: "Membrane Water-Repellent Shell",
    category: "outerwear",
    categoryLabel: "Outerwear",
    collection: "monochrome-utility",
    collectionLabel: "Monochrome Utility",
    price: 440,
    isNew: true,
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 51,
    primaryImage: "assets/images/products/jacket-monochrome-1.jpg",
    gallery: [
      "assets/images/products/jacket-monochrome-1.jpg",
      "assets/images/products/jacket-monochrome-2.jpg"
    ],
    sizes: [
      { size: "XS", available: false },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: false }
    ],
    description: "An unyielding barrier against urban weather systems. Constructed from three-layer laminated Japanese ripstop nylon with taped internal seams, Fidlock magnetic pocket closures, and an integrated stowaway storm cowl.",
    specs: {
      material: "3-Layer Micro-Ripstop Technical Nylon with DWR Coating",
      waterproofing: "20,000mm Hydrostatic Head / 15,000g Breathability",
      fit: "Modular Oversized Shell (Layering Ready)",
      origin: "Crafted in Osaka, Japan",
      care: "Wipe clean with damp cloth. Technical wash reproofing yearly."
    },
    color: "Technical Onyx",
    colorHex: "#0b0c0f"
  },
  {
    id: "prod-08",
    name: "Vapor Technical Trench",
    subtitle: "Bonded Minimalist Overcoat",
    category: "outerwear",
    categoryLabel: "Outerwear",
    collection: "monochrome-utility",
    collectionLabel: "Monochrome Utility",
    price: 520,
    isNew: true,
    isFeatured: false,
    rating: 4.9,
    reviewsCount: 18,
    primaryImage: "assets/images/products/trench-vapor-1.jpg",
    gallery: [
      "assets/images/products/trench-vapor-1.jpg",
      "assets/images/products/trench-vapor-2.jpg"
    ],
    sizes: [
      { size: "XS", available: true },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: false },
      { size: "XXL", available: false }
    ],
    description: "A dramatic modern reinterpretation of the timeless trench coat. Engineered in high-tenacity matte twill with concealed magnetic storm flaps, deep storm vent back yoke, and articulated sleeves that drape cleanly in motion.",
    specs: {
      material: "Bonded Cotton-Nylon Technical Twill",
      weight: "Midweight Structured Draped Shell",
      fit: "Editorial Elongated Trench Cut",
      origin: "Crafted in Milan, Italy",
      care: "Specialist dry clean only."
    },
    color: "Deep Storm Slate",
    colorHex: "#14151a"
  },
  {
    id: "prod-09",
    name: "Apex Puffer Vest",
    subtitle: "Sculptural Thermal Insulation",
    category: "outerwear",
    categoryLabel: "Outerwear",
    collection: "signal-void",
    collectionLabel: "Signal Void Capsule",
    price: 360,
    isNew: false,
    isFeatured: false,
    rating: 4.8,
    reviewsCount: 22,
    primaryImage: "assets/images/products/vest-apex-1.jpg",
    gallery: [
      "assets/images/products/vest-apex-1.jpg",
      "assets/images/products/vest-apex-2.jpg"
    ],
    sizes: [
      { size: "XS", available: true },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: true }
    ],
    description: "Architectural geometric baffle quilting insulated with responsibly sourced 800-fill power European goose down. Features matte anodized hardware, fleece-lined welt hand warmers, and interior tech harness straps.",
    specs: {
      material: "Matte Technical Polyester Shell with DWR Coating",
      insulation: "800 Fill-Power RDS Certified Goose Down",
      fit: "Cropped Boxy Baffle Silhouette",
      origin: "Crafted in Annecy, France",
      care: "Professional down clean only."
    },
    color: "Matte Black",
    colorHex: "#070709"
  },
  {
    id: "prod-10",
    name: "Core Relaxed Trousers",
    subtitle: "Virgin Wool-Cotton Pleated Drape",
    category: "trousers",
    categoryLabel: "Trousers",
    collection: "essentials-core",
    collectionLabel: "Essentials Core",
    price: 230,
    isNew: false,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 47,
    primaryImage: "assets/images/products/trousers-relaxed-1.jpg",
    gallery: [
      "assets/images/products/trousers-relaxed-1.jpg",
      "assets/images/products/trousers-relaxed-2.jpg"
    ],
    sizes: [
      { size: "XS", available: false },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: false }
    ],
    description: "Merging tailoring precision with streetwear ease. Deep inverted front pleats fall effortlessly into a wide-leg fluid break. Finished with internal waist cinch adjusters, hidden coin pockets, and horn button hardware.",
    specs: {
      material: "60% Virgin Wool, 40% Long-Staple Cotton",
      weight: "340 GSM Midweight Fluid Twill",
      fit: "High-Waist Wide Leg with Clean Ankle Break",
      origin: "Crafted in Florence, Italy",
      care: "Dry clean only. Steam press as needed."
    },
    color: "Obsidian Charcoal",
    colorHex: "#131317"
  },
  {
    id: "prod-11",
    name: "Aero Cargo Pants",
    subtitle: "Articulated Knee Technical Cargo",
    category: "trousers",
    categoryLabel: "Trousers",
    collection: "monochrome-utility",
    collectionLabel: "Monochrome Utility",
    price: 275,
    isNew: true,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 34,
    primaryImage: "assets/images/products/pants-cargo-1.jpg",
    gallery: [
      "assets/images/products/pants-cargo-1.jpg",
      "assets/images/products/pants-cargo-2.jpg"
    ],
    sizes: [
      { size: "XS", available: true },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: false }
    ],
    description: "Designed for kinetic agility. Features 6-pocket modular utility with flush magnetic envelope flap pockets, double-stitched reinforced knee articulation, and an interior elastic bungee cuff adjustment system.",
    specs: {
      material: "Heavy Cordura® Cotton-Nylon Stretch Canvas",
      durability: "Abrasion-Resistant Tactical Weave",
      fit: "Tapered Ergonomic Cargo Silhouette",
      origin: "Crafted in Osaka, Japan",
      care: "Machine wash cold. Line dry."
    },
    color: "Dark Graphite",
    colorHex: "#18191e"
  },
  {
    id: "prod-12",
    name: "Carbon Wide-Leg Sweatpants",
    subtitle: "Heavy Unbrushed Loopback Terry",
    category: "trousers",
    categoryLabel: "Trousers",
    collection: "after-dark",
    collectionLabel: "After Dark / 01",
    price: 195,
    isNew: false,
    isFeatured: false,
    rating: 4.8,
    reviewsCount: 31,
    primaryImage: "assets/images/products/pants-carbon-1.jpg",
    gallery: [
      "assets/images/products/pants-carbon-1.jpg",
      "assets/images/products/pants-carbon-2.jpg"
    ],
    sizes: [
      { size: "XS", available: true },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: false },
      { size: "XXL", available: false }
    ],
    description: "Lounge comfort translated into runway proportions. Ultra-dense 480 GSM French terry draping straight down from an encased elastic waistband. Features concealed matte metal zip pockets and an adjustable internal drawcord.",
    specs: {
      material: "100% Organic French Terry Cotton",
      weight: "480 GSM",
      fit: "Dramatic Wide Leg with Unhemmed Floor Break",
      origin: "Crafted in Porto, Portugal",
      care: "Cold wash inside-out. Do not tumble dry."
    },
    color: "Washed Obsidian",
    colorHex: "#101014"
  },
  {
    id: "prod-13",
    name: "Nocturne Leather Crossbody",
    subtitle: "Full-Grain Italian Calfskin Bag",
    category: "accessories",
    categoryLabel: "Accessories",
    collection: "after-dark",
    collectionLabel: "After Dark / 01",
    price: 320,
    isNew: true,
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 43,
    primaryImage: "assets/images/products/bag-crossbody-1.jpg",
    gallery: [
      "assets/images/products/bag-crossbody-1.jpg",
      "assets/images/products/bag-crossbody-2.jpg"
    ],
    sizes: [
      { size: "ONE SIZE", available: true }
    ],
    description: "An architectural companion for the nocturnal city. Handcrafted from vegetable-tanned Italian calfskin leather with matte black PVD anodized aluminum hardware. Features quick-release Fidlock magnetic clasp and microfiber padded interior.",
    specs: {
      material: "Full-Grain Vegetable Tanned Italian Calfskin",
      hardware: "Matte Black Anodized Aviation Aluminum",
      dimensions: "28cm x 18cm x 8cm (Capacity: 3.5L)",
      origin: "Handcrafted in Florence, Italy",
      care: "Condition with natural leather wax annually."
    },
    color: "Matte Noir Calfskin",
    colorHex: "#08080a"
  },
  {
    id: "prod-14",
    name: "Vector Monolith Cap",
    subtitle: "Structured Technical 6-Panel",
    category: "accessories",
    categoryLabel: "Accessories",
    collection: "monochrome-utility",
    collectionLabel: "Monochrome Utility",
    price: 95,
    isNew: false,
    isFeatured: false,
    rating: 4.7,
    reviewsCount: 27,
    primaryImage: "assets/images/products/cap-vector-1.jpg",
    gallery: [
      "assets/images/products/cap-vector-1.jpg",
      "assets/images/products/cap-vector-2.jpg"
    ],
    sizes: [
      { size: "ONE SIZE", available: true }
    ],
    description: "Engineered with water-repellent structured nylon faille. Features an ergonomic pre-curved brim, embroidered tone-on-tone NOIRÉ micro-crest, and a laser-engraved metal buckle adjuster at the rear.",
    specs: {
      material: "100% Water-Resistant Hydrophobic Technical Nylon",
      closure: "Custom Matte Metal Slider with Webbing Strap",
      fit: "Low-Crown Unstructured Ergonomic Fit",
      origin: "Crafted in Seoul, South Korea",
      care: "Spot clean with damp cloth."
    },
    color: "Pitch Black",
    colorHex: "#0a0a0c"
  },
  {
    id: "prod-15",
    name: "Cipher Wool Beanie",
    subtitle: "100% Extrafine Merino Rib Knit",
    category: "accessories",
    categoryLabel: "Accessories",
    collection: "essentials-core",
    collectionLabel: "Essentials Core",
    price: 85,
    isNew: false,
    isFeatured: false,
    rating: 4.9,
    reviewsCount: 39,
    primaryImage: "assets/images/products/beanie-cipher-1.jpg",
    gallery: [
      "assets/images/products/beanie-cipher-1.jpg"
    ],
    sizes: [
      { size: "ONE SIZE", available: true }
    ],
    description: "Dense 7-gauge fisherman rib knit from 100% Australian extrafine merino wool. Naturally thermoregulating, itch-free, and designed with a double-fold cuff sporting a minimal debossed matte silicon patch.",
    specs: {
      material: "100% Extra-Fine 19.5 Micron Merino Wool",
      knit: "7-Gauge Heavy Rib Weave",
      fit: "Classic Snug Folded Silhouette",
      origin: "Spun & Knitted in Scotland",
      care: "Hand wash cold with wool detergent. Dry flat."
    },
    color: "Obsidian",
    colorHex: "#111114"
  },
  {
    id: "prod-16",
    name: "Architectural Silk Scarf",
    subtitle: "Double-Sided 18mm Silk Twill",
    category: "accessories",
    categoryLabel: "Accessories",
    collection: "signal-void",
    collectionLabel: "Signal Void Capsule",
    price: 140,
    isNew: true,
    isFeatured: false,
    rating: 4.8,
    reviewsCount: 16,
    primaryImage: "assets/images/products/scarf-silk-1.jpg",
    gallery: [
      "assets/images/products/scarf-silk-1.jpg"
    ],
    sizes: [
      { size: "ONE SIZE", available: true }
    ],
    description: "An homage to modern brutalist architecture. Hand-rolled hems frame a high-contrast geometric monochrome blueprint print accented by thin hairline cobalt vector lines. Woven in 18mm Mulberry silk twill for radiant drape.",
    specs: {
      material: "100% Mulberry Silk Twill (18 Momme)",
      finish: "Hand-Rolled French Edge Seams",
      dimensions: "90cm x 90cm Square",
      origin: "Crafted in Como, Italy",
      care: "Dry clean only. Cool iron under pressing cloth."
    },
    color: "Monochrome / Blueprint Vector",
    colorHex: "#0c0d12"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { NOIRE_PRODUCTS };
}
