import React, { useState, useEffect, useContext } from "react";
import firebase from "../../firebase";
import './../../assets/scss/style.scss';
import { NavLink,Link, Redirect } from 'react-router-dom';
import { UserService } from '../auth/userService';
 import Aux from "../../hoc/_Aux";
 import { createHashHistory } from "history";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    firebase.auth().signOut();
    UserService.logout();
  }, []);

  const login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email.toLowerCase(), password)
      .then((currentUser) => {
        resetInput();
        if (currentUser.user != undefined && currentUser.user != null) {

            firebase.firestore().collection('users').where("email", "==", email.toLowerCase())
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => { 
                    let userData = doc.data();
                    
                    UserService.login(userData.name, userData.email.toLowerCase(), userData.role);
                    const history = createHashHistory();
                    history.go("/");
                    //this.props.history.push('/user/userdashboard');
                    //return (<Link to="/user/userdashboard">Homepage</Link>);
                    window.location = '/user/userdashboard';
                   // return  (<NavLink to="/user/userdashboard"></NavLink>);
                    //_staticRouter.useHistory = '/user/userdashboard';
                    //const history = Route();
                    //Route.push('/user/userdashboard');
                    //window.location.href = '/user/userdashboard';
                });
            })
            .catch((error) => {
                setMessage(error.message);
                console.log("Error getting documents: ", error);
            }); 
         }
      })
      .catch((err) => {
        if(err.code === 'auth/user-not-found') {
          setMessage('No record found, Kindly Sign up');
        } else {
          setMessage(err.message);
        }
        console.error(err);
      });
  };

  const logOut = () => {
    firebase.auth().signOut();
    UserService.logout();
  };

  const resetInput = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <Aux>

      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-4">
                <i className="feather icon-unlock auth-icon" />
              </div>
              <h3 className="mb-4">Login</h3>
              <div className="input-group mb-3">
                <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="input-group mb-4">
                <input type="password" className="form-control" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="form-group text-center">
              <label className="text-danger">{message}</label>
             </div>
              <button className="btn btn-primary shadow-2 mb-4" onClick={login}>Login</button>
              {/* <p className="mb-2 text-muted">Forgot password? <NavLink to="/auth/reset-password-1">Reset</NavLink></p> */}
              <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/auth/register">Signup</NavLink></p>
            </div>
          </div>
        </div>
      </div> 
    </Aux>
  );
};

export default Login;




    // var provider = new firebase.auth.GoogleAuthProvider();
    // provider.addScope('profile');
    // provider.addScope('email');
    // //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    // firebase.auth().signInWithPopup(provider).then(function (result) {
    //   // This gives you a Google Access Token. You can use it to access the Google API.
    //   var token = result.credential.accessToken;
    //   // The signed-in user info.
    //   var user = result.user;
    //   // [START_EXCLUDE]
    //   document.getElementById('quickstart-oauthtoken').textContent = token;
    //   // [END_EXCLUDE]
    // }).catch(function (error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // The email of the user's account used.
    //   var email = error.email;
    //   // The firebase.auth.AuthCredential type that was used.
    //   var credential = error.credential;
    //   // [START_EXCLUDE]
    //   if (errorCode === 'auth/account-exists-with-different-credential') {
    //     alert('You have already signed up with a different auth provider for that email.');
    //     // If you are using multiple auth providers on your app you should handle linking
    //     // the user's accounts here.
    //   } else {
    //     console.error(error);
    //   }
    //   // [END_EXCLUDE]
    // });


