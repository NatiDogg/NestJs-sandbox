import { Injectable } from '@nestjs/common';
import { HelloService } from 'src/hello/hello.service';

@Injectable()
export class UserService {

    constructor(private readonly helloService:HelloService){}


    getAllUsers(){
        return [
            {
                id: 1,
                name: 'Sangam'
            },
            {
                id: 2,
                name: 'Nati'
            },
            {
                id: 3,
                name: 'Bob'
            }
        ]
    }

    getUserById(id:number){
        const user = this.getAllUsers().find(u=> u.id === id);

        return user
    }

    getWelcomeMessage(userId: number){
         const user = this.getAllUsers().find(u=> u.id === userId);

         if(!user){
            return 'User not Found'
         }

         return this.helloService.getHelloWithName(user.name)
    }
   

}
