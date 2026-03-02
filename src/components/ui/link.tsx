import { Link as ChakraLink } from "@chakra-ui/react";
import type { LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import NextLink from "next/link";
import * as React from "react";

export interface LinkProps extends ChakraLinkProps {
  href: string;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  function Link(props, ref) {
    const { href, children, ...rest } = props;
    return (
      <ChakraLink asChild ref={ref} {...props}>
        <NextLink href={href}>{children}</NextLink>
      </ChakraLink>
    );
  },
);

export default Link;
