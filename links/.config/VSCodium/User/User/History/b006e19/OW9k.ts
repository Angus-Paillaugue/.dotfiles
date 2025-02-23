import Logger from '../src';

export function runLoggerTest() {
  const logger = new Logger({
    backendUrl: 'http://localhost:3000',
    bufferSize: 1
  });

  const message = 'Test message';
  const actions = [
    (i:number) => logger.debug(message+" "+i),
    (i:number) => logger.info(message+" "+i),
    (i:number) => logger.warn(message+" "+i),
    (i:number) => logger.error(message+" "+i),
    (i:number) => logger.fatal(message+" "+i)
  ];


  actions[2](1);

  for (let i = 0; i < 2; i++)
    actions[0](i+2);

}
