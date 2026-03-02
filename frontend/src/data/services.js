export const services = [
  {
    id: "heavy-structures",
    title: "Heavy Structures",
    shortDescription: "Custom heavy steel structures for industrial facilities",
    description: "We specialize in fabricating heavy-duty steel structures including building frames, industrial sheds, platforms, and support structures. Our team handles complex structural requirements with precision engineering and quality welding.",
    industries: ["Power Plants", "Steel Plants", "Cement Plants", "Manufacturing"],
    icon: "Building2",
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=80"
  },
  {
    id: "pipe-rack-structures",
    title: "Pipe Rack Structures",
    shortDescription: "Engineered pipe racks for process industries",
    description: "Design and fabrication of pipe rack structures for refineries, petrochemical plants, and process industries. We ensure structural integrity and compliance with industry standards.",
    industries: ["Oil & Gas", "Petrochemical", "Chemical Plants", "Refineries"],
    icon: "Layers",
    image: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800&q=80"
  },
  {
    id: "conveyor-structures",
    title: "Conveyor Structures",
    shortDescription: "Material handling conveyor systems",
    description: "Complete conveyor structure fabrication for bulk material handling applications. From gallery structures to belt conveyor frames, we deliver robust solutions for continuous operations.",
    industries: ["Mining", "Cement", "Power Plants", "Steel Plants"],
    icon: "ArrowRightLeft",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80"
  },
  {
    id: "piping",
    title: "Piping (CS/SS/Duplex)",
    shortDescription: "Industrial piping in various materials",
    description: "Expert piping fabrication in Carbon Steel, Stainless Steel, Duplex, and Super Duplex materials. We handle spools, headers, manifolds, and complete piping systems with certified welders.",
    industries: ["Oil & Gas", "Chemical", "Pharmaceutical", "Food Processing"],
    icon: "Pipette",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
  },
  {
    id: "pressure-vessels",
    title: "Pressure Vessels",
    shortDescription: "ASME-standard pressure vessels",
    description: "Manufacturing of pressure vessels and storage vessels as per ASME standards. Our facility is equipped for complete vessel fabrication including heat treatment and testing.",
    industries: ["Oil & Gas", "Chemical", "Petrochemical", "Power"],
    icon: "Container",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80"
  },
  {
    id: "storage-tanks",
    title: "Storage Tanks (CS)",
    shortDescription: "API standard storage tanks",
    description: "Fabrication of atmospheric and low-pressure storage tanks as per API standards. We handle all sizes from small process tanks to large field-erected storage tanks.",
    industries: ["Oil & Gas", "Chemical", "Water Treatment", "Food & Beverage"],
    icon: "Database",
    image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&q=80"
  },
  {
    id: "heat-exchangers",
    title: "Heat Exchangers",
    shortDescription: "Shell & tube heat exchangers",
    description: "Design support and fabrication of shell and tube heat exchangers, air coolers, and condensers. We follow TEMA standards and deliver high-quality heat transfer equipment.",
    industries: ["Power", "Chemical", "Petrochemical", "HVAC"],
    icon: "Thermometer",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80"
  },
  {
    id: "reactors",
    title: "Reactors (MS/SS)",
    shortDescription: "Process reactors and agitators",
    description: "Fabrication of chemical reactors, agitated vessels, and mixing tanks in MS and SS materials. We handle jacketed vessels, limpet coil reactors, and custom designs.",
    industries: ["Chemical", "Pharmaceutical", "Food Processing", "Specialty Chemicals"],
    icon: "Atom",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80"
  },
  {
    id: "fire-tube-boilers",
    title: "Fire Tube Boilers",
    shortDescription: "Industrial boiler fabrication",
    description: "Manufacturing of fire tube boilers and boiler components. Our welding and quality processes ensure safe and efficient boiler operations.",
    industries: ["Power", "Textile", "Food Processing", "Manufacturing"],
    icon: "Flame",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80"
  },
  {
    id: "machining",
    title: "Precision Machining",
    shortDescription: "CNC and conventional machining",
    description: "Complete machining capabilities including rollers, gears, bushes, couplings, rings, shafts, and impellers. Our machine shop handles heavy-duty and precision components.",
    industries: ["All Industries", "OEM Support", "Maintenance"],
    icon: "Settings",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
  },
  {
    id: "studs",
    title: "Heavy Duty Studs",
    shortDescription: "Alloy and SS studs & fasteners",
    description: "Manufacturing of heavy-duty studs, bolts, and fasteners in alloy steel and stainless steel grades. We supply to high-temperature and high-pressure applications.",
    industries: ["Power Plants", "Refineries", "Petrochemical", "Heavy Engineering"],
    icon: "Wrench",
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&q=80"
  },
  {
    id: "aluminum-welding",
    title: "Aluminum Welding",
    shortDescription: "Specialized aluminum fabrication",
    description: "Expert aluminum welding and fabrication services for lightweight structures, vessels, and components. Our certified welders ensure quality aluminum joints.",
    industries: ["Transportation", "Marine", "Food & Beverage", "Specialty Applications"],
    icon: "Zap",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
  }
];

export const serviceCategories = [
  { id: "structures", name: "Structural Fabrication", services: ["heavy-structures", "pipe-rack-structures", "conveyor-structures"] },
  { id: "piping", name: "Piping Systems", services: ["piping"] },
  { id: "vessels", name: "Vessels & Tanks", services: ["pressure-vessels", "storage-tanks", "reactors"] },
  { id: "equipment", name: "Process Equipment", services: ["heat-exchangers", "fire-tube-boilers"] },
  { id: "machining", name: "Machining & Components", services: ["machining", "studs", "aluminum-welding"] }
];
