import React, { useState, useEffect, Fragment, useContext } from "react";
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import  Constants from "../../store/constants";
import Aux from "../../hoc/_Aux";
import firebase from "../../firebase";
import { v4 as uuidv4 } from "uuid";

function QuestionType() {

    const { currentUser } = {};
    const currentUserId = currentUser ? currentUser.uid : null;
    const [questionTypes, setQuestionTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [editQuestionType, setEditQuestionType] = useState({});
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const ref = firebase.firestore().collection('questiontypes');


    function getAllQuestionTypes() {
        setLoading(true);
        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            console.log(items);
            setQuestionTypes(items);
            setLoading(false);
        });
    }

    useEffect(() => {
        setEditMode(false);
        getAllQuestionTypes();
    }, []);

    // ADD FUNCTION
    function addQuestionType() {
        const owner = currentUser ? currentUser.uid : 'unknown';
        const ownerEmail = currentUser ? currentUser.email : 'unknown';
        const questionType = {
            name,
            description,
            id: uuidv4(),
            owner,
            ownerEmail,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
        };
        if (isEditMode) {
            if(editQuestionType != null) {
                editQuestionType.name = name;
                editQuestionType.description = description;
                ref.doc(editQuestionType.id)
                .update(editQuestionType)
                .catch((err) => {
                    console.error(err);
                });
            }            
        } else {
            ref.doc(questionType.id)
                .set(questionType)
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
        setEditQuestionType(item);
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
                            <Card.Title as="h5">Question Types</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <Form>
                                        <Form.Group controlId="formQuestionTypes">
                                            <Form.Label>Question Types</Form.Label>
                                            <Form.Control type="text" value={name} placeholder="Question Types" onChange={(e) => setName(e.target.value)} />
                                        </Form.Group>

                                        <Form.Group controlId="formDescription">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control type="text" value={description} placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
                                        </Form.Group>

                                        <Button variant="primary" onClick={() => addQuestionType()}>
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
                            <Card.Title as="h5">Question Type</Card.Title>
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
                                    {questionTypes.map(questionType => (
                                        <tr>
                                            <td>{questionType.name}</td>
                                            <td>{questionType.description}</td>
                                            <td>
                                                <a href={Constants.BLANK_LINK} class="fa fa-pencil text-c-purple" 
                                                aria-hidden="true" onClick={() => editItem(questionType)}>&nbsp;&nbsp;&nbsp;&nbsp;
                                                </a>
                                                <a href={Constants.BLANK_LINK} class="fa fa-trash text-danger" 
                                                aria-hidden="true" onClick={() => deleteItem(questionType)}></a>
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

export default QuestionType;