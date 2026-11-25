import type { Experience, ExperienceGroup } from "./types";

/**
 * EXPERIENCE TIMELINE
 * -------------------
 * Ordered by `sortKey` (newest first). `sortKey` is never shown; `period` is what visitors see.
 * When `period` is null the timeline shows the entry's group label instead of a date.
 * No fictional positions: every entry here is something that happened.
 */

export const groupLabels: Record<ExperienceGroup, string> = {
  research: "Research",
  academic: "Academic",
  leadership: "Responsibility",
  competition: "Competition",
  learning: "Learning",
};

const entries: Experience[] = [
  {
    id: "bit-mesra-amc",
    organisation: "BIT Mesra",
    role: "Minor project, automatic modulation classification",
    group: "academic",
    period: "Jul 2026 to present", // TODO(verify): start month.
    sortKey: "2026-07-b",
    description:
      "Robust automatic modulation classification using lightweight ML under low-SNR and fading channels, under Prof. S. K. Choubey.",
    contributions: [
      "Team project with Arunima Das and Charvi Bhardwaj",
      "Lightweight classifiers that stay usable at low signal-to-noise ratio",
    ],
    technologies: ["Python", "MATLAB", "scikit-learn"],
    projects: ["modulation-classification-low-snr"],
  },
  {
    id: "iit-guwahati",
    organisation: "IIT Guwahati",
    role: "Research Intern",
    group: "research",
    period: "May 2026 to Jul 2026",
    sortKey: "2026-05",
    description:
      "Built a social media NLP pipeline under Prof. Prithwijit Guha, with day-to-day supervision from Shlok Verma.",
    contributions: [
      "Collected and cleaned 1,400+ tweets across 24 queries",
      "Designed a 9-table normalised SQLite schema",
      "Ran sentiment (VADER, RoBERTa), topic (BERTopic) and keyword (TF-IDF) analysis",
      "Deployed a Streamlit dashboard on Streamlit Cloud, with export tooling and documentation",
    ],
    technologies: ["Python", "SQLite", "spaCy", "RoBERTa", "BERTopic", "Streamlit"],
    projects: ["social-media-nlp-pipeline"],
  },
  {
    id: "tnp-coordinator",
    organisation: "BIT Mesra, Training and Placement Cell",
    role: "Student Placement Coordinator",
    group: "leadership",
    period: "Mar 2026 to present",
    sortKey: "2026-03",
    description: "Working with the placement cell to bring companies to campus for the 2027 batch.",
    contributions: ["Outreach to recruiters and talent teams", "Coordinating campus drives"],
    technologies: [],
  },
  {
    id: "bit-mesra-adaptive-modulation",
    organisation: "BIT Mesra",
    role: "Minor project, adaptive modulation",
    group: "academic",
    period: "Spring 2026", // TODO(verify)
    sortKey: "2026-01",
    description: "Adaptive modulation over a Rayleigh fading channel, switching between BPSK, QPSK and 16-QAM.",
    contributions: ["MATLAB simulation of the link and the switching policy"],
    technologies: ["MATLAB"],
    projects: ["adaptive-modulation"],
  },
  {
    id: "iit-roorkee",
    organisation: "IIT Roorkee",
    role: "Research Intern",
    group: "research",
    period: null, // TODO(verify): exact internship dates.
    sortKey: "2025-12",
    description:
      "Research internship under Dr. Priyansha Kaurav on reservoir computing for ECG classification, with exposure to non-invasive sensing and terahertz imaging.",
    contributions: [
      "Implemented Echo State Networks for ECG time-series classification",
      "Studied reservoir dynamics, spectral radius and input weight scaling",
      "ECG signal preprocessing and evaluation",
    ],
    technologies: ["Python", "PyTorch", "MATLAB"],
    projects: ["reservoir-computing-ecg", "thz-imaging"],
  },
  {
    id: "gemini-ambassador",
    organisation: "Google",
    role: "Gemini Campus Ambassador",
    group: "leadership",
    period: null, // TODO(verify): dates.
    sortKey: "2025-09",
    description: "Campus ambassador for Google Gemini at BIT Mesra.",
    contributions: [],
    technologies: [],
  },
  {
    id: "sih-internal",
    organisation: "Smart India Hackathon",
    role: "Internal selection round, third place",
    group: "competition",
    period: null, // TODO(verify): year.
    sortKey: "2025-08",
    description: "Placed third in BIT Mesra's internal selection round for Smart India Hackathon.",
    contributions: [],
    technologies: [],
    projects: ["sih-internal-hackathon"],
  },
  {
    id: "iit-jodhpur-genai",
    organisation: "IIT Jodhpur",
    role: "GenAI Winter School, participant",
    group: "learning",
    period: null, // TODO(verify): dates.
    sortKey: "2025-01",
    description: "Attended the generative AI winter school at IIT Jodhpur.",
    contributions: [],
    technologies: [],
  },
];

export const experience = [...entries].sort((a, b) => (a.sortKey < b.sortKey ? 1 : -1));

/** The home page snapshot: research and academic highlights only. */
export const experienceSnapshot = experience.filter((e) =>
  ["iit-guwahati", "iit-roorkee", "bit-mesra-amc", "tnp-coordinator"].includes(e.id),
);
