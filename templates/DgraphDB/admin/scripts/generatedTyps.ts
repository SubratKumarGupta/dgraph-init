import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Int64: any;
  UInt64: any;
};

export type AddGroupInput = {
  name: Scalars['String'];
  rules?: InputMaybe<Array<InputMaybe<RuleRef>>>;
};

export type AddGroupPayload = {
  __typename?: 'AddGroupPayload';
  group?: Maybe<Array<Maybe<Group>>>;
};

export type AddNamespaceInput = {
  password?: InputMaybe<Scalars['String']>;
};

export type AddUserInput = {
  groups?: InputMaybe<Array<InputMaybe<GroupRef>>>;
  name: Scalars['String'];
  password: Scalars['String'];
};

export type AddUserPayload = {
  __typename?: 'AddUserPayload';
  user?: Maybe<Array<Maybe<User>>>;
};

export type AssignInput = {
  /** How many to assign. */
  num: Scalars['UInt64'];
  /** Choose what to assign: UID, TIMESTAMP or NAMESPACE_ID. */
  what: AssignKind;
};

export enum AssignKind {
  NamespaceId = 'NAMESPACE_ID',
  Timestamp = 'TIMESTAMP',
  Uid = 'UID',
}

export type AssignPayload = {
  __typename?: 'AssignPayload';
  response?: Maybe<AssignedIds>;
};

export type AssignedIds = {
  __typename?: 'AssignedIds';
  /** The last UID, TIMESTAMP or NAMESPACE_ID assigned. */
  endId?: Maybe<Scalars['UInt64']>;
  /** TIMESTAMP for read-only transactions. */
  readOnly?: Maybe<Scalars['UInt64']>;
  /** The first UID, TIMESTAMP or NAMESPACE_ID assigned. */
  startId?: Maybe<Scalars['UInt64']>;
};

export type BackupGroup = {
  __typename?: 'BackupGroup';
  /** The ID of the cluster group. */
  groupId?: Maybe<Scalars['UInt64']>;
  /** List of predicates assigned to the group. */
  predicates?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type BackupInput = {
  /** Access key credential for the destination. */
  accessKey?: InputMaybe<Scalars['String']>;
  /** Set to true to allow backing up to S3 or Minio bucket that requires no credentials. */
  anonymous?: InputMaybe<Scalars['Boolean']>;
  /** Destination for the backup: e.g. Minio or S3 bucket. */
  destination: Scalars['String'];
  /** Force a full backup instead of an incremental backup. */
  forceFull?: InputMaybe<Scalars['Boolean']>;
  /** Secret key credential for the destination. */
  secretKey?: InputMaybe<Scalars['String']>;
  /** AWS session token, if required. */
  sessionToken?: InputMaybe<Scalars['String']>;
};

export type BackupPayload = {
  __typename?: 'BackupPayload';
  response?: Maybe<Response>;
  taskId?: Maybe<Scalars['String']>;
};

export type ClusterGroup = {
  __typename?: 'ClusterGroup';
  checksum?: Maybe<Scalars['UInt64']>;
  id?: Maybe<Scalars['UInt64']>;
  members?: Maybe<Array<Maybe<Member>>>;
  snapshotTs?: Maybe<Scalars['UInt64']>;
  tablets?: Maybe<Array<Maybe<Tablet>>>;
};

export type Config = {
  __typename?: 'Config';
  cacheMb?: Maybe<Scalars['Float']>;
};

export type ConfigInput = {
  /**
   * Estimated memory the caches can take. Actual usage by the process would be
   * more than specified here. The caches will be updated according to the
   * cache_percentage flag.
   */
  cacheMb?: InputMaybe<Scalars['Float']>;
  /**
   * True value of logRequest enables logging of all the requests coming to alphas.
   * False value of logRequest disables above.
   */
  logRequest?: InputMaybe<Scalars['Boolean']>;
};

export type ConfigPayload = {
  __typename?: 'ConfigPayload';
  response?: Maybe<Response>;
};

export type DeleteGroupPayload = {
  __typename?: 'DeleteGroupPayload';
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};

export type DeleteNamespaceInput = {
  namespaceId: Scalars['Int'];
};

export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};

export type DrainingPayload = {
  __typename?: 'DrainingPayload';
  response?: Maybe<Response>;
};

export type EnterpriseLicenseInput = {
  /** The contents of license file as a String. */
  license: Scalars['String'];
};

export type EnterpriseLicensePayload = {
  __typename?: 'EnterpriseLicensePayload';
  response?: Maybe<Response>;
};

export type ExportInput = {
  /** Access key credential for the destination. */
  accessKey?: InputMaybe<Scalars['String']>;
  /** Set to true to allow backing up to S3 or Minio bucket that requires no credentials. */
  anonymous?: InputMaybe<Scalars['Boolean']>;
  /** Destination for the export: e.g. Minio or S3 bucket or /absolute/path */
  destination?: InputMaybe<Scalars['String']>;
  /** Data format for the export, e.g. "rdf" or "json" (default: "rdf") */
  format?: InputMaybe<Scalars['String']>;
  /**
   * Namespace for the export in multi-tenant cluster. Users from guardians of galaxy can export
   * all namespaces by passing a negative value or specific namespaceId to export that namespace.
   */
  namespace?: InputMaybe<Scalars['Int']>;
  /** Secret key credential for the destination. */
  secretKey?: InputMaybe<Scalars['String']>;
  /** AWS session token, if required. */
  sessionToken?: InputMaybe<Scalars['String']>;
};

export type ExportPayload = {
  __typename?: 'ExportPayload';
  exportedFiles?: Maybe<Array<Maybe<Scalars['String']>>>;
  response?: Maybe<Response>;
};

/** Data about the GraphQL schema being served by Dgraph. */
export type GqlSchema = {
  __typename?: 'GQLSchema';
  /**
   * The GraphQL schema that was generated from the 'schema' field.
   * This is the schema that is being served by Dgraph at /graphql.
   */
  generatedSchema: Scalars['String'];
  id: Scalars['ID'];
  /** Input schema (GraphQL types) that was used in the latest schema update. */
  schema: Scalars['String'];
};

export type GqlSchemaPatch = {
  schema: Scalars['String'];
};

export type Group = {
  __typename?: 'Group';
  /** Name of the group.  Dgraph ensures uniqueness of group names. */
  name: Scalars['String'];
  rules?: Maybe<Array<Maybe<Rule>>>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type GroupFilter = {
  and?: InputMaybe<UserFilter>;
  name?: InputMaybe<StringHashFilter>;
  not?: InputMaybe<UserFilter>;
  or?: InputMaybe<UserFilter>;
};

export type GroupOrder = {
  asc?: InputMaybe<GroupOrderable>;
  desc?: InputMaybe<GroupOrderable>;
  then?: InputMaybe<GroupOrder>;
};

export enum GroupOrderable {
  Name = 'name',
}

export type GroupRef = {
  name: Scalars['String'];
};

export type License = {
  __typename?: 'License';
  enabled?: Maybe<Scalars['Boolean']>;
  expiryTs?: Maybe<Scalars['Int64']>;
  maxNodes?: Maybe<Scalars['UInt64']>;
  user?: Maybe<Scalars['String']>;
};

export type ListBackupsInput = {
  /** Access key credential for the destination. */
  accessKey?: InputMaybe<Scalars['String']>;
  /** Whether the destination doesn't require credentials (e.g. S3 public bucket). */
  anonymous?: InputMaybe<Scalars['Boolean']>;
  /** Destination for the backup: e.g. Minio or S3 bucket. */
  location: Scalars['String'];
  /** Secret key credential for the destination. */
  secretKey?: InputMaybe<Scalars['String']>;
  /** AWS session token, if required. */
  sessionToken?: InputMaybe<Scalars['String']>;
};

export type LoginPayload = {
  __typename?: 'LoginPayload';
  response?: Maybe<LoginResponse>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  /** JWT token that should be used in future requests after this login. */
  accessJWT?: Maybe<Scalars['String']>;
  /** Refresh token that can be used to re-login after accessJWT expires. */
  refreshJWT?: Maybe<Scalars['String']>;
};

export type Manifest = {
  __typename?: 'Manifest';
  /** Unique ID for the backup series. */
  backupId?: Maybe<Scalars['String']>;
  /** Number of this backup within the backup series. The full backup always has a value of one. */
  backupNum?: Maybe<Scalars['UInt64']>;
  /** Whether this backup was encrypted. */
  encrypted?: Maybe<Scalars['Boolean']>;
  /** List of groups and the predicates they store in this backup. */
  groups?: Maybe<Array<Maybe<BackupGroup>>>;
  /** Path to the manifest file. */
  path?: Maybe<Scalars['String']>;
  /**
   * The timestamp at which this backup was taken. The next incremental backup will
   * start from this timestamp.
   */
  since?: Maybe<Scalars['UInt64']>;
  /** The type of backup, either full or incremental. */
  type?: Maybe<Scalars['String']>;
};

export type Member = {
  __typename?: 'Member';
  addr?: Maybe<Scalars['String']>;
  amDead?: Maybe<Scalars['Boolean']>;
  clusterInfoOnly?: Maybe<Scalars['Boolean']>;
  forceGroupId?: Maybe<Scalars['Boolean']>;
  groupId?: Maybe<Scalars['UInt64']>;
  id?: Maybe<Scalars['UInt64']>;
  lastUpdate?: Maybe<Scalars['UInt64']>;
  leader?: Maybe<Scalars['Boolean']>;
};

export type MembershipState = {
  __typename?: 'MembershipState';
  cid?: Maybe<Scalars['String']>;
  counter?: Maybe<Scalars['UInt64']>;
  groups?: Maybe<Array<Maybe<ClusterGroup>>>;
  license?: Maybe<License>;
  maxNsID?: Maybe<Scalars['UInt64']>;
  maxRaftId?: Maybe<Scalars['UInt64']>;
  maxTxnTs?: Maybe<Scalars['UInt64']>;
  maxUID?: Maybe<Scalars['UInt64']>;
  /**
   * Contains list of namespaces. Note that this is not stored in proto's MembershipState and
   * computed at the time of query.
   */
  namespaces?: Maybe<Array<Maybe<Scalars['UInt64']>>>;
  removed?: Maybe<Array<Maybe<Member>>>;
  zeros?: Maybe<Array<Maybe<Member>>>;
};

export type MoveTabletInput = {
  /** ID of the destination group where the predicate is to be moved. */
  groupId: Scalars['UInt64'];
  /** Namespace in which the predicate exists. */
  namespace?: InputMaybe<Scalars['UInt64']>;
  /** Name of the predicate to move. */
  tablet: Scalars['String'];
};

export type MoveTabletPayload = {
  __typename?: 'MoveTabletPayload';
  response?: Maybe<Response>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Add a new group and (optionally) set the rules for the group. */
  addGroup?: Maybe<AddGroupPayload>;
  /** Add a new namespace. */
  addNamespace?: Maybe<NamespacePayload>;
  /**
   * Add a user.  When linking to groups: if the group doesn't exist it is created; if the group
   * exists, the new user is linked to the existing group.  It's possible to both create new
   * groups and link to existing groups in the one mutation.
   *
   * Dgraph ensures that usernames are unique, hence attempting to add an existing user results
   * in an error.
   */
  addUser?: Maybe<AddUserPayload>;
  /** Lease UIDs, Timestamps or Namespace IDs in advance. */
  assign?: Maybe<AssignPayload>;
  /** Start a binary backup.  See : https://dgraph.io/docs/enterprise-features/#binary-backups */
  backup?: Maybe<BackupPayload>;
  /** Alter the node's config. */
  config?: Maybe<ConfigPayload>;
  deleteGroup?: Maybe<DeleteGroupPayload>;
  /** Delete a namespace. */
  deleteNamespace?: Maybe<NamespacePayload>;
  deleteUser?: Maybe<DeleteUserPayload>;
  /** Set (or unset) the cluster draining mode.  In draining mode no further requests are served. */
  draining?: Maybe<DrainingPayload>;
  /** Apply enterprise license. */
  enterpriseLicense?: Maybe<EnterpriseLicensePayload>;
  /**
   * Starts an export of all data in the cluster.  Export format should be 'rdf' (the default
   * if no format is given), or 'json'.
   * See : https://dgraph.io/docs/deploy/#export-database
   */
  export?: Maybe<ExportPayload>;
  /**
   * Login to Dgraph.  Successful login results in a JWT that can be used in future requests.
   * If login is not successful an error is returned.
   */
  login?: Maybe<LoginPayload>;
  /** Move a predicate from one group to another. */
  moveTablet?: Maybe<MoveTabletPayload>;
  /** Remove a node from the cluster. */
  removeNode?: Maybe<RemoveNodePayload>;
  /**
   * Reset password can only be used by the Guardians of the galaxy to reset password of
   * any user in any namespace.
   */
  resetPassword?: Maybe<ResetPasswordPayload>;
  /**
   * Start restoring a binary backup.  See :
   * 	https://dgraph.io/docs/enterprise-features/#binary-backups
   */
  restore?: Maybe<RestorePayload>;
  /** Shutdown this node. */
  shutdown?: Maybe<ShutdownPayload>;
  /**
   * Update the Dgraph cluster to serve the input schema.  This may change the GraphQL
   * schema, the types and predicates in the Dgraph schema, and cause indexes to be recomputed.
   */
  updateGQLSchema?: Maybe<UpdateGqlSchemaPayload>;
  /**
   * Add or remove rules for groups. If the filter doesn't match any groups,
   * the mutation has no effect.
   */
  updateGroup?: Maybe<AddGroupPayload>;
  /**
   * Update users, their passwords and groups.  As with AddUser, when linking to groups: if the
   * group doesn't exist it is created; if the group exists, the new user is linked to the existing
   * group.  If the filter doesn't match any users, the mutation has no effect.
   */
  updateUser?: Maybe<AddUserPayload>;
};

export type MutationAddGroupArgs = {
  input: Array<AddGroupInput>;
};

export type MutationAddNamespaceArgs = {
  input?: InputMaybe<AddNamespaceInput>;
};

export type MutationAddUserArgs = {
  input: Array<AddUserInput>;
};

export type MutationAssignArgs = {
  input: AssignInput;
};

export type MutationBackupArgs = {
  input: BackupInput;
};

export type MutationConfigArgs = {
  input: ConfigInput;
};

export type MutationDeleteGroupArgs = {
  filter: GroupFilter;
};

export type MutationDeleteNamespaceArgs = {
  input: DeleteNamespaceInput;
};

export type MutationDeleteUserArgs = {
  filter: UserFilter;
};

export type MutationDrainingArgs = {
  enable?: InputMaybe<Scalars['Boolean']>;
};

export type MutationEnterpriseLicenseArgs = {
  input: EnterpriseLicenseInput;
};

export type MutationExportArgs = {
  input: ExportInput;
};

export type MutationLoginArgs = {
  namespace?: InputMaybe<Scalars['Int']>;
  password?: InputMaybe<Scalars['String']>;
  refreshToken?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type MutationMoveTabletArgs = {
  input: MoveTabletInput;
};

export type MutationRemoveNodeArgs = {
  input: RemoveNodeInput;
};

export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};

export type MutationRestoreArgs = {
  input: RestoreInput;
};

export type MutationUpdateGqlSchemaArgs = {
  input: UpdateGqlSchemaInput;
};

export type MutationUpdateGroupArgs = {
  input: UpdateGroupInput;
};

export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type NamespacePayload = {
  __typename?: 'NamespacePayload';
  message?: Maybe<Scalars['String']>;
  namespaceId?: Maybe<Scalars['UInt64']>;
};

/** A NodeState is the state of an individual node in the Dgraph cluster. */
export type NodeState = {
  __typename?: 'NodeState';
  /** Address of the node. */
  address?: Maybe<Scalars['String']>;
  /** List of Enterprise Features that are enabled. */
  ee_features?: Maybe<Array<Maybe<Scalars['String']>>>;
  /**
   * The group this node belongs to in the Dgraph cluster.
   * See : https://dgraph.io/docs/deploy/#cluster-setup.
   */
  group?: Maybe<Scalars['String']>;
  /** List of predicates for which indexes are built in the background. */
  indexing?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Node type : either 'alpha' or 'zero'. */
  instance?: Maybe<Scalars['String']>;
  /** Time in Unix epoch time that the node was last contacted by another Zero or Alpha node. */
  lastEcho?: Maybe<Scalars['Int64']>;
  /** List of ongoing operations in the background. */
  ongoing?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Node health status : either 'healthy' or 'unhealthy'. */
  status?: Maybe<Scalars['String']>;
  /** Time in nanoseconds since the node started. */
  uptime?: Maybe<Scalars['Int64']>;
  /** Version of the Dgraph binary. */
  version?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  config?: Maybe<Config>;
  /** Get the currently logged in user. */
  getCurrentUser?: Maybe<User>;
  getGQLSchema?: Maybe<GqlSchema>;
  getGroup?: Maybe<Group>;
  getUser?: Maybe<User>;
  health?: Maybe<Array<Maybe<NodeState>>>;
  /** Get the information about the backups at a given location. */
  listBackups?: Maybe<Array<Maybe<Manifest>>>;
  queryGroup?: Maybe<Array<Maybe<Group>>>;
  queryUser?: Maybe<Array<Maybe<User>>>;
  state?: Maybe<MembershipState>;
  task?: Maybe<TaskPayload>;
};

export type QueryGetGroupArgs = {
  name: Scalars['String'];
};

export type QueryGetUserArgs = {
  name: Scalars['String'];
};

export type QueryListBackupsArgs = {
  input: ListBackupsInput;
};

export type QueryQueryGroupArgs = {
  filter?: InputMaybe<GroupFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<GroupOrder>;
};

export type QueryQueryUserArgs = {
  filter?: InputMaybe<UserFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<UserOrder>;
};

export type QueryTaskArgs = {
  input: TaskInput;
};

export type RemoveGroupPatch = {
  rules: Array<Scalars['String']>;
};

export type RemoveNodeInput = {
  /** ID of the group from which the node is to be removed. */
  groupId: Scalars['UInt64'];
  /** ID of the node to be removed. */
  nodeId: Scalars['UInt64'];
};

export type RemoveNodePayload = {
  __typename?: 'RemoveNodePayload';
  response?: Maybe<Response>;
};

export type ResetPasswordInput = {
  namespace: Scalars['Int'];
  password: Scalars['String'];
  userId: Scalars['String'];
};

export type ResetPasswordPayload = {
  __typename?: 'ResetPasswordPayload';
  message?: Maybe<Scalars['String']>;
  namespace?: Maybe<Scalars['UInt64']>;
  userId?: Maybe<Scalars['String']>;
};

export type Response = {
  __typename?: 'Response';
  code?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type RestoreInput = {
  /** Access key credential for the destination. */
  accessKey?: InputMaybe<Scalars['String']>;
  /** Set to true to allow backing up to S3 or Minio bucket that requires no credentials. */
  anonymous?: InputMaybe<Scalars['Boolean']>;
  /**
   * Backup ID of the backup series to restore. This ID is included in the manifest.json file.
   * If missing, it defaults to the latest series.
   */
  backupId?: InputMaybe<Scalars['String']>;
  /**
   * Number of the backup within the backup series to be restored. Backups with a greater value
   * will be ignored. If the value is zero or missing, the entire series will be restored.
   */
  backupNum?: InputMaybe<Scalars['Int']>;
  /**
   * Path to the key file needed to decrypt the backup. This file should be accessible
   * by all alphas in the group. The backup will be written using the encryption key
   * with which the cluster was started, which might be different than this key.
   */
  encryptionKeyFile?: InputMaybe<Scalars['String']>;
  /** Destination for the backup: e.g. Minio or S3 bucket. */
  location: Scalars['String'];
  /** Secret key credential for the destination. */
  secretKey?: InputMaybe<Scalars['String']>;
  /** AWS session token, if required. */
  sessionToken?: InputMaybe<Scalars['String']>;
  /**
   * Vault server address where the key is stored. This server must be accessible
   * by all alphas in the group. Default "http://localhost:8200".
   */
  vaultAddr?: InputMaybe<Scalars['String']>;
  /** Vault kv store field whose value is the key. Default "enc_key". */
  vaultField?: InputMaybe<Scalars['String']>;
  /** Vault kv store field's format. Must be "base64" or "raw". Default "base64". */
  vaultFormat?: InputMaybe<Scalars['String']>;
  /** Vault kv store path where the key lives. Default "secret/data/dgraph". */
  vaultPath?: InputMaybe<Scalars['String']>;
  /** Path to the Vault RoleID file. */
  vaultRoleIDFile?: InputMaybe<Scalars['String']>;
  /** Path to the Vault SecretID file. */
  vaultSecretIDFile?: InputMaybe<Scalars['String']>;
};

export type RestorePayload = {
  __typename?: 'RestorePayload';
  /** A short string indicating whether the restore operation was successfully scheduled. */
  code?: Maybe<Scalars['String']>;
  /** Includes the error message if the operation failed. */
  message?: Maybe<Scalars['String']>;
};

export type Rule = {
  __typename?: 'Rule';
  /**
   * Permissions that apply for the rule.  Represented following the UNIX file permission
   * convention. That is, 4 (binary 100) represents READ, 2 (binary 010) represents WRITE,
   * and 1 (binary 001) represents MODIFY (the permission to change a predicate’s schema).
   *
   * The options are:
   * * 1 (binary 001) : MODIFY
   * * 2 (010) : WRITE
   * * 3 (011) : WRITE+MODIFY
   * * 4 (100) : READ
   * * 5 (101) : READ+MODIFY
   * * 6 (110) : READ+WRITE
   * * 7 (111) : READ+WRITE+MODIFY
   *
   * Permission 0, which is equal to no permission for a predicate, blocks all read,
   * write and modify operations.
   */
  permission: Scalars['Int'];
  /** Predicate to which the rule applies. */
  predicate: Scalars['String'];
};

export type RuleRef = {
  /**
   * Permissions that apply for the rule.  Represented following the UNIX file permission
   * convention. That is, 4 (binary 100) represents READ, 2 (binary 010) represents WRITE,
   * and 1 (binary 001) represents MODIFY (the permission to change a predicate’s schema).
   *
   * The options are:
   * * 1 (binary 001) : MODIFY
   * * 2 (010) : WRITE
   * * 3 (011) : WRITE+MODIFY
   * * 4 (100) : READ
   * * 5 (101) : READ+MODIFY
   * * 6 (110) : READ+WRITE
   * * 7 (111) : READ+WRITE+MODIFY
   *
   * Permission 0, which is equal to no permission for a predicate, blocks all read,
   * write and modify operations.
   */
  permission: Scalars['Int'];
  /** Predicate to which the rule applies. */
  predicate: Scalars['String'];
};

export type SetGroupPatch = {
  rules: Array<RuleRef>;
};

export type ShutdownPayload = {
  __typename?: 'ShutdownPayload';
  response?: Maybe<Response>;
};

export type StringHashFilter = {
  eq?: InputMaybe<Scalars['String']>;
};

export type Tablet = {
  __typename?: 'Tablet';
  force?: Maybe<Scalars['Boolean']>;
  groupId?: Maybe<Scalars['UInt64']>;
  moveTs?: Maybe<Scalars['UInt64']>;
  predicate?: Maybe<Scalars['String']>;
  readOnly?: Maybe<Scalars['Boolean']>;
  remove?: Maybe<Scalars['Boolean']>;
  space?: Maybe<Scalars['Int']>;
};

export type TaskInput = {
  id: Scalars['String'];
};

export enum TaskKind {
  Backup = 'Backup',
  Export = 'Export',
  Unknown = 'Unknown',
}

export type TaskPayload = {
  __typename?: 'TaskPayload';
  kind?: Maybe<TaskKind>;
  lastUpdated?: Maybe<Scalars['DateTime']>;
  status?: Maybe<TaskStatus>;
};

export enum TaskStatus {
  Failed = 'Failed',
  Queued = 'Queued',
  Running = 'Running',
  Success = 'Success',
  Unknown = 'Unknown',
}

export type UpdateGqlSchemaInput = {
  set: GqlSchemaPatch;
};

export type UpdateGqlSchemaPayload = {
  __typename?: 'UpdateGQLSchemaPayload';
  gqlSchema?: Maybe<GqlSchema>;
};

export type UpdateGroupInput = {
  filter: GroupFilter;
  remove?: InputMaybe<RemoveGroupPatch>;
  set?: InputMaybe<SetGroupPatch>;
};

export type UpdateUserInput = {
  filter: UserFilter;
  remove?: InputMaybe<UserPatch>;
  set?: InputMaybe<UserPatch>;
};

export type User = {
  __typename?: 'User';
  groups?: Maybe<Array<Maybe<Group>>>;
  /** Username for the user.  Dgraph ensures that usernames are unique. */
  name: Scalars['String'];
};

export type UserFilter = {
  and?: InputMaybe<UserFilter>;
  name?: InputMaybe<StringHashFilter>;
  not?: InputMaybe<UserFilter>;
  or?: InputMaybe<UserFilter>;
};

export type UserOrder = {
  asc?: InputMaybe<UserOrderable>;
  desc?: InputMaybe<UserOrderable>;
  then?: InputMaybe<UserOrder>;
};

export enum UserOrderable {
  Name = 'name',
}

export type UserPatch = {
  groups?: InputMaybe<Array<InputMaybe<GroupRef>>>;
  password?: InputMaybe<Scalars['String']>;
};

export type UserRef = {
  name: Scalars['String'];
};

export type GetGqlSchemaQueryVariables = Exact<{ [key: string]: never }>;

export type GetGqlSchemaQuery = {
  __typename?: 'Query';
  getGQLSchema?: { __typename?: 'GQLSchema'; schema: string; generatedSchema: string } | null;
};

export type UpdateGqlSchemaMutationVariables = Exact<{
  sch: Scalars['String'];
}>;

export type UpdateGqlSchemaMutation = {
  __typename?: 'Mutation';
  updateGQLSchema?: {
    __typename?: 'UpdateGQLSchemaPayload';
    gqlSchema?: { __typename?: 'GQLSchema'; schema: string; generatedSchema: string } | null;
  } | null;
};

export const GetGqlSchemaDocument = gql`
  query getGQLSchema {
    getGQLSchema {
      schema
      generatedSchema
    }
  }
`;
export const UpdateGqlSchemaDocument = gql`
  mutation updateGQLSchema($sch: String!) {
    updateGQLSchema(input: { set: { schema: $sch } }) {
      gqlSchema {
        schema
        generatedSchema
      }
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getGQLSchema(
      variables?: GetGqlSchemaQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GetGqlSchemaQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<GetGqlSchemaQuery>(GetGqlSchemaDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getGQLSchema',
        'query'
      );
    },
    updateGQLSchema(
      variables: UpdateGqlSchemaMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<UpdateGqlSchemaMutation> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<UpdateGqlSchemaMutation>(UpdateGqlSchemaDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'updateGQLSchema',
        'mutation'
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
