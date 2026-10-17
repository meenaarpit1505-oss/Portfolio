export interface Testimonial {
  name: string;
  role: string;
  company: string;
  photo: string;
  quote: string;
  rating: 5;
  featured?: boolean;
  placeholder: true;
}

export const testimonials: Testimonial[] = [
  {
    name: "Maya Patel",
    role: "Head of Growth",
    company: "Northbound",
    photo: "/testimonials/maya-patel.svg",
    quote:
      "We went from a Figma file to a live Framer page in under two weeks. The structure is clean, and our team can edit copy without pinging a developer.",
    rating: 5,
    featured: true,
    placeholder: true,
  },
  {
    name: "James Okonkwo",
    role: "Founder",
    company: "Meridian Studio",
    photo: "/testimonials/james-okonkwo.svg",
    quote:
      "The site looks like our work, not a template. Case studies publish from CMS, and the performance numbers are where they should be.",
    rating: 5,
    placeholder: true,
  },
  {
    name: "Arden Lee",
    role: "Photographer",
    company: "Studio Arden",
    photo: "/testimonials/arden-lee.svg",
    quote:
      "Quiet, fast, and easy to update after each shoot. I send the site to clients now instead of a PDF.",
    rating: 5,
    placeholder: true,
  },
  {
    name: "Sofia Nguyen",
    role: "Product manager",
    company: "Lumen Co",
    photo: "/testimonials/sofia-nguyen.svg",
    quote:
      "Pixel-accurate to Figma, then better in motion. We launched a waitlist page in nine days and started taking sign-ups the same afternoon.",
    rating: 5,
    placeholder: true,
  },
  {
    name: "Theo Brooks",
    role: "Director",
    company: "Harbor Labs",
    photo: "/testimonials/theo-brooks.svg",
    quote:
      "Clear updates in writing, async-friendly across time zones, and a CMS we actually use. This is how a Framer build should feel.",
    rating: 5,
    placeholder: true,
  },
  {
    name: "Priya Shah",
    role: "Marketing lead",
    company: "Independently",
    photo: "/testimonials/priya-shah.svg",
    quote:
      "We swapped colors, connected CMS, and published the same day. The components are named the way a non-developer would look for them.",
    rating: 5,
    placeholder: true,
  },
];
