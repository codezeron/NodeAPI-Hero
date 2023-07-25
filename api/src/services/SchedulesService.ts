import { getHours, isBefore, startOfHour } from "date-fns";
import { SchedulesRepositories } from "../repositories/ServicesRepository";
export class SchedulesServices{
    private schedulesrepository: SchedulesRepositories
    constructor(){
        this.schedulesrepository = new SchedulesRepositories()
    }
    async create({name, phone, date, user_id}: ICreateSchedules){
        const dateFormated = new Date(date)
        const hourStarted = startOfHour(dateFormated)
        const hour = getHours(hourStarted)
        if(hour <= 9 || hour >= 19){
            throw new Error("Create Schedule is between 9h and 19h")
        }

        if(isBefore(hourStarted, new Date())){
            throw new Error("It not allowed to schedule old date")
        }
        const checkavailable = await this.schedulesrepository.find(hourStarted, user_id)

        if(checkavailable){
            throw new Error("This date is already booked")
        }
        const create = await this.schedulesrepository.create({name, phone, date: hourStarted, user_id})
        return create
    }
    async index(date: Date){
        const result = await this.schedulesrepository.findAll(date)
        return result
    }
    async update(date: Date, id: string, user_id: string){
        const dateFormated = new Date(date)
        const hourStarted = startOfHour(dateFormated)

        if(isBefore(hourStarted, new Date())){
            throw new Error("It not allowed to schedule old date")
        }

        const checkavailable = await this.schedulesrepository.find(hourStarted,user_id)

        if(checkavailable){
            throw new Error("This date is already booked")
        }
        const result = await this.schedulesrepository.update(hourStarted, id)
        return result
    }
    async delete(){
        const result = await this.schedulesrepository.delete()
        return result
    }

}