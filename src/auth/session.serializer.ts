import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { UserService } from "src/user/user.service";

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(pirvate userService: UserService){
    super();
  }

  serializeUser(user:any, done: (err: Error, user: any) => void) : any {
    done(null, user.email)
  }
}