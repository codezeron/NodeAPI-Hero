import { Router } from "express";
import { SchedulesControllers } from "../controllers/SchedulesController";
import { AuthMiddleware } from "../middlewares/auth";

class SchedulesRoutes{
    private router: Router
    private schedulescontroller: SchedulesControllers
    private authmiddleware: AuthMiddleware;
    constructor(){
        this.router = Router()
        this.schedulescontroller = new SchedulesControllers()
        this.authmiddleware = new AuthMiddleware()
    }
    getRoutes(): Router{{
        this.router.post('/', 
        this.authmiddleware.auth.bind(this.authmiddleware),
        this.schedulescontroller.store.bind(this.schedulescontroller))
        
        this.router.get('/index', 
        this.authmiddleware.auth.bind(this.authmiddleware),
        this.schedulescontroller.index.bind(this.schedulescontroller))

        this.router.put('/update/:id', 
        this.authmiddleware.auth.bind(this.authmiddleware),
        this.schedulescontroller.update.bind(this.schedulescontroller))

        this.router.delete('/delete', 
        this.authmiddleware.auth.bind(this.authmiddleware),
        this.schedulescontroller.delete.bind(this.schedulescontroller))


        return this.router;
    }}
}

export {SchedulesRoutes}