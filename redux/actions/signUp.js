import * as types from './types'
import * as firebase from 'firebase';


const signUp = (email, password ) => {
    return (dispatch, getState) => {
        
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(()=> {
                console.log('Функция регистрации: срабоотала')
                dispatch(setSignUpState(true))
                return true
            })
            .catch((error)=>{
                console.log(error)
                console.log('Функция регистрации: не срабоотала')
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