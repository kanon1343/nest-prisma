import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {
  Inject,
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import * as RedisStore from 'connect-redis';
import * as session from 'express-session';
import * as passport from 'passport';
import * as path from 'path';
import { RedisClient } from 'redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { PrismaService } from './prisma/prisma.service';
import { REDIS } from './redis/redis.constants';
import { RedisModule } from './redis/redis.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [AppController],
  providers: [AppService, Logger, PrismaService],
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: false,
      playground: true,
      autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      // GraphQLの部分でcorsの設定なども合わせて変更してる
      cors: {
        origin: ['http://localhost:3000'],
        credentials: true,
        allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
        methods: '*',
      },
    }),
    PostsModule,
    UsersModule,
    RedisModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  constructor(@Inject(REDIS) private readonly redis: RedisClient) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new (RedisStore(session))({
            client: this.redis,
            logErrors: true,
          }),
          saveUninitialized: false,
          secret: 'secret',
          resave: false,
          cookie: {
            sameSite: 'lax',
            httpOnly: false,
            maxAge: 60000,
            secure: false,
            domain: 'localhost',
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
