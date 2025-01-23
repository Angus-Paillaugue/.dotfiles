

export async function (req: Request, res: Response) {
  const logs = req.body;

  try {
    const insertedLogs = await LogDAO.insertLogs(logs);
    logEventEmitter.emit('newLogs', insertedLogs);
    res.status(200).send({ status: 'success' });
  } catch (error) {
    Logger.error('Error inserting logs:', error);
    res.status(500).send({ status: 'error' });
  }
}
