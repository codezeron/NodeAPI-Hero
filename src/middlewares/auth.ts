import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
interface IPayload{
    sub: string
}
class AuthMiddleware{
    auth(request: Request,response: Response ,next: NextFunction){
        const authHeader = request.headers.authorization;
        if(!authHeader){
            return response.status(401).json({
                code: 'token missing',
                message:'Token missing'
            })
        }
        // Baerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVuenBAdGVzdGVzLmNvbSIsImlhdCI6MTY4ODc0OTc0MiwiZXhwIjoxNjg4NzUwNjQyLCJzdWIiOiI1NWZkYjQ1My02ZTAwLTRlZTgtYmY4YS1lOTEwMzY4ZGViNTAifQ.GNTQ7cUzyASmuAd6F6sFuWqaLF5NgPAFuq6kaysabZA
        const [, token] = authHeader.split(' ');
        let secretkey: string | undefined = process.env.ACESS_KEY_TOKEN;
        if(!secretkey){
            throw new Error('There is no token key')
        }
        try {
            const { sub } = verify(token, secretkey) as IPayload;
            request.user_id = sub;
            return next()
        } catch (error) {
            return response.status(401).json({
                code: 'token expired',
                message: 'Token expired'
            });
        }
    }
}
export {AuthMiddleware}