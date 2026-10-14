"use client";

import React, { useState } from "react";
import { content } from "@/data/content";
import { Send, CheckCircle2, AlertCircle, ArrowUpRight, Mail } from "lucide-react";

export function ContactSection() {
  const { contact, socials, personal } = content;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setStatusMessage("Message dispatched successfully. I will get back to you shortly.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setStatusMessage(data.error || "Failed to deliver message. Please try again or email directly.");
      }
    } catch {
      setStatus("error");
      setStatusMessage("Network error. Please email directly at " + contact.email);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen px-4 sm:px-12 lg:px-20 py-20 sm:py-32 overflow-hidden flex flex-col justify-between"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Giant Serif Headline */}
        <div className="flex flex-col mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-pink/30 bg-accent-pink/10 backdrop-blur-md w-fit mb-4 sm:mb-6">
            <Mail className="w-3 h-3 text-accent-pink" />
            <span className="text-[10px] font-mono tracking-widest text-accent-pink uppercase">
              08 // TRANSMISSION INBOUND
            </span>
          </div>

          <h2 className="font-serif text-[clamp(2.4rem,7vw,7.5rem)] font-normal tracking-tight leading-[0.92] text-foreground uppercase max-w-5xl">
            {contact.heading}
          </h2>

          <p className="mt-4 sm:mt-6 text-sm sm:text-lg font-sans text-muted max-w-2xl font-light">
            {contact.subheading}
          </p>
        </div>

        {/* Contact Form and Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          {/* Left Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 sm:space-y-8">
            <div className="rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-surface/40 backdrop-blur-md p-6 sm:p-8">
              <span className="text-[10px] font-mono tracking-widest text-accent-purple uppercase block mb-2">
                DIRECT INQUIRIES
              </span>
              <a
                href={`mailto:${contact.email}`}
                data-cursor-text="EMAIL"
                className="text-base sm:text-xl font-mono text-foreground hover:text-accent-pink transition-colors break-all"
              >
                {contact.email}
              </a>
              <p className="text-xs font-sans text-muted mt-3">
                {contact.directNote}
              </p>
            </div>

            <div className="rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-surface/40 backdrop-blur-md p-6 sm:p-8">
              <span className="text-[10px] font-mono tracking-widest text-accent-pink uppercase block mb-4">
                LOCATIONS & TIMEZONES
              </span>
              <div className="space-y-2 text-sm font-mono text-muted">
                {contact.locations.map((loc, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>
                      {loc.city} ({loc.timezone})
                    </span>
                    <span className="text-foreground">{loc.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Link Badges */}
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-text="GITHUB"
                className="px-4 py-2.5 min-h-[44px] rounded-full border border-white/10 bg-white/[0.02] hover:border-accent-purple text-xs font-mono tracking-wider text-muted hover:text-foreground flex items-center gap-2 transition-all focus-visible:ring-2 focus-visible:ring-accent-purple"
              >
                <span>GITHUB</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-accent-purple" />
              </a>

              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-text="LINKEDIN"
                className="px-4 py-2.5 min-h-[44px] rounded-full border border-white/10 bg-white/[0.02] hover:border-accent-purple text-xs font-mono tracking-wider text-muted hover:text-foreground flex items-center gap-2 transition-all focus-visible:ring-2 focus-visible:ring-accent-purple"
              >
                <span>LINKEDIN</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-accent-purple" />
              </a>

              <a
                href={socials.x}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-text="X"
                className="px-4 py-2.5 min-h-[44px] rounded-full border border-white/10 bg-white/[0.02] hover:border-accent-pink text-xs font-mono tracking-wider text-muted hover:text-foreground flex items-center gap-2 transition-all focus-visible:ring-2 focus-visible:ring-accent-purple"
              >
                <span>X / TWITTER</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-accent-pink" />
              </a>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-surface/60 backdrop-blur-xl p-6 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            >
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[10px] font-mono tracking-widest text-muted uppercase mb-2"
                  >
                    NAME / ORGANIZATION
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Elena Rostova"
                    className="w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-foreground placeholder:text-muted/40 font-sans text-sm focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-[10px] font-mono tracking-widest text-muted uppercase mb-2"
                  >
                    EMAIL ADDRESS
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="elena@example.com"
                    className="w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-foreground placeholder:text-muted/40 font-sans text-sm focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-[10px] font-mono tracking-widest text-muted uppercase mb-2"
                  >
                    MESSAGE / PROJECT BRIEF
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell me about your project, timeline, and vision..."
                    className="w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-foreground placeholder:text-muted/40 font-sans text-sm focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-all resize-none"
                  />
                </div>

                {status === "success" && (
                  <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex items-center gap-3 text-emerald-400 text-xs font-mono">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>{statusMessage}</span>
                  </div>
                )}

                {status === "error" && (
                  <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/10 flex items-center gap-3 text-rose-400 text-xs font-mono">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{statusMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  data-cursor-text="SEND"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-accent-purple to-accent-pink hover:opacity-95 text-white font-mono text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_25px_rgba(139,92,246,0.4)] disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {status === "submitting" ? "TRANSMITTING..." : "DISPATCH TRANSMISSION"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto w-full pt-20 mt-20 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono tracking-widest text-muted uppercase">
        <span>© {new Date().getFullYear()} {personal.name}. ALL RIGHTS RESERVED.</span>
        <span>DESIGNED & ENGINEERED WITH NEXT.JS 15 & THREE.JS</span>
      </footer>
    </section>
  );
}
