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
    question: "How does pricing work?",
    answer:
      "Projects are scoped as a fixed fee after a short discovery call. Starting points are on the Services section. Rush work, extra pages, and custom integrations are quoted separately so there are no surprises.",
  },
  {
    question: "How many revisions are included?",
    answer:
      "Two rounds of revisions are included after the first full draft. Small copy and spacing tweaks during those rounds are expected. Larger scope changes (new pages, new features) are estimated before they’re built.",
  },
  {
    question: "Can I edit the site myself after launch?",
    answer:
      "Yes. I build in Framer with CMS collections and clearly named components, so you can update copy, images, blog posts, and case studies yourself. I include a short handoff so you know what lives where.",
  },
  {
    question: "Who handles hosting and the domain?",
    answer:
      "Framer hosts the site. You keep your domain — I help connect it, set redirects, and check DNS. If you already have a domain at another registrar, we leave it there and point it at Framer.",
  },
];
