export type Maybe<T> = T | null;
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
  createUser: User,
};


export type MutationCreateUserArgs = {
  input: RegisterInput
};

export type Query = {
   __typename?: 'Query',
  users?: Maybe<Array<Maybe<User>>>,
};

export type RegisterInput = {
  email: Scalars['String'],
  userName: Scalars['String'],
  password: Scalars['String'],
};

export type User = {
   __typename?: 'User',
  token: Scalars['String'],
  id: Scalars['ID'],
  email: Scalars['String'],
  userName: Scalars['String'],
  password: Scalars['String'],
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
};
