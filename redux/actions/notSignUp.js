import * as types from './types'
import * as firebase from 'firebase';


const signUp = (email, password ) => {
    return (dispatch, getState) => {
        
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(()=> {
                console.log('Функция регистрации: срабоотала')
                dispatch(setNotSignUpState(true))
                return true
            })
            .catch((error)=>{
                console.log(error)
                console.log('Функция регистрации: не срабоотала')
                dispatch(setNotSignUpState(false));
                return false
            });
    }
} 

const setNotSignUpState = SignUpState => (
    {
      type: types.SET_NOT_SIGN_UP_STATE,
      SignUpState,
    }
);

export {
    signUp,
    setNotSignUpState
}