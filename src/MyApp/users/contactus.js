import React, { useState, useEffect, Fragment, useContext } from "react";
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import firebase from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import  Constants  from "../../store/constants";
function ContactUs() {

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
        
        ref.doc(pageNewItem.id)
            .set(pageNewItem)            
            .catch((err) => {
                console.error(err);
            });
       
        cancel();
    }
    function cancel() {
        setName('');
        setDescription('');
        setEditMode(false);
    }
    
    return (
        <Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">ContactUs / Feedback</Card.Title>
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

             
        </Fragment>
    );
}

export default ContactUs;