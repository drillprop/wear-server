import { Item } from '../entity/Item';
import { Order } from '../entity/Order';
import { User } from '../entity/User';
import SearchInput from '../graphql/shared/SearchInput';

type Entity = typeof Order | typeof Item | typeof User;

export default function customSearchBuilder(
  entity: Entity,
  params: SearchInput
) {
  const queryBuilder = entity.createQueryBuilder();
  const { id, skip, take, sortBy, desc } = params;
  if (id) {
    queryBuilder.andWhere('id = :id', {
      id
    });
  }

  if (skip) queryBuilder.skip(skip);
  if (take) queryBuilder.take(take);
  if (sortBy) queryBuilder.orderBy(sortBy, desc ? 'DESC' : 'ASC');

  return queryBuilder;
}
