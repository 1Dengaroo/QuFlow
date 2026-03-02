import { getAstFromText } from "./getAstFromText";
import { Calculator } from "./calculator";
import { getScopeFromAst } from "./getScopeFromAst";
import { getSerialisedSteps } from "./getSerializedSteps";

export const getSimulationSteps = (text: string) => {
  try {
    const ast = getAstFromText(text);
    const scope = getScopeFromAst(ast);
    const steps = new Calculator(scope).getSteps(ast);
    const serialised = getSerialisedSteps(steps, scope);

    return serialised;
  } catch (error) {
    throw error;
  }
};
