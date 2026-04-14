import type { ButtonProps as ChakraButtonProps } from "@chakra-ui/react";
import { Button as ChakraButton } from "@chakra-ui/react";
import * as React from "react";

interface ButtonLoadingProps {
  disabled?: boolean;
  children: React.ReactNode;
}

export interface ButtonProps extends ChakraButtonProps, ButtonLoadingProps {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const { disabled, children, ...rest } = props;
    return (
      <ChakraButton disabled={rest.loading || disabled} ref={ref} {...rest}>
        {children}
      </ChakraButton>
    );
  },
);
