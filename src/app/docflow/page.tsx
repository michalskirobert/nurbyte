import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Braces,
  Calculator,
  FileOutput,
  FileText,
  Mail,
  ReceiptText,
  Sparkles,
} from "lucide-react";
import NurByteLogo from "@/components/NurByteLogo";
import styles from "./DocFlow.module.scss";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nurbyte.dev";
const appUrl = "https://docflow.nurbyte.dev";

export const metadata: Metadata = {
  title: "Document Generator & Template Builder | DocFlow by NurByte",
  description:
    "Create reusable document templates, generate PDF documents, prepare email content and manage invoicing workflows with DocFlow by NurByte.",
  keywords: [
    "document generator",
    "document template builder",
    "PDF document generator",
    "document automation",
    "reusable document templates",
    "email template software",
    "invoice workflow",
    "DocFlow",
  ],
  alternates: { canonical: "/docflow" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/docflow`,
    title: "DocFlow — Document Generator & Template Builder",
    description:
      "Build reusable templates, generate documents, prepare email content and manage invoicing workflows in one workspace.",
    images: [
      {
        url: "/assets/projects/docflow-dashboard.webp",
        alt: "DocFlow document workflow application dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DocFlow — Document Generator & Template Builder",
    description:
      "Reusable templates, document generation, email preparation and invoicing workflows by NurByte.",
    images: ["/assets/projects/docflow-dashboard.webp"],
  },
};

const features = [
  {
    icon: FileText,
    title: "REUSABLE TEMPLATES",
    text: "Build and edit reusable document templates instead of recreating the same structure for every document.",
  },
  {
    icon: Braces,
    title: "VARIABLES",
    text: "Insert structured variables into templates and reuse the same layout with different project or document data.",
  },
  {
    icon: Calculator,
    title: "CALCULATIONS",
    text: "Use numeric fields and formulas where generated documents need calculated values rather than static text.",
  },
  {
    icon: FileOutput,
    title: "PDF OUTPUT",
    text: "Preview and generate finished documents as PDF while keeping the template as the reusable source.",
  },
  {
    icon: Mail,
    title: "EMAIL PREPARATION",
    text: "Prepare email subjects and bodies from your workflow, preview the result and copy the content when it is ready.",
  },
  {
    icon: ReceiptText,
    title: "INVOICING WORKFLOWS",
    text: "Keep document creation and invoicing-related work inside the same focused application instead of separate tools.",
  },
];

const faq = [
  {
    q: "What is DocFlow?",
    a: "DocFlow is a NurByte web application for building reusable document templates, generating documents, preparing email content and managing invoicing workflows from one workspace.",
  },
  {
    q: "Can I create reusable document templates?",
    a: "Yes. Templates are a core DocFlow workflow: create or edit a template, define reusable variables and use it to generate documents with different data.",
  },
  {
    q: "Can DocFlow generate PDF documents?",
    a: "Yes. DocFlow includes document preview and PDF generation so a reusable template can become a finished downloadable document.",
  },
  {
    q: "Does DocFlow help prepare emails?",
    a: "Yes. DocFlow can prepare email content from the document workflow, including a subject and body preview with a copy action.",
  },
];

export default function DocFlowPage() {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "NurByte", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "DocFlow",
        item: `${siteUrl}/docflow`,
      },
    ],
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "DocFlow",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `${siteUrl}/docflow`,
    sameAs: appUrl,
    image: `${siteUrl}/assets/projects/docflow-dashboard.webp`,
    description:
      "Document workflow software for reusable templates, document generation, email preparation and invoicing workflows.",
    creator: {
      "@type": "Organization",
      name: "NurByte Software Lab",
      url: siteUrl,
    },
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <main className={styles.page}>
      <div className={styles.scanlines} aria-hidden="true" />
      <header className={styles.header}>
        <Link
          className={styles.brand}
          href="/"
          aria-label="Back to NurByte home"
        >
          <NurByteLogo priority />
        </Link>
        <div className={styles.headerActions}>
          <Link className={styles.back} href="/">
            <ArrowLeft aria-hidden="true" /> BACK TO HOME
          </Link>
          <a className={styles.openAppSmall} href={appUrl}>
            OPEN APP <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>NURBYTE SAAS // DOCUMENT WORKFLOW</p>
          <h1>
            DOC<span>FLOW</span>
          </h1>
          <p className={styles.lede}>
            Create documents from reusable templates. Build structured
            templates, fill variables, generate PDFs, prepare email content and
            keep invoicing workflows in one focused workspace.
          </p>
          <div className={styles.heroBadges}>
            <span>TEMPLATES</span>
            <span>PDF</span>
            <span>EMAIL</span>
            <span>INVOICING</span>
          </div>
          <div className={styles.heroActions}>
            <a className={styles.primaryAction} href={appUrl}>
              OPEN DOCFLOW <ArrowRight aria-hidden="true" />
            </a>
            <a className={styles.secondaryAction} href="#features">
              EXPLORE FEATURES
            </a>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <span className={styles.windowLabel}>DOCFLOW.APP</span>
          <Image
            src="/assets/projects/docflow-dashboard.webp"
            alt="DocFlow dashboard for document templates and workflows"
            width={1052}
            height={787}
            priority
            sizes="(max-width: 900px) 92vw, 52vw"
          />
          <div className={styles.statusBar}>
            <span>● SYSTEM READY</span>
            <span>NURBYTE // DOCFLOW</span>
          </div>
        </div>
      </section>

      <section className={styles.intro}>
        <p className={styles.eyebrow}>DOCUMENT WORKSPACE</p>
        <h2>FROM TEMPLATE TO FINISHED DOCUMENT.</h2>
        <p>
          DocFlow keeps the repetitive parts of document work reusable. Define a
          template once, provide the changing data and use the same workflow for
          the next document instead of rebuilding it from scratch.
        </p>
      </section>

      <section className={styles.features} id="features">
        <div className={styles.sectionHeading}>
          <p>FEATURE DATABASE</p>
          <h2>WHAT DOCFLOW DOES</h2>
        </div>
        <div className={styles.featureGrid}>
          {features.map(({ icon: Icon, title, text }) => (
            <article key={title}>
              <Icon aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.workflow}>
        <div>
          <p className={styles.eyebrow}>WORKFLOW</p>
          <h2>ONE SOURCE. REUSABLE OUTPUT.</h2>
          <p>
            Keep the structure in a template and the changing values in document
            data. DocFlow brings editing, generation, preview and delivery
            preparation together without turning every new document into a new
            formatting task.
          </p>
        </div>
        <div className={styles.flowTerminal} aria-label="DocFlow workflow">
          <code>
            <b>01</b>
            <span>CREATE / EDIT TEMPLATE</span>
          </code>
          <code>
            <b>02</b>
            <span>ADD VARIABLES &amp; DATA</span>
          </code>
          <code>
            <b>03</b>
            <span>PREVIEW DOCUMENT</span>
          </code>
          <code>
            <b>04</b>
            <span>GENERATE PDF</span>
          </code>
          <code>
            <b>05</b>
            <span>PREPARE EMAIL</span>
          </code>
        </div>
      </section>

      <section className={styles.cta}>
        <Sparkles aria-hidden="true" />
        <div>
          <p className={styles.eyebrow}>READY?</p>
          <h2>OPEN DOCFLOW</h2>
          <p>
            Go directly to the application and start working with your documents
            and templates.
          </p>
        </div>
        <a className={styles.primaryAction} href={appUrl}>
          GO TO APP <ArrowRight aria-hidden="true" />
        </a>
      </section>

      <section className={styles.faq}>
        <div className={styles.sectionHeading}>
          <p>HELP DATABASE</p>
          <h2>DOCFLOW FAQ</h2>
        </div>
        {faq.map((item) => (
          <details key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </section>

      <footer className={styles.footer}>
        <div>
          <b>NurByte</b> Software Lab <span>// DOCFLOW</span>
        </div>
        <div className={styles.footerLinks}>
          <Link href="/">
            <ArrowLeft aria-hidden="true" /> RETURN TO NURBYTE
          </Link>
          <a href={appUrl}>
            OPEN DOCFLOW <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </footer>

      {[softwareData, breadcrumbData, faqData].map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </main>
  );
}
