"use client"

import { ButtonGroup, Pagination as ChakraPagination, IconButton } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const Pagination = ({ page = 1, pageSize, count }: { page?: number; pageSize?: number; count: number }) => {
	return (
		<ChakraPagination.Root pageSize={pageSize} defaultPage={page} count={count}>
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