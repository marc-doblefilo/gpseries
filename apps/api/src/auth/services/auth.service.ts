import {
  AccessTokenInterface,
  JwtPayloadInterface,
  UserDTO
} from '@gpseries/contracts';
import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { GetUserByUsernameQuery } from '../../user/application/query/get-user-by-username.query';

@Injectable()
export class AuthService {
  constructor(private queryBus: QueryBus, private jwtService: JwtService) {}

  async encodePassword(password: string): Promise<string> {
    return await bcrypt.hashSync(password, bcrypt.genSaltSync());
  }

  async validateUser(username: string, password: string): Promise<boolean> {
    const user = await this.queryBus.execute<GetUserByUsernameQuery, UserDTO>(
      new GetUserByUsernameQuery(username)
    );

    return user && (await bcrypt.compareSync(password, user.password));
  }

  async generateAccessToken(username: string): Promise<AccessTokenInterface> {
    const user = await this.queryBus.execute<GetUserByUsernameQuery, UserDTO>(
      new GetUserByUsernameQuery(username)
    );

    const payload: JwtPayloadInterface = {
      id: user.id,
      username: user.username,
      roles: user.roles,
      name: user.name
    };

    return {
      access_token: this.jwtService.sign(payload, {
        algorithm: 'HS512'
      })
    };
  }
}
