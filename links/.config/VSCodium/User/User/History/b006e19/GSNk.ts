import Logger from '../src';

test('adds two numbers correctly', () => {
  const logger = new Logger({ backendUrl: 'http://localhost:3000' });
  logger.debug('Debug message');
  logger.info('Info message');
  logger.warn('Warn message');
  logger.error('Error message');
  logger.fatal('Fatal message');
});
