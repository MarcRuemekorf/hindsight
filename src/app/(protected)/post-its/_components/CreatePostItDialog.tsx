"use client";

import { Dialog, Portal } from "@chakra-ui/react";
import CreatePostItForm from "./CreatePostItForm";
import { Dispatch, SetStateAction } from "react";

interface CreatePostItDialogProps {
	open: boolean;
	onOpenChange: Dispatch<SetStateAction<boolean>>;
}

const CreatePostItDialog = ({ open, onOpenChange }: CreatePostItDialogProps) => {
	return (
		<Dialog.Root open={open} onOpenChange={(details) => onOpenChange(details.open)}>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.CloseTrigger />
						<Dialog.Header>
							<Dialog.Title>Create new post-it</Dialog.Title>
						</Dialog.Header>
						<Dialog.Body>
							<CreatePostItForm onSuccess={() => onOpenChange(false)} />
						</Dialog.Body>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
};

export default CreatePostItDialog;
