import type { Project, ProjectCategory, ProjectKind, ProjectStatus } from "./types";

/**
 * PROJECT DATABASE
 * ----------------
 * Add a project by appending an object to `projects`. Its page appears at /projects/<slug>.
 *
 * Rules this file follows (keep them):
 * - github / demo are null unless the URL is real and public.
 * - No accuracy, latency or throughput number unless it came from a run you can reproduce.
 * - `kind` says how the work came about, so research, coursework and own builds stay distinct.
 * - Lines marked TODO(verify) need your confirmation before the site goes public.
 */

export const categoryLabels: Record<ProjectCategory, string> = {
  ai: "Artificial Intelligence",
  ml: "Machine Learning",
  software: "Software Engineering",
  research: "Research",
  data: "Data & Analytics",
  hardware: "Hardware / Electronics",
};

export const kindLabels: Record<ProjectKind, string> = {
  "research-internship": "Research internship",
  academic: "Academic project",
  independent: "Independent build",
  assignment: "Technical assignment",
  competition: "Competition",
  "ongoing-research": "Ongoing research",
};

export const statusLabels: Record<ProjectStatus, string> = {
  complete: "Complete",
  "in-progress": "In progress",
  ongoing: "Ongoing",
  submitted: "Submitted",
};

export const projects: Project[] = [
  {
    slug: "relay",
    name: "Relay: RAG under provider rate limits",
    summary: "A document question-answering system tested for how it behaves when LLM capacity runs out.",
    problem:
      "A RAG system that works in a demo can fail once the LLM provider starts refusing requests. The assignment asked how the system behaves under real rate limits, and how to test that behaviour when inference capacity is constrained. Most RAG demos assume unlimited inference; this one treats the provider's limits as part of the system.",
    categories: ["ai", "software"],
    kind: "assignment",
    status: "submitted",
    period: "Nov 2026",
    context: "Take-home assignment for Vaani Research",
    stack: ["Python", "Groq API", "gpt-oss-20b", "Embeddings", "CSV logging"],
    github: null, // TODO(verify): add the repository URL if you make it public.
    demo: null,
    visual: "pipeline",
    featured: true,
    sections: [
      {
        heading: "Architecture",
        body: [
          "The system is a linear pipeline: documents are ingested and chunked, chunks are embedded, a query retrieves the most relevant chunks, and a Groq-hosted model (gpt-oss-20b) answers from that context. Every request is logged so the run can be analysed afterwards.",
        ],
        bullets: [
          "Ingestion and chunking",
          "Embedding-based retrieval",
          "Answer generation through the Groq API",
          "A rate-limit aware call layer",
          "CSV execution log for every request",
        ],
      },
      {
        heading: "Document processing",
        body: [
          "Documents are split into chunks small enough to retrieve precisely but large enough to keep the surrounding sentence context an answer needs.",
        ],
      },
      {
        heading: "Retrieval pipeline",
        body: [
          "Each chunk is embedded once at ingestion. At query time the question is embedded and compared against the chunk vectors, and the top matches are passed to the model as context.",
        ],
      },
      {
        heading: "LLM integration",
        body: [
          "Generation runs on Groq with gpt-oss-20b. The call layer is kept separate from retrieval so the model behind it can be swapped without touching the rest of the pipeline.",
        ],
      },
      {
        heading: "Rate-limit constraints",
        body: [
          "Provider limits are treated as an expected state rather than an exception. The call layer detects a limited response and handles it deliberately instead of letting the request fail silently.",
        ],
      },
      {
        heading: "Testing methodology",
        body: [
          "Real rate limits are hard to reproduce on demand, so the system includes a stand-in model that mimics the provider's behaviour, including refusals. That makes constrained-capacity runs repeatable. Every request, its outcome and timing go to a CSV log, which is what the evaluation reads.",
        ],
      },
      {
        heading: "Results and limitations",
        body: [
          "The project was built and submitted as a take-home assignment. It was not deployed to production, and it has not been tested against real user traffic. Measured results are in the submission write-up and will be added here once checked.",
        ],
      },
      {
        heading: "Engineering lessons",
        body: [
          "Designing for a constrained dependency changes the shape of the code: the failure path needs as much structure as the happy path, and a stand-in for the dependency is what makes that path testable.",
        ],
      },
    ],
    facts: [
      "Built in Python for the Vaani Research ML Engineering Intern take-home assignment, called The Relay, submitted on 14 Nov 2026.",
      "Uses Groq with the gpt-oss-20b model for generation.",
      "Includes a stand-in model to test behaviour under rate limits, and CSV logging of every request.",
      "Not deployed to production.",
    ],
  },
  {
    slug: "social-media-nlp-pipeline",
    name: "Social media NLP pipeline",
    summary: "An end-to-end pipeline from tweet collection to a deployed analysis dashboard.",
    problem:
      "Raw social media text is noisy, duplicated and unstructured. The goal was to turn it into a clean, queryable dataset with sentiment, topics and keywords that a researcher can explore without writing code.",
    categories: ["ai", "data", "software"],
    kind: "research-internship",
    status: "complete",
    period: "May to Jul 2026",
    context: "IIT Guwahati, under Prof. Prithwijit Guha",
    stack: ["Python", "SQLite", "spaCy", "VADER", "RoBERTa", "BERTopic", "TF-IDF", "Streamlit"],
    github: "https://github.com/Wik-Hrit/social-media-pipeline-test",
    demo: null, // TODO(verify): add the Streamlit Cloud URL.
    visual: "graph",
    featured: true,
    sections: [
      {
        heading: "What it does",
        body: [
          "The pipeline collects tweets across a set of search queries, cleans them, stores them in a normalised SQLite database, runs several NLP analyses over them and serves the results in a Streamlit dashboard deployed on Streamlit Cloud.",
        ],
        bullets: [
          "1,400+ tweets collected across 24 queries",
          "9-table normalised SQLite schema",
          "Sentiment with VADER and a RoBERTa model, topics with BERTopic, keywords with TF-IDF, linguistic features with spaCy",
          "Export tooling and full documentation",
        ],
      },
      {
        heading: "Data model",
        body: [
          "Tweets, authors, queries and analysis results live in separate tables, so a new analysis adds a table instead of rewriting the dataset.",
        ],
      },
      {
        heading: "Analysis layer",
        body: [
          "Two sentiment methods run side by side, a lexicon-based one (VADER) and a transformer (RoBERTa), so their disagreements can be inspected rather than hidden. BERTopic groups tweets into topics and TF-IDF surfaces the terms that define each query.",
        ],
      },
      {
        heading: "Iteration",
        body: [
          "The pipeline went through several working sessions with the supervisor, adding five features and fixing more than 30 bugs found while running it on real data.",
        ],
      },
    ],
    facts: [
      "Built during the IIT Guwahati research internship, May to July 2026, under Prof. Prithwijit Guha, with direct supervision from Shlok Verma.",
      "Processed 1,400+ tweets across 24 queries; 9-table normalised SQLite database.",
      "NLP stack: spaCy, VADER, RoBERTa, BERTopic, TF-IDF. Streamlit dashboard deployed on Streamlit Cloud.",
      "30+ bug fixes and 5 new features across multiple sessions.",
    ],
  },
  {
    slug: "reservoir-computing-ecg",
    name: "Reservoir computing for ECG classification",
    summary: "Echo State Networks applied to classifying ECG signals as time series.",
    problem:
      "ECG signals are long, noisy time series. Recurrent networks can model them but are slow and unstable to train. Reservoir computing keeps a fixed random recurrent layer and trains only the readout, which makes it a cheap and interesting alternative to study.",
    categories: ["ml", "research"],
    kind: "research-internship",
    status: "complete",
    period: null, // TODO(verify): add internship dates.
    context: "IIT Roorkee, under Dr. Priyansha Kaurav",
    stack: ["Python", "PyTorch", "MATLAB", "NumPy"],
    github: null,
    demo: null,
    visual: "reservoir",
    featured: true,
    sections: [
      {
        heading: "Approach",
        body: [
          "An Echo State Network feeds the input signal through a large, fixed, randomly connected reservoir. The reservoir's state carries a fading memory of the recent signal, and only a linear readout on top of it is trained for classification.",
        ],
      },
      {
        heading: "What I worked on",
        body: ["The work covered the full path from raw signal to evaluated classifier."],
        bullets: [
          "Signal preprocessing of ECG recordings",
          "Reservoir dynamics and the role of the spectral radius in stability and memory",
          "Input weight matrices and input scaling",
          "Training the readout and evaluating classification",
          "Implementation in Python and MATLAB",
        ],
      },
      {
        heading: "Why it matters",
        body: [
          "Because only the readout is trained, the expensive part of a recurrent model becomes a fixed transformation. The research question is how much of the classification performance survives that simplification, and which reservoir settings control it.",
        ],
      },
    ],
    facts: [
      "Research internship at IIT Roorkee under Dr. Priyansha Kaurav on reservoir computing and Echo State Networks for ECG time-series classification.",
      "Worked on spectral radius, input weight matrices, reservoir dynamics, ECG preprocessing and evaluation, in Python (PyTorch) and MATLAB.",
    ],
  },
  {
    slug: "research-rag",
    name: "ResearchRAG",
    summary: "A retrieval-augmented assistant for asking questions over research documents.",
    problem:
      "Reading across many papers to answer one question is slow. ResearchRAG retrieves the relevant passages and answers from them, so the answer can be traced back to its source.",
    categories: ["ai", "software"],
    kind: "independent",
    status: "complete",
    period: null,
    stack: ["Python", "LangChain", "FAISS", "Groq API"],
    github: "https://github.com/Wik-Hrit/ResearchRAG-",
    demo: null,
    visual: "retrieval",
    featured: true,
    sections: [
      {
        heading: "How it works",
        body: [
          "Documents are split and embedded into a FAISS vector index. A question retrieves the closest passages, and a Groq-hosted model answers using only that context, orchestrated with LangChain.",
        ],
        bullets: ["LangChain for orchestration", "FAISS for vector search", "Groq for fast generation"],
      },
    ],
    facts: ["Independent RAG project using LangChain, FAISS and Groq. Repository: github.com/Wik-Hrit/ResearchRAG-"],
  },
  {
    slug: "llm-watermarking",
    name: "LLM text watermarking",
    summary: "An implementation of the Kirchenbauer et al. green-list watermark for generated text.",
    problem:
      "As generated text spreads, it helps to be able to tell whether a passage came from a specific model. Watermarking biases generation in a way that is invisible to readers but statistically detectable.",
    categories: ["ai", "research"],
    kind: "independent",
    status: "complete",
    period: null,
    stack: ["Python", "PyTorch", "Hugging Face Transformers"],
    github: "https://github.com/Wik-Hrit/llm-watermarking",
    demo: null,
    visual: "tokens",
    sections: [
      {
        heading: "The scheme",
        body: [
          "At each generation step the previous token seeds a split of the vocabulary into a green and a red list, and green tokens get a small logit boost. Detection counts green tokens in a passage and runs a z-test: watermarked text has far more green tokens than chance.",
        ],
      },
    ],
    facts: ["Implements the Kirchenbauer et al. watermarking scheme. Repository: github.com/Wik-Hrit/llm-watermarking"],
  },
  {
    slug: "sentiment-analysis-bert",
    name: "Sentiment analysis with BERT",
    summary: "Fine-tuning BERT in PyTorch for sentiment classification.",
    problem:
      "Lexicon-based sentiment misses negation, sarcasm and context. A fine-tuned transformer learns these from labelled data.",
    categories: ["ml", "ai"],
    kind: "independent",
    status: "complete",
    period: null,
    stack: ["Python", "PyTorch", "Hugging Face Transformers", "BERT"],
    github: "https://github.com/Wik-Hrit/Sentiment-Analysis-NLP_ML",
    demo: null,
    visual: "bars",
    sections: [
      {
        heading: "Pipeline",
        body: ["Text is cleaned and tokenised with the BERT tokenizer, a classification head is fine-tuned on labelled data, and the model is evaluated on a held-out split."],
        bullets: ["Dataset preprocessing", "Subword tokenisation", "Fine-tuning a BERT classifier", "Evaluation on held-out data"],
      },
      {
        heading: "Result",
        // TODO(verify): confirm the F1 score and dataset name against the repository.
        body: ["The fine-tuned model reached a 93.2% F1 score on the held-out set."],
      },
    ],
    facts: ["BERT sentiment classifier in PyTorch, 93.2% F1 on held-out data. Repository: github.com/Wik-Hrit/Sentiment-Analysis-NLP_ML"],
  },
  {
    slug: "modulation-classification-low-snr",
    name: "Modulation classification under low SNR",
    summary: "Lightweight ML for recognising modulation schemes in noisy, fading channels.",
    problem:
      "A receiver that does not know how a signal was modulated has to work it out from the signal itself. That gets hard at low signal-to-noise ratio and under fading, and the model has to stay small enough to run on constrained hardware.",
    categories: ["ml", "research"],
    kind: "academic",
    status: "in-progress",
    period: "Autumn 2026",
    context: "7th-semester minor project, BIT Mesra, under Prof. S. K. Choubey",
    stack: ["Python", "MATLAB", "scikit-learn"],
    github: null,
    demo: null,
    visual: "constellation",
    sections: [
      {
        heading: "Scope",
        body: [
          "Robust automatic modulation classification using lightweight machine learning under low-SNR and fading channel conditions. Team project with Arunima Das and Charvi Bhardwaj.",
        ],
      },
    ],
    facts: ["7th-semester minor project at BIT Mesra under Prof. S. K. Choubey with Arunima Das and Charvi Bhardwaj, in progress as of Nov 2026."],
  },
  {
    slug: "adaptive-modulation",
    name: "Adaptive modulation for wireless links",
    summary: "Switching between BPSK, QPSK and 16-QAM as a Rayleigh fading channel changes.",
    problem:
      "A fixed modulation scheme wastes capacity when the channel is good and fails when it is bad. Adaptive modulation picks the scheme from the current channel quality.",
    categories: ["research", "hardware"],
    kind: "academic",
    status: "complete",
    period: "Spring 2026",
    context: "6th-semester minor project, BIT Mesra",
    stack: ["MATLAB"],
    github: "https://github.com/Wik-Hrit/Adaptive-Modulation-",
    demo: null,
    visual: "waveform",
    sections: [
      {
        heading: "Scope",
        body: [
          "Simulated a wireless link over a Rayleigh fading channel in MATLAB and switched between BPSK, QPSK and 16-QAM based on channel conditions, comparing error performance against fixed schemes.",
        ],
      },
    ],
    facts: ["6th-semester minor project in MATLAB on adaptive modulation (BPSK, QPSK, 16-QAM) over Rayleigh fading."],
  },
  {
    slug: "worldquant-alpha-research",
    name: "Equity alpha research",
    summary: "Designing and backtesting equity signals on WorldQuant BRAIN.",
    problem:
      "Most candidate trading signals are noise. The work is to form a hypothesis, express it as a signal, and find out quickly whether it survives a realistic backtest.",
    categories: ["data", "research"],
    kind: "ongoing-research",
    status: "ongoing",
    period: "2026",
    stack: ["WorldQuant BRAIN", "Fast Expression"],
    github: null,
    demo: null,
    visual: "grid",
    sections: [
      {
        heading: "What I do",
        body: [
          "I research and backtest alphas on the USA TOP3000 universe with delay 1 over a five-year test window, written in Fast Expression.",
        ],
        bullets: [
          "Signal families: news sentiment, options implied volatility, put-call open interest ratio, fundamental ratios, price reversal",
          "Tuning decay, truncation and neutralisation",
        ],
      },
    ],
    facts: ["Researches equity alphas on WorldQuant BRAIN (USA TOP3000, delay 1) using news sentiment, implied volatility, put-call OI ratio, fundamentals and price reversal."],
  },
  {
    slug: "thz-imaging",
    name: "Non-invasive sensing and THz imaging",
    summary: "Research exposure to terahertz imaging and non-invasive sensing.",
    problem:
      "Terahertz radiation can image through many materials without ionising them, which makes it useful for non-invasive inspection and sensing. The challenge is turning weak, noisy measurements into usable images.",
    categories: ["research", "hardware"],
    kind: "research-internship",
    status: "complete",
    period: null, // TODO(verify)
    context: "IIT Roorkee",
    stack: ["MATLAB", "Signal processing"],
    github: null,
    demo: null,
    visual: "beam",
    sections: [
      {
        heading: "Exposure",
        body: [
          "Part of the research internship at IIT Roorkee involved non-invasive sensing and terahertz imaging: signal acquisition and processing, experimental research and computational analysis. This was research exposure inside a lab group, not an independent discovery.",
        ],
        // TODO(verify): add what you specifically did here.
      },
    ],
    facts: ["Research exposure to non-invasive sensing and THz imaging during the IIT Roorkee internship."],
  },
  {
    slug: "air-quality-prediction",
    name: "Air quality prediction",
    summary: "Predictive modelling of air quality with MATLAB and Python.",
    problem: "Air quality depends on weather, traffic and season. Forecasting it a little ahead helps people plan around bad days.",
    categories: ["ml", "data"],
    kind: "academic", // TODO(verify): academic or independent?
    status: "complete",
    period: null,
    stack: ["Python", "MATLAB", "Pandas", "scikit-learn"],
    github: "https://github.com/Wik-Hrit/Air-Quality-Forecasting_ML",
    demo: null,
    visual: "bars",
    sections: [
      {
        heading: "Pipeline",
        body: ["The project covers data preprocessing, feature analysis, model development, and evaluation with visualisation."],
        // TODO(verify): dataset, models and metrics.
      },
    ],
  },
  {
    slug: "low-noise-pcb",
    name: "Low-noise amplifier and PCB",
    summary: "A low-noise analog front end with active low-pass filtering, laid out in KiCad.",
    problem: "Small sensor signals are easily buried in noise. A careful analog front end has to amplify them and filter out high-frequency noise before they are digitised.",
    categories: ["hardware"],
    kind: "academic", // TODO(verify)
    status: "complete",
    period: null,
    stack: ["OP07", "KiCad", "Active filters"],
    github: null,
    demo: null,
    visual: "circuit",
    sections: [
      {
        heading: "Design",
        body: ["Built around the OP07 precision operational amplifier, chosen for its low offset and low noise, with an active low-pass filter stage. Schematic and PCB layout in KiCad."],
        // TODO(verify): cut-off frequency, gain, whether the board was fabricated.
      },
    ],
  },
  {
    slug: "sih-internal-hackathon",
    name: "Smart India Hackathon, internal round",
    summary: "Third place in the internal selection round of Smart India Hackathon.",
    problem: null, // TODO(verify): problem statement, solution, stack, your role.
    categories: ["software"],
    kind: "competition",
    status: "complete",
    period: null,
    context: "BIT Mesra internal selection",
    stack: [],
    github: null,
    demo: null,
    visual: "grid",
    sections: [
      {
        heading: "Outcome",
        body: ["Secured third place in the internal Smart India Hackathon selection process."],
      },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
