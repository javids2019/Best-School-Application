import React, { useState, useEffect, Fragment, useContext } from "react";
import { Row, Col, Card, Form, Button, Collapse, Table } from 'react-bootstrap';
import firebase from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import Constants from "../../store/constants";
import { AuthContext } from '../auth/auth';
function PostalReceive() {

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
    const ref = firebase.firestore().collection('postalreceive');
    //const categoryRefDB = firebase.firestore().collection('category');


    function bindDefaultValues() {
        return {
            id: '',
            Title: '',
            ReferenceNo: '',
            Address: '',
            Note: '',
            ToTitle: '',
            Date: '',
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
        setTitle('Postal Receive');
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
                                            <Form.Label>From Title</Form.Label>
                                            <Form.Control size="sm" name="FromTitle" value={statePage.FromTitle} className="mb-3" placeholder="From Title"
                                                onChange={handleChange}>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>ReferenceNo</Form.Label>
                                            <Form.Control size="sm" name="ReferenceNo" value={statePage.ReferenceNo} className="mb-3" placeholder="ReferenceNo"
                                                onChange={handleChange}>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                  
                                    <Col >
                                        <Form.Group>
                                            <Form.Label>To Title</Form.Label>
                                            <Form.Control size="sm"  type="text" name="ToTitle" value={statePage.ToTitle} className="mb-3" placeholder="To Title"
                                                onChange={handleChange}>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col >
                                        <Form.Group>
                                            <Form.Label>Date</Form.Label>
                                            <Form.Control size="sm" name="Date" type="Date"  value={statePage.Date} className="mb-3" placeholder="Date"
                                                onChange={handleChange}>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col> 
                                </Row>
                               
                                <Row>
                                <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control as="textarea" name="Address" rows="3" value={statePage.Address} className="mb-3"
                                                placeholder="Address" onChange={handleChange}>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Notes</Form.Label>
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
                                        <th>FromTitle</th>
                                            <th>ReferenceNo</th>
                                            <th>ToTitle</th> 
                                            <th>Date</th>
                                            <th>Note</th>                                            
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pageData.map(pageItem => (
                                            <tr>
                                                <td>{pageItem.FromTitle}</td>
                                                <td>{pageItem.ReferenceNo}</td>
                                                <td>{pageItem.ToTitle}</td> 
                                                <td>{pageItem.Date}</td>
                                                <td>{pageItem.Note}</td>
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

export default PostalReceive;