"use client"

import { ButtonGroup, Pagination as ChakraPagination, IconButton } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const Pagination = ({ page = 1, pageSize = 15, count }: { page?: number; pageSize?: number; count: number }) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	if(pageSize >= count) {
		return null;
	}

	const handlePageChange = ({ page: newPage }: { page: number }) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", String(newPage));
		router.push(`?${params.toString()}`);
	};

	return (
		<ChakraPagination.Root pageSize={pageSize} page={page} count={count} onPageChange={handlePageChange}>
			<ButtonGroup variant="ghost" size="sm">
				<ChakraPagination.PrevTrigger asChild>
					<IconButton aria-label="Previous page">
						<LuChevronLeft />
					</IconButton>
				</ChakraPagination.PrevTrigger>

				<ChakraPagination.Items
					render={(page) => (
						<IconButton variant={{ base: "ghost", _selected: "outline" }} aria-label={`Page ${page.value}`}>
							{page.value}
						</IconButton>
					)}
				/>

				<ChakraPagination.NextTrigger asChild>
					<IconButton aria-label="Next page">
						<LuChevronRight />
					</IconButton>
				</ChakraPagination.NextTrigger>
			</ButtonGroup>
		</ChakraPagination.Root>
	);
};

export default Pagination;