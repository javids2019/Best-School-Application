 
import firebase from "../../firebase";
import { v4 as uuidv4 } from "uuid";

export const UserService = {
    login,
    logout,
    getCurrentUser,
    getDisplayName,
    getCurrentRole,
    getIsCurrentAdminRole,
    addLoginHistory
};
 
function login(name, email, role) { 
    //user.authdata = window.btoa(username + ':' + password);
    localStorage.setItem('user', JSON.stringify({name: name, email: email, role : role }));
    this.addLoginHistory(name, email, 'LogIn');
 } 
 
 function logout() {
    // remove user from local storage to log user out
    const userDetail = this.getCurrentUser();
    if(userDetail) {
        this.addLoginHistory(userDetail.name, userDetail.email, 'LogOut');
    }    
    localStorage.removeItem('user');    
}

function getCurrentUser() {
    let user = JSON.parse(localStorage.getItem('user'));
    return user;
}

function getCurrentRole() {
    let user = JSON.parse(localStorage.getItem('user'));
    return user != null ? user.role : "" ;
}

function getIsCurrentAdminRole(role) {
    let user = JSON.parse(localStorage.getItem('user'));
    return user && user.role == role;
}

function getDisplayName() {
    let user = JSON.parse(localStorage.getItem('user'));
    return user != null ? user.name : "" ;
}

function addLoginHistory(name, email, type) {
    const pageNewItem = {
        id: uuidv4(),
        name,       
        email,
        type,
        loginAt: firebase.firestore.FieldValue.serverTimestamp(),
        lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
    };
     
    firebase.firestore().collection('loginhistory').doc(pageNewItem.id)
        .set(pageNewItem)
        .catch((err) => {
            console.error(err);
        }); 
}

 