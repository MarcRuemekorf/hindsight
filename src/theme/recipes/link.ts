import { defineRecipe } from "@chakra-ui/react";

export const linkRecipe = defineRecipe({
  className: "chakra-link",

  variants: {
    variant: {
      plain: {
        _hover: {
          textDecoration: "none",
        },
      },
    },
  },

  defaultVariants: {
    variant: "plain",
  },
});
