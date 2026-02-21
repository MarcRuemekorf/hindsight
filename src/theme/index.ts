import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

import recipes from "@/theme/recipes";
import semanticTokens from "@/theme/semantic-tokens";
import slotRecipes from "@/theme/slot-recipes";
import tokens from "@/theme/tokens";

const config = defineConfig({
  theme: {
    tokens,
    semanticTokens,
    recipes,
    slotRecipes,
  },
});

export const system = createSystem(defaultConfig, config);

export default system;
