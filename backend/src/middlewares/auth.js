const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Non authentifié' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token invalide' });
    }
};

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.user.role)) {
            return res.status(403).json({ message: 'Accès refusé' });
        }
        next();
    };
};