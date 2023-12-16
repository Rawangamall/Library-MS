const requestCounts = {};

exports.rateLimit = async (req, res, next)=> {
  const endpoint = req.originalUrl; 
  const clientIP = req.ip; 

  const key = `${endpoint}_${clientIP}`;

  if (!requestCounts[key]) {
    requestCounts[key] = 0;
  }

  requestCounts[key]++;

  if (requestCounts[key] > 5) {
    return res.status(429).json({ message: 'Rate limit exceeded. Please try again later.' });
  }

  // Reset request count after 1 min
  setTimeout(() => {
    requestCounts[key] = 0;
  }, 60000); 

  next();
}
