export interface Project {
  slug: string
  title: string
  location: string
  description: string
  images: string[]
  year?: string
  size?: string
  type?: string
  services?: string
  cover: string
}

export const projects: Project[] = [
  {
    slug: "cedar-ridge-residence",
    title: "Cedar Ridge Residence",
    location: "Sandpoint, Idaho",
    description:
      "A stunning modern mountain retreat blending contemporary design with natural materials. Floor-to-ceiling windows frame breathtaking views while locally sourced timber and stone connect the home to its landscape. Every detail crafted with precision—from custom millwork to hand-selected finishes—a testament to quality craftsmanship.",
    images: [
      "/modern-glass-house-reflecting-in-lake-at-sunset-wi.jpg",
      "/luxury-modern-living-room-wood-ceiling-concrete-fi.jpg",
      "/luxury-modern-cabin-interior-with-large-windows-wo.jpg",
    ],
    cover: "/modern-luxury-home-at-night-with-warm-interior-lig.jpg",
    year: "2024",
    size: "4,500 sq ft",
    type: "Custom Residence",
    services: "Design-Build, Interior Design",
  },
  {
    slug: "modern-loft-remodel",
    title: "Modern Loft Remodel",
    location: "Spokane, Washington",
    description:
      "Complete transformation of an industrial loft space into a contemporary living environment. Open floor plan maximizes natural light while exposed structural elements pay homage to the building's heritage. Custom built-ins and carefully curated materials create a sophisticated urban retreat.",
    images: [
      "/luxury-modern-cabin-interior-with-large-windows-wo.jpg",
      "/luxury-modern-living-room-interior-with-stone-fire.jpg",
      "/modern-minimalist-architecture-exterior-detail-bla.jpg",
    ],
    cover: "/luxury-modern-cabin-interior-with-large-windows-wo.jpg",
    year: "2023",
    size: "2,800 sq ft",
    type: "Renovation",
    services: "Interior Design, Construction Management",
  },
  {
    slug: "lakeview-cabin",
    title: "Lakeview Cabin",
    location: "Coeur d'Alene, Idaho",
    description:
      "A waterfront sanctuary designed to embrace its stunning lakeside setting. Large decks and expansive windows blur the line between interior and exterior. Natural materials and a warm color palette create a welcoming retreat perfect for family gatherings.",
    images: [
      "/project-3.jpg",
      "/modern-glass-house-reflecting-in-lake-at-sunset-wi.jpg",
      "/luxury-modern-cabin-interior-with-large-windows-wo1.jpg",
    ],
    cover: "/project-3.jpg",
    year: "2023",
    size: "3,200 sq ft",
    type: "Custom Residence",
    services: "Design-Build",
  },
  {
    slug: "hillside-house",
    title: "Hillside House",
    location: "Bozeman, Montana",
    description:
      "Perched on a dramatic hillside, this modern residence takes full advantage of panoramic mountain views. Thoughtful terracing integrates the home into the landscape while floor-to-ceiling glass creates seamless indoor-outdoor living. Sustainable design features and high-performance systems ensure comfort and efficiency.",
    images: [
      "/modern-glass-house-reflecting-in-lake-at-sunset-wi.jpg",
      "/luxury-modern-living-room-wood-ceiling-concrete-fi.jpg",
      "/modern-minimalist-architecture-exterior-detail-bla.jpg",
    ],
    cover: "/modern-glass-house-reflecting-in-lake-at-sunset-wi.jpg",
    year: "2024",
    size: "5,100 sq ft",
    type: "Custom Residence",
    services: "Architecture, Design-Build, Landscape Integration",
  },
  {
    slug: "farmhouse-conversion",
    title: "Farmhouse Conversion",
    location: "Walla Walla, Washington",
    description:
      "Sensitive renovation of a historic farmhouse blending traditional character with modern amenities. Original architectural details preserved and highlighted while updated systems and finishes bring contemporary comfort. A careful balance of old and new creates a timeless family home.",
    images: [
      "/luxury-modern-living-room-wood-ceiling-concrete-fi.jpg",
      "/luxury-modern-cabin-interior-with-large-windows-wo.jpg",
      "/modern-luxury-home-at-night-with-warm-interior-lig.jpg",
    ],
    cover: "/luxury-modern-living-room-wood-ceiling-concrete-fi.jpg",
    year: "2023",
    size: "3,600 sq ft",
    type: "Historic Renovation",
    services: "Restoration, Interior Design",
  },
  {
    slug: "mountain-retreat",
    title: "Mountain Retreat",
    location: "Whitefish, Montana",
    description:
      "A secluded mountain getaway designed for year-round enjoyment. Heavy timber construction and stone accents create a rustic elegance while modern amenities ensure comfort. Large windows frame forest views and fill spaces with natural light.",
    images: [
      "/luxury-modern-cabin-interior-with-large-windows-wo1.jpg",
      "/project-1.jpg",
      "/luxury-modern-living-room-interior-with-stone-fire.jpg",
    ],
    cover: "/luxury-modern-cabin-interior-with-large-windows-wo1.jpg",
    year: "2024",
    size: "4,200 sq ft",
    type: "Mountain Home",
    services: "Design-Build, Custom Millwork",
  },
  {
    slug: "contemporary-ranch",
    title: "Contemporary Ranch",
    location: "Missoula, Montana",
    description:
      "Modern interpretation of classic ranch architecture. Single-level living with clean lines and expansive glass opens to surrounding landscape. High-performance envelope and radiant heating ensure comfort in Montana's climate.",
    images: [
      "/project-2.jpg",
      "/modern-luxury-home-at-night-with-warm-interior-lig.jpg",
      "/luxury-modern-cabin-interior-with-large-windows-wo.jpg",
    ],
    cover: "/project-2.jpg",
    year: "2023",
    size: "3,400 sq ft",
    type: "Custom Residence",
    services: "Architecture, Design-Build",
  },
  {
    slug: "glass-house",
    title: "Glass House",
    location: "Seattle, Washington",
    description:
      "Bold contemporary residence featuring extensive glass facades and minimalist design. Structural glazing systems create unobstructed views while maintaining thermal performance. Interior spaces flow seamlessly with carefully designed sight lines and natural light.",
    images: [
      "/modern-glass-house-reflecting-in-lake-at-sunset-wi.jpg",
      "/modern-minimalist-architecture-exterior-detail-bla.jpg",
      "/luxury-modern-living-room-wood-ceiling-concrete-fi.jpg",
    ],
    cover: "/modern-glass-house-reflecting-in-lake-at-sunset-wi.jpg",
    year: "2024",
    size: "4,800 sq ft",
    type: "Modern Residence",
    services: "Architecture, Structural Engineering, Design-Build",
  },
  {
    slug: "timber-frame-estate",
    title: "Timber Frame Estate",
    location: "Jackson Hole, Wyoming",
    description:
      "Grand timber frame construction showcasing traditional craftsmanship at its finest. Massive hand-hewn beams and mortise-and-tenon joinery create dramatic interior spaces. Custom details throughout celebrate natural materials and artisan skill.",
    images: ["/aerial.jpg", "/project-1.jpg", "/luxury-modern-cabin-interior-with-large-windows-wo1.jpg"],
    cover: "/aerial.jpg",
    year: "2024",
    size: "7,200 sq ft",
    type: "Luxury Estate",
    services: "Timber Framing, Design-Build, Custom Furnishings",
  },
]
