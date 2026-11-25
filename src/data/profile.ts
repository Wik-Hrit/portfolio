/**
 * Copy for the home and about pages. Plain strings only, so it is safe to edit without touching components.
 */

export const hero = {
  headline: "Building intelligent systems. Understanding what makes them work.",
  intro: [
    "I'm an Electronics and Communication Engineering student at BIT Mesra, interested in software engineering, applied AI/ML and systems that solve real-world problems.",
    "From experimenting with reservoir computing for ECG classification to building document intelligence and RAG-based systems, I enjoy working across the boundary between research and practical engineering.",
  ],
  philosophy:
    "I like understanding how things work, identifying where they break, and building systems that solve the actual problem.",
};

export const workAreas = [
  {
    title: "Applied AI & Machine Learning",
    body: "Building intelligent applications using ML, deep learning and modern LLM architectures.",
  },
  {
    title: "Software Engineering",
    body: "Developing reliable applications, APIs, backend systems and scalable software.",
  },
  {
    title: "Research & Experimentation",
    body: "Exploring computational models, signal processing and machine learning research.",
  },
  {
    title: "Systems & Problem Solving",
    body: "Understanding performance, reliability, data pipelines and engineering trade-offs.",
  },
];

export const about = {
  heading: "A little about me.",
  intro: [
    "I'm Hritwik, an Electronics and Communication Engineering student at BIT Mesra.",
    "My engineering journey started with electronics, signals and systems. Over time, my curiosity expanded towards programming, machine learning and software engineering.",
    "I've explored research problems involving physiological signals and computational models, worked with machine learning frameworks, and experimented with building applications powered by large language models.",
    "What interests me most is the engineering behind the interface: how data moves through a system, how models make decisions, where applications fail and how to make them reliable.",
    "I'm particularly interested in building software and AI systems that are useful beyond a controlled demonstration.",
  ],
  academic: {
    degree: "B.Tech, Electronics and Communication Engineering",
    institution: "Birla Institute of Technology, Mesra (Patna Campus)",
    period: "2023 to 2027",
    // TODO(verify): add CGPA here only if you want it public.
    notes: [
      "Coursework foundations in signals and systems, communication theory, digital electronics and control.",
      "Minor projects on adaptive modulation and on automatic modulation classification under low-SNR fading channels.",
    ],
  },
  interests: [
    "Retrieval-augmented generation and LLM application engineering",
    "NLP pipelines, from raw text to a dashboard someone can use",
    "Reservoir computing and time-series models",
    "Signal processing and communication systems",
    "Quantitative research and algorithmic problem solving",
  ],
  philosophy: [
    {
      title: "Find where it breaks",
      body: "A system is understood when you can say how it fails. I test the edges first: rate limits, bad inputs, empty retrieval.",
    },
    {
      title: "Solve the actual problem",
      body: "The interesting part is usually one layer below the request. I try to name the real constraint before writing code.",
    },
    {
      title: "Measure, then claim",
      body: "Numbers go in a write-up only after they come out of a run I can repeat.",
    },
  ],
  learning: [
    "Agent orchestration with LangGraph",
    "TypeScript and Next.js for shipping my own interfaces",
    "Backend and distributed systems fundamentals",
    "Data structures and algorithms in C++",
  ],
  lookingFor:
    "Software engineering and applied AI internships, and 2027 new-grad roles, on teams where I can work on real systems, get reviewed by strong engineers and own a piece of something that ships.",
  personal: [
    "Student Placement Coordinator at the BIT Mesra Training and Placement Cell.",
    "Google Gemini Campus Ambassador.",
    "Building a daily habit of equity alpha research on WorldQuant BRAIN.",
  ],
};
