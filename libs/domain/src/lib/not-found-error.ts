export class NotFoundError extends Error {
  constructor(stack?: string) {
    super(stack);
  }
}
