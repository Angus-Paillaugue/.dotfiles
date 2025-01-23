import Logger from '../src';

export function runTest() {
  const logger = new Logger({ backendUrl: 'http://localhost:3000' });
  logger.debug('Debug message');
  logger.info('Info message');
  logger.warn('Warn message');
  logger.error('Error message');
  logger.fatal('Fatal message');
}
