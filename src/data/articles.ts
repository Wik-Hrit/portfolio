import type { Article } from "./types";

/**
 * RESEARCH, WRITING AND NOTES
 * ---------------------------
 * status "published" gets its own page at /research/<slug>.
 * status "planned" is listed as planned and has no page, so nothing pretends to exist.
 * Nothing here is peer-reviewed; the research page says so.
 *
 * Block types: p, h2, ul, code, note. Reading time is computed from the text.
 */

export const researchAreas = [
  {
    title: "Reservoir computing and Echo State Networks",
    body: "Fixed random recurrent layers with a trained readout, applied to ECG time-series classification.",
    project: "reservoir-computing-ecg",
  },
  {
    title: "ECG signal classification",
    body: "Preprocessing physiological signals and evaluating classifiers on them.",
    project: "reservoir-computing-ecg",
  },
  {
    title: "Non-invasive sensing and THz imaging",
    body: "Research exposure to terahertz imaging, signal acquisition and computational analysis.",
    project: "thz-imaging",
  },
  {
    title: "Modulation classification under fading",
    body: "Lightweight ML for recognising modulation schemes at low SNR.",
    project: "modulation-classification-low-snr",
  },
];

export const articles: Article[] = [
  {
    slug: "echo-state-networks-notes",
    title: "Echo State Networks, in working terms",
    summary: "What a reservoir is, why only the readout is trained, and the three knobs that decide whether it works.",
    category: "note",
    date: "2026-11-26",
    status: "published",
    related: ["reservoir-computing-ecg"],
    // TODO(verify): read through and edit into your own words before publishing.
    blocks: [
      {
        type: "p",
        text: "These are my notes from working with Echo State Networks (ESNs) on ECG classification. They are written to be useful to someone who knows what a recurrent network is and wants the short version of why reservoir computing is different.",
      },
      { type: "h2", text: "The idea" },
      {
        type: "p",
        text: "A recurrent network is expensive to train because the error has to flow back through time. An ESN sidesteps that. It keeps a large recurrent layer, the reservoir, with random weights that are never trained. The input drives the reservoir, the reservoir's state evolves, and only a linear readout from that state to the output is learned.",
      },
      {
        type: "p",
        text: "Training the readout is a linear regression, usually ridge regression, so it is fast and has a closed-form solution. All the temporal modelling is delegated to the fixed dynamics of the reservoir.",
      },
      { type: "h2", text: "The update" },
      {
        type: "code",
        lang: "text",
        code: "x(t) = (1 - a) * x(t-1) + a * tanh( W_in u(t) + W x(t-1) )\ny(t) = W_out [ 1 ; u(t) ; x(t) ]",
      },
      {
        type: "p",
        text: "Here u is the input, x the reservoir state, a the leak rate, W_in and W fixed random matrices, and W_out the only trained matrix.",
      },
      { type: "h2", text: "The three knobs" },
      {
        type: "ul",
        items: [
          "Spectral radius of W. It sets how long the reservoir remembers. Below one, the influence of old inputs fades, which is the echo state property in practice. Too small and the memory is too short; too close to one and the state becomes sluggish or unstable.",
          "Input scaling of W_in. It sets how hard the input pushes the reservoir. Small values keep the tanh near linear; large values push it into saturation and make the response more nonlinear.",
          "Leak rate a. It sets the time scale of the state. A small leak rate smooths the state and suits slow signals; a large one tracks fast changes.",
        ],
      },
      { type: "h2", text: "Classification with a reservoir" },
      {
        type: "p",
        text: "For sequence classification the readout needs one vector per sequence, not one per time step. Common choices are the final state, the mean state over the sequence, or a concatenation of a few. The readout is then an ordinary linear classifier on those vectors.",
      },
      {
        type: "note",
        text: "A reservoir that looks good on one split can fail on another, because its random weights are drawn once. Averaging results over several random seeds is the honest way to report an ESN.",
      },
      { type: "h2", text: "Where it fits" },
      {
        type: "p",
        text: "ESNs are not a replacement for trained recurrent or attention models on large data. They are interesting where training budget is small, where the signal has clear temporal structure, and as a way to study how much of a task is solvable by a fixed nonlinear memory plus a linear map.",
      },
    ],
  },
  {
    slug: "how-rag-pipelines-work",
    title: "How RAG pipelines work, and where they break",
    summary: "Chunking, retrieval and generation, with the failure modes at each step.",
    category: "writing",
    date: "2026-12-01",
    status: "planned",
    related: ["research-rag", "relay"],
    blocks: [],
  },
  {
    slug: "rate-limits-in-ai-applications",
    title: "Handling API rate limits in AI applications",
    summary: "Notes from building Relay: treating the provider's limits as a design constraint.",
    category: "writing",
    date: "2026-12-01",
    status: "planned",
    related: ["relay"],
    blocks: [],
  },
  {
    slug: "reliable-llm-applications",
    title: "Building reliable LLM applications",
    summary: "Structured outputs, evaluation and failure handling around model calls.",
    category: "writing",
    date: "2026-12-01",
    status: "planned",
    blocks: [],
  },
  {
    slug: "document-intelligence-lessons",
    title: "Lessons from building document intelligence",
    summary: "What goes wrong between a PDF and an answer.",
    category: "writing",
    date: "2026-12-01",
    status: "planned",
    blocks: [],
  },
];

export const publishedArticles = articles.filter((a) => a.status === "published");

export function getArticle(slug: string) {
  return publishedArticles.find((a) => a.slug === slug);
}

export function readingTime(article: Article) {
  const words = article.blocks
    .map((b) => ("text" in b ? b.text : "items" in b ? b.items.join(" ") : b.code))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
