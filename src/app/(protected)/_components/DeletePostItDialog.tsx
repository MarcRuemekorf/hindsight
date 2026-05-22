import { Button } from "@/components/buttons/button";
import { Dialog, Portal, Text } from "@chakra-ui/react";

type DeletePostItDialogProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    deleting: boolean;
    onConfirm: () => void;
};

const DeletePostItDialog = ({ open, setOpen, deleting, onConfirm }: DeletePostItDialogProps) => {
    return (
        <Dialog.Root
            open={open}
            onOpenChange={({ open }) => setOpen(open)}
            role="alertdialog"
        >
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Delete post-it?</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Text>This will permanently delete the post-it.</Text>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline" disabled={deleting}>
                                    Cancel
                                </Button>
                            </Dialog.ActionTrigger>
                            <Button
                                colorPalette="red"
                                loading={deleting}
                                onClick={onConfirm}
                            >
                                Delete
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};

export default DeletePostItDialog;
