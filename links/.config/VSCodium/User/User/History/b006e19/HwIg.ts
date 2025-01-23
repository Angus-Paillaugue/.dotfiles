import Logger from '../src';

export function runLoggerTest() {
  const logger = new Logger({
    backendUrl: 'http://localhost:3000',
    bufferSize: 1
  });

  const message = 'Test message';
  const actions = [
    () => logger.debug(message),
    () => logger.info(message),
    () => logger.warn(message),
    () => logger.error(message),
    () => logger.fatal(message)
  ];
  for (let i = 0; i < 10; i++)
    actions[Math.floor(Math.random() * actions.length)]();
}
