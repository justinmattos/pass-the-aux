export interface ServerError extends Error {
  status: number;
}

export class ServerError extends Error {
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export default (message: string, status: number): ServerError => {
  const error = new ServerError(message, status);
  return error;
};
