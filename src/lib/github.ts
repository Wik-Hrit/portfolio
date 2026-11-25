import "server-only";

export type ContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
export type Contributions = { total: number; weeks: ContributionDay[][] };

const LEVEL: Record<string, ContributionDay["level"]> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

/**
 * Real contribution data from GitHub's GraphQL API. Returns null when GITHUB_TOKEN is missing
 * or the request fails, and the graph is then not rendered at all. No fake data, ever.
 * Cached for 12 hours.
 */
export async function getContributions(username: string): Promise<Contributions | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token || !username) return null;
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{totalContributions weeks{contributionDays{date contributionCount contributionLevel}}}}}}`,
        variables: { login: username },
      }),
      next: { revalidate: 43200 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!cal) return null;
    return {
      total: cal.totalContributions,
      weeks: cal.weeks.map((w: { contributionDays: Array<{ date: string; contributionCount: number; contributionLevel: string }> }) =>
        w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount, level: LEVEL[d.contributionLevel] ?? 0 })),
      ),
    };
  } catch {
    return null;
  }
}
