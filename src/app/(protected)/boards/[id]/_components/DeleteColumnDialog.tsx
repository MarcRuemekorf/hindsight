import { Button } from "@/components/buttons/button";
import { Dialog, Portal, Text } from "@chakra-ui/react";
import { PostIt } from "../_actions/getBoard";

type DeleteColumnDialogProps = {
	column: {
		postIts: PostIt[];
	};
	open: boolean;
	setOpen: (open: boolean) => void;
	deleting: boolean;
	onConfirm: () => void;
};

const DeleteColumnDialog = ({
	column,
	open,
	setOpen,
	deleting,
	onConfirm,
}: DeleteColumnDialogProps) => {
	return (
		<Dialog.Root open={open} onOpenChange={({ open }) => setOpen(open)} role="alertdialog">
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>Delete column?</Dialog.Title>
						</Dialog.Header>
						<Dialog.Body>
							<Text>
								This column contains {column.postIts.length} post-it
								{column.postIts.length !== 1 ? "s" : ""}. Deleting it will
								permanently remove all of them.
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

export default DeleteColumnDialog;
