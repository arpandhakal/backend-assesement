// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { UsersService } from 'src/users/users.service';

// @Injectable()
// export class AuthService {
//   constructor(private userService: UsersService) {}

//   async signIn(username: string, password: string): Promise<any> {
//     const user = await this.userService.getUsers(username);
//     if (user.password !== password) {
//       throw new UnauthorizedException();
//     }
//     return user;
//   }
// }