import { Button } from "@/components/buttons/button";
import { Dialog, Portal, Text } from "@chakra-ui/react";

type DeleteBoardDialogProps = {
	open: boolean;
	setOpen: (open: boolean) => void;
	deleting: boolean;
	onConfirm: () => void;
};

const DeleteBoardDialog = ({ open, setOpen, deleting, onConfirm }: DeleteBoardDialogProps) => {
	return (
		<Dialog.Root open={open} onOpenChange={({ open }) => setOpen(open)} role="alertdialog">
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>Delete board?</Dialog.Title>
						</Dialog.Header>
						<Dialog.Body>
							<Text>
								This will permanently delete the board along with all its columns
								and post-its.
							</Text>
						</Dialog.Body>
						<Dialog.Footer>
							<Dialog.ActionTrigger asChild>
								<Button variant="outline" disabled={deleting}>
									Cancel
								</Button>
							</Dialog.ActionTrigger>
							<Button colorPalette="red" loading={deleting} onClick={onConfirm}>
								Delete
							</Button>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
};

export default DeleteBoardDialog;
