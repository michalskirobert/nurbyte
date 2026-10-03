import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  Apple,
  ArrowLeft,
  Download,
  Github,
  HardDrive,
  History,
  Laptop,
  Search,
  ShieldCheck,
  TerminalSquare,
  Undo2,
  MessageSquareText,
} from "lucide-react";
import NurByteLogo from "@/components/NurByteLogo";
import styles from "./HostsEditor.module.scss";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nurbyte.dev";
const repository =
  process.env.HOSTS_EDITOR_GITHUB_REPO ?? "michalskirobert/hosts-editor";
const releasesUrl = `https://github.com/${repository}/releases/latest`;

type ReleaseAsset = {
  name: string;
  browser_download_url: string;
  size: number;
};

type GithubRelease = {
  tag_name: string;
  html_url: string;
  assets: ReleaseAsset[];
};

type Downloads = {
  version: string | null;
  releaseUrl: string;
  macArm: ReleaseAsset | null;
  macIntel: ReleaseAsset | null;
  windowsX64: ReleaseAsset | null;
  windowsArm: ReleaseAsset | null;
  linuxX64AppImage: ReleaseAsset | null;
  linuxX64Deb: ReleaseAsset | null;
  linuxArmAppImage: ReleaseAsset | null;
  linuxArmDeb: ReleaseAsset | null;
};

export const metadata: Metadata = {
  title: "Hosts File Editor – Free GUI for Windows, macOS & Linux",
  description:
    "Completely free, ad-free visual hosts file editor for Windows, macOS and Linux. Modern GUI for /etc/hosts with tabs, search, backups, import and safe writes.",
  keywords: [
    "hosts editor",
    "hosts file editor",
    "free hosts file editor",
    "GUI hosts editor",
    "edit hosts file",
    "edit /etc/hosts",
    "edit hosts without terminal",
    "macOS hosts editor",
    "Windows hosts editor",
    "Linux hosts editor",
    "hosts file manager",
    "developer hosts tool",
  ],
  alternates: { canonical: "/hosts-editor" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/hosts-editor`,
    title: "Hosts Editor – Free Hosts File Manager for Windows, macOS & Linux",
    description:
      "A completely free, ad-free cross-platform hosts file editor with a modern UI, tabs, Objects/Text modes, backups, safe writes and system-hosts import.",
    images: [
      {
        url: "/assets/projects/hosts-editor-2.2.0.webp",
        width: 1536,
        height: 970,
        alt: "Hosts Editor 2.2.0 desktop application by NurByte",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hosts Editor – Free GUI Hosts File Editor",
    description:
      "Free and ad-free modern hosts file editor for Windows, macOS and Linux.",
    images: ["/assets/projects/hosts-editor-2.2.0.webp"],
  },
};

function findAsset(assets: ReleaseAsset[], pattern: RegExp) {
  return assets.find((asset) => pattern.test(asset.name)) ?? null;
}

async function getDownloads(): Promise<Downloads> {
  const fallback: Downloads = {
    version: null,
    releaseUrl: releasesUrl,
    macArm: null,
    macIntel: null,
    windowsX64: null,
    windowsArm: null,
    linuxX64AppImage: null,
    linuxX64Deb: null,
    linuxArmAppImage: null,
    linuxArmDeb: null,
  };

  try {
    const response = await fetch(
      `https://api.github.com/repos/${repository}/releases/latest`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) return fallback;

    const release = (await response.json()) as GithubRelease;
    const assets = release.assets ?? [];

    return {
      version: release.tag_name || null,
      releaseUrl: release.html_url || releasesUrl,
      macArm: findAsset(assets, /mac-arm64\.dmg$/i),
      macIntel: findAsset(assets, /mac-x64\.dmg$/i),
      windowsX64: findAsset(assets, /win-x64\.zip$/i),
      windowsArm: findAsset(assets, /win-arm64\.zip$/i),
      linuxX64AppImage: findAsset(assets, /linux-x86_64\.AppImage$/i),
      linuxX64Deb: findAsset(assets, /linux-amd64\.deb$/i),
      linuxArmAppImage: findAsset(assets, /linux-arm64\.AppImage$/i),
      linuxArmDeb: findAsset(assets, /linux-arm64\.deb$/i),
    };
  } catch {
    return fallback;
  }
}

function formatSize(bytes: number) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function DownloadLink({
  asset,
  fallback,
  children,
  note,
}: {
  asset: ReleaseAsset | null;
  fallback: string;
  children: ReactNode;
  note: string;
}) {
  return (
    <a
      className={styles.downloadButton}
      href={asset?.browser_download_url ?? fallback}
      aria-label={`${String(children)} – ${note}`}
    >
      <Download aria-hidden="true" />
      <span>
        {children}
        <small>{note}</small>
      </span>
      <small>{asset ? formatSize(asset.size) : "GitHub"}</small>
    </a>
  );
}

export default async function HostsEditorPage() {
  const downloads = await getDownloads();

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "NurByte", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Hosts Editor",
        item: `${siteUrl}/hosts-editor`,
      },
    ],
  };

  const faqEntries = [
    [
      "What is Hosts Editor?",
      "Hosts Editor is a completely free, ad-free desktop GUI for managing the system hosts file on macOS, Windows and Linux. It gives developers a modern visual alternative to repeatedly editing /etc/hosts or the Windows hosts file by hand.",
    ],
    [
      "Can I edit the hosts file without Terminal or nano?",
      "Yes. Hosts Editor provides a graphical Objects mode and a Text mode. Applying changes to the protected system hosts file can still require administrator or root authorization.",
    ],
    [
      "Which download should I choose?",
      "Choose x64 for Intel/AMD 64-bit computers and ARM64 for Apple Silicon or ARM-based Windows/Linux devices. On Linux, uname -m returns x86_64 for x64 and aarch64 or arm64 for ARM64.",
    ],
    [
      "Is Hosts Editor free?",
      "Yes. Hosts Editor is completely free to download and use and contains no advertisements.",
    ],
    [
      "Can Hosts Editor create backups?",
      "Yes. Hosts Editor 2.2.0 supports manual backups and optional daily automatic backups. Automatic backups are cleaned up separately while manual backups are kept until you remove them.",
    ],
  ];

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqEntries.map(([name, text]) => ({
      "@type": "Question",
      name,
      acceptedAnswer: { "@type": "Answer", text },
    })),
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Hosts Editor",
    alternateName: "NurByte Hosts Editor",
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "Hosts file editor",
    operatingSystem: "macOS, Windows, Linux",
    url: `${siteUrl}/hosts-editor`,
    image: `${siteUrl}/assets/projects/hosts-editor-2.2.0.webp`,
    screenshot: `${siteUrl}/assets/projects/hosts-editor-2.2.0.webp`,
    description:
      "Completely free and ad-free cross-platform GUI hosts file editor with a modern interface, tabs, Objects and Text modes, search, system-hosts import, local backups, safe writes and update checks.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    downloadUrl: downloads.releaseUrl,
    ...(downloads.version ? { softwareVersion: downloads.version } : {}),
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
        <Link className={styles.back} href="/">
          <ArrowLeft aria-hidden="true" /> BACK TO HOME
        </Link>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>FREE GUI HOSTS FILE EDITOR // v2.2.0</p>
          <h1>
            HOSTS <span>EDITOR</span>
          </h1>
          <p className={styles.lede}>
            Edit and manage your hosts file without living in Terminal. A
            completely free, ad-free visual hosts file editor for macOS, Windows
            and Linux with a modern UI, tabs, search, backups, safe writes and
            both Objects and Text editing modes.
          </p>
          <div className={styles.heroBadges}>
            <span>100% FREE</span>
            <span>NO ADS</span>
            <span>NO ACCOUNT</span>
            <span>MAC / WIN / LINUX</span>
            <span>OPEN SOURCE</span>
          </div>
          <div className={styles.heroActions}>
            <a className={styles.primaryAction} href="#download">
              <Download aria-hidden="true" /> DOWNLOAD HOSTS EDITOR
            </a>
            <a
              className={styles.secondaryAction}
              href={`https://github.com/${repository}`}
            >
              <Github aria-hidden="true" /> VIEW SOURCE ON GITHUB
            </a>
          </div>
        </div>
        <figure className={styles.heroVisual}>
          <span className={styles.windowLabel}>HOSTS_EDITOR // 2.2.0</span>
          <Image
            src="/assets/projects/hosts-editor-2.2.0.webp"
            alt="Hosts Editor 2.2.0 showing settings, automatic backups, update checking, tabs and safe write status"
            width={1536}
            height={970}
            priority
            sizes="(max-width: 900px) 92vw, 48vw"
          />
          <figcaption className={styles.statusBar}>
            <span>● SAFE WRITE ENABLED</span>
            <span>MACOS / WINDOWS / LINUX</span>
          </figcaption>
        </figure>
      </section>

      <section className={styles.downloadSection} id="download">
        <div className={styles.sectionHeading}>
          <p>CHOOSE YOUR BUILD</p>
          <h2>DOWNLOAD HOSTS EDITOR</h2>
          <span>
            {downloads.version
              ? `LATEST RELEASE ${downloads.version}`
              : "LATEST GITHUB RELEASE"}
          </span>
        </div>

        <div className={styles.downloadGrid}>
          <article className={styles.platformCard}>
            <Apple aria-hidden="true" />
            <h3>macOS</h3>
            <p>
              Choose Apple Silicon for M-series Macs or Intel for older Intel
              Macs.
            </p>
            <div className={styles.buildList}>
              <DownloadLink
                asset={downloads.macArm}
                fallback={downloads.releaseUrl}
                note="ARM64 · M1 / M2 / M3 / M4+ · DMG"
              >
                APPLE SILICON
              </DownloadLink>
              <DownloadLink
                asset={downloads.macIntel}
                fallback={downloads.releaseUrl}
                note="x64 · Intel Mac · DMG"
              >
                INTEL 64-BIT
              </DownloadLink>
            </div>
          </article>

          <article className={styles.platformCard}>
            <Laptop aria-hidden="true" />
            <h3>Windows</h3>
            <p>
              Most Intel and AMD PCs use x64. Choose ARM64 only for Windows on
              ARM.
            </p>
            <div className={styles.buildList}>
              <DownloadLink
                asset={downloads.windowsX64}
                fallback={downloads.releaseUrl}
                note="x64 · Intel / AMD 64-bit · ZIP"
              >
                WINDOWS x64
              </DownloadLink>
              <DownloadLink
                asset={downloads.windowsArm}
                fallback={downloads.releaseUrl}
                note="ARM64 · Windows on ARM · ZIP"
              >
                WINDOWS ARM64
              </DownloadLink>
            </div>
          </article>

          <article className={styles.platformCard}>
            <TerminalSquare aria-hidden="true" />
            <h3>Linux</h3>
            <p>
              x86_64 means x64. aarch64/arm64 means ARM64. AppImage and Debian
              packages are available.
            </p>
            <div className={styles.buildList}>
              <DownloadLink
                asset={downloads.linuxX64AppImage}
                fallback={downloads.releaseUrl}
                note="x64 / x86_64 · AppImage"
              >
                LINUX x64
              </DownloadLink>
              <DownloadLink
                asset={downloads.linuxX64Deb}
                fallback={downloads.releaseUrl}
                note="x64 / amd64 · Debian / Ubuntu · DEB"
              >
                LINUX x64 DEB
              </DownloadLink>
              <DownloadLink
                asset={downloads.linuxArmAppImage}
                fallback={downloads.releaseUrl}
                note="ARM64 / aarch64 · AppImage"
              >
                LINUX ARM64
              </DownloadLink>
              <DownloadLink
                asset={downloads.linuxArmDeb}
                fallback={downloads.releaseUrl}
                note="ARM64 · Debian / Ubuntu · DEB"
              >
                LINUX ARM64 DEB
              </DownloadLink>
            </div>
          </article>
        </div>

        <aside className={styles.archHelp}>
          <div>
            <b>NOT SURE: x64 OR ARM64?</b>
            <p>
              There is no 32-bit/x86 build. Modern Intel/AMD computers normally
              use <strong>x64</strong>. Apple Silicon and ARM-based computers
              use <strong>ARM64</strong>.
            </p>
          </div>
          <code>
            <span>macOS / Linux</span>uname -m
          </code>
          <code>
            <span>RESULT</span>x86_64 → x64
            <br />
            arm64 / aarch64 → ARM64
          </code>
        </aside>
        <p className={styles.releaseNote}>
          Buttons resolve to the matching asset from the latest published GitHub
          release. Release metadata is cached for one hour.
        </p>
      </section>

      <section className={styles.features}>
        <div className={styles.sectionHeading}>
          <p>HOSTS EDITOR 2.2.0</p>
          <h2>A REAL UI FOR YOUR HOSTS FILE</h2>
        </div>
        <div className={styles.featureGrid}>
          <article>
            <HardDrive />
            <h3>TABS & WORKSPACES</h3>
            <p>
              Keep separate configurations for projects and environments instead
              of one giant manually commented hosts file.
            </p>
          </article>
          <article>
            <Search />
            <h3>OBJECTS + TEXT</h3>
            <p>
              Work with structured host records or switch to the raw Text
              editor. Search large configurations without losing context.
            </p>
          </article>
          <article>
            <History />
            <h3>SMART BACKUPS</h3>
            <p>
              Create manual backups or enable daily automatic snapshots.
              Automatic cleanup never removes your manual backups.
            </p>
          </article>
          <article>
            <ShieldCheck />
            <h3>SAFE WRITES</h3>
            <p>
              Import the current system hosts file, track real changes and
              deliberately apply the selected configuration to the protected
              system file.
            </p>
          </article>
          <article>
            <Undo2 />
            <h3>DISCARD CHANGES</h3>
            <p>
              Changed your mind? Restore the last saved hosts configuration
              instead of manually undoing every edit.
            </p>
          </article>
          <article>
            <MessageSquareText />
            <h3>HELP & FEEDBACK</h3>
            <p>
              Built-in bug reports and feature requests support optional
              privacy-friendly diagnostics without sending hosts entries or
              personal files.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.hostsInfo}>
        <div>
          <p className={styles.eyebrow}>
            EDIT HOSTS WITHOUT THE TERMINAL DETOUR
          </p>
          <h2>WHAT IS A HOSTS FILE EDITOR?</h2>
          <p>
            The hosts file maps hostnames to IP addresses locally before normal
            DNS resolution. Developers use it for local domains, staging
            servers, migrations and testing. Hosts Editor gives that system file
            a visual interface while keeping the actual hosts file as the source
            applied to your operating system.
          </p>
          <p>
            Instead of repeatedly opening <code>sudo nano /etc/hosts</code> or
            Notepad as Administrator, you can organize entries, search them,
            keep backups and apply changes from one cross-platform desktop app.
          </p>
        </div>
        <div className={styles.paths}>
          <code>
            <b>macOS / Linux hosts file</b>
            <span>/etc/hosts</span>
          </code>
          <code>
            <b>Windows hosts file</b>
            <span>C:\Windows\System32\drivers\etc\hosts</span>
          </code>
          <code>
            <b>Typical use cases</b>
            <span>localhost · dev · staging · migrations · test domains</span>
          </code>
        </div>
      </section>

      <section className={styles.faq}>
        <div className={styles.sectionHeading}>
          <p>HOSTS FILE HELP</p>
          <h2>HOSTS EDITOR FAQ</h2>
        </div>
        {faqEntries.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </section>

      <footer className={styles.footer}>
        <div>
          <b>NurByte</b> Software Lab <span>{"// HOSTS EDITOR"}</span>
        </div>
        <Link href="/">
          <ArrowLeft aria-hidden="true" /> RETURN TO NURBYTE
        </Link>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
    </main>
  );
}
