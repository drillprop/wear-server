import { ClassType, Field, Int, ObjectType } from 'type-graphql';

export default function<T>(TClass: ClassType<T>) {
  @ObjectType({ isAbstract: true })
  abstract class SelectAndCount {
    @Field(() => [TClass], { nullable: 'items' })
    select: [T];
    @Field(() => Int)
    count: number;
  }
  return SelectAndCount;
}
