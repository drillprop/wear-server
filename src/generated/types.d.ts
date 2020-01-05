import { GraphQLResolveInfo } from 'graphql';
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
};

export type Mutation = {
   __typename?: 'Mutation',
  register: User,
  login: User,
  signout?: Maybe<SuccessMessage>,
};


export type MutationRegisterArgs = {
  input: SignInput
};


export type MutationLoginArgs = {
  input: SignInput
};

export type Query = {
   __typename?: 'Query',
  users?: Maybe<Array<Maybe<User>>>,
  me?: Maybe<User>,
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
  token: Scalars['String'],
  id: Scalars['ID'],
  email: Scalars['String'],
  password: Scalars['String'],
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
};

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
  User: ResolverTypeWrapper<any>,
  String: ResolverTypeWrapper<any>,
  ID: ResolverTypeWrapper<any>,
  Mutation: ResolverTypeWrapper<{}>,
  SignInput: ResolverTypeWrapper<any>,
  SuccessMessage: ResolverTypeWrapper<any>,
  Boolean: ResolverTypeWrapper<any>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  User: any,
  String: any,
  ID: any,
  Mutation: {},
  SignInput: any,
  SuccessMessage: any,
  Boolean: any,
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  register?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'input'>>,
  login?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>,
  signout?: Resolver<Maybe<ResolversTypes['SuccessMessage']>, ParentType, ContextType>,
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>,
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
}>;

export type SuccessMessageResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SuccessMessage'] = ResolversParentTypes['SuccessMessage']> = ResolversObject<{
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
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
