"use client"

import { Button } from "@/components/buttons/button"
import { LuPlus } from "react-icons/lu"
import CreateBoardDialog from "./CreateBoardDialog"
import { useState } from "react"

const CreateBoardButton = () => {
	const [openCreateBoard, setOpenCreateBoard] = useState(false)

	return (
		<>
			<Button size="sm" onClick={() => setOpenCreateBoard(true)}>
				<LuPlus /> Create new board
			</Button>
			<CreateBoardDialog open={openCreateBoard} onOpenChange={setOpenCreateBoard} />
		</>
	)
}

export default CreateBoardButton