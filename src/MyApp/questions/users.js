import React, { useState, useEffect, Fragment, useContext } from "react";
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import firebase from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import  Constants  from "../../store/constants";
function Users() {

    const { currentUser } = {};
    const currentUserId = currentUser ? currentUser.uid : null;
    const [pageData, setpageData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [editPageData, setEditPageData] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneno, setPhoneNo] = useState('');
    const [role, setRole] = useState('');
    const [className, setClassName] = useState('');
    const [comments, setComments] = useState('');
    const ref = firebase.firestore().collection('users');

    function getAllPageData() {
        setLoading(true);
        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setpageData(items);
            setLoading(false);
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
        const pageNewItem = {
            name,
            email,
            phoneno,
            className,
            role,
            comments,
            id: uuidv4(),
            owner,
            ownerEmail,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
        };
        if (isEditMode) {
            if (editPageData != null) {
                editPageData.name = name;
                editPageData.email = email;
                editPageData.role = role;
                editPageData.phoneno = phoneno;
                editPageData.className = className;
                editPageData.comments = comments;
                ref.doc(editPageData.id)
                    .update(editPageData)
                    .catch((err) => {
                        console.error(err);
                    });
            }
        } else {
            ref.doc(pageNewItem.id)
                .set(pageNewItem)
                .catch((err) => {
                    console.error(err);
                });
        }
        cancel();
    }
    function cancel() {
        setName('');
        setEmail('');
        setRole('');
        setClassName('');
        setPhoneNo('');
        setComments('');
        setEditMode(false);
    }
    //DELETE FUNCTION
    function deleteItem(item) {
        ref.doc(item.id)
            .delete()
            .catch((err) => {
                console.error(err);
            });
    }

    // EDIT FUNCTION
    function editItem(item) {
        setName(item.name);
        setEmail(item.email);
        setPhoneNo(item.phoneno);
        setRole(item.role);
        setClassName(item.className);
        setComments(item.comments);
        item.lastUpdate = firebase.firestore.FieldValue.serverTimestamp();
        setLoading();
        setEditMode(true);
        setEditPageData(item);
        ref
            .doc(item.id)
            .update(item)
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
                                            <Form.Label>Class Name</Form.Label>
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
                                            <Form.Label>Role</Form.Label>
                                            <Form.Control as="select" className="mb-3" value={role}
                                            onChange={(e) => setRole(e.target.value)}>
                                                <option value="" >Select</option>
                                                <option value="User" >User</option>
                                                <option value="Admin" >Admin</option>
                                            </Form.Control>
                                        </Form.Group> 

                                        <Form.Group>
                                            <Form.Label>Comments</Form.Label>
                                            <Form.Control type="text" value={comments} placeholder="Comments" onChange={(e) => setComments(e.target.value)} />
                                        </Form.Group>

                                        <Button variant="primary" onClick={() => addItem()}>
                                            {isEditMode ? 'Update' : 'Submit'}
                                        </Button>

                                        <Button variant="info" onClick={() => cancel()}>
                                            Cancel
                                        </Button>
                                    </Form>
                                </Col>

                            </Row>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Users</Card.Title>
                        </Card.Header>
                        <Card.Body>

                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Phone No</th>
                                        <th>Class</th>
                                        <th>Comments</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pageData.map(pageItem => (
                                        <tr>
                                            <td>{pageItem.name}</td>
                                            <td>{pageItem.email}</td>
                                            <td>{pageItem.role}</td>
                                            <td>{pageItem.phoneno}</td>
                                            <td>{pageItem.className}</td>
                                            <td>{pageItem.comments}</td>
                                            <td>
                                                <a href={Constants.BLANK_LINK} class="fa fa-pencil text-c-purple"
                                                    aria-hidden="true" onClick={() => editItem(pageItem)}>&nbsp;&nbsp;&nbsp;&nbsp;
                                                </a>
                                                <a href={Constants.BLANK_LINK} class="fa fa-trash text-danger"
                                                    aria-hidden="true" onClick={() => deleteItem(pageItem)}></a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
}

export default Users;