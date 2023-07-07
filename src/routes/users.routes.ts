import { Router } from "express";
import { UsersController } from "../controllers/UsersController";
import { upload } from "../config/multer";
import { AuthMiddleware } from "../middlewares/auth";

class UsersRoutes{
    private router: Router;
    private userscontroller: UsersController;
    private authmiddleware: AuthMiddleware;
    
    constructor(){
        this.router = Router();
        this.userscontroller = new UsersController()
        this.authmiddleware = new AuthMiddleware()
    }
    getRouters(){

        this.router.get('/')
        this.router.post(
            '/', 
            this.userscontroller.store.bind(this.userscontroller),
        );
        this.router.post(
            '/auth', 
            this.userscontroller.auth.bind(this.userscontroller),
        );
        
        this.router.put('/',
            upload.single('avatar_url'),
            this.authmiddleware.auth.bind(this.authmiddleware),
            this.userscontroller.update.bind(this.userscontroller)
        );
        
        this.router.get('/:id')
        this.router.delete('/:id')
        return this.router;
    }
}

export {UsersRoutes}