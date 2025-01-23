export function filterIp(req, res, next) {
    const sendersIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const ip = sendersIp.split(',')[0];
    
