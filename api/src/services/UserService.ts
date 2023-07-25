import { compare, hash } from "bcrypt"
import { UserRepository } from "../repositories/UserRepository"
import { s3 } from "../config/aws";
import {v4 as uuid} from "uuid"
import { sign, verify } from "jsonwebtoken";

class UserServices{
    private userRepository : UserRepository
    constructor(){
        this.userRepository = new UserRepository()
    }
    async create({ name, email, password }: ICreate){
        //verificar se existe o usuario no banco
        const findUser = await this.userRepository.findByEmail(email)

        if(findUser){
            throw new Error('User already exists')
        }
        
        const hashPassword = await hash(password, 10)
        
        const createuser = await this.userRepository.create( {
            name, 
            email,
            password: hashPassword
        });

        return createuser
    }
    async update({name, oldPassword, newPassword, avatar_url,user_id}: IUpdate){
        let password
        if(oldPassword && newPassword){
            const findUserById = await this.userRepository.findById(user_id)
            if(!findUserById){
                throw new Error('User not found')
            }
            const comparePass = compare(oldPassword, findUserById.password)
            if(!comparePass){
                throw new Error('User or password invalid')
            }
            password = await hash(newPassword, 10)
            await this.userRepository.updatePassword(password,user_id)
        }
        if(avatar_url){
            const uploadImage = avatar_url?.buffer
                const uploads3 = await s3.upload({
                    Bucket: 'semanaheroi1',
                    Key: `${uuid()}--${avatar_url?.originalname}`,
                    //ACL: 'public-read',
                    Body: uploadImage,
                }).promise() 
                console.log("url da imagem: ", uploads3.Location);
    
            await this.userRepository.update(name,  uploads3.Location, user_id)
        }
        return{
            message: "User updated"
        }
    }
    async auth(email: string, password: string ){
        //verificar se existe o usuario no banco para criar o token
        const findUser = await this.userRepository.findByEmail(email)

        if(!findUser){
            throw new Error('User or password invalid')
        }
        const comparePass = compare(password, findUser.password)
        
        if(!comparePass){
            throw new Error('User or password invalid')
        }
        let secretkey: string | undefined = process.env.ACESS_KEY_TOKEN;
        if(!secretkey){
            throw new Error('There is no token key')
        }
        const token = sign({email},secretkey,{
            subject: findUser.id,
            expiresIn: 60 * 15,
        });
        const refreshToken = sign({email},secretkey,{
            subject: findUser.id,
            expiresIn: '7d',
        });

        return{
            token,
            refresh_token: refreshToken,
            user:{
                name: findUser.name,
                email: findUser.email,
            }
        }
    }

    async refresh(refresh_token: string ){
        
        if(!refresh_token){
            throw new Error('refresh token is missing')
        }
        let secretkey: string | undefined = process.env.ACESS_KEY_TOKEN;
        if(!secretkey){
            throw new Error('There is no token key')
        }   
        
        const verifyRefreshToken = verify(refresh_token, secretkey)
        const {sub} = verifyRefreshToken
        const newToken = sign({sub}, secretkey, {
            expiresIn: 60*15
        })
        return {token: newToken}
    }
}
export {UserServices}