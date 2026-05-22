import { Container, Heading, HStack, Stack } from "@chakra-ui/react";
import PostItList from "../_components/PostItList";
import CreatePostItButton from "./_components/CreatePostItButton";

const PostItsPage = () => {
	return (
		<>
			<Container maxWidth="6xl">
				<Stack gap="2rem">
					<HStack justifyContent="space-between">
						<Heading as="h2" size="xl">
							Post-its overview
						</Heading>
						<CreatePostItButton />
					</HStack>
					<PostItList />
				</Stack>
			</Container>
		</>
	);
};

export default PostItsPage;
