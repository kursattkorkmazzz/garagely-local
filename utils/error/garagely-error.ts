export class GaragelyError extends Error {
  code: string;
  details?: any;
  constructor(code: string, message?: string) {
    super(message);
    this.code = code;
  }
}
