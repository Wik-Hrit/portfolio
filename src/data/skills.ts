import type { SkillCategory, SkillLevel } from "./types";

/**
 * TOOLS & TECHNOLOGIES
 * --------------------
 * level:
 *   "used"     I have used it in a project listed on this site.
 *   "learning" I am actively learning it now.
 *   "familiar" I know the concepts or have used it briefly.
 * TODO(verify): every level below is a first pass. Adjust any that overstate or understate.
 */

export const levelLabels: Record<SkillLevel, { label: string; description: string }> = {
  used: { label: "Used in projects", description: "Used in work listed on this site." },
  learning: { label: "Learning", description: "Actively learning now." },
  familiar: { label: "Familiar", description: "Know the concepts or used it briefly." },
};

export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    title: "Programming",
    description: "Languages I write code in.",
    skills: [
      { name: "Python", level: "used", icon: "siPython", note: "Most projects on this site" },
      { name: "C++", level: "used", icon: "siCplusplus", note: "Data structures and algorithms" },
      { name: "SQL", level: "used", icon: "siSqlite", note: "SQLite schema for the NLP pipeline" },
      { name: "JavaScript / TypeScript", level: "learning", icon: "siTypescript", note: "This website" },
    ],
  },
  {
    id: "ml",
    title: "Machine learning",
    description: "Frameworks and libraries for models and data.",
    skills: [
      { name: "PyTorch", level: "used", icon: "siPytorch", note: "BERT fine-tuning, ESN work" },
      { name: "scikit-learn", level: "used", icon: "siScikitlearn", note: "Classical models and evaluation" },
      { name: "NumPy", level: "used", icon: "siNumpy" },
      { name: "Pandas", level: "used", icon: "siPandas" },
      { name: "TensorFlow", level: "familiar", icon: "siTensorflow" },
      { name: "OpenCV", level: "familiar", icon: "siOpencv" },
      { name: "spaCy", level: "used", icon: "siSpacy", note: "NLP pipeline, IIT Guwahati" },
    ],
  },
  {
    id: "llm",
    title: "LLM and AI engineering",
    description: "Building applications around language models.",
    skills: [
      { name: "Retrieval-augmented generation", level: "used", note: "Relay, ResearchRAG" },
      { name: "LangChain", level: "used", icon: "siLangchain", note: "ResearchRAG" },
      { name: "LangGraph", level: "learning", icon: "siLanggraph" },
      { name: "Hugging Face", level: "used", icon: "siHuggingface", note: "BERT, RoBERTa" },
      { name: "Groq API", level: "used", note: "Relay, ResearchRAG" },
      { name: "Vector retrieval (FAISS)", level: "used", note: "ResearchRAG" },
      { name: "Prompt engineering", level: "used" },
    ],
  },
  {
    id: "engineering",
    title: "Engineering and development",
    description: "The everyday tools.",
    skills: [
      { name: "Git", level: "used", icon: "siGit" },
      { name: "GitHub", level: "used", icon: "siGithub" },
      { name: "Linux", level: "used", icon: "siLinux" },
      { name: "VS Code", level: "used" },
      { name: "Jupyter Notebook", level: "used", icon: "siJupyter" },
      { name: "Google Colab", level: "used", icon: "siGooglecolab" },
      { name: "Streamlit", level: "used", icon: "siStreamlit", note: "Deployed dashboard" },
    ],
  },
  {
    id: "electronics",
    title: "Electronics and research",
    description: "Signal processing, hardware design and neuro-signal toolkits.",
    skills: [
      { name: "MATLAB", level: "used", note: "ESN work, modulation projects" },
      { name: "KiCad", level: "used", icon: "siKicad", note: "Low-noise PCB" },
      { name: "EEGLAB", level: "familiar" },
      { name: "TESA", level: "familiar" },
      { name: "MNE", level: "familiar" },
      { name: "Vivado", level: "familiar" },
    ],
  },
];
