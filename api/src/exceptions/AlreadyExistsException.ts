import HttpException from './HttpException';

class AlreadyExistsException extends HttpException {
  constructor(message: string) {
    super(400, message);
  }
}

export default AlreadyExistsException;
