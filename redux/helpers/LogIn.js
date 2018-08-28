import * as firebase from 'firebase';

const LogIn = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(()=> {
            console.log('Функция: ', 'срабоотала')
            return true
        })
        .catch((error)=>{
            console.log(error)
            console.log('Функция: ', 'не срабоотала')
            return false
        });
}

export default LogIn