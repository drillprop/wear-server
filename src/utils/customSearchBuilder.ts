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
  const { whereId, skip, take, orderBy, desc } = params;
  if (whereId) {
    queryBuilder.andWhere('id = :id', {
      id: whereId
    });
  }

  if (skip) queryBuilder.skip(skip);
  if (take) queryBuilder.take(take);
  if (orderBy) queryBuilder.orderBy(orderBy, desc ? 'DESC' : 'ASC');

  return queryBuilder;
}
