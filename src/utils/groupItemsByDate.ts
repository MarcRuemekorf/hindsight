import {
	startOfDay,
	startOfWeek,
	startOfMonth,
	startOfYear,
	subDays,
	subWeeks,
	subMonths,
} from "date-fns";

export type ItemGroupLabel =
	| "Today"
	| "Yesterday"
	| "This week"
	| "Last week"
	| "This month"
	| "Last month"
	| "This year"
	| "Older";

export const GROUP_ORDER: ItemGroupLabel[] = [
	"Today",
	"Yesterday",
	"This week",
	"Last week",
	"This month",
	"Last month",
	"This year",
	"Older",
];

type Item = {
	createdAt: Date;
	lastActivityAt?: Date | null;
};

function getItemGroup(itemDate: Date, currentDate: Date): ItemGroupLabel {
	const startToday = startOfDay(currentDate);
	const startYesterday = startOfDay(subDays(currentDate, 1));
	const startThisWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
	const startLastWeek = startOfWeek(subWeeks(currentDate, 1), { weekStartsOn: 1 });
	const startThisMonth = startOfMonth(currentDate);
	const startLastMonth = startOfMonth(subMonths(currentDate, 1));
	const startThisYear = startOfYear(currentDate);

	if (itemDate >= startToday) return "Today";
	if (itemDate >= startYesterday) return "Yesterday";
	if (itemDate >= startThisWeek) return "This week";
	if (itemDate >= startLastWeek) return "Last week";
	if (itemDate >= startThisMonth) return "This month";
	if (itemDate >= startLastMonth) return "Last month";
	if (itemDate >= startThisYear) return "This year";
	return "Older";
}

export function groupItemsByDate<T extends Item>(items: T[], currentDate = new Date()) {
	const itemGroups = new Map<ItemGroupLabel, T[]>();

	for (const item of items) {
		const date = item.lastActivityAt ?? item.createdAt;
		const label = getItemGroup(date, currentDate);

		const group = itemGroups.get(label);

		if (group) {
			group.push(item);
		} else {
			itemGroups.set(label, [item]);
		}
	}

	return GROUP_ORDER.filter((label) => itemGroups.has(label)).map((label) => ({
		label,
		items: itemGroups.get(label)!,
	}));
}
