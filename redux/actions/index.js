import * as LoggedOut from "./loggedOut";
import * as SignUp from "./signUp";
import * as SubToJournal from "./subToJournal";
import * as UnsubToJournal from "./unsubToJournal";
import * as GetJouranlSubscriptions from "./getSubJournal";

const ActionCreators = { ...LoggedOut, ...SignUp, ...SubToJournal, ...UnsubToJournal, ...GetJouranlSubscriptions };

export default ActionCreators;
