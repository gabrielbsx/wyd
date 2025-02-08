export interface IValidation<T> {
  validate: (request: unknown) => T;
}
