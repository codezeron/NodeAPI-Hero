import { endOfDay, startOfDay } from "date-fns";
import { prisma } from "../database/prisma";

 
export class SchedulesRepositories{
    async create({name, phone, date, user_id}: ICreateSchedules){
        const result = await prisma.schedule.create({
            data: {
                name,
                phone,
                date,
                user_id
            },
        })
        
        return result
    }  
    async find(date: Date, user_id: string){
        const result = await prisma.schedule.findFirst({
            where: { date, user_id },
        });
        return result
    }
    async findAll(date: Date){
        const result = await prisma.schedule.findMany({
            where: { 
                date:{
                    gte: startOfDay(date),
                    lte: endOfDay(date)
                },                
            },
            orderBy:{
                date: 'asc'
            }
        });
        return result
    }
    async update(date: Date, id: string){
        const result = await prisma.schedule.update({
            where: {id},
            data:{
                date,
            }
        })
        return result
    }
}