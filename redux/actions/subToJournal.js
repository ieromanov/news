import * as types from "./types";
import firebase from "firebase";

const subscribeToJournal = ( journalName, journalID) => {
  return async dispatch => {
    let userID = firebase.auth().currentUser.uid;
    let database = firebase.database();

    let userResponse = await database.ref("/" + userID);
    let userFollowResponse = await userResponse.once("value");
    let userFollowData = await userFollowResponse.val();

    if (userFollowData && userFollowData[journalName]) {
      console.log(userFollowData)
    } else {
      let resultData = {
        ...userFollowData,
        [journalName]: journalID
      }

      // prettier-ignore
      await database.ref("/" + userID).set(resultData, () => dispatch(setJournalSubscriptions( resultData )));
    }
  };
};

const setJournalSubscriptions = journalSubscriptions => ({
  type: types.JOURNAL_SUBSCRIPTIONS,
  payload: journalSubscriptions
});

export {
  subscribeToJournal,
  setJournalSubscriptions
};
