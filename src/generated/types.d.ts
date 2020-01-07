import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '../types/context.types';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Date: Date,
};

export type CreateItemInput = {
  name: Scalars['String'],
  price: Scalars['Int'],
  imageUrl: Scalars['String'],
  category: Scalars['String'],
};


export type Item = {
   __typename?: 'Item',
  id: Scalars['ID'],
  name: Scalars['String'],
  price: Scalars['Int'],
  imageUrl: Scalars['String'],
  category?: Maybe<Scalars['String']>,
  createdAt: Scalars['Date'],
  updatedAt?: Maybe<Scalars['Date']>,
};

export type ItemWhereInput = {
  column?: Maybe<Scalars['String']>,
  argument?: Maybe<Scalars['String']>,
  take?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>,
  orderBy?: Maybe<Scalars['String']>,
  order?: Maybe<OrderDirection>,
};

export type Mutation = {
   __typename?: 'Mutation',
  createItem: Item,
  register: User,
  login: User,
  signout?: Maybe<SuccessMessage>,
  changeUserRole?: Maybe<SuccessMessage>,
  deleteAccount?: Maybe<SuccessMessage>,
};


export type MutationCreateItemArgs = {
  input: CreateItemInput
};


export type MutationRegisterArgs = {
  input: SignInput
};


export type MutationLoginArgs = {
  input: SignInput
};


export type MutationChangeUserRoleArgs = {
  email: Scalars['String'],
  role: UserRole
};


export type MutationDeleteAccountArgs = {
  password: Scalars['String']
};

export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Query = {
   __typename?: 'Query',
  items: Array<Maybe<Item>>,
  users?: Maybe<Array<Maybe<User>>>,
  me?: Maybe<User>,
};


export type QueryItemsArgs = {
  input?: Maybe<ItemWhereInput>
};

export type SignInput = {
  email: Scalars['String'],
  password: Scalars['String'],
};

export type SuccessMessage = {
   __typename?: 'SuccessMessage',
  message?: Maybe<Scalars['String']>,
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  email: Scalars['String'],
  password: Scalars['String'],
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  role: UserRole,
  createdAt: Scalars['Date'],
};

export enum UserRole {
  Admin = 'ADMIN',
  Employee = 'EMPLOYEE',
  Customer = 'CUSTOMER'
}

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>,
  ItemWhereInput: ResolverTypeWrapper<any>,
  String: ResolverTypeWrapper<any>,
  Int: ResolverTypeWrapper<any>,
  OrderDirection: ResolverTypeWrapper<any>,
  Item: ResolverTypeWrapper<any>,
  ID: ResolverTypeWrapper<any>,
  Date: ResolverTypeWrapper<any>,
  User: ResolverTypeWrapper<any>,
  UserRole: ResolverTypeWrapper<any>,
  Mutation: ResolverTypeWrapper<{}>,
  CreateItemInput: ResolverTypeWrapper<any>,
  SignInput: ResolverTypeWrapper<any>,
  SuccessMessage: ResolverTypeWrapper<any>,
  Boolean: ResolverTypeWrapper<any>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  ItemWhereInput: any,
  String: any,
  Int: any,
  OrderDirection: any,
  Item: any,
  ID: any,
  Date: any,
  User: any,
  UserRole: any,
  Mutation: {},
  CreateItemInput: any,
  SignInput: any,
  SuccessMessage: any,
  Boolean: any,
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export type ItemResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Item'] = ResolversParentTypes['Item']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  category?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createItem?: Resolver<ResolversTypes['Item'], ParentType, ContextType, RequireFields<MutationCreateItemArgs, 'input'>>,
  register?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'input'>>,
  login?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>,
  signout?: Resolver<Maybe<ResolversTypes['SuccessMessage']>, ParentType, ContextType>,
  changeUserRole?: Resolver<Maybe<ResolversTypes['SuccessMessage']>, ParentType, ContextType, RequireFields<MutationChangeUserRoleArgs, 'email' | 'role'>>,
  deleteAccount?: Resolver<Maybe<ResolversTypes['SuccessMessage']>, ParentType, ContextType, RequireFields<MutationDeleteAccountArgs, 'password'>>,
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  items?: Resolver<Array<Maybe<ResolversTypes['Item']>>, ParentType, ContextType, QueryItemsArgs>,
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>,
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
}>;

export type SuccessMessageResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SuccessMessage'] = ResolversParentTypes['SuccessMessage']> = ResolversObject<{
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  role?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>,
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  Date?: GraphQLScalarType,
  Item?: ItemResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  SuccessMessage?: SuccessMessageResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
