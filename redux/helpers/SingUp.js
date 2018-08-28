import './firebaseInitApp'


export function LogIn(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            var user = firebase.auth().currentUser;

            user.sendEmailVerification().then(() => {
                return true
            }).catch(function(error) {
                console.log('Send Email Verification: ', error)
            });
        })
        .catch((error) => {
            console.log('Create user with Email and Password: ', error)
        });
}