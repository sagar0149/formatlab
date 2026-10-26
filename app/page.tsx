
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Archive,
  AudioLines,
  ChevronDown,
  FileArchive,
  FileImage,
  FileText,
  Film,
  Image as ImageIcon,
  LockKeyhole,
  Menu,
  Monitor,
  Music2,
  Search,
  ShieldCheck,
  Sparkles,
  Zap,
  X,
} from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";

type Category =
  | "All"
  | "PDF"
  | "Image"
  | "Document"
  | "Video"
  | "Audio"
  | "Archive";

type Tool = {
  name: string;
  description: string;
  category: Exclude<Category, "All">;
  formats: string;
  icon: typeof FileText;
  color: string;
  href: string;
};

const categories: { name: Category; icon: typeof FileText }[] = [
  { name: "All", icon: Sparkles },
  { name: "PDF", icon: FileText },
  { name: "Image", icon: ImageIcon },
  { name: "Document", icon: FileText },
  { name: "Video", icon: Film },
  { name: "Audio", icon: Music2 },
  { name: "Archive", icon: Archive },
];

const tools: Tool[] = [
  {
    name: "Image Converter",
    description: "Convert image formats easily",
    category: "Image",
    formats: "JPG, PNG, WebP, etc.",
    icon: ImageIcon,
    color: "green",
    href: "/tools/image-converter",
  },
  {
    name: "Image Resizer",
    description: "Resize images precisely",
    category: "Image",
    formats: "Pixels or percentage",
    icon: FileImage,
    color: "purple",
    href: "/tools/image-resizer",
  },
  {
    name: "Image Compressor",
    description: "Reduce image file size",
    category: "Image",
    formats: "Quality and size controls",
    icon: FileImage,
    color: "red",
    href: "/tools/image-compressor",
  },
  {
    name: "PDF to Word",
    description: "Convert PDF documents",
    category: "PDF",
    formats: "PDF to DOCX",
    icon: FileText,
    color: "blue",
    href: "/tools/pdf-to-word",
  },
  {
    name: "Word to PDF",
    description: "Create PDF documents",
    category: "Document",
    formats: "DOCX to PDF",
    icon: FileText,
    color: "blue",
    href: "/tools/word-to-pdf",
  },
  {
    name: "Merge PDF",
    description: "Combine multiple PDFs",
    category: "PDF",
    formats: "Multiple PDFs to one",
    icon: FileText,
    color: "red",
    href: "/tools/pdf-merger",
  },
  {
    name: "Split PDF",
    description: "Extract pages from PDFs",
    category: "PDF",
    formats: "Select page ranges",
    icon: FileText,
    color: "red",
    href: "/tools/pdf-splitter",
  },
  {
    name: "Compress PDF",
    description: "Reduce PDF file size",
    category: "PDF",
    formats: "PDF optimization",
    icon: FileText,
    color: "red",
    href: "/tools/pdf-compressor",
  },
  {
    name: "PDF to Images",
    description: "Turn pages into images",
    category: "PDF",
    formats: "PDF to JPG or PNG",
    icon: FileImage,
    color: "orange",
    href: "/tools/pdf-to-images",
  },
  {
    name: "Images to PDF",
    description: "Create PDFs from images",
    category: "PDF",
    formats: "JPG or PNG to PDF",
    icon: FileText,
    color: "red",
    href: "/tools/images-to-pdf",
  },
  {
    name: "Video Converter",
    description: "Convert video formats",
    category: "Video",
    formats: "MP4 and more",
    icon: Film,
    color: "purple",
    href: "/tools/video-converter",
  },
  {
    name: "Audio Converter",
    description: "Convert audio formats",
    category: "Audio",
    formats: "MP3, WAV and more",
    icon: AudioLines,
    color: "orange",
    href: "/tools/audio-converter",
  },
  {
    name: "ZIP Extractor",
    description: "Extract archive contents",
    category: "Archive",
    formats: "ZIP archives",
    icon: FileArchive,
    color: "blue",
    href: "/tools/zip",
  },
];

const benefits = [
  {
    title: "No Installation",
    detail: "Works in your browser",
    icon: Monitor,
  },
  {
    title: "Secure & Private",
    detail: "Privacy-focused processing",
    icon: LockKeyhole,
  },
  {
    title: "High Quality",
    detail: "Quality-conscious tools",
    icon: Zap,
  },
  {
    title: "Free to Use",
    detail: "Start without an account",
    icon: ShieldCheck,
  },
];

function Brand() {
  return (
    <Link href="/" className="brand" aria-label="FormatLab home">
      <span className="brand-mark">
        <span>F</span>
      </span>
      <span>FormatLab</span>
    </Link>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<Category>("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return tools.filter((tool) => {
      const matchesCategory =
        activeCategory === "All" ||
        tool.category === activeCategory;

      const searchableText =
        `${tool.name} ${tool.description} ${tool.formats} ${tool.category}`
          .toLowerCase();

      return (
        matchesCategory &&
        (!normalizedQuery || searchableText.includes(normalizedQuery))
      );
    });
  }, [query, activeCategory]);

  function focusSearch() {
    document.getElementById("tool-search")?.focus();
  }

  return (
    <main className="site-shell">
      <header className="site-header">
        <div className="header-inner">
          <Brand />

          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#tools">Tools</a>
            <a href="#tools">Convert</a>
            <a href="#tools">Compress</a>
            <a href="#tools">Edit</a>
            <a href="#features" className="nav-more">
              More <ChevronDown size={13} />
            </a>
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="icon-button search-shortcut"
              aria-label="Focus tool search"
              onClick={focusSearch}
            >
              <Search size={17} />
            </button>

            <ThemeToggle />

            <Link className="button button-quiet sign-in" href="/login">
              Sign In
            </Link>

            <a className="button button-primary get-started" href="#tools">
              Get Started
            </a>

            <button
              type="button"
              className="icon-button mobile-menu-button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <a href="#tools" onClick={() => setMobileMenuOpen(false)}>
              Tools
            </a>
            <a href="#tools" onClick={() => setMobileMenuOpen(false)}>
              Convert
            </a>
            <a href="#tools" onClick={() => setMobileMenuOpen(false)}>
              Compress
            </a>
            <a href="#features" onClick={() => setMobileMenuOpen(false)}>
              Features
            </a>
          </nav>
        )}
      </header>

      <div className="page-container">
        {/* Search appears directly below the navigation. */}
        <section className="top-search-section" aria-label="Find a tool">
          <form
            className="tool-search top-tool-search"
            onSubmit={(event) => {
              event.preventDefault();
              document.getElementById("tools")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            <Search size={19} />

            <input
              id="tool-search"
              type="search"
              placeholder="Search tools... (e.g. PDF to Word, Image Resize)"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search file tools"
            />

            {query && (
              <button
                type="button"
                className="clear-search"
                aria-label="Clear search"
                onClick={() => setQuery("")}
              >
                <X size={16} />
              </button>
            )}

            <button
              type="submit"
              className="search-submit"
              aria-label="Search tools"
            >
              <Search size={18} />
            </button>
          </form>
        </section>

        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <Sparkles size={12} />
              Your All-in-One File Toolkit
            </div>

            <h1>
              Convert, Compress, Edit
              <br className="desktop-break" /> Files{" "}
              <span className="gradient-text">Easily</span>
            </h1>

            <p className="hero-description">
              FormatLab is your workspace for everyday file tools.
              Convert, optimize, and manage your files with a simple,
              intuitive experience on any device.
            </p>

            <div className="hero-actions">
              <a href="#tools" className="button button-primary hero-cta">
                Explore Tools <ArrowRight size={16} />
              </a>

              <a href="#features" className="button button-outline">
                <span className="play-icon">▶</span>
                See How It Works
              </a>
            </div>
          </div>

          <div
            className="format-art"
            aria-label="Supported file formats illustration"
          >
            <div className="art-glow" />

            <svg
              className="art-connections"
              viewBox="0 0 400 320"
              fill="none"
              aria-hidden="true"
            >
              <path d="M200 158 L80 65 L20 110" />
              <path d="M200 158 L300 42 L375 88" />
              <path d="M200 158 L325 190 L370 255" />
              <path d="M200 158 L100 238 L30 275" />
              <path d="M200 158 L200 280" />
              <path d="M80 65 L120 130 L20 110" />
              <path d="M300 42 L275 105 L375 88" />
              <circle cx="80" cy="65" r="3" />
              <circle cx="300" cy="42" r="3" />
              <circle cx="325" cy="190" r="3" />
              <circle cx="100" cy="238" r="3" />
            </svg>

            <div className="file-node node-pdf">
              <FileText size={24} />
              <span>PDF</span>
            </div>

            <div className="file-node node-jpg">
              <ImageIcon size={24} />
              <span>JPG</span>
            </div>

            <div className="file-node node-png">
              <FileImage size={24} />
              <span>PNG</span>
            </div>

            <div className="file-node node-doc">
              <FileText size={24} />
              <span>DOC</span>
            </div>

            <div className="file-node node-mp4">
              <Film size={24} />
              <span>MP4</span>
            </div>

            <div className="file-node node-music">
              <Music2 size={25} />
            </div>

            <div className="format-core">
              <span className="core-symbol">F</span>
              <span className="core-caption">FORMATLAB</span>
            </div>

            <span className="art-spark spark-one">✦</span>
            <span className="art-spark spark-two">✧</span>
            <span className="art-spark spark-three">✦</span>
          </div>
        </section>

        <section
          className="benefits"
          id="features"
          aria-label="Platform benefits"
        >
          {benefits.map(({ title, detail, icon: Icon }) => (
            <div className="benefit" key={title}>
              <span className="benefit-icon">
                <Icon size={19} />
              </span>

              <span className="benefit-copy">
                <strong>{title}</strong>
                <span>{detail}</span>
              </span>
            </div>
          ))}
        </section>

        <section className="tool-directory" id="tools">
          <div className="directory-heading">
            <div>
              <span className="section-kicker">YOUR FILE WORKSPACE</span>
              <h2>What would you like to do?</h2>
              <p>Find the right tool for your next task.</p>
            </div>

            <span className="tool-count">
              {filteredTools.length} tools
            </span>
          </div>

          {/* The search form is intentionally not repeated here. */}
          <div
            className="category-list"
            aria-label="Filter tools by category"
          >
            {categories.map(({ name, icon: Icon }) => (
              <button
                key={name}
                type="button"
                className={`category-chip ${
                  activeCategory === name ? "active" : ""
                }`}
                onClick={() => setActiveCategory(name)}
                aria-pressed={activeCategory === name}
              >
                <Icon size={15} />
                {name}
              </button>
            ))}
          </div>

          <div className="tool-grid" id="tool-grid">
            {filteredTools.map(
              ({
                name,
                description,
                formats,
                icon: Icon,
                color,
                href,
              }) => (
                <Link href={href} className="tool-card" key={name}>
                  <span className={`tool-icon ${color}`}>
                    <Icon size={21} />
                  </span>

                  <span className="tool-card-title">{name}</span>
                  <span className="tool-card-description">
                    {description}
                  </span>
                  <span className="tool-card-formats">{formats}</span>

                  <ArrowRight
                    className="tool-card-arrow"
                    size={16}
                  />
                </Link>
              ),
            )}
          </div>

          {filteredTools.length === 0 && (
            <div className="empty-state">
              <Search size={28} />
              <h3>No matching tools found</h3>
              <p>Try another search or select a different category.</p>

              <button
                type="button"
                className="button button-outline"
                onClick={() => {
                  setQuery("");
                  setActiveCategory("All");
                }}
              >
                Clear filters
              </button>
            </div>
          )}

          <div className="directory-footer">
            <span>
              Showing {filteredTools.length} of {tools.length} tools
            </span>

            <button
              type="button"
              className="text-link"
              onClick={() => {
                setQuery("");
                setActiveCategory("All");
              }}
            >
              View All Tools <ArrowRight size={15} />
            </button>
          </div>
        </section>

        <section className="feature-strip">
          <div className="feature-strip-icon">
            <Sparkles size={24} />
          </div>

          <div className="feature-strip-copy">
            <span className="section-kicker">
              LESS WORK, BETTER RESULTS
            </span>
            <h2>Your files. Your workflow. Made simpler.</h2>
            <p>
              Discover focused tools designed to make everyday file tasks
              feel effortless.
            </p>
          </div>

          <a href="#tools" className="button button-primary">
            Explore tools <ArrowRight size={16} />
          </a>
        </section>

        <footer className="site-footer">
          <div className="footer-main">
            <div className="footer-brand">
              <Brand />
              <p>
                One simple workspace for your everyday file tasks.
              </p>
            </div>

            <div className="footer-links">
              <a href="#tools">All tools</a>
              <a href="#features">Features</a>
              <a href="#privacy">Privacy</a>
            </div>
          </div>

          <div className="footer-bottom" id="privacy">
            <span>© 2026 FormatLab</span>
            <span>
              <ShieldCheck size={14} />
              Built with privacy in mind
            </span>
          </div>
        </footer>
      </div>
    </main>
  );
}
