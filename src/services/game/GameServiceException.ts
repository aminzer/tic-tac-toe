export class GameServiceException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GameServiceException';
  }
}
