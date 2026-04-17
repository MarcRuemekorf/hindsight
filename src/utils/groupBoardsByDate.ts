type Member = { name: string; image: string | null };

export type BoardSummary = {
  id: string;
  title: string;
  createdAt: Date;
  columnCount: number;
  postItCount: number;
  members: Member[] | null;
};

const GROUPS: { label: string; maxDays: number }[] = [
  { label: "Last week", maxDays: 7 },
  { label: "2 weeks ago", maxDays: 14 },
  { label: "Last month", maxDays: 30 },
  { label: "Last year", maxDays: 365 },
  { label: "More than a year ago", maxDays: Infinity },
];

export function groupBoardsByDate(
  boards: BoardSummary[],
  currentDateTimestamp = new Date(),
): { label: string; boards: BoardSummary[] }[] {
  const buckets = new Map<string, BoardSummary[]>(
    GROUPS.map(({ label }) => [label, []]),
  );

  for (const board of boards) {
    const diffDays = Math.floor(
      (currentDateTimestamp.getTime() - board.createdAt.getTime()) / 86_400_000,
    );
    const group = GROUPS.find(({ maxDays }) => diffDays <= maxDays);
    if (group) buckets.get(group.label)!.push(board);
  }

  return GROUPS.filter(({ label }) => buckets.get(label)!.length > 0).map(
    ({ label }) => ({ label, boards: buckets.get(label)! }),
  );
}
