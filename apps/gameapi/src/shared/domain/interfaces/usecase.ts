export interface IUseCase<T = unknown> {
  execute: (request: unknown) => Promise<T>;
}
