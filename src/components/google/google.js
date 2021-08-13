
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../firebase';

const auth = firebase.auth() 

export const Google = () => {

  const googleProvider = new firebase.auth.GoogleAuthProvider()

  auth.signInWithPopup(googleProvider)
      .then(() => {

        var inputs = document.querySelectorAll('.input');
        window.$('.google-btn').css( "display", "none" )
        window.$('#firstModal').css( "display", "none" )

        for(var i=0; i < inputs.length; i++){
        window.$(inputs[i]).attr('disabled',false)
        }
      })
      .catch(error =>{
        // console.error(error)
        window.location.assign('/')
      })
    


}