"use client"

import {
  Button,
  Menu,
  Portal,
} from "@chakra-ui/react"
import { useState } from "react"
import { LuPlus } from "react-icons/lu"
import CreateBoardDialog from "@/app/(protected)/boards/_components/CreateBoardDialog"
import CreatePostItDialog from "@/app/(protected)/post-its/_components/CreatePostItDialog"


const CreateButton = () => {
  const [openCreateBoard, setOpenCreateBoard] = useState(false)
  const [openCreatePostIt, setOpenCreatePostIt] = useState(false)

  return (
    <>
      <Menu.Root>
        <Menu.Trigger asChild>
			<Button size="sm">
				<LuPlus /> Create
			</Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="createBoard" onClick={() => setOpenCreateBoard(true)}>
                Create board
              </Menu.Item>
              <Menu.Item value="createPostIt" onClick={() => setOpenCreatePostIt(true)}>
                Create Post-it
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>

	  <CreateBoardDialog open={openCreateBoard} onOpenChange={setOpenCreateBoard} />
	  <CreatePostItDialog open={openCreatePostIt} onOpenChange={setOpenCreatePostIt} />
    </>
  )
}

export default CreateButton
