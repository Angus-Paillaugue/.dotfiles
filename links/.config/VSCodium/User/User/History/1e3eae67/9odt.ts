

export async function deleteLog(req, res) {
  if (!id) {
    ws.send(JSON.stringify({ action: 'deleteLog', success: false, message: 'id is required' }));
    return;
  }
  try {
    const deletedLog = await LogDAO.deleteLog(id);
    if (!deletedLog) {
      Logger.error('Log not found');
      ws.send(JSON.stringify({ success: false, error: 'Log not found' }));
    }
    ws.send(JSON.stringify({ action: 'deleteLog', success: true, id }));
  } catch (error) {
    Logger.error('Error deleting log:', error);
    ws.send(JSON.stringify({ action: 'deleteLog', success: false, message: error }));
  }
}
