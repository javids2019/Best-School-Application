import React, { useState, useEffect, Fragment, useContext } from "react";
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import firebase from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import  Constants  from "../../store/constants";

function Levels() {
    const pageName ='Level';
    const { currentUser } = {};
    const currentUserId = currentUser ? currentUser.uid : null;
    const [pageData, setpageData] = useState([]);
    // Dropdown
    // const [programData, setProgramListData] = useState([]);
    // const [moduleData, setModuleListData] = useState([]);
    // Fields
    const [loading, setLoading] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [editPageData, setEditPageData] = useState({});
    // const [program, setProgram] = useState(false);
    // const [module, setModule] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    // const programRefDB = firebase.firestore().collection('program');
    // const modulerefDB = firebase.firestore().collection('module');
    const ref = firebase.firestore().collection('level');

    function getAllPageData() {
        setLoading(true);
        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setpageData(items);
        });
        // programRefDB.onSnapshot((querySnapshot) => {
        //     const items = [];
        //     querySnapshot.forEach((doc) => {
        //         items.push(doc.data());
        //     });
        //     setProgramListData(items);
        // });

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
            // program,
            // module,
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
                //editPageData.program = program;
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
        // setProgram("");
        // setModule("");
        setEditMode(false);
        getAllPageData();
    }
    //DELETE FUNCTION
    function deleteItem(item) {
        ref.doc(item.id)
            .delete()
            .catch((err) => {
                console.error(err);
            });
    }

    // function onProgramSelect(item) {
    //     setProgram(item);
    //     modulerefDB.onSnapshot((querySnapshot) => {
    //         const items = [];
    //         querySnapshot.forEach((doc) => {
    //             if (doc.data().program == item) {
    //                 items.push(doc.data());
    //             }
    //         });
    //         setModuleListData(items);
    //     }); 
    // }

    // function setModuleSelect(item) {
    //     setModule(item);
    //     ref.onSnapshot((querySnapshot) => {
    //         const items = [];
    //         querySnapshot.forEach((doc) => {
    //             if (doc.data().module == item && doc.data().program == program) {
    //                 items.push(doc.data());
    //             }
    //         });
    //         setpageData(items);
    //     });
    // }

    // EDIT FUNCTION
    function editItem(item) {
        setName(item.name);
        setDescription(item.description);
        // setProgram(item.program);
        // setModule(item.module);
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
                            <Card.Title as="h5">{pageName}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <Form>
                                        {/* <Form.Group controlId="formProgram">
                                            <Form.Label>Program</Form.Label>
                                            <Form.Control as="select" value={program} className="mb-3" onChange={(e) => onProgramSelect(e.target.value)}>
                                                <option value="" >Select</option>
                                                {programData.map(({ name }, index) => <option value={name} >{name}</option>)}
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group controlId="formModule">
                                            <Form.Label>Module</Form.Label>
                                            <Form.Control as="select" value={module}  className="mb-3" onChange={(e) => setModuleSelect(e.target.value)}>
                                                <option value="" >Select</option>
                                                {moduleData.map(({ name }, index) => <option value={name} >{name}</option>)}
                                            </Form.Control>
                                        </Form.Group> */}

                                        <Form.Group controlId="formQuestionTypes">
                                            <Form.Label>Level</Form.Label>
                                            <Form.Control type="text" value={name} placeholder="Level" onChange={(e) => setName(e.target.value)} />
                                        </Form.Group>

                                        <Form.Group controlId="formDescription">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control type="text" value={description} placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
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
                            <Card.Title as="h5">{pageName}</Card.Title>
                        </Card.Header>
                        <Card.Body>

                            <Table responsive>
                                <thead>
                                    <tr>
                                        {/* <th>Program</th>
                                        <th>Module</th> */}
                                        <th>Level</th>
                                        <th>Description</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pageData.map(pageItem => (
                                        <tr>
                                            {/* <td>{pageItem.program}</td>
                                            <td>{pageItem.module}</td> */}
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

export default Levels;