/* for users who have signed in */

import jwt from 'jsonwebtoken' ;

export const verifyToken = async (req,res,next) => {
    try{ 
        let token = req.header("Authorization"); //giving an authorization header

        if(!token) {
            return res.staus(403).send('Access Denied');
        }

        if(token.startWith("Bearer")) {
            token = token.slice(7, token.length).trimLeft(); // Bearer leading set to token which needs to be sliced off to show the actual token
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next(); // to proceed to next step

    } catch (err) {
        res.status(500).json({ error : err.message })
    }
}