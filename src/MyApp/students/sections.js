import React, { useState, useEffect, Fragment, useContext } from "react";
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import firebase from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import Constants from "../../store/constants";
import { AuthContext } from '../auth/auth';
function Sections() {

    const { currentUser } = useContext(AuthContext);
    const [pageData, setpageData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [Title, setTitle] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [stateSection, setStateSection] = useState(bindDefaultValues());
    // Fields
    const [classnames, setClassNames] = useState([]);

    const classNamesRefDB = firebase.firestore().collection('classnames');
    const ref = firebase.firestore().collection('sections');

    function bindDefaultValues() {
        return {
            id: '',
            classname: '',
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
        classNamesRefDB.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setClassNames(items);
        });
    }

    useEffect(() => {
        setEditMode(false);
        getAllPageData();
        setTitle('Section');
    }, []);

    // ADD FUNCTION
    function addItem() {
        const owner = currentUser ? currentUser.uid : 'unknown';
        const ownerEmail = currentUser ? currentUser.email : 'unknown';
        if (!isEditMode) {
            stateSection.id = uuidv4();
            stateSection.owner = owner;
            stateSection.ownerEmail = ownerEmail;
            stateSection.createdAt = firebase.firestore.FieldValue.serverTimestamp();
        } else {
            stateSection.lastUpdate = firebase.firestore.FieldValue.serverTimestamp();
        }
        if (isEditMode) {
            if (stateSection != null) {
                ref.doc(stateSection.id)
                    .update(stateSection)
                    .catch((err) => {
                        console.error(err);
                    });
            }
        } else {
            ref.doc(stateSection.id)
                .set(stateSection)
                .catch((err) => {
                    console.error(err);
                });
        }
        cancel();
    }
    function cancel() {
        setStateSection(bindDefaultValues());
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
        setStateSection(item)
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
        setStateSection({
            ...stateSection,
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
                                            <Form.Label>Class Name</Form.Label>
                                            <Form.Control as="select" size="sm" name="classname" className="mb-3" value={stateSection.classname}
                                                onChange={handleChange}>
                                                <option value="" >Select</option>
                                                {classnames.map(({ name }, index) => <option value={name} >{name}</option>)}
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Session</Form.Label>
                                            <Form.Control type="text" name="name" size="sm" value={stateSection.name} placeholder="Session"
                                                onChange={handleChange} />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control type="text" name="description" value={stateSection.description} placeholder="Description"
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
                                        <th>Class Name</th>
                                        <th>Session</th>
                                        <th>Description</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pageData.map(pageItem => (
                                        <tr>
                                            <td>{pageItem.classname}</td>
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

export default Sections;