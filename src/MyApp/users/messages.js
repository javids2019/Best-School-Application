import React, { useState, useEffect, Fragment, useContext } from "react";
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import firebase from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import  Constants  from "../../store/constants";
function Messages() {

    const { currentUser } = {};
    const currentUserId = currentUser ? currentUser.uid : null;
    const [pageData, setpageData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [editPageData, setEditPageData] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneno, setPhoneNo] = useState('');
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
        setClassName('');
        setPhoneNo('');
        setComments('');
        setEditMode(false);
    }
   

    // EDIT FUNCTION
    function editItem(item) {
        setName(item.name);
        setEmail(item.email);
        setPhoneNo(item.phoneno);
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
                            <Card.Title as="h5">Messages</Card.Title>
                        </Card.Header>
                        <Card.Body>

                            <Table responsive>
                                <thead>
                                    <tr> 
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone No</th>
                                        <th>Class</th>
                                        <th>Comments</th>
                                        {/* <th>Action</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {pageData.map(pageItem => (
                                        <tr>
                                            <td>{pageItem.name}</td>
                                            <td>{pageItem.email}</td>
                                            <td>{pageItem.phoneno}</td>
                                            <td>{pageItem.className}</td>
                                            <td>{pageItem.comments}</td>
                                            {/* <td>
                                                <a href={Constants.BLANK_LINK} class="fa fa-pencil text-c-purple"
                                                    aria-hidden="true" onClick={() => editItem(pageItem)}>&nbsp;&nbsp;&nbsp;&nbsp;
                                                </a>
                                                <a href={Constants.BLANK_LINK} class="fa fa-trash text-danger"
                                                    aria-hidden="true" onClick={() => deleteItem(pageItem)}></a>
                                            </td> */}
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

export default Messages;