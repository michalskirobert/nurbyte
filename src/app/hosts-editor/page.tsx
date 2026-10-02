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
  published_at: string | null;
  assets: ReleaseAsset[];
};

type Downloads = {
  version: string | null;
  releaseUrl: string;
  macArm: ReleaseAsset | null;
  macIntel: ReleaseAsset | null;
  windows: ReleaseAsset | null;
  linux: ReleaseAsset | null;
};

export const metadata: Metadata = {
  title: "Free Hosts File Editor for macOS, Windows & Linux",
  description:
    "Download Hosts Editor by NurByte — a free cross-platform hosts file editor for macOS, Windows and Linux with profiles, search, backups and safe apply flows.",
  keywords: [
    "hosts editor",
    "hosts file editor",
    "free hosts editor",
    "macOS hosts editor",
    "Windows hosts editor",
    "Linux hosts editor",
    "edit hosts file mac",
    "edit hosts file windows",
    "developer tools",
  ],
  alternates: { canonical: "/hosts-editor" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/hosts-editor`,
    title: "Hosts Editor — Free for macOS, Windows & Linux",
    description:
      "Manage hosts entries, profiles and backups without manually editing the system hosts file.",
    images: [
      {
        url: "/assets/projects/hosts-editor-settings.webp",
        alt: "NurByte Hosts Editor",
      },
    ],
  },
};

function findAsset(
  assets: ReleaseAsset[],
  platform: RegExp,
  architecture?: RegExp,
) {
  const platformAssets = assets.filter((asset) => platform.test(asset.name));
  if (!architecture) return platformAssets[0] ?? null;
  return (
    platformAssets.find((asset) => architecture.test(asset.name)) ??
    (platformAssets.length === 1 ? platformAssets[0] : null)
  );
}

async function getDownloads(): Promise<Downloads> {
  const fallback: Downloads = {
    version: null,
    releaseUrl: releasesUrl,
    macArm: null,
    macIntel: null,
    windows: null,
    linux: null,
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
      macArm: findAsset(
        assets,
        /(?:mac|darwin|\.dmg$|\.pkg$)/i,
        /arm64|aarch64|apple[-_. ]?silicon/i,
      ),
      macIntel: findAsset(
        assets,
        /(?:mac|darwin|\.dmg$|\.pkg$)/i,
        /x64|x86_64|intel/i,
      ),
      windows: findAsset(assets, /(?:win|windows|setup|\.exe$|\.msi$)/i),
      linux: findAsset(assets, /(?:linux|\.appimage$|\.deb$|\.rpm$)/i),
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
}: {
  asset: ReleaseAsset | null;
  fallback: string;
  children: ReactNode;
}) {
  return (
    <a
      className={styles.downloadButton}
      href={asset?.browser_download_url ?? fallback}
      aria-label={
        asset ? `${children} — ${asset.name}` : `${children} — GitHub releases`
      }
    >
      <Download aria-hidden="true" />
      <span>{children}</span>
      {asset ? <small>{formatSize(asset.size)}</small> : <small>GitHub</small>}
    </a>
  );
}

export default async function HostsEditorPage() {
  const downloads = await getDownloads();

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Hosts Editor",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "macOS, Windows, Linux",
    url: `${siteUrl}/hosts-editor`,
    image: `${siteUrl}/assets/projects/hosts-editor-settings.webp`,
    description:
      "Free cross-platform hosts file editor with profiles, search, backups and safe apply flows.",
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
          <p className={styles.eyebrow}>NURBYTE DEV TOOL // FREE DOWNLOAD</p>
          <h1>
            HOSTS <span>EDITOR</span>
          </h1>
          <p className={styles.lede}>
            A free hosts file editor for macOS, Windows and Linux. Manage local
            domains, profiles and backups without fighting your system hosts
            file by hand.
          </p>
          <div className={styles.heroBadges}>
            <span>FREE</span>
            <span>NO ACCOUNT</span>
            <span>CROSS-PLATFORM</span>
          </div>
          <div className={styles.heroActions}>
            <a className={styles.primaryAction} href="#download">
              <Download aria-hidden="true" /> DOWNLOAD LATEST
            </a>
            <a
              className={styles.secondaryAction}
              href={`https://github.com/${repository}`}
            >
              <Github aria-hidden="true" /> VIEW ON GITHUB
            </a>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <span className={styles.windowLabel}>HOSTS_EDITOR.EXE</span>
          <Image
            src="/assets/projects/hosts-editor-settings.webp"
            alt="Hosts Editor application settings and hosts management interface"
            width={1280}
            height={720}
            priority
            sizes="(max-width: 900px) 92vw, 48vw"
          />
          <div className={styles.statusBar}>
            <span>● SYSTEM READY</span>
            <span>MAC / WIN / LINUX</span>
          </div>
        </div>
      </section>

      <section className={styles.downloadSection} id="download">
        <div className={styles.sectionHeading}>
          <p>SELECT PLATFORM</p>
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
            <p>Apple Silicon and Intel builds.</p>
            <div className={styles.macDownloads}>
              <DownloadLink
                asset={downloads.macArm}
                fallback={downloads.releaseUrl}
              >
                APPLE SILICON
              </DownloadLink>
              <DownloadLink
                asset={downloads.macIntel}
                fallback={downloads.releaseUrl}
              >
                INTEL
              </DownloadLink>
            </div>
          </article>

          <article className={styles.platformCard}>
            <Laptop aria-hidden="true" />
            <h3>Windows</h3>
            <p>Installer for Windows development machines.</p>
            <DownloadLink
              asset={downloads.windows}
              fallback={downloads.releaseUrl}
            >
              WINDOWS
            </DownloadLink>
          </article>

          <article className={styles.platformCard}>
            <TerminalSquare aria-hidden="true" />
            <h3>Linux</h3>
            <p>Desktop package from the latest GitHub release.</p>
            <DownloadLink
              asset={downloads.linux}
              fallback={downloads.releaseUrl}
            >
              LINUX
            </DownloadLink>
          </article>
        </div>
        <p className={styles.releaseNote}>
          Downloads resolve directly to assets from the latest published GitHub
          release. Release metadata is cached for one hour.
        </p>
      </section>

      <section className={styles.features}>
        <div className={styles.sectionHeading}>
          <p>WHY HOSTS EDITOR?</p>
          <h2>STOP EDITING HOSTS BY HAND</h2>
        </div>
        <div className={styles.featureGrid}>
          <article>
            <HardDrive />
            <h3>PROFILES & TABS</h3>
            <p>
              Keep separate hosts configurations organized instead of
              maintaining one giant file.
            </p>
          </article>
          <article>
            <Search />
            <h3>FAST SEARCH</h3>
            <p>
              Find records quickly in structured record mode or work directly in
              the text view.
            </p>
          </article>
          <article>
            <History />
            <h3>BACKUPS</h3>
            <p>
              Keep manual backups and restore configurations when you need to
              roll back.
            </p>
          </article>
          <article>
            <ShieldCheck />
            <h3>SAFE APPLY FLOW</h3>
            <p>
              Import the current system hosts file, review changes and apply the
              selected profile deliberately.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.hostsInfo}>
        <div>
          <p className={styles.eyebrow}>ONE TOOL // THREE SYSTEMS</p>
          <h2>YOUR HOSTS FILE, WITHOUT THE TERMINAL DETOUR.</h2>
          <p>
            Hosts Editor is built for developers who regularly map local
            domains, development servers or test environments and want a visual
            workflow instead of repeatedly editing protected system files.
          </p>
        </div>
        <div className={styles.paths}>
          <code>
            <b>macOS / Linux</b>
            <span>/etc/hosts</span>
          </code>
          <code>
            <b>Windows</b>
            <span>C:\Windows\System32\drivers\etc\hosts</span>
          </code>
        </div>
      </section>

      <section className={styles.faq}>
        <div className={styles.sectionHeading}>
          <p>HELP DATABASE</p>
          <h2>HOSTS EDITOR FAQ</h2>
        </div>
        <details>
          <summary>Is Hosts Editor free?</summary>
          <p>
            Yes. Hosts Editor is offered as a free developer tool by NurByte.
          </p>
        </details>
        <details>
          <summary>Which operating systems are supported?</summary>
          <p>
            The project targets macOS, Windows and Linux. Available installers
            are read from the latest GitHub release.
          </p>
        </details>
        <details>
          <summary>
            Why does editing the hosts file require elevated permissions?
          </summary>
          <p>
            The system hosts file is protected by the operating system. Applying
            changes can therefore require administrator or root authorization
            depending on the platform.
          </p>
        </details>
        <details>
          <summary>Can I keep multiple hosts configurations?</summary>
          <p>
            Yes. Hosts Editor is designed around separate tabs/configurations so
            development environments do not have to live in one manually managed
            block.
          </p>
        </details>
      </section>

      <footer className={styles.footer}>
        <div>
          <b>NurByte</b> Software Lab <span>// HOSTS EDITOR</span>
        </div>
        <Link href="/">
          <ArrowLeft aria-hidden="true" /> RETURN TO NURBYTE
        </Link>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareData) }}
      />
    </main>
  );
}
