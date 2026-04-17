import Link from "@/components/typography/link";
import { Button } from "@/components/buttons/button";
import { Box } from "@chakra-ui/react";

type NavigationLink = {
  href: string;
  name: string;
};

const NavigationItem = ({ href, name }: NavigationLink) => {
  return (
    <Box as="li">
      <Button asChild variant="ghost" width="100%" justifyContent="flex-start">
        <Link href={href} variant="plain">
          {name}
        </Link>
      </Button>
    </Box>
  );
};

export default NavigationItem;
