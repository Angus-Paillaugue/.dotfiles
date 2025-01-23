import Logger from '../src';

export function runLoggerTest() {
  const logger = new Logger({ backendUrl: 'http://localhost:3000', bufferSize:5 });
  logger.warn('Test error 1');
}
