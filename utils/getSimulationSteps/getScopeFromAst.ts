import { Program } from "acorn";
import * as eslintScope from "eslint-scope";

export const getScopeFromAst = (ast: Program) => {
  if (!ast || !ast.body) {
    throw new Error("Invalid AST: ast or ast.body is undefined");
  }
  // Cast needed: acorn and eslint-scope use slightly different but compatible AST types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return eslintScope.analyze(ast as any, {
    ecmaVersion: 2024,
    sourceType: "script",
  });
};
