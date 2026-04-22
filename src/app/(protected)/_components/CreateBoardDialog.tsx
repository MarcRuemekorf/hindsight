import CreateBoardForm from "@/app/(protected)/_components/CreateBoardForm";
import { Button } from "@/components/buttons/button";
import { Dialog, Portal } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";

const CreateBoardDialog = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button size="sm">
          <LuPlus /> Create
        </Button>
      </Dialog.Trigger>
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
