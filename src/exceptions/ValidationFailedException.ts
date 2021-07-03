import HttpException from './HttpException';

class ValidationException extends HttpException {
  constructor(message: string, errors: Array<string>) {
    super(400, message, errors);
  }
}

export default ValidationException;
