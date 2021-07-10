export interface ServerError extends Error {
  status: number;
}

export class ServerError extends Error {
  constructor(error: Error | string, status: number) {
    super(error instanceof Error ? error.message : error);
    this.status = status;
  }
}

export default (message: Error | string, status: number): ServerError => {
  const error = new ServerError(message, status);
  return error;
};
