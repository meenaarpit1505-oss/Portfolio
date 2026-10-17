import { CaseStudyCta } from "@/components/case-study/CaseStudyCta";
import { CaseStudyToc } from "@/components/case-study/CaseStudyToc";
import { CountUpStat } from "@/components/case-study/CountUpStat";
import { ReadingProgress } from "@/components/case-study/ReadingProgress";
import { BeforeAfterSlider } from "@/components/case-study/BeforeAfterSlider";
import { Container } from "@/components/ui/Container";
import { BrowserFrame } from "@/components/work/BrowserFrame";
import { VisitLiveButton } from "@/components/work/VisitLiveButton";
import { getAdjacentProjects, getProject, projects } from "@/data/projects";
import { site } from "@/data/site";
import { fileExistsInPublic } from "@/lib/publicFile";
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
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: project.seo.title,
      description: project.seo.description,
      url: `${site.siteUrl}/work/${project.slug}`,
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

  return (
    <main id="main" className="pb-16 pt-28 sm:pt-32">
      <ReadingProgress />
      <Container>
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to work
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_220px]">
          <article>
            <header id="overview">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                {project.category}
                {project.placeholder ? " · Placeholder" : ""}
              </p>
              <h1 className="mt-3 font-display text-display font-semibold">{project.title}</h1>
              <p className="mt-4 text-lg text-muted">{project.result}</p>
              {project.liveUrl ? (
                <div className="mt-6">
                  <VisitLiveButton href={project.liveUrl} />
                </div>
              ) : null}
              <div className="mt-8">
                <BrowserFrame project={project} priority />
              </div>
            </header>

            <section id="results" className="mt-14 scroll-mt-28">
              <h2 className="font-display text-2xl font-semibold tracking-tight">Results</h2>
              <p className="mt-2 text-xs text-muted">Placeholder metrics — replace with live numbers.</p>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {project.results.map((metric) => (
                  <CountUpStat key={metric.label} metric={metric} />
                ))}
              </div>
            </section>

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

            <section id="before-after" className="mt-14 scroll-mt-28">
              <h2 className="font-display text-2xl font-semibold tracking-tight">Before / after</h2>
              <p className="mt-2 text-sm text-muted">Placeholder frames until a real redesign is published.</p>
              <div className="mt-6">
                <BeforeAfterSlider
                  beforeSrc={project.beforeImage}
                  afterSrc={project.afterImage}
                  beforeAlt={`${project.title} before, placeholder wireframe`}
                  afterAlt={`${project.title} after`}
                />
              </div>
            </section>

            <section id="gallery" className="mt-14 scroll-mt-28">
              <h2 className="font-display text-2xl font-semibold tracking-tight">Gallery</h2>
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {project.gallery.map((item) => {
                  const exists = fileExistsInPublic(item.src);
                  return (
                    <figure key={item.src} className="flex flex-col gap-3">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-surface">
                        {exists ? (
                          <Image
                            src={item.src}
                            alt={item.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-sm text-muted">
                            {item.alt}
                          </div>
                        )}
                      </div>
                      {item.caption ? (
                        <figcaption className="text-sm text-muted">{item.caption}</figcaption>
                      ) : null}
                    </figure>
                  );
                })}
              </div>
            </section>

            <section id="quote" className="mt-14 scroll-mt-28">
              <figure className="rounded-xl border border-border bg-surface p-6 sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">Client quote</p>
                  <span className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted">
                    Placeholder
                  </span>
                </div>
                <blockquote className="mt-4 font-display text-2xl font-semibold tracking-tight">
                  “{project.quote.text}”
                </blockquote>
                <figcaption className="mt-4 text-sm text-muted">
                  {project.quote.name}, {project.quote.role} · {project.quote.company}
                </figcaption>
              </figure>
            </section>

            <nav
              aria-label="Project pagination"
              className="mt-16 grid grid-cols-1 gap-4 border-t border-border pt-10 sm:grid-cols-2"
            >
              <Link
                href={`/work/${previous.slug}`}
                className="card-lift rounded-xl border border-border bg-surface p-6"
              >
                <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted">
                  <ArrowLeft className="h-3.5 w-3.5" /> Previous
                </p>
                <p className="mt-2 font-display text-xl font-semibold">{previous.title}</p>
              </Link>
              <Link
                href={`/work/${next.slug}`}
                className="card-lift rounded-xl border border-border bg-surface p-6 sm:text-right"
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

          <CaseStudyToc />
        </div>
      </Container>
    </main>
  );
}
