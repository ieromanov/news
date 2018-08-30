import * as types from './types'
import * as firebase from 'firebase';


const logInWithEmail = (email, password ) => {
    return (dispatch, getState) => {
        
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(()=> {
                console.log('Функция входа: срабоотала')
                dispatch(setLoggedInState(true))
                return true
            })
            .catch((error)=>{
                console.log(error)
                console.log('Функция входа: не срабоотала')
                dispatch(setLoggedInState(false));
                return false
            });
    }
} 

const setLoggedInState = loggedInState => (
    {
      type: types.SET_LOGGED_IN_STATE,
      loggedInState,
    }
);

export {
    logInWithEmail,
    setLoggedInState
}