/**
 * SITE CONFIGURATION
 * ------------------
 * Everything personal that appears across the site lives here or in the other files in /src/data.
 * Edit values in this file; no component code needs to change.
 *
 * Set a value to null to hide it. Components never render a link whose URL is null, so the
 * site has no broken links even while details are missing.
 */

export const siteConfig = {
  /** Full name as it appears in the sidebar, titles and metadata. */
  name: "Hritwik Varma",
  shortName: "Hritwik",
  /** Initials used for the monogram when no photo is set. */
  initials: "HV",
  /** Short role line under the name in the sidebar. */
  role: "Software · Applied AI",
  /** Professional positioning used in metadata. */
  positioning: "Software Engineer | Applied AI/ML | Systems & Research",

  /**
   * Profile photograph. Put the image in /public (e.g. /public/hritwik.jpg) and set the path here,
   * e.g. "/hritwik.jpg". null shows the HV monogram.
   */
  photo: null as string | null,

  /** Email shown on the contact page and used for mailto links. */
  email: "hritwikvarmajs96@gmail.com",

  /** Social profiles. null hides the link. */
  github: "https://github.com/Wik-Hrit",
  githubUsername: "Wik-Hrit",
  linkedin: "https://www.linkedin.com/in/hritwik-varma",
  x: null as string | null,

  /**
   * Resume. Either a file in /public (e.g. "/Hritwik_Varma_Resume.pdf") or an external link.
   * Currently the Google Drive copy. Replace with a PDF in /public for a direct download.
   */
  resumeUrl: "https://drive.google.com/file/d/1VlynS7F7okGH2KroGparVU7lml3Z5dlv/view?usp=sharing",

  /** The availability badge on the home page and sidebar. Set enabled: false to hide it. */
  availability: {
    enabled: false,
    label: "Open to SWE and applied AI internships, and 2027 new-grad roles",
  },

  /** Location line on the About page. */
  location: "India",

  /** Public URL, read from NEXT_PUBLIC_SITE_URL so preview and production differ correctly. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  description:
    "Hritwik Varma is an ECE student at BIT Mesra working across software engineering, applied AI/ML and research: RAG systems, NLP pipelines and reservoir computing for ECG classification.",
};

export type SiteConfig = typeof siteConfig;
