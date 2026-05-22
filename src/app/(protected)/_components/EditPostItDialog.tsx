import { Dialog, Portal } from "@chakra-ui/react";
import EditPostItForm from "./EditPostItForm";

type EditPostItDialogProps = {
	postItId: string;
	defaultTitle: string;
	defaultContent?: string | null;
	open: boolean;
	setOpen: (open: boolean) => void;
};

const EditPostItDialog = ({ postItId, defaultTitle, defaultContent, open, setOpen }: EditPostItDialogProps) => {
	return (
		<Dialog.Root open={open} onOpenChange={({ open }) => setOpen(open)}>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.CloseTrigger />
						<Dialog.Header>
							<Dialog.Title>Edit post-it</Dialog.Title>
						</Dialog.Header>
						<Dialog.Body>
							<EditPostItForm
								postItId={postItId}
								defaultTitle={defaultTitle}
								defaultContent={defaultContent}
								onSuccess={() => setOpen(false)}
							/>
						</Dialog.Body>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
};

export default EditPostItDialog;
