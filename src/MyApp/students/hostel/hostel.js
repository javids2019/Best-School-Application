import React, { useState, useEffect, Fragment, useContext } from "react";
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import firebase from "../../../firebase";
import { v4 as uuidv4 } from "uuid";
import Constants from "../../../store/constants";
import { AuthContext } from '../../auth/auth';
function Hostels() {

    const { currentUser } = useContext(AuthContext);
    const [pageData, setpageData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [Title, setTitle] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [statePage, setStatePage] = useState(bindDefaultValues());
    // Fields
    const ref = firebase.firestore().collection('hostel');

    function bindDefaultValues() {
        return {
            id: '',
            name: '',
            description: '',
            owner: '',
            ownerEmail: '',
            createdAt: '',
            lastUpdate: '',
        }
    }
    function getAllPageData() {
        setLoading(true);
        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setpageData(items);
        });

    }

    useEffect(() => {
        setEditMode(false);
        getAllPageData();
        setTitle('Hostel');
    }, []);

    // ADD FUNCTION
    function addItem() {
        const owner = currentUser ? currentUser.uid : 'unknown';
        const ownerEmail = currentUser ? currentUser.email : 'unknown';
        if (!isEditMode) {
            statePage.id = uuidv4();
            statePage.owner = owner;
            statePage.ownerEmail = ownerEmail;
            statePage.createdAt = firebase.firestore.FieldValue.serverTimestamp();
        } else {
            statePage.lastUpdate = firebase.firestore.FieldValue.serverTimestamp();
        }
        if (isEditMode) {
            if (statePage != null) {
                ref.doc(statePage.id)
                    .update(statePage)
                    .catch((err) => {
                        console.error(err);
                    });
            }
        } else {
            ref.doc(statePage.id)
                .set(statePage)
                .catch((err) => {
                    console.error(err);
                });
        }
        cancel();
    }
    function cancel() {
        setStatePage(bindDefaultValues());
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
        setStatePage(item)
        setLoading();
        setEditMode(true);
        ref
            .doc(item.id)
            .update(item)
            .catch((err) => {
                console.error(err);
            });
    }
    function handleChange(evt) {
        const value = evt.target.value;
        setStatePage({
            ...statePage,
            [evt.target.name]: value
        });
    }
    return (
        <Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">{Title}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <Form>

                                        <Form.Group>
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" name="name" size="sm" value={statePage.name} placeholder="Session"
                                                onChange={handleChange} />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control type="text" name="description" value={statePage.description} placeholder="Description"
                                                onChange={handleChange} />
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
                            <Card.Title as="h5">{Title}</Card.Title>
                        </Card.Header>
                        <Card.Body>

                            <Table responsive>
                                <thead>
                                    <tr>

                                        <th>Name</th>
                                        <th>Description</th>
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

export default Hostels;