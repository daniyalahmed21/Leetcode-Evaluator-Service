import { PythonStrategy } from "./PythonStrategy";
import { CppStrategy } from "./CppStrategy";
import { JavaStrategy } from "./JavaStrategy";
import { ILanguageStrategy } from "../Types/ILanguageStrategy";

export class LanguageStrategyFactory {
  private static strategies: Record<string, ILanguageStrategy> = {
    python: new PythonStrategy(),
    cpp: new CppStrategy(),
    java: new JavaStrategy(),
  };

  static getStrategy(language: string): ILanguageStrategy | null {
    return this.strategies[language] ?? null;
  }
}
