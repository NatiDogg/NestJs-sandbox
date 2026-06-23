import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {

      getHello(): string{
          return 'hello Nest js'
     }

     getHelloWithName(name: string): string{
          return `hello ${name}`
     }
}
