import { GraphQLResolveInfo } from 'graphql';
import { User as UserModel, Course as CourseModel, Lesson as LessonModel } from '.prisma/client';
import { MyContext } from '../../apollo/server';
export type Maybe<T> = T | null;
export type InputMaybe<T> = undefined | T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type ConfirmAccountResponse = {
  __typename?: 'ConfirmAccountResponse';
  path?: Maybe<Scalars['String']['output']>;
  sessionToken?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type ConfirmEmailResponse = {
  __typename?: 'ConfirmEmailResponse';
  message: Scalars['String']['output'];
  user?: Maybe<User>;
};

export type ConfirmPasswordResponse = {
  __typename?: 'ConfirmPasswordResponse';
  message: Scalars['String']['output'];
};

export type Course = {
  __typename?: 'Course';
  id: Scalars['Int']['output'];
  lessons?: Maybe<Array<Lesson>>;
  name: Scalars['String']['output'];
  slug?: Maybe<Scalars['String']['output']>;
};

export type Lesson = {
  __typename?: 'Lesson';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  videoURL: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  confirmPassword?: Maybe<ConfirmPasswordResponse>;
  purchaseCourse?: Maybe<PurchaseCourseResponse>;
  resetPassword?: Maybe<ResetPasswordResponse>;
  signIn?: Maybe<SignInResponse>;
  signOut?: Maybe<SignOutResponse>;
  signUp?: Maybe<SignUpResponse>;
  updateEmail?: Maybe<UpdateEmailResponse>;
  updatePassword?: Maybe<UpdatePasswordResponse>;
  updateUserName?: Maybe<UpdateUserNameResponse>;
};


export type MutationConfirmPasswordArgs = {
  key: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationPurchaseCourseArgs = {
  slug: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationSignInArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationSignUpArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  path?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationUpdatePasswordArgs = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};


export type MutationUpdateUserNameArgs = {
  newName: Scalars['String']['input'];
};

export type PurchaseCourseResponse = {
  __typename?: 'PurchaseCourseResponse';
  message: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  confirmAccount?: Maybe<ConfirmAccountResponse>;
  confirmEmail?: Maybe<ConfirmEmailResponse>;
  getCourseData?: Maybe<Course>;
  getCourses: Array<Course>;
  getPurchasedCourseData?: Maybe<Course>;
  getPurchasedCourses?: Maybe<Array<Course>>;
  hasCourseAccess?: Maybe<Scalars['Boolean']['output']>;
  me?: Maybe<User>;
};


export type QueryConfirmAccountArgs = {
  key: Scalars['String']['input'];
};


export type QueryConfirmEmailArgs = {
  key: Scalars['String']['input'];
};


export type QueryGetCourseDataArgs = {
  slug: Scalars['String']['input'];
};


export type QueryGetPurchasedCourseDataArgs = {
  slug: Scalars['String']['input'];
};


export type QueryHasCourseAccessArgs = {
  slug: Scalars['String']['input'];
};

export type ResetPasswordResponse = {
  __typename?: 'ResetPasswordResponse';
  message: Scalars['String']['output'];
};

export type SignInResponse = {
  __typename?: 'SignInResponse';
  existingUser?: Maybe<User>;
};

export type SignOutResponse = {
  __typename?: 'SignOutResponse';
  message: Scalars['String']['output'];
};

export type SignUpResponse = {
  __typename?: 'SignUpResponse';
  message: Scalars['String']['output'];
};

export type UpdateEmailResponse = {
  __typename?: 'UpdateEmailResponse';
  message: Scalars['String']['output'];
};

export type UpdatePasswordResponse = {
  __typename?: 'UpdatePasswordResponse';
  message: Scalars['String']['output'];
};

export type UpdateUserNameResponse = {
  __typename?: 'UpdateUserNameResponse';
  message: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

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
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

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
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ConfirmAccountResponse: ResolverTypeWrapper<Omit<ConfirmAccountResponse, 'user'> & { user?: Maybe<ResolversTypes['User']> }>;
  ConfirmEmailResponse: ResolverTypeWrapper<Omit<ConfirmEmailResponse, 'user'> & { user?: Maybe<ResolversTypes['User']> }>;
  ConfirmPasswordResponse: ResolverTypeWrapper<ConfirmPasswordResponse>;
  Course: ResolverTypeWrapper<CourseModel>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Lesson: ResolverTypeWrapper<LessonModel>;
  Mutation: ResolverTypeWrapper<{}>;
  PurchaseCourseResponse: ResolverTypeWrapper<PurchaseCourseResponse>;
  Query: ResolverTypeWrapper<{}>;
  ResetPasswordResponse: ResolverTypeWrapper<ResetPasswordResponse>;
  SignInResponse: ResolverTypeWrapper<Omit<SignInResponse, 'existingUser'> & { existingUser?: Maybe<ResolversTypes['User']> }>;
  SignOutResponse: ResolverTypeWrapper<SignOutResponse>;
  SignUpResponse: ResolverTypeWrapper<SignUpResponse>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateEmailResponse: ResolverTypeWrapper<UpdateEmailResponse>;
  UpdatePasswordResponse: ResolverTypeWrapper<UpdatePasswordResponse>;
  UpdateUserNameResponse: ResolverTypeWrapper<UpdateUserNameResponse>;
  User: ResolverTypeWrapper<UserModel>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  ConfirmAccountResponse: Omit<ConfirmAccountResponse, 'user'> & { user?: Maybe<ResolversParentTypes['User']> };
  ConfirmEmailResponse: Omit<ConfirmEmailResponse, 'user'> & { user?: Maybe<ResolversParentTypes['User']> };
  ConfirmPasswordResponse: ConfirmPasswordResponse;
  Course: CourseModel;
  Int: Scalars['Int']['output'];
  Lesson: LessonModel;
  Mutation: {};
  PurchaseCourseResponse: PurchaseCourseResponse;
  Query: {};
  ResetPasswordResponse: ResetPasswordResponse;
  SignInResponse: Omit<SignInResponse, 'existingUser'> & { existingUser?: Maybe<ResolversParentTypes['User']> };
  SignOutResponse: SignOutResponse;
  SignUpResponse: SignUpResponse;
  String: Scalars['String']['output'];
  UpdateEmailResponse: UpdateEmailResponse;
  UpdatePasswordResponse: UpdatePasswordResponse;
  UpdateUserNameResponse: UpdateUserNameResponse;
  User: UserModel;
}>;

export type ConfirmAccountResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ConfirmAccountResponse'] = ResolversParentTypes['ConfirmAccountResponse']> = ResolversObject<{
  path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sessionToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ConfirmEmailResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ConfirmEmailResponse'] = ResolversParentTypes['ConfirmEmailResponse']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ConfirmPasswordResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ConfirmPasswordResponse'] = ResolversParentTypes['ConfirmPasswordResponse']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CourseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Course'] = ResolversParentTypes['Course']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lessons?: Resolver<Maybe<Array<ResolversTypes['Lesson']>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LessonResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Lesson'] = ResolversParentTypes['Lesson']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  videoURL?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  confirmPassword?: Resolver<Maybe<ResolversTypes['ConfirmPasswordResponse']>, ParentType, ContextType, RequireFields<MutationConfirmPasswordArgs, 'key' | 'password'>>;
  purchaseCourse?: Resolver<Maybe<ResolversTypes['PurchaseCourseResponse']>, ParentType, ContextType, RequireFields<MutationPurchaseCourseArgs, 'slug'>>;
  resetPassword?: Resolver<Maybe<ResolversTypes['ResetPasswordResponse']>, ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'email'>>;
  signIn?: Resolver<Maybe<ResolversTypes['SignInResponse']>, ParentType, ContextType, RequireFields<MutationSignInArgs, 'email' | 'password'>>;
  signOut?: Resolver<Maybe<ResolversTypes['SignOutResponse']>, ParentType, ContextType>;
  signUp?: Resolver<Maybe<ResolversTypes['SignUpResponse']>, ParentType, ContextType, RequireFields<MutationSignUpArgs, 'email' | 'name' | 'password'>>;
  updateEmail?: Resolver<Maybe<ResolversTypes['UpdateEmailResponse']>, ParentType, ContextType, RequireFields<MutationUpdateEmailArgs, 'email'>>;
  updatePassword?: Resolver<Maybe<ResolversTypes['UpdatePasswordResponse']>, ParentType, ContextType, RequireFields<MutationUpdatePasswordArgs, 'newPassword' | 'oldPassword'>>;
  updateUserName?: Resolver<Maybe<ResolversTypes['UpdateUserNameResponse']>, ParentType, ContextType, RequireFields<MutationUpdateUserNameArgs, 'newName'>>;
}>;

export type PurchaseCourseResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['PurchaseCourseResponse'] = ResolversParentTypes['PurchaseCourseResponse']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  confirmAccount?: Resolver<Maybe<ResolversTypes['ConfirmAccountResponse']>, ParentType, ContextType, RequireFields<QueryConfirmAccountArgs, 'key'>>;
  confirmEmail?: Resolver<Maybe<ResolversTypes['ConfirmEmailResponse']>, ParentType, ContextType, RequireFields<QueryConfirmEmailArgs, 'key'>>;
  getCourseData?: Resolver<Maybe<ResolversTypes['Course']>, ParentType, ContextType, RequireFields<QueryGetCourseDataArgs, 'slug'>>;
  getCourses?: Resolver<Array<ResolversTypes['Course']>, ParentType, ContextType>;
  getPurchasedCourseData?: Resolver<Maybe<ResolversTypes['Course']>, ParentType, ContextType, RequireFields<QueryGetPurchasedCourseDataArgs, 'slug'>>;
  getPurchasedCourses?: Resolver<Maybe<Array<ResolversTypes['Course']>>, ParentType, ContextType>;
  hasCourseAccess?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<QueryHasCourseAccessArgs, 'slug'>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
}>;

export type ResetPasswordResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ResetPasswordResponse'] = ResolversParentTypes['ResetPasswordResponse']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SignInResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['SignInResponse'] = ResolversParentTypes['SignInResponse']> = ResolversObject<{
  existingUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SignOutResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['SignOutResponse'] = ResolversParentTypes['SignOutResponse']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SignUpResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['SignUpResponse'] = ResolversParentTypes['SignUpResponse']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpdateEmailResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['UpdateEmailResponse'] = ResolversParentTypes['UpdateEmailResponse']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpdatePasswordResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['UpdatePasswordResponse'] = ResolversParentTypes['UpdatePasswordResponse']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpdateUserNameResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['UpdateUserNameResponse'] = ResolversParentTypes['UpdateUserNameResponse']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MyContext> = ResolversObject<{
  ConfirmAccountResponse?: ConfirmAccountResponseResolvers<ContextType>;
  ConfirmEmailResponse?: ConfirmEmailResponseResolvers<ContextType>;
  ConfirmPasswordResponse?: ConfirmPasswordResponseResolvers<ContextType>;
  Course?: CourseResolvers<ContextType>;
  Lesson?: LessonResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PurchaseCourseResponse?: PurchaseCourseResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ResetPasswordResponse?: ResetPasswordResponseResolvers<ContextType>;
  SignInResponse?: SignInResponseResolvers<ContextType>;
  SignOutResponse?: SignOutResponseResolvers<ContextType>;
  SignUpResponse?: SignUpResponseResolvers<ContextType>;
  UpdateEmailResponse?: UpdateEmailResponseResolvers<ContextType>;
  UpdatePasswordResponse?: UpdatePasswordResponseResolvers<ContextType>;
  UpdateUserNameResponse?: UpdateUserNameResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

