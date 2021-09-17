import React, { useState, useEffect, Fragment, useContext } from "react";
import { Row, Col, Card, Form, Button, Collapse, Table } from 'react-bootstrap';
import firebase from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import Constants from "../../store/constants";
import FileUpload from "../core/fileUpload";
import { AuthContext } from '../auth/auth';
function Complain() {

    const { currentUser } = useContext(AuthContext);
    const [pageData, setpageData] = useState([]);
    const [accordionState, setAccordionState] = useState({ accordionKey1: 1, accordionKey2: 1 });
    const [Title, setTitle] = useState(false);
    // Dropdown
    const [classNameList, setClassNameList] = useState([]);

    // Fields
    const [loading, setLoading] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [statePage, setStatePage] = useState(bindDefaultValues());

    // Dropdown ref
    const ref = firebase.firestore().collection('complaint');
    //const categoryRefDB = firebase.firestore().collection('category');


    function bindDefaultValues() {
        return {
            id: '',
            ComplainType: '',
            Source: '',
            ComplainBy: '',
            Phone: '',
            Date: '',
            Description: '',
            ActionTaken: '',
            Assigned: '',
            Note: '',
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
        setTitle('Register Complaint');
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
        getAllPageData();
        //fileUploadCallback = fileUploadCallback.bind(this);
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
        //onSelect('ClassName', item.ClassName);
        setStatePage(item);
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
        onSelect(evt.target.name, evt.target.value);

        const value = evt.target.value;
        setStatePage({
            ...statePage,
            [evt.target.name]: value
        });
    }
    function onSelect(name, item) {



    }



    return (

        <Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">
                                <a href={Constants.BLANK_LINK} name="accordionKey1"
                                    onClick={() => setAccordionState({ accordionKey1: (accordionState.accordionKey1 !== 1) ? 1 : 0 })}
                                    aria-controls="accordion1"
                                    aria-expanded={accordionState.accordionKey1 === 1}>
                                    {Title}
                                </a>
                            </Card.Title>
                        </Card.Header>
                        <Collapse in={accordionState.accordionKey1 === 1}>
                            <Card.Body>

                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Complain Type</Form.Label>
                                            <Form.Control size="sm" name="ComplainType" value={statePage.ComplainType} className="mb-3" placeholder="Complain Type"
                                                onChange={handleChange}>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Source</Form.Label>
                                            <Form.Control size="sm" name="Source" value={statePage.Source} className="mb-3" placeholder="Source"
                                                onChange={handleChange}>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Complain By</Form.Label>
                                            <Form.Control size="sm"  name="ComplainBy" value={statePage.ComplainBy} className="mb-3" placeholder="Complain By"
                                                onChange={handleChange}>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Phone</Form.Label>
                                            <Form.Control size="sm"  type="text" name="Phone" value={statePage.Phone} className="mb-3" placeholder="Phone"
                                                onChange={handleChange}>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
 

                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Date</Form.Label>
                                            <Form.Control size="sm" type="Date"  name="Date" value={statePage.Date} className="mb-3" placeholder="Date"
                                                onChange={handleChange}>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control size="sm" name="Description" value={statePage.Description} className="mb-3" placeholder="Description"
                                                onChange={handleChange}>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                   

                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Action Taken</Form.Label>
                                            <Form.Control size="sm" name="ActionTaken" value={statePage.ActionTaken} className="mb-3" placeholder="Action Taken"
                                                onChange={handleChange}>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Assigned</Form.Label>
                                            <Form.Control size="sm" name="Assigned" value={statePage.Assigned} className="mb-3" placeholder="Assigned"
                                                onChange={handleChange}>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    
                                </Row>
                                <Row>
                                <Col>
                                        <Form.Group>
                                            <Form.Label>Note</Form.Label>
                                            <Form.Control as="textarea" name="Note" rows="3" value={statePage.Note} className="mb-3"
                                                placeholder="Notes" onChange={handleChange}>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>

                                        <Button variant="primary" onClick={() => addItem()}>
                                            {isEditMode ? 'Update' : 'Submit'}
                                        </Button>

                                        <Button variant="info" onClick={() => cancel()}>
                                            Cancel
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Collapse>

                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">
                                <a href={Constants.BLANK_LINK}
                                    onClick={() => setAccordionState({ accordionKey2: (accordionState.accordionKey2 !== 1) ? 1 : 0 })}
                                    aria-controls="accordion2"
                                    aria-expanded={accordionState.accordionKey2 === 1}>
                                    {Title} Records
                                </a>
                            </Card.Title>
                        </Card.Header>
                        <Collapse in={accordionState.accordionKey2 === 1}>
                            <Card.Body>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                        <th>Complain Type</th>
                                            <th>Source</th>
                                            <th>Complain By</th> 
                                            <th>Phone</th> 
                                            <th>Date</th>
                                            <th>Action Taken</th>
                                            <th>Assigned</th> 
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pageData.map(pageItem => (
                                            <tr>
                                                <td>{pageItem.ComplainType}</td>
                                                <td>{pageItem.Source}</td>
                                                <td>{pageItem.ComplainBy}</td> 
                                                <td>{pageItem.Phone}</td> 
                                                <td>{pageItem.Date}</td>
                                                <td>{pageItem.ActionTaken}</td>
                                                <td>{pageItem.Assigned}</td>
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
                        </Collapse>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
}

export default Complain;