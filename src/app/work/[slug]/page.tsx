import React from "react";
import Link from "next/link";
import Image from "next/image";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { content } from "@/data/content";
import { ArrowLeft, ArrowRight, ExternalLink, Layers, Image as ImageIcon } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const DEFAULT_BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxMTEyMTYiLz48L3N2Zz4=";

function fileExistsInPublic(relativePath: string): boolean {
  try {
    if (typeof relativePath !== "string" || relativePath.includes("..")) {
      return false;
    }
    const publicDir = path.resolve(process.cwd(), "public");
    const cleanPath = path.normalize(relativePath).replace(/^[/\\]+/, "");
    const resolvedPath = path.resolve(publicDir, cleanPath);
    if (!resolvedPath.startsWith(publicDir + path.sep) && resolvedPath !== publicDir) {
      return false;
    }
    return fs.existsSync(resolvedPath);
  } catch {
    return false;
  }
}

export async function generateStaticParams() {
  return content.projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = content.projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const siteUrl = content.metadata.siteUrl;
  const pageUrl = `${siteUrl}/work/${project.slug}`;
  const ogImageUrl = project.seo.ogImage.startsWith("http")
    ? project.seo.ogImage
    : `${siteUrl}${project.seo.ogImage}`;

  return {
    title: `${project.seo.title} — ${content.personal.name}`,
    description: project.seo.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: project.seo.title,
      description: project.seo.description,
      url: pageUrl,
      type: "article",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.seo.title,
      description: project.seo.description,
      images: [ogImageUrl],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const projectIndex = content.projects.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = content.projects[projectIndex];
  const prevProject =
    projectIndex > 0 ? content.projects[projectIndex - 1] : content.projects[content.projects.length - 1];
  const nextProject =
    projectIndex < content.projects.length - 1 ? content.projects[projectIndex + 1] : content.projects[0];

  const hasHeroImage = fileExistsInPublic(project.heroImage);

  return (
    <main className="min-h-screen bg-background text-foreground px-4 sm:px-12 lg:px-20 py-20 sm:py-28 relative overflow-hidden animate-case-study-enter">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[400px] bg-accent-purple/15 blur-[160px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[350px] bg-accent-pink/15 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto">
        {/* Top Navigation HUD */}
        <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] mb-8 sm:mb-12">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-muted hover:text-foreground uppercase transition-colors group min-h-[44px]"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-accent-purple group-hover:-translate-x-1 transition-transform" />
            <span>BACK TO WORK GALLERY</span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono tracking-widest text-muted uppercase">
              PROJECT {String(projectIndex + 1).padStart(2, "0")} / {String(content.projects.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Category & Year Telemetry */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-pink/30 bg-accent-pink/10 backdrop-blur-md">
            <Layers className="w-3 h-3 text-accent-pink" />
            <span className="text-[10px] font-mono tracking-widest text-accent-pink uppercase font-medium">
              {project.category}
            </span>
          </div>

          {project.type === "concept" ? (
            <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-accent-purple uppercase border border-accent-purple/30 bg-accent-purple/10 backdrop-blur-md font-medium">
              Concept project
            </span>
          ) : project.client ? (
            <span className="text-xs font-mono text-muted uppercase">
              CLIENT: {project.client}
            </span>
          ) : null}

          <span className="text-white/20 font-mono">/</span>
          <span className="text-xs font-mono tracking-widest text-accent-purple font-semibold">
            {"// ARCHIVE"} {String(project.number).padStart(2, "0")}
          </span>
          <span className="text-white/20 font-mono">/</span>
          <span className="text-xs font-mono text-muted uppercase">
            YEAR: {project.year}
          </span>
        </div>

        {/* Project Title & Tagline */}
        <h1 className="font-serif text-[clamp(2.4rem,7vw,6.5rem)] font-normal tracking-tight leading-[0.92] text-foreground uppercase mb-6">
          {project.title}
        </h1>

        <p className="text-base sm:text-2xl font-sans text-foreground/80 leading-relaxed font-light mb-10 sm:mb-14 max-w-3xl">
          {project.tagline}
        </p>

        {/* Visual Hero Showcase (Next/Image if present, or styled technical placeholder) */}
        <div className="mb-12 sm:mb-16">
          {hasHeroImage ? (
            <div className="relative w-full rounded-3xl overflow-hidden border border-white/[0.1] shadow-[0_30px_70px_rgba(0,0,0,0.6)]">
              <Image
                src={project.heroImage}
                alt={project.title}
                width={1920}
                height={1080}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                placeholder="blur"
                blurDataURL={DEFAULT_BLUR_DATA_URL}
                className="w-full h-auto object-cover rounded-3xl"
              />
            </div>
          ) : (
            <div className="w-full min-h-[320px] sm:min-h-[460px] rounded-3xl bg-gradient-to-br from-surface-secondary via-surface-tertiary to-surface-secondary border border-white/[0.1] relative overflow-hidden flex flex-col items-center justify-center p-6 sm:p-8 text-center shadow-[0_30px_70px_rgba(0,0,0,0.6)]">
              <div className="absolute inset-0 bg-accent-glow opacity-30" />
              <div className="absolute inset-0 bg-[radial-gradient(#8B5CF6_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />

              {/* Corner HUD Badges */}
              <div className="absolute top-4 left-5 sm:top-6 sm:left-6 text-[9px] font-mono tracking-widest text-muted uppercase">
                STATUS: {project.statusLabel}
              </div>
              <div className="absolute top-4 right-5 sm:top-6 sm:right-6 text-[9px] font-mono tracking-widest text-accent-purple uppercase">
                {project.targetLabel || "60 FPS WEBGL"}
              </div>

              <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-4 max-w-lg mt-6 sm:mt-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-accent-pink shadow-[0_0_20px_rgba(236,72,153,0.2)]">
                  <ImageIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>

                <div className="flex flex-col items-center gap-1.5">
                  <span className="font-serif text-2xl sm:text-4xl text-foreground font-normal">
                    {project.title}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-accent-pink uppercase font-medium">
                    HERO SHOWCASE IMAGE PLACEHOLDER
                  </span>
                </div>

                <div className="mt-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-background/80 border border-white/10 font-mono text-[11px] sm:text-xs text-muted flex items-center gap-2 max-w-full overflow-hidden">
                  <span className="text-accent-purple font-semibold flex-shrink-0">Expected:</span>
                  <code className="text-foreground truncate">{project.heroImage}</code>
                </div>

                <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-muted/60 uppercase">
                  Target: 1920 × 1080 px • WebP format • &lt; 400 KB
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Project Metadata Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface/60 border border-white/[0.08] backdrop-blur-xl mb-14 sm:mb-20 shadow-[0_15px_40px_rgba(0,0,0,0.3)]">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-muted uppercase block mb-1.5">
              {project.type === "client" ? "CLIENT" : "PROJECT TYPE"}
            </span>
            {project.type === "concept" ? (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase bg-accent-purple/15 text-accent-purple border border-accent-purple/30 font-medium">
                Concept project
              </span>
            ) : (
              <span className="text-sm font-sans text-foreground font-medium">
                {project.client}
              </span>
            )}
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-muted uppercase block mb-1.5">
              MY ROLE
            </span>
            <span className="text-sm font-sans text-foreground font-medium">
              {project.role}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-muted uppercase block mb-1.5">
              TIMELINE
            </span>
            <span className="text-sm font-sans text-foreground font-medium">
              {project.year}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-muted uppercase block mb-1.5">
              DELIVERABLE
            </span>
            <span className="text-sm font-sans text-accent-purple font-medium">
              {project.deliverable}
            </span>
          </div>
        </div>

        {/* Deep Case Content: Brief, Approach, Impact */}
        <div className="space-y-16">
          {/* 1. Brief */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <span className="text-[10px] font-mono tracking-widest text-accent-purple uppercase block mb-2 font-semibold">
                01 // THE CHALLENGE
              </span>
              <h2 className="font-serif text-3xl text-foreground font-normal uppercase">
                THE BRIEF
              </h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-base sm:text-lg font-sans text-muted leading-relaxed font-light">
                {project.brief}
              </p>
            </div>
          </div>

          <div className="w-full h-[1px] bg-white/[0.06]" />

          {/* 2. Approach & Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <span className="text-[10px] font-mono tracking-widest text-accent-pink uppercase block mb-2 font-semibold">
                02 // {project.focusLabel}
              </span>
              <h2 className="font-serif text-3xl text-foreground font-normal uppercase">
                THE APPROACH
              </h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-base sm:text-lg font-sans text-muted leading-relaxed font-light mb-8">
                {project.approach}
              </p>

              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-mono tracking-widest text-muted uppercase">
                  STACK & LIBRARIES INVOLVED
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 text-xs font-mono tracking-wider rounded-xl bg-white/[0.03] border border-white/[0.08] text-foreground/90 uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-white/[0.06]" />

          {/* 3. Result & Quantifiable Impact */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase block mb-2 font-semibold">
                03 // QUANTIFIABLE IMPACT
              </span>
              <h2 className="font-serif text-3xl text-foreground font-normal uppercase">
                THE RESULT
              </h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-base sm:text-lg font-sans text-muted leading-relaxed font-light">
                {project.result}
              </p>

              {/* Verified Metrics Card (only rendered when real metrics exist) */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 sm:p-8 rounded-3xl bg-surface/40 border border-white/[0.08] mt-8">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="font-serif text-3xl sm:text-4xl text-foreground font-light bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                        {m.value}
                      </span>
                      <span className="text-[10px] font-mono tracking-widest text-muted uppercase mt-2">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Gallery Grid Section */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mt-24 pt-16 border-t border-white/[0.08]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-accent-purple uppercase block mb-1 font-semibold">
                  04 // VISUAL ARCHIVE
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-foreground font-normal uppercase">
                  SYSTEM BREAKDOWN & VIEWS
                </h3>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-muted uppercase">
                {String(project.gallery.length).padStart(2, "0")} ARCHIVE EXHIBITS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {project.gallery.map((item, gIdx) => {
                const itemExists = fileExistsInPublic(item.src);

                return (
                  <div key={gIdx} className="flex flex-col gap-3 group">
                    {itemExists ? (
                      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/[0.08] bg-surface-secondary shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          placeholder="blur"
                          blurDataURL={DEFAULT_BLUR_DATA_URL}
                          className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-2xl"
                        />
                      </div>
                    ) : (
                      <div className="relative w-full aspect-[16/10] rounded-2xl border border-white/[0.08] bg-surface/40 backdrop-blur-md overflow-hidden flex flex-col items-center justify-center p-6 text-center group-hover:border-accent-purple/40 transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-accent-purple mb-3">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-mono text-foreground font-medium mb-1">
                          {item.alt}
                        </span>
                        <code className="text-[10px] font-mono text-accent-pink bg-black/40 px-2 py-0.5 rounded border border-white/5 mb-2">
                          {item.src}
                        </code>
                        <span className="text-[9px] font-mono text-muted/60 uppercase">
                          Expected: 1200 × 800 px • WebP &lt; 400 KB
                        </span>
                      </div>
                    )}

                    {item.caption && (
                      <p className="text-xs font-sans text-muted leading-relaxed pl-1 font-light">
                        {item.caption}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Live CTA & Code Repo Links */}
        <div className="mt-20 pt-10 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-accent-purple to-accent-pink text-white font-mono text-xs tracking-widest uppercase flex items-center gap-2 hover:opacity-90 hover:scale-[1.02] transition-all shadow-[0_10px_25px_rgba(236,72,153,0.3)]"
              >
                <span>VISIT LIVE EXPERIENCE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-full border border-white/15 hover:border-white/30 bg-white/[0.03] text-muted hover:text-foreground font-mono text-xs tracking-widest uppercase flex items-center gap-2 transition-all"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>VIEW REPOSITORY</span>
              </a>
            )}
          </div>

          <Link
            href="/#work"
            className="text-xs font-mono tracking-widest text-muted hover:text-foreground uppercase transition-colors"
          >
            ← BACK TO ARCHIVES
          </Link>
        </div>

        {/* Case Study Pagination Footer (Next / Prev Project) */}
        <div className="mt-24 pt-12 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Previous Project */}
          <Link
            href={`/work/${prevProject.slug}`}
            className="group rounded-2xl border border-white/[0.06] bg-surface/40 hover:bg-surface/80 hover:border-white/20 p-6 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-muted uppercase mb-3">
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
              <span>PREVIOUS ARCHIVE</span>
            </div>
            <h4 className="font-serif text-xl sm:text-2xl text-foreground font-light group-hover:text-accent-purple transition-colors">
              {prevProject.title}
            </h4>
            <span className="text-[10px] font-mono text-muted uppercase mt-2">
              {prevProject.category}
            </span>
          </Link>

          {/* Next Project */}
          <Link
            href={`/work/${nextProject.slug}`}
            className="group rounded-2xl border border-white/[0.06] bg-surface/40 hover:bg-surface/80 hover:border-white/20 p-6 transition-all flex flex-col justify-between sm:items-end sm:text-right"
          >
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-muted uppercase mb-3">
              <span>NEXT ARCHIVE</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
            <h4 className="font-serif text-xl sm:text-2xl text-foreground font-light group-hover:text-accent-pink transition-colors">
              {nextProject.title}
            </h4>
            <span className="text-[10px] font-mono text-muted uppercase mt-2">
              {nextProject.category}
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
