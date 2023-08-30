import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostInput } from './interfaces/create-post.input';
import { PostModel } from './interfaces/post.model';

@Resolver()
export class PostsResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Query(() => [PostModel], { name: 'posts', nullable: true })
  async getPosts() {
    return this.prismaService.post.findMany();
  }

  @Mutation(() => PostModel)
  async createPost(@Args('input') input: CreatePostInput) {
    return this.prismaService.post.create({
      data: {
        title: input.title,
      },
    });
  }
}
