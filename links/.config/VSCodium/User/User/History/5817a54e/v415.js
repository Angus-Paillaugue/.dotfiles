import Logger from 'logify';

export function runLoggerTest() {
  const logger = new Logger({
    backendUrl: 'http://localhost:3000',
    bufferSize: 1,
    serverId: 2
  });

  const message = 'Test message';
  const actions = [
    (i) => logger.debug(message + ' ' + i),
    (i) => logger.info(message + ' ' + i),
    (i) => logger.warn(message + ' ' + i),
    (i) => logger.error(message + ' ' + i),
    (i) => logger.fatal(message + ' ' + i)
  ];

  for (let i = 0; i < 10; i++) actions[Math.floor(Math.random() * actions.length)](i);
}
