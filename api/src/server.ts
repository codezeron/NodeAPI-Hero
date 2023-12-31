
import express, {Application, NextFunction, Request, Response}  from "express";
import { UsersRoutes } from './routes/users.routes';
import { SchedulesRoutes } from "./routes/schedule.routes";
import  cors  from "cors";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const usersroutes = new UsersRoutes().getRouters()
const scheduelsroutes = new SchedulesRoutes().getRoutes()

app.use('/users',  usersroutes);
app.use('/schedules',  scheduelsroutes);


app.use((err: Error, request:Request, response:Response, next:NextFunction)=>{
    if(err instanceof Error){
        return response.status(400).json({
            message: err.message
        })
    }
    return response.status(500).json({
        message: 'Internal Server Errror'
    })
})

app.listen(3000, () => console.log("Running server"));
