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
      index
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
        index
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getUsersSetting = /* GraphQL */ `
  query GetUsersSetting($id: ID!) {
    getUsersSetting(id: $id) {
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
    $filter: ModelUsersSettingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsersSettings(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
export const tasksByStatus = /* GraphQL */ `
  query TasksByStatus(
    $status: Status
    $index: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    tasksByStatus(
      status: $status
      index: $index
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const settingsByDate = /* GraphQL */ `
  query SettingsByDate(
    $userSub: String
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUsersSettingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    settingsByDate(
      userSub: $userSub
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
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
