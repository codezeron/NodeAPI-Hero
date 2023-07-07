import { prisma } from "../database/prisma"

class UserRepository {
    async create({ name, email, password }: ICreate) {
        const result = await prisma.users.create({
            data: {
                name: name,
                email: email,
                password: password,
            },
        });
        return result
    }
    async findByEmail(email: string) {
        const result = await prisma.users.findUnique({
            where: {
                email: email,
            }
        })
        return result
    }
    async findById(id: string) {
        const result = await prisma.users.findUnique({
            where: {
                id: id
            }
        })
        return result
    }
    async update(name: string, avatar_url: string, user_id:string) {
        const result = await prisma.users.update({
            where: {
                id: user_id
            },
            data: {
                name,
                avatar_url,
            }
        })
        return result
    }
    async updatePassword(newPassword: string, user_id:string) {
        const result = await prisma.users.update({
            where: {
                id: user_id
            },
            data: { 
                password: newPassword,
            }
        })
        return result
    }
    async delete(id: string) {
        const result = await prisma.users.delete({
            where: {
                id: id
            }
        })
        return result
    }

}
export { UserRepository }