// @generated by protoc-gen-es v2.4.0 with parameter "target=ts"
// @generated from file reusehub/user/v1/user.proto (package reusehub.user.v1, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file reusehub/user/v1/user.proto.
 */
export const file_reusehub_user_v1_user: GenFile = /*@__PURE__*/
  fileDesc("ChtyZXVzZWh1Yi91c2VyL3YxL3VzZXIucHJvdG8SEHJldXNlaHViLnVzZXIudjEiSAoEVXNlchIKCgJpZBgBIAEoCRISCgpmaXJzdF9uYW1lGAIgASgJEhEKCWxhc3RfbmFtZRgDIAEoCRINCgVlbWFpbBgEIAEoCSIcCg5HZXRVc2VyUmVxdWVzdBIKCgJpZBgBIAEoCSI3Cg9HZXRVc2VyUmVzcG9uc2USJAoEdXNlchgBIAEoCzIWLnJldXNlaHViLnVzZXIudjEuVXNlciJJChFDcmVhdGVVc2VyUmVxdWVzdBISCgpmaXJzdF9uYW1lGAEgASgJEhEKCWxhc3RfbmFtZRgCIAEoCRINCgVlbWFpbBgDIAEoCSI6ChJDcmVhdGVVc2VyUmVzcG9uc2USJAoEdXNlchgBIAEoCzIWLnJldXNlaHViLnVzZXIudjEuVXNlcjK6AQoLVXNlclNlcnZpY2USUAoHR2V0VXNlchIgLnJldXNlaHViLnVzZXIudjEuR2V0VXNlclJlcXVlc3QaIS5yZXVzZWh1Yi51c2VyLnYxLkdldFVzZXJSZXNwb25zZSIAElkKCkNyZWF0ZVVzZXISIy5yZXVzZWh1Yi51c2VyLnYxLkNyZWF0ZVVzZXJSZXF1ZXN0GiQucmV1c2VodWIudXNlci52MS5DcmVhdGVVc2VyUmVzcG9uc2UiAEJNWktnaXRodWIuY29tL3ZsYWRpbWlyUmFkb2prb3ZpYy9yZXVzZWh1Yi1hcGkvZ2VucHJvdG8vcmV1c2VodWIvdXNlci92MTt1c2VydjFiBnByb3RvMw");

/**
 * User represents a user in the system
 *
 * @generated from message reusehub.user.v1.User
 */
export type User = Message<"reusehub.user.v1.User"> & {
  /**
   * Unique identifier for the user
   *
   * @generated from field: string id = 1;
   */
  id: string;

  /**
   * User's first name
   *
   * @generated from field: string first_name = 2;
   */
  firstName: string;

  /**
   * User's last name
   *
   * @generated from field: string last_name = 3;
   */
  lastName: string;

  /**
   * User's email address
   *
   * @generated from field: string email = 4;
   */
  email: string;
};

/**
 * Describes the message reusehub.user.v1.User.
 * Use `create(UserSchema)` to create a new message.
 */
export const UserSchema: GenMessage<User> = /*@__PURE__*/
  messageDesc(file_reusehub_user_v1_user, 0);

/**
 * GetUserRequest is the request type for the GetUser RPC
 *
 * @generated from message reusehub.user.v1.GetUserRequest
 */
export type GetUserRequest = Message<"reusehub.user.v1.GetUserRequest"> & {
  /**
   * ID of the user to retrieve
   *
   * @generated from field: string id = 1;
   */
  id: string;
};

/**
 * Describes the message reusehub.user.v1.GetUserRequest.
 * Use `create(GetUserRequestSchema)` to create a new message.
 */
export const GetUserRequestSchema: GenMessage<GetUserRequest> = /*@__PURE__*/
  messageDesc(file_reusehub_user_v1_user, 1);

/**
 * GetUserResponse is the response type for the GetUser RPC
 *
 * @generated from message reusehub.user.v1.GetUserResponse
 */
export type GetUserResponse = Message<"reusehub.user.v1.GetUserResponse"> & {
  /**
   * The requested user information
   *
   * @generated from field: reusehub.user.v1.User user = 1;
   */
  user?: User;
};

/**
 * Describes the message reusehub.user.v1.GetUserResponse.
 * Use `create(GetUserResponseSchema)` to create a new message.
 */
export const GetUserResponseSchema: GenMessage<GetUserResponse> = /*@__PURE__*/
  messageDesc(file_reusehub_user_v1_user, 2);

/**
 * CreateUserRequest is the request type for the CreateUser RPC
 *
 * @generated from message reusehub.user.v1.CreateUserRequest
 */
export type CreateUserRequest = Message<"reusehub.user.v1.CreateUserRequest"> & {
  /**
   * First name for the new user
   *
   * @generated from field: string first_name = 1;
   */
  firstName: string;

  /**
   * Last name for the new user
   *
   * @generated from field: string last_name = 2;
   */
  lastName: string;

  /**
   * Email address for the new user
   *
   * @generated from field: string email = 3;
   */
  email: string;
};

/**
 * Describes the message reusehub.user.v1.CreateUserRequest.
 * Use `create(CreateUserRequestSchema)` to create a new message.
 */
export const CreateUserRequestSchema: GenMessage<CreateUserRequest> = /*@__PURE__*/
  messageDesc(file_reusehub_user_v1_user, 3);

/**
 * CreateUserResponse is the response type for the CreateUser RPC
 *
 * @generated from message reusehub.user.v1.CreateUserResponse
 */
export type CreateUserResponse = Message<"reusehub.user.v1.CreateUserResponse"> & {
  /**
   * The created user information
   *
   * @generated from field: reusehub.user.v1.User user = 1;
   */
  user?: User;
};

/**
 * Describes the message reusehub.user.v1.CreateUserResponse.
 * Use `create(CreateUserResponseSchema)` to create a new message.
 */
export const CreateUserResponseSchema: GenMessage<CreateUserResponse> = /*@__PURE__*/
  messageDesc(file_reusehub_user_v1_user, 4);

/**
 * UserService provides operations for managing users
 *
 * @generated from service reusehub.user.v1.UserService
 */
export const UserService: GenService<{
  /**
   * GetUser retrieves a user by ID
   *
   * @generated from rpc reusehub.user.v1.UserService.GetUser
   */
  getUser: {
    methodKind: "unary";
    input: typeof GetUserRequestSchema;
    output: typeof GetUserResponseSchema;
  },
  /**
   * CreateUser creates a new user
   *
   * @generated from rpc reusehub.user.v1.UserService.CreateUser
   */
  createUser: {
    methodKind: "unary";
    input: typeof CreateUserRequestSchema;
    output: typeof CreateUserResponseSchema;
  },
}> = /*@__PURE__*/
  serviceDesc(file_reusehub_user_v1_user, 0);

