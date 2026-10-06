export const divisions = {
  industries: { name: 'Gourav Industries', color: 'var(--c-industries)', text: 'var(--c-industries-text)' },
  engineers: { name: 'Gourav Engineers', color: 'var(--c-engineers)', text: 'var(--c-engineers-text)' },
  process: { name: 'Gourav Process Solutions', color: 'var(--c-process)', text: 'var(--c-process-text)' },
};

export const nav = ['About', 'The Group', 'Products', 'Gallery', 'Contact'];

export const contact = {
  whatsapp: { label: 'WhatsApp +91 84220 00007', href: 'https://api.whatsapp.com/send?phone=918422000007' },
  phone: { label: 'Call +91 99229 98619', href: 'tel:+919922998619' },
};

export const hero = {
  headline: ['We build', 'complete industrial solutions.'],
  slides: [
    { division: 'industries', image: '/images/hero/slide-1.webp', alt: 'Pre-engineered steel building with roofing', tag: 'Pre-engineered buildings, roofing systems, structural components' },
    { division: 'engineers', image: '/images/hero/slide-2.webp', alt: 'Industrial construction and erection site', tag: 'Industrial construction, fabrication, erection and turnkey projects' },
    { division: 'process', image: '/images/hero/slide-3.webp', alt: 'Dairy processing line', tag: 'Dairy, food-processing machinery, plants and processing lines' },
  ],
};

export const clients = [
  { name: 'Piaggio Vehicles', src: '/images/clients/piaggio.png', h: 30 },
  { name: 'Bharat Forge', src: '/images/clients/bharat-forge.png', h: 31 },
  { name: 'AAM', src: '/images/clients/aam.png', h: 50 },
  { name: 'Ferrero', src: '/images/clients/ferrero.png', h: 21 },
  { name: 'Balaji Wafers', src: '/images/clients/balaji.png', h: 50 },
  { name: 'Jubilant', src: '/images/clients/jubilant.png', h: 47 },
  { name: 'PepsiCo', src: '/images/clients/pepsico.png', h: 28 },
  { name: 'Coca-Cola', src: '/images/clients/coca-cola.png', h: 33 },
  { name: 'Saint-Gobain Abrasives', src: '/images/clients/saint-gobain.png', h: 37 },
];

export const products = {
  title: 'Products & services',
  catalogue: 'View full catalogue →',
  cards: [
    {
      division: 'industries', image: '/images/hero/slide-1.webp',
      subtitle: 'Pre-engineered building systems',
      description: 'Custom-designed metal buildings — flexible in dimension, easily expandable, built for harsh climates, maintenance-free exteriors.',
      items: ['Pre-engineered buildings', 'Roof & wall profile sheets', 'Crimp curve', 'Ridge vent', 'Turbo vent', 'Fixed louvers', 'Polycarbonate sheets', 'Z & C purlins', 'All types of accessories'],
    },
    {
      division: 'engineers', image: '/images/hero/slide-2.webp',
      subtitle: 'Industrial civil & mechanical works',
      description: 'The civil and mechanical division — industrial buildings and structures, from foundations to erection.',
      items: ['Industrial construction services', 'Fabrication & erection services', 'Turnkey projects'],
      sectors: ['Manufacturing', 'Food & beverage', 'Oil & gas', 'Cold storage', 'Warehousing', 'Foundry', 'Steel rolling'],
    },
    {
      division: 'process', image: '/images/hero/slide-3.webp',
      subtitle: 'Dairy, beverage & food processing',
      description: 'Machinery, plants and complete processing lines for the dairy, beverage and food processing sectors.',
      items: ['Milk storage tank', 'Butter churner', 'Cream storage tank', 'Ghee boiler', 'Multipurpose vat', 'Butter melting unit', 'Cheese vat', 'Balance tank', 'Road milk tank', 'Turnkey project'],
    },
  ],
};

export const why = {
  title: 'Why Gourav',
  feature: { label: 'MANUFACTURING · MIDC BARAMATI', value: '15,000', unit: 'MT', text: 'Production capacity at our state-of-the-art facility — so fabrication never waits on a supplier.' },
  points: [
    { title: 'Designed to code', text: 'CAD design & detailing to Indian and international standards.' },
    { title: 'Primavera scheduling', text: 'Primavera & MS Project to optimise coordination.' },
    { title: 'Own machinery & erection fleet', text: 'In-house equipment for civil works and erection.' },
    { title: 'Experienced site teams', text: 'Talented engineers and supervisors since 1992.' },
  ],
};

export const process = {
  title: ['One contract,', 'ground to process line.'],
  intro: 'Most plants need three or four contractors. With Gourav, design, civil, steel and process equipment are coordinated by one group — fewer handovers, one schedule.',
  steps: [
    { label: 'STEP 01', title: 'Design & detailing', division: 'industries', by: 'Industries · Engineers' },
    { label: 'STEP 02', title: 'Civil & foundations', division: 'engineers', by: 'Engineers' },
    { label: 'STEP 03', title: 'Steel fabrication', division: 'industries', by: 'Industries' },
    { label: 'STEP 04', title: 'Erection & roofing', division: 'industries', by: 'Industries · Engineers' },
    { label: 'STEP 05', title: 'Process equipment', division: 'process', by: 'Process Solutions' },
    { label: 'HANDOVER', title: 'Turnkey plant', division: 'all', by: 'Gourav Group', dark: true },
  ],
};

export const testimonial = {
  label: 'CLIENT TESTIMONIAL',
  quote: '“The systematic approach, planning and execution delivered our project on time and to our satisfaction.”',
  more: 'More testimonials →',
};

export const footer = {
  title: ['Tell us about', 'your project.'],
  enquiry: 'Send enquiry →',
  offices: [
    { division: 'industries', name: 'Corporate office', lines: ['Plot W-32/33, MIDC Baramati 413 133, Dist. Pune', '+91 2112 244371'] },
    { division: 'engineers', name: 'Pune office', lines: ['“Tushar”, 614/13 Raghuveer Society, Mukund Nagar, Pune 411 037', '+91 78752 34000 · enqpeb@gouravgroup.com'] },
    { division: 'process', name: 'Gourav Process Solutions', lines: ['P-66, MIDC Baramati 413 133, Dist. Pune', '+91 2112 244371 / 2 · enqgps@gouravgroup.com'] },
  ],
  copyright: '© 2026 GOURAV GROUP',
  social: [{ label: 'LINKEDIN', href: '#' }, { label: 'FACEBOOK', href: '#' }],
};

// Interface copy that only lived in the mockup markup, plus accessible names
// for icon-only controls. Kept here so no copy is hard-coded in components.
export const ui = {
  brand: 'Gourav Group',
  home: 'Gourav Group home',
  skip: 'Skip to content',
  quote: { label: 'Get a quote', href: '#contact' },
  whatsapp: 'Chat on WhatsApp',
  menuOpen: 'Open menu',
  menuClose: 'Close menu',
  primaryNav: 'Primary',
  mobileNav: 'Menu',
  carousel: 'Group companies',
  slide: 'slide',
  prev: 'Previous slide',
  next: 'Next slide',
  clients: 'Our clients',
  explore: 'Explore',
  sectors: 'SECTORS SERVED',
  loading: 'LOADING',
};

// Section anchors the nav links can jump to.
export const anchors = { products: 'products', contact: 'contact' };
