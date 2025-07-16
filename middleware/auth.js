const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    //const token = req.headers.authorization?.split('')[1];
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'Missing token' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ error: 'Invalid token'});
    }
}

module.exports = { verifyToken };



/*
const { verifyToken } = require('../middleware/auth');
router.get('/flights/:id', verifyToken, async (req, res) => {
    // Only accessible with valid token
});
*/