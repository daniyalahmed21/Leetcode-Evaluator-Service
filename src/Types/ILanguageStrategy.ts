export interface ILanguageStrategy {
  execute(code: string, input: string): Promise<void>;
}
