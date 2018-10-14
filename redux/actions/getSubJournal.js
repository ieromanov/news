import * as types from "./types";
import firebase from "firebase";

const getJournalSubscriptions = () => {
  return async dispatch => {
    let userID = firebase.auth().currentUser.uid;
    let database = firebase.database();

    let userResponse = await database.ref("/" + userID);
    let userFollowResponse = await userResponse.once("value");
    let userFollowData = await userFollowResponse.val();
    
    dispatch(setJournalSubscriptions(userFollowData))
  };
};

const setJournalSubscriptions = journalSubscriptions => ({
  type: types.JOURNAL_SUBSCRIPTIONS,
  payload: journalSubscriptions
});

export {
  getJournalSubscriptions,
  setJournalSubscriptions
};
