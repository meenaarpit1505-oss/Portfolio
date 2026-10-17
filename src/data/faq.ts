export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: "How long does a typical project take?",
    answer:
      "Landing pages usually take 1–2 weeks. Full marketing sites take 2–4 weeks, depending on copy, pages, and CMS. Migrations depend on how much content needs to move. I share a timeline before we start.",
  },
  {
    question: "How much does a Framer website cost?",
    answer:
      "Landing pages start at $1,500 and full marketing sites at $4,000. Email me your project details and I'll send a fixed quote within 24 hours.",
  },
  {
    question: "How many revisions are included?",
    answer:
      "Two rounds of revisions at the design stage and one round after the build. Small tweaks during launch support are included.",
  },
  {
    question: "Can I edit the site myself after launch?",
    answer:
      "Yes. Everything is built with Framer CMS and clearly named components, and I include a short handoff video.",
  },
  {
    question: "Do you handle hosting and domains?",
    answer:
      "Yes. I connect your domain, set up redirects, analytics, and forms, and make sure everything is live before handoff.",
  },
];
