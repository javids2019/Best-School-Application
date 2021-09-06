import React, { useState, useEffect, Fragment, useContext } from "react";
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import firebase from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import  Constants  from "../../store/constants";
function ContactUsAdmin() {

    const { currentUser } = {};
    const currentUserId = currentUser ? currentUser.uid : null;
    const [pageData, setpageData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [editPageData, setEditPageData] = useState({});
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const ref = firebase.firestore().collection('contactus');

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
            description,
            id: uuidv4(),
            owner,
            ownerEmail,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
        };
        if (isEditMode) {
            if (editPageData != null) {
                editPageData.name = name;
                editPageData.description = description;
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
        setDescription('');
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
        setDescription(item.description);
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
                            <Card.Title as="h5">Contact Us</Card.Title>
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
                                            <Form.Label>Comments</Form.Label>
                                            <Form.Control as="textarea" value={description} rows="3" onChange={(e) => setDescription(e.target.value)} />
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
                            <Card.Title as="h5">Contact Us</Card.Title>
                        </Card.Header>
                        <Card.Body>

                            <Table responsive>
                                <thead>
                                    <tr>

                                        <th>Name</th>
                                        <th>Comments</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pageData.map(pageItem => (
                                        <tr>
                                            <td>{pageItem.name}</td>
                                            <td>{pageItem.description}</td>
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

export default ContactUsAdmin;