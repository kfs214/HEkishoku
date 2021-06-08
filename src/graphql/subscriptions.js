/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTask = /* GraphQL */ `
  subscription OnCreateTask($owner: String!) {
    onCreateTask(owner: $owner) {
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
export const onUpdateTask = /* GraphQL */ `
  subscription OnUpdateTask($owner: String!) {
    onUpdateTask(owner: $owner) {
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
export const onDeleteTask = /* GraphQL */ `
  subscription OnDeleteTask($owner: String!) {
    onDeleteTask(owner: $owner) {
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
export const onCreateUsersSetting = /* GraphQL */ `
  subscription OnCreateUsersSetting($owner: String!) {
    onCreateUsersSetting(owner: $owner) {
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
export const onUpdateUsersSetting = /* GraphQL */ `
  subscription OnUpdateUsersSetting($owner: String!) {
    onUpdateUsersSetting(owner: $owner) {
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
export const onDeleteUsersSetting = /* GraphQL */ `
  subscription OnDeleteUsersSetting($owner: String!) {
    onDeleteUsersSetting(owner: $owner) {
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
