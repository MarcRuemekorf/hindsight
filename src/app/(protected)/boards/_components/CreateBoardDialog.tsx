"use client";

import CreateBoardForm from "./CreateBoardForm";
import { Dialog, Portal } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface CreateBoardDialogProps {
	open: boolean;
	onOpenChange: Dispatch<SetStateAction<boolean>>;
}

const CreateBoardDialog = ({ open, onOpenChange }: CreateBoardDialogProps) => {
	return (
		<Dialog.Root open={open} onOpenChange={(details) => onOpenChange(details.open)}>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.CloseTrigger />
						<Dialog.Header>
							<Dialog.Title>Create new board</Dialog.Title>
						</Dialog.Header>
						<Dialog.Body>
							<CreateBoardForm />
						</Dialog.Body>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
};

export default CreateBoardDialog;
