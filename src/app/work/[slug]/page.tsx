import { CaseStudyCta } from "@/components/case-study/CaseStudyCta";
import { CaseStudyToc, type TocSection } from "@/components/case-study/CaseStudyToc";
import { CountUpStat } from "@/components/case-study/CountUpStat";
import { ReadingProgress } from "@/components/case-study/ReadingProgress";
import { BeforeAfterSlider } from "@/components/case-study/BeforeAfterSlider";
import { ConceptBadge } from "@/components/ui/ConceptBadge";
import { Container } from "@/components/ui/Container";
import { BrowserFrame } from "@/components/work/BrowserFrame";
import { VisitLiveButton } from "@/components/work/VisitLiveButton";
import { getAdjacentProjects, getLiveHttpsUrl, getProject, projects } from "@/data/projects";
import { SITE_URL } from "@/lib/config";
import { isRenderableProjectImage } from "@/lib/publicFile";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.seo.title,
    description: project.seo.description,
    alternates: { canonical: `${SITE_URL}/work/${project.slug}` },
    openGraph: {
      title: project.seo.title,
      description: project.seo.description,
      url: `${SITE_URL}/work/${project.slug}`,
      type: "article",
      images: [{ url: project.heroImage, width: 1200, height: 750, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.seo.title,
      description: project.seo.description,
      images: [project.heroImage],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(project.slug);
  const liveUrl = getLiveHttpsUrl(project.liveUrl);
  const hasResults = Boolean(project.metrics || (project.results && project.results.length > 0));
  const hasBeforeAfter = Boolean(
    project.beforeImage &&
      project.afterImage &&
      isRenderableProjectImage(project.beforeImage) &&
      isRenderableProjectImage(project.afterImage),
  );
  const galleryItems = project.gallery.filter((item) => isRenderableProjectImage(item.src));
  const toc: TocSection[] = [
    { id: "overview", label: "Overview" },
    ...(hasResults ? [{ id: "results", label: "Results" }] : []),
    { id: "challenge", label: "Challenge" },
    { id: "solution", label: "Solution" },
    ...(hasBeforeAfter ? [{ id: "before-after", label: "Before / after" }] : []),
    ...(galleryItems.length > 0 ? [{ id: "gallery", label: "Gallery" }] : []),
    ...(project.quote ? [{ id: "quote", label: "Quote" }] : []),
  ];

  return (
    <main id="main" className="pb-16 pt-28 sm:pt-32">
      <ReadingProgress />
      <Container>
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 rounded-md text-sm text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to work
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_220px]">
          <article>
            <header id="overview">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                  {project.category}
                </p>
                {project.concept ? <ConceptBadge /> : null}
              </div>
              <h1 className="mt-3 font-display text-display font-semibold">{project.title}</h1>
              <p className="mt-4 text-lg text-muted">{project.result}</p>
              {project.metrics ? <p className="mt-2 text-base text-muted">{project.metrics}</p> : null}
              {liveUrl ? (
                <div className="mt-6">
                  <VisitLiveButton href={liveUrl} />
                </div>
              ) : null}
              <div className="mt-8">
                <BrowserFrame project={project} priority />
              </div>
            </header>

            {hasResults ? (
              <section id="results" className="mt-14 scroll-mt-28">
                <h2 className="font-display text-2xl font-semibold tracking-tight">Results</h2>
                {project.metrics ? (
                  <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">{project.metrics}</p>
                ) : null}
                {project.results && project.results.length > 0 ? (
                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {project.results.map((metric) => (
                      <CountUpStat key={metric.label} metric={metric} />
                    ))}
                  </div>
                ) : null}
              </section>
            ) : null}

            <section id="challenge" className="mt-14 scroll-mt-28">
              <h2 className="font-display text-2xl font-semibold tracking-tight">The Challenge</h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">{project.challenge}</p>
            </section>

            <section id="solution" className="mt-14 scroll-mt-28">
              <h2 className="font-display text-2xl font-semibold tracking-tight">What I Built</h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">{project.solution}</p>
              <dl className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-surface p-5">
                  <dt className="text-sm font-semibold">CMS</dt>
                  <dd className="mt-2 text-sm text-muted">{project.built.cms}</dd>
                </div>
                <div className="rounded-xl border border-border bg-surface p-5">
                  <dt className="text-sm font-semibold">Interactions</dt>
                  <dd className="mt-2 text-sm text-muted">{project.built.interactions}</dd>
                </div>
                <div className="rounded-xl border border-border bg-surface p-5">
                  <dt className="text-sm font-semibold">Components</dt>
                  <dd className="mt-2 text-sm text-muted">{project.built.components}</dd>
                </div>
              </dl>
            </section>

            {hasBeforeAfter && project.beforeImage && project.afterImage ? (
              <section id="before-after" className="mt-14 scroll-mt-28">
                <h2 className="font-display text-2xl font-semibold tracking-tight">Before / after</h2>
                <div className="mt-6">
                  <BeforeAfterSlider
                    beforeSrc={project.beforeImage}
                    afterSrc={project.afterImage}
                    beforeAlt={`${project.title} before`}
                    afterAlt={`${project.title} after`}
                  />
                </div>
              </section>
            ) : null}

            {galleryItems.length > 0 ? (
              <section id="gallery" className="mt-14 scroll-mt-28">
                <h2 className="font-display text-2xl font-semibold tracking-tight">Gallery</h2>
                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {galleryItems.map((item) => (
                    <figure key={item.src} className="flex flex-col gap-3">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-surface">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                      {item.caption ? (
                        <figcaption className="text-sm text-muted">{item.caption}</figcaption>
                      ) : null}
                    </figure>
                  ))}
                </div>
              </section>
            ) : null}

            {project.quote ? (
              <section id="quote" className="mt-14 scroll-mt-28">
                <figure className="rounded-xl border border-border bg-surface p-6 sm:p-8">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">Client quote</p>
                  <blockquote className="mt-4 font-display text-2xl font-semibold tracking-tight">
                    “{project.quote.text}”
                  </blockquote>
                  <figcaption className="mt-4 text-sm text-muted">
                    {project.quote.name}, {project.quote.role} &middot; {project.quote.company}
                  </figcaption>
                </figure>
              </section>
            ) : null}

            <nav
              aria-label="Project pagination"
              className="mt-16 grid grid-cols-1 gap-4 border-t border-border pt-10 sm:grid-cols-2"
            >
              <Link
                href={`/work/${previous.slug}`}
                className="card-lift rounded-xl border border-border bg-surface p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted">
                  <ArrowLeft className="h-3.5 w-3.5" /> Previous
                </p>
                <p className="mt-2 font-display text-xl font-semibold">{previous.title}</p>
              </Link>
              <Link
                href={`/work/${next.slug}`}
                className="card-lift rounded-xl border border-border bg-surface p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:text-right"
              >
                <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted sm:justify-end">
                  Next <ArrowRight className="h-3.5 w-3.5" />
                </p>
                <p className="mt-2 font-display text-xl font-semibold">{next.title}</p>
              </Link>
            </nav>

            <div className="mt-12">
              <CaseStudyCta />
            </div>
          </article>

          <CaseStudyToc sections={toc} />
        </div>
      </Container>
    </main>
  );
}
