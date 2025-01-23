import Logger from '../src';

export function runLoggerTest() {
  const logger = new Logger({
    backendUrl: 'http://localhost:3000',
    bufferSize: 1
  });

  const message = 'Test message';
  const actions = [
    (i) => logger.debug(message),
    (i) => logger.info(message),
    (i) => logger.warn(message),
    (i) => logger.error(message),
    (i) => logger.fatal(message)
  ];


  actions[2]();

  for (let i = 0; i < 10; i++)
    actions[0]();

}
