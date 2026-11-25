import { getContributions } from "@/lib/github";
import { siteConfig } from "@/data/site.config";

const shades = [
  "var(--surface-2)",
  "color-mix(in srgb, var(--accent) 28%, var(--surface-2))",
  "color-mix(in srgb, var(--accent) 50%, var(--surface-2))",
  "color-mix(in srgb, var(--accent) 75%, var(--surface-2))",
  "var(--accent)",
];

/** Renders only with real data from GitHub. Without GITHUB_TOKEN it renders nothing. */
export async function ContributionGraph() {
  const data = await getContributions(siteConfig.githubUsername);
  if (!data) return null;
  const size = 10;
  const gap = 3;
  return (
    <figure className="rounded-xl border border-line bg-surface p-4">
      <figcaption className="mb-3 flex items-center justify-between text-[13px] text-muted">
        <span>
          <span className="tabular font-medium text-ink">{data.total.toLocaleString("en-IN")}</span> contributions in the last year
        </span>
        <a href={siteConfig.github!} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
          @{siteConfig.githubUsername}
        </a>
      </figcaption>
      <div className="overflow-x-auto">
        <svg width={data.weeks.length * (size + gap)} height={7 * (size + gap)} role="img" aria-label={`${data.total} GitHub contributions in the last year`}>
          {data.weeks.map((w, x) =>
            w.map((d) => (
              <rect
                key={d.date}
                x={x * (size + gap)}
                y={new Date(d.date).getUTCDay() * (size + gap)}
                width={size}
                height={size}
                rx={2}
                fill={shades[d.level]}
              >
                <title>{`${d.count} on ${d.date}`}</title>
              </rect>
            )),
          )}
        </svg>
      </div>
    </figure>
  );
}
