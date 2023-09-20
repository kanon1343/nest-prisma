import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  email!: string;

  @HideField()
  password!: string;

  @HideField()
  createdAt!: Date;

  @HideField()
  updatedAt!: Date;
}
