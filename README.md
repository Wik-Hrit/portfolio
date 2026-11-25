# Hritwik Varma · Portfolio

Personal engineering portfolio. Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Geist, next-themes, lucide-react.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the build
npm run lint       # TypeScript check
```

Node 20.9 or newer.

## Deploy: GitHub + Vercel CLI (Windows PowerShell)

Run inside this folder. Needs Git and Node installed.

```powershell
# 1. Install and check it builds
npm install
npm run build

# 2. GitHub: first create an EMPTY repo named "portfolio" at https://github.com/new (no README), then:
git init
git add .
git commit -m "Portfolio site"
git branch -M main
git remote add origin https://github.com/Wik-Hrit/portfolio.git
git push -u origin main

# 3. Vercel CLI
npm i -g vercel
vercel login                      # opens the browser, sign in with GitHub
vercel link                       # create a new project called "portfolio"
vercel git connect                # future pushes to GitHub deploy automatically
vercel env add GROQ_API_KEY production   # paste your key from https://console.groq.com/keys when asked
vercel env add NEXT_PUBLIC_SITE_URL production   # e.g. https://portfolio-wik-hrit.vercel.app
vercel --prod                     # deploy; prints the live URL
```

After this, every `git push` redeploys the site. Add the other optional variables the same way.

## Environment variables

All optional. Copy `.env.example` to `.env.local` for local work. Nothing secret is ever sent to the browser.

| Variable | What it does | Without it |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for SEO, sitemap, Open Graph | Falls back to `http://localhost:3000` |
| `GROQ_API_KEY` | **Required** for "Ask about my work" | The box shows "isn't switched on yet" |
| `GROQ_MODEL` | Groq model id | `openai/gpt-oss-20b` |
| `RESEND_API_KEY` + `CONTACT_TO_EMAIL` | Contact form sends email via Resend | Form opens the visitor's email app, pre-filled |
| `CONTACT_FROM_EMAIL` | Verified sender address | Resend's onboarding sender |
| `GITHUB_TOKEN` | Shows a real GitHub contribution graph on the home page | Graph is not shown |


## Editing content

Everything personal lives in `src/data`. No component code needs to change.

| File | Holds |
|---|---|
| `site.config.ts` | Name, email, GitHub, LinkedIn, resume URL, photo, availability badge |
| `profile.ts` | Hero copy, "What I work on", About page |
| `projects.ts` | Every project and its detail page |
| `experience.ts` | Timeline entries |
| `skills.ts` | Tools page, with an honest level per tool |
| `articles.ts` | Research areas, writing and notes |
| `social.ts` | Derived from `site.config.ts` |

**Profile photo:** put `hritwik.jpg` in `/public` and set `photo: "/hritwik.jpg"` in `site.config.ts`.
**Resume:** put `Hritwik_Varma_Resume.pdf` in `/public` and set `resumeUrl: "/Hritwik_Varma_Resume.pdf"` for a direct download (currently the Drive link).
**Availability badge:** edit or disable `availability` in `site.config.ts`.

### Add a project

Append to `projects` in `src/data/projects.ts`:

```ts
{
  slug: "my-project",                 // URL: /projects/my-project
  name: "My project",
  summary: "One line for the card.",
  problem: "The problem it addresses.", // or null
  categories: ["ai", "software"],     // ai | ml | software | research | data | hardware
  kind: "independent",                // research-internship | academic | independent | assignment | competition | ongoing-research
  status: "complete",                 // complete | in-progress | ongoing | submitted
  period: "Dec 2026",                 // or null
  stack: ["Python", "FastAPI"],
  github: "https://github.com/...",   // null unless public
  demo: null,                         // null unless live
  visual: "pipeline",                 // pipeline | reservoir | waveform | retrieval | tokens | constellation | circuit | grid | bars | graph | beam
  featured: false,                    // true shows it on the home page
  sections: [{ heading: "How it works", body: ["..."], bullets: ["..."] }],
  facts: ["Short facts the assistant can quote."],
}
```

The assistant's knowledge base is built from these same files, so a new project is answerable immediately.

### Add an article or note

Append to `articles` in `src/data/articles.ts` with `status: "published"` and `blocks` (`p`, `h2`, `ul`, `code`, `note`). Reading time is computed. `status: "planned"` lists it as in progress with no page.

## How the pieces work

- **Ask about my work** (`src/components/ask-about-my-work.tsx`, `src/app/api/ask/route.ts`). It retrieves the top passages from the portfolio data with BM25 (`src/lib/knowledge.ts`), sends only those to Groq with a prompt that forbids outside facts, and returns the cited sources. Handles empty retrieval, provider 429s, timeouts and a per-IP limit of 10 questions a minute. Starter questions live in `src/lib/suggested-questions.ts`. To use another provider, change the one `fetch` in the route.
- **Contact form** (`src/components/contact-form.tsx`, `src/app/api/contact/route.ts`). Shared validation on both sides, a hidden honeypot field, a minimum time on page and 3 messages per 10 minutes per IP.
- **Rate limits** are in memory per server instance. For a hard global limit on Vercel, swap `src/lib/rate-limit.ts` for Upstash Redis.
- **Project visuals** are authored SVG schematics in `src/components/project-visual.tsx`, one per `visual` kind. Replace with screenshots later by adding an image field.
- **SEO**: per-page metadata, `sitemap.xml`, `robots.txt`, generated Open Graph image (`src/app/opengraph-image.tsx`).

## Needs your verification before going public

Every item is also marked `TODO(verify)` in the data files.

1. **IIT Roorkee internship dates** (`experience.ts`, `projects.ts`). The timeline currently shows "Research" instead of a date, and its position is a guess.
2. **Gemini Campus Ambassador, SIH internal round, IIT Jodhpur GenAI Winter School dates** (`experience.ts`).
3. **Minor project dates**: "Jul 2026 to present" and "Spring 2026" were inferred from semester numbers.
4. **Social media pipeline**: add the Streamlit Cloud URL as `demo`.
5. **Relay**: add the repository if public, and the measured results. The name is spelled **Vaani Research** (your brief said Vani.ai).
6. **BERT sentiment 93.2% F1**: confirm against the repo and add the dataset name.
7. **THz imaging**: add what you personally did.
8. **Air quality, low-noise PCB, SIH**: academic or independent, dataset/metrics, cut-off frequency, whether the board was fabricated, the SIH problem statement and your role.
9. **Skill levels** in `skills.ts`, especially EEGLAB, TESA, MNE, Vivado (set to "Familiar") and TensorFlow/OpenCV.
10. **ESN learning note** (`articles.ts`): written from your project context; read it and put it in your own words.
12. **About page**: coursework line, "What I'm learning" and the personal section.
14. **Email**: the personal Gmail is used. Swap for a custom-domain address if you set one up.

## Project structure

```
src/
  app/            routes, API routes, metadata, sitemap, 404
  components/     UI components (sidebar, cards, timeline, assistant, form, schematics)
  data/           all content (edit here)
  lib/            retrieval, rate limit, validation, GitHub data
public/           static files (photo, resume PDF)
DESIGN.md         design system notes
```
