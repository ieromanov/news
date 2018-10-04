import * as types from './types'
import * as firebase from 'firebase';


const signUp = (email, password ) => {
    return (dispatch, getState) => {
        
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(()=> {
                dispatch(setSignUpState(true))
                return true
            })
            .catch((error)=>{
                console.log(error)
                dispatch(setSignUpState(false));
                return false
            });
    }
} 

const setSignUpState = signUpState => (
    {
      type: types.SET_SIGN_UP_STATE,
      signUpState,
    }
);

export {
    signUp,
    setSignUpState
}