// react
import PropTypes from "prop-types";

// apollo
import { gql, useQuery, useMutation } from "@apollo/client";

// components, graphql, and consts
import { settingsByDate } from "../graphql/queries";
import { createUsersSetting, updateUsersSetting } from "../graphql/mutations";
import Settings from "../components/organisms/Settings";
import { handleHoursChange } from "../utils";
import CONSTS from "../consts";

const EnhancedSettings = ({ userSub, settingsOpen, setSettingsOpen }) => {
  const settingsByDateQueryVariables = { userSub, sortDirection: "DESC" };

  const {
    data: { settingsByDate: { items: [usersSetting] = [] } = {} } = {},
    loading,
    error
  } = useQuery(gql(settingsByDate), {
    variables: settingsByDateQueryVariables
  });

  const [update] = useMutation(gql(updateUsersSetting));
  const [create] = useMutation(gql(createUsersSetting), {
    update(cache, { data }) {
      const newSettingFromResponse = data?.createUsersSetting;
      cache.writeQuery({
        query: gql(settingsByDate),
        data: {
          settingsByDate: {
            __typename: "ModelUsersSettingConnection",
            nextToken: null,
            items: [newSettingFromResponse]
          }
        },
        variables: settingsByDateQueryVariables
      });
    }
  });

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>error!</p>;
  }

  const isValidHours = (float) => float === "" || !(float < 0 || float > 24);

  const handleOnEnter = () => {
    if (usersSetting?.id == null) {
      create({
        variables: { input: { userSub } }
      });
    }
  };

  const handleOnChange = (input) => {
    if (usersSetting?.id) {
      update({
        variables: {
          input: {
            ...input,
            id: usersSetting.id
          }
        },
        optimisticResponse: {
          updateUsersSetting: {
            ...input,
            id: usersSetting.id,
            __typename: "UsersSetting"
          }
        }
      });
    } else {
      // handleOnOpenでcreateに失敗した場合のため
      create({
        variables: { input: { ...input, userSub } }
      });
    }
  };

  const handleDateTimeChange = (key, dateTime) => {
    handleOnChange({ [key]: dateTime.toISOString() });
  };

  const handleLunchBreakHoursChange = (e) => {
    handleHoursChange({
      e,
      key: "lunchBreakHours",
      handleOnChange,
      validator: isValidHours
    });
  };

  const handleClose = () => {
    setSettingsOpen(false);
  };

  return (
    <Settings
      settingsOpen={settingsOpen}
      handleOnEnter={handleOnEnter}
      handleClose={handleClose}
      handleDateTimeChange={handleDateTimeChange}
      handleLunchBreakHoursChange={handleLunchBreakHoursChange}
      workFrom={usersSetting?.workFrom ?? CONSTS.DEFAULT_WORK_FROM}
      workTo={usersSetting?.workTo ?? CONSTS.DEFAULT_WORK_TO}
      lunchBreakFrom={
        usersSetting?.lunchBreakFrom ?? CONSTS.DEFAULT_LUNCH_BREAK_FROM
      }
      lunchBreakHours={String(usersSetting?.lunchBreakHours ?? "")}
    />
  );
};

EnhancedSettings.propTypes = {
  userSub: PropTypes.string.isRequired,
  settingsOpen: PropTypes.bool.isRequired,
  setSettingsOpen: PropTypes.func.isRequired
};

export default EnhancedSettings;
