import Logger from '../src';

export function runLoggerTest() {
  const logger = new Logger({
    backendUrl: 'http://localhost:3000',
    bufferSize: 1,
    serverId: 2
  });

  const message = 'Test message';
  const actions = [
    (i: number) => logger.debug(message + ' ' + i),
    (i: number) => logger.info(message + ' ' + i),
    (i: number) => logger.warn(message + ' ' + i),
    (i: number) => logger.error(message + ' ' + i)
  ];

  for (let i = 0; i < 100; i++) actions[Math.floor(Math.random() * actions.length)](i);
}
