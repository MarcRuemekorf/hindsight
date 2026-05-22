"use client"

import { Button } from "@/components/buttons/button"
import { LuPlus } from "react-icons/lu"
import CreatePostItDialog from "./CreatePostItDialog"
import { useState } from "react"

const CreatePostItButton = () => {
	const [openCreatePostIt, setOpenCreatePostIt] = useState(false)

	return (
		<>
			<Button size="sm" onClick={() => setOpenCreatePostIt(true)}>
				<LuPlus /> Create new post-it
			</Button>
			<CreatePostItDialog open={openCreatePostIt} onOpenChange={setOpenCreatePostIt} />
		</>
	)
}

export default CreatePostItButton