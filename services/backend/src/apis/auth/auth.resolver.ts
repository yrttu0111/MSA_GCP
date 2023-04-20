import { UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { GqlAuthRefreshGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser } from 'src/commons/auth/gql-user.param';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  @Mutation(() => String)
  async tokenlogin(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Context() context: any,
  ) {
    // 1.로그인
    const user = await this.userService.findOne({ email });

    //2. 없으면 에러
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다');
    // 3. 아이디 유 비밀번호가 틀림 에러
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('비밀번호가 틀립니다');

    // 4. refreshToken(=JWT) 을 만들어서 프론트 엔드 쿠키에 보내주기
   
    await this.authService.setRefreshToken({ user, res: context.res });
    console.log('context.res', context.res)
    // 5. 일치하는 유저 있으면 토큰 발행

    return this.authService.getAccessToken({ user });
  }
  @Mutation(() => String)
  async login(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Context() context: any,
  ) {
    // 1.로그인
    const user = await this.userService.findOne({ email });

    //2. 없으면 에러
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다');
    // 3. 아이디 유 비밀번호가 틀림 에러
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('비밀번호가 틀립니다');

    // 4. refreshToken(=JWT) 을 만들어서 프론트 엔드 쿠키에 보내주기
    
    await this.authService.setRefreshToken({ user, res: context.res });
    
    // 5. 리턴
    console.log(`${user.email} 님 로그인 성공`);
    
    return `${user.email} 님 로그인 성공`;
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  restoreAccessToken(@CurrentUser() currentUser: any) {
    return this.authService.getAccessToken({ user: currentUser });
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  async logout(
    //
    @Context() context: any,//
  ) {
    return await this.authService.blackList({ context });
  }
}
