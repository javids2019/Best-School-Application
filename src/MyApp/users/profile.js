import React, { useState, useEffect, Fragment, useContext } from "react";
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import firebase from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from '../auth/auth';

function Profile() {

    const { currentUser } = useContext(AuthContext);
    const currentUserId = currentUser ? currentUser.uid : null;
    const [isEditMode, setEditMode] = useState(false);
    const [editProfileData, setProfileData] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneno, setPhoneNo] = useState('');
    const [className, setClassName] = useState('');
    const [comments, setComments] = useState('');
    const refUsers = firebase.firestore().collection('users');

    function getAllPageData() {

        refUsers.where("email", "==", currentUser.email)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let userData = doc.data()
                    setProfileData(userData);
                    setName(userData.name);
                    setEmail(userData.email);
                    setPhoneNo(userData.phoneno);
                    setClassName(userData.className);
                    setComments(userData.comments);
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            }); 
    }

    useEffect(() => {
        setEditMode(false);
        getAllPageData();
    }, []);

    // ADD FUNCTION
    function addItem() {
        const owner = currentUser ? currentUser.uid : 'unknown';
        const ownerEmail = currentUser ? currentUser.email : 'unknown';

        editProfileData.name = name;
        editProfileData.email = email;
        editProfileData.phoneno = phoneno;
        editProfileData.className = className;
        editProfileData.comments = comments;
        refUsers.doc(editProfileData.id)
            .update(editProfileData)
            .catch((err) => {
                console.error(err);
            });
        
    }
   

    return (
        <Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Profile</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Phone No</Form.Label>
                                            <Form.Control type="text" maxLength="12" value={phoneno} placeholder="Phone No" onChange={(e) => setPhoneNo(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Class</Form.Label>
                                            <Form.Control as="select" className="mb-3" value={className}
                                                onChange={(e) => setClassName(e.target.value)}>
                                                <option value="" >Select</option>
                                                <option value="Class I" >Class I</option>
                                                <option value="Class II" >Class II</option>
                                                <option value="Class III" >Class III</option>
                                                <option value="Class IV" >Class IV</option>
                                                <option value="Class V" >Class V</option>
                                                <option value="Class VI" >Class VI</option>
                                                <option value="Class VII" >Class VII</option>
                                                <option value="Class VIII" >Class VIII</option>
                                                <option value="Class IX" >Class IX</option>
                                                <option value="Class X" >Class X</option>
                                                <option value="Class XI" >Class XI</option>
                                                <option value="Class XII" >Class XII</option>
                                                <option value="Common" >Common</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Comments</Form.Label>
                                            <Form.Control type="text" value={comments} placeholder="Comments" onChange={(e) => setComments(e.target.value)} />
                                        </Form.Group>

                                        <Button variant="primary" onClick={() => addItem()}>
                                            {isEditMode ? 'Update' : 'Submit'}
                                        </Button>


                                    </Form>
                                </Col>

                            </Row>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
}

export default Profile;