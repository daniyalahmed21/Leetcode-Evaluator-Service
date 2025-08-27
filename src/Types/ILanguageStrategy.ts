export interface ILanguageStrategy {
  execute(
    code: string,
    inputTestCase: string,
    outputTestCase: string,
  ): Promise<object>;
}
