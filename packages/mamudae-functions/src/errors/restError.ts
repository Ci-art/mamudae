export class RestError extends Error {
  status: number;

  constructor(status: number, message?: string) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RestError);
    }

    this.status = status;
  }
}
