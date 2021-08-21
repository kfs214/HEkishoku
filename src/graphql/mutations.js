/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTask = /* GraphQL */ `
  mutation CreateTask(
    $input: CreateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    createTask(input: $input, condition: $condition) {
      id
      title
      description
      status
      spentHour
      estimatedHour
      startedAt
      endedBy
      index
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateTask = /* GraphQL */ `
  mutation UpdateTask(
    $input: UpdateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    updateTask(input: $input, condition: $condition) {
      id
      title
      description
      status
      spentHour
      estimatedHour
      startedAt
      endedBy
      index
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteTask = /* GraphQL */ `
  mutation DeleteTask(
    $input: DeleteTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    deleteTask(input: $input, condition: $condition) {
      id
      title
      description
      status
      spentHour
      estimatedHour
      startedAt
      endedBy
      index
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createUsersSetting = /* GraphQL */ `
  mutation CreateUsersSetting(
    $input: CreateUsersSettingInput!
    $condition: ModelUsersSettingConditionInput
  ) {
    createUsersSetting(input: $input, condition: $condition) {
      id
      userSub
      workFrom
      workTo
      lunchBreakFrom
      lunchBreakHours
      updatedAt
      createdAt
      owner
    }
  }
`;
export const updateUsersSetting = /* GraphQL */ `
  mutation UpdateUsersSetting(
    $input: UpdateUsersSettingInput!
    $condition: ModelUsersSettingConditionInput
  ) {
    updateUsersSetting(input: $input, condition: $condition) {
      id
      userSub
      workFrom
      workTo
      lunchBreakFrom
      lunchBreakHours
      updatedAt
      createdAt
      owner
    }
  }
`;
export const deleteUsersSetting = /* GraphQL */ `
  mutation DeleteUsersSetting(
    $input: DeleteUsersSettingInput!
    $condition: ModelUsersSettingConditionInput
  ) {
    deleteUsersSetting(input: $input, condition: $condition) {
      id
      userSub
      workFrom
      workTo
      lunchBreakFrom
      lunchBreakHours
      updatedAt
      createdAt
      owner
    }
  }
`;
