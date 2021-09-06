import React, { useState } from "react";
import firebase from "../../firebase";
import './../../assets/scss/style.scss';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid"; 

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const ref = firebase.firestore().collection('users');

  const register = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((currentUser) => {
        addOrUpdate(currentUser.user);
        resetInput();
      })
      .catch((err) => {
        setMessage(err.message + " kindly please login");
        console.error(err);
      });
  };

  function updateUserProfile() {
    var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name,
      photoURL: ""
    }).then(function () {
      console.log("updated profile");
    }).catch(function (err) {
      console.error(err);
    });
  }

  function addOrUpdate(currentUser) {
    updateUserProfile();
    const owner = currentUser ? currentUser.uid : 'unknown';
    const ownerEmail = currentUser ? currentUser.email : 'unknown';
    const phoneno = '';
    const className = '';
    const comments = '';
    const role = 'User';
    const email = email.toLowerCase();
    const pageNewItem = {
      name,
      email,
      role,
      phoneno,
      className,
      comments,
      id: uuidv4(),
      owner,
      ownerEmail,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
    };

    let usersDBQuery = ref.where('email', '==', email)
    usersDBQuery.get()
      .then(snapshot => {
        if (!snapshot.exists) {
          ref.doc(pageNewItem.id)
            .set(pageNewItem)
            .catch((err) => {
              console.error(err);
            });
        }
      })
  }
  
  const logOut = () => {
    firebase.auth().signOut();
  };

  const resetInput = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <>   <div className="auth-wrapper">
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
              <i className="feather icon-user-plus auth-icon" />
            </div>
            <h3 className="mb-4">Sign up</h3>
            <div className="input-group mb-3">
              <input type="text" required className="form-control" placeholder="Username" onChange={(e) => setName(e.target.value)} value={name} />
            </div>
            <div className="input-group mb-3">
              <input type="email" required className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input-group mb-4">
              <input type="password" required className="form-control" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="form-group text-center">
              <label className="text-danger">{message}</label>
            </div>
            <button className="btn btn-primary shadow-2 mb-4" onClick={register}>Sign up</button>
            <p className="mb-0 text-muted">Allready have an account? <NavLink to="/login">Login</NavLink></p>
          </div>
        </div>
      </div>
    </div>

    </>
  );
};

export default Register;


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


