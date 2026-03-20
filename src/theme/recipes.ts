import { buttonRecipe } from "@/theme/recipes/button";
import { linkRecipe } from "@/theme/recipes/link";

// NOTE:
// Only import recipes defined with `defineRecipe`
// Recipes defined with `defineSlotRecipe` go in `slot-recipes.ts`

const recipes = {
  button: buttonRecipe,
  link: linkRecipe,
};

export default recipes;
