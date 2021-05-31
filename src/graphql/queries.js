/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTask = /* GraphQL */ `
  query GetTask($id: ID!) {
    getTask(id: $id) {
      id
      title
      description
      status
      spentHour
      estimatedHour
      startedAt
      endedBy
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listTasks = /* GraphQL */ `
  query ListTasks(
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        status
        spentHour
        estimatedHour
        startedAt
        endedBy
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getUsersSetting = /* GraphQL */ `
  query GetUsersSetting($userSub: String!, $updatedAt: AWSDateTime!) {
    getUsersSetting(userSub: $userSub, updatedAt: $updatedAt) {
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
export const listUsersSettings = /* GraphQL */ `
  query ListUsersSettings(
    $userSub: String
    $updatedAt: ModelStringKeyConditionInput
    $filter: ModelUsersSettingFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsersSettings(
      userSub: $userSub
      updatedAt: $updatedAt
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
