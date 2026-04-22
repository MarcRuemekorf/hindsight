import {
  startOfDay,
  startOfWeek,
  startOfMonth,
  startOfYear,
  subDays,
  subWeeks,
  subMonths,
} from "date-fns";

export type BoardGroupLabel =
  | "Today"
  | "Yesterday"
  | "This week"
  | "Last week"
  | "This month"
  | "Last month"
  | "This year"
  | "Older";

export const GROUP_ORDER: BoardGroupLabel[] = [
  "Today",
  "Yesterday",
  "This week",
  "Last week",
  "This month",
  "Last month",
  "This year",
  "Older",
];

type Board = {
  createdAt: Date;
  lastActivityAt?: Date | null;
};

function getBoardGroup(boardDate: Date, currentDate: Date): BoardGroupLabel {
  const startToday     = startOfDay(currentDate);
  const startYesterday = startOfDay(subDays(currentDate, 1));
  const startThisWeek  = startOfWeek(currentDate, { weekStartsOn: 1 });
  const startLastWeek  = startOfWeek(subWeeks(currentDate, 1), { weekStartsOn: 1 });
  const startThisMonth = startOfMonth(currentDate);
  const startLastMonth = startOfMonth(subMonths(currentDate, 1));
  const startThisYear  = startOfYear(currentDate);

  if (boardDate >= startToday)     return "Today";
  if (boardDate >= startYesterday) return "Yesterday";
  if (boardDate >= startThisWeek)  return "This week";
  if (boardDate >= startLastWeek)  return "Last week";
  if (boardDate >= startThisMonth) return "This month";
  if (boardDate >= startLastMonth) return "Last month";
  if (boardDate >= startThisYear)  return "This year";
  return "Older";
}

export function groupBoardsByDate<T extends Board>(boards: T[], currentDate = new Date()) {
  const boardGroups = new Map<BoardGroupLabel, T[]>();

  for (const board of boards) {
    const date = board.lastActivityAt ?? board.createdAt;
    const label = getBoardGroup(date, currentDate);

    const group = boardGroups.get(label);

    if (group) {
      group.push(board);
    } else {
      boardGroups.set(label, [board]);
    }
  }

  return GROUP_ORDER
    .filter((label) => boardGroups.has(label))
    .map((label) => ({ label, boards: boardGroups.get(label)! }));
}