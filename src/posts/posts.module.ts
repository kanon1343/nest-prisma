import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostsResolver } from './posts.resolver';

@Module({
  providers: [PostsResolver, PrismaService],
})
export class PostsModule {}
