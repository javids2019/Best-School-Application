import React, { useState, useEffect, Fragment, useContext } from "react";
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import firebase from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import  Constants  from "../../store/constants";
function QuestionReport() {

    const { currentUser } = {};
    const currentUserId = currentUser ? currentUser.uid : null;
    const [pageData, setpageData] = useState([]);
    // Dropdown
    const [programAllData, setProgramListData] = useState([]);
    const [moduleAllData, setModuleListData] = useState([]);
    const [levelAllData, setLevelListData] = useState([]);
    const [assessmentTypeAllData, setAssessmentTypeListData] = useState([]);
    const [questionTypeAllData, setQuestionTypeListData] = useState([]);

    // Fields
    const [loading, setLoading] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [editPageData, setEditPageData] = useState({});
    const [program, setProgram] = useState(false);
    const [module, setModule] = useState(false);
    const [level, setlevel] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [assessmenttype, setAssessmentType] = useState([]);
    const [questiontype, setQuestionType] = useState([]);
    const [narrative, setNarrative] = useState([]);
    const [question, setQuestion] = useState([]);
    const [hint, setHint] = useState([]);
    const [option1, setOption1] = useState([]);
    const [option2, setOption2] = useState([]);
    const [option3, setOption3] = useState([]);
    const [option4, setOption4] = useState([]);
    const [answer, setAnswer] = useState([]);
    const [comments, setComments] = useState([]);
    // Dropdown
    const programRefDB = firebase.firestore().collection('program');
    const moduleRefDB = firebase.firestore().collection('module');
    const levelRefDB = firebase.firestore().collection('level');
    const assessmenttypeRefDB = firebase.firestore().collection('assessmenttype');
    const questionTypeRefDB = firebase.firestore().collection('questiontypes');
    const ref = firebase.firestore().collection('question');


    function getAllPageData() {
        setLoading(true);
        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setpageData(items);
        });
        programRefDB.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setProgramListData(items);
        });

        assessmenttypeRefDB.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setAssessmentTypeListData(items);
        });

        questionTypeRefDB.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setQuestionTypeListData(items);
        });

        levelRefDB.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                    items.push(doc.data());
            });            
            setLevelListData(items);
        });
    }

    useEffect(() => {
        setEditMode(false);
        getAllPageData();
    }, []);

 
    function cancel() {     
        setProgram("");
        setModule("");
        setlevel("");
        setAssessmentType('');
        setQuestionType(''); 
        setEditMode(false);
        getAllPageData();
    }

    function search() {   
        var refSearch = ref;
        if(program != "") {
            refSearch = refSearch.where('program', '==', program)
        }
        if(module != "") {
            refSearch = refSearch.where('module', '==', module)
        }
        if(level != "") {
            refSearch = refSearch.where('level', '==', level)
        }
        if(assessmenttype != "") {
            refSearch = refSearch.where('assessmenttype', '==', assessmenttype)
        }
        if(questiontype != "") {
            refSearch = refSearch.where('questiontype', '==', questiontype)
        }
        
        refSearch.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setpageData(items);
        });
        // ref
        // .where('owner', '==', currentUserId)
        // .where('title', '==', 'School1') // does not need index
        // .where('score', '<=', 10)    // needs index
        // .orderBy('owner', 'asc')
        // .limit(3)
    }
  

    function onProgramSelect(item) {
        moduleRefDB.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                if (doc.data().program == item) {
                    items.push(doc.data());
                }
            });
            setProgram(item);
            setModuleListData(items);
        });

        // ref.onSnapshot((querySnapshot) => {
        //     const items = [];
        //     querySnapshot.forEach((doc) => {
        //         if (doc.data().program == item) {
        //             items.push(doc.data());
        //         }
        //     });
        //     setpageData(items);
        // });
    }

    function onModuleSelect(item) {
        setModule(item);
    }

    

    return (
        <Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Question Reports</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <Form>
                                        <Form.Group controlId="formProgram">
                                            <Form.Label>Program / Class</Form.Label>
                                            <Form.Control as="select" value={program} className="mb-3" onChange={(e) => onProgramSelect(e.target.value)}>
                                                <option value="" >Select</option>
                                                {programAllData.map(({ name }, index) => <option value={name} >{name}</option>)}
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group controlId="formLevel">
                                            <Form.Label>Level</Form.Label>
                                            <Form.Control as="select" value={level} className="mb-3" onChange={(e) => setlevel(e.target.value)}>
                                                <option value="" >Select</option>
                                                {levelAllData.map(({ name }, index) => <option value={name} >{name}</option>)}
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group controlId="formAssessmentType">
                                            <Form.Label>Assessment Type</Form.Label>
                                            <Form.Control as="select" value={assessmenttype} className="mb-3" onChange={(e) => setAssessmentType(e.target.value)}>
                                                <option value="" >Select</option>
                                                {assessmentTypeAllData.map(({ name }, index) => <option value={name} >{name}</option>)}
                                            </Form.Control>
                                        </Form.Group>

                                        {/* <Form.Group controlId="">
                                            <Form.Label>Narrative</Form.Label>
                                            <Form.Control as="textarea" value={narrative}  rows="3" onChange={(e) => setNarrative(e.target.value)}/>
                                        </Form.Group> */}
{/* 
                                        <Form.Group controlId="frmQuestion">
                                            <Form.Label>Question</Form.Label>
                                            <Form.Control as="textarea" value={question} rows="3" onChange={(e) => setQuestion(e.target.value)} />
                                        </Form.Group>

                                        <Form.Group controlId="formHint">
                                            <Form.Label>Hint</Form.Label>
                                            <Form.Control type="text" placeholder="Hint"  onChange={(e) => setHint(e.target.value)} />
                                        </Form.Group>

                                        <Form.Group controlId="formComments">
                                            <Form.Label>Comments</Form.Label>
                                            <Form.Control type="text" placeholder="Comments" value={comments}   onChange={(e) => setComments(e.target.value)} />
                                        </Form.Group> */}

                                    </Form>
                                </Col>

                                <Col md={6}>
                                    <Form>
                                        <Form.Group controlId="formModule">
                                            <Form.Label>Module</Form.Label>
                                            <Form.Control as="select" value={module} className="mb-3" onChange={(e) => onModuleSelect(e.target.value)}>
                                                <option value="" >Select</option>
                                                {moduleAllData.map(({ name }, index) => <option value={name} >{name}</option>)}
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group controlId="formQuestionType">
                                            <Form.Label>Question Type</Form.Label>
                                            <Form.Control as="select" value={questiontype} className="mb-3" onChange={(e) => setQuestionType(e.target.value)}>
                                                <option value="" >Select</option>
                                                {questionTypeAllData.map(({ name }, index) => <option value={name} >{name}</option>)}
                                            </Form.Control>
                                        </Form.Group>
                                         
                                    </Form>
                                </Col>

                            </Row>
                            <Row>
                                <Col md={6}>

                                    <Button variant="primary" onClick={() => search()}>
                                       Search 
                                    </Button>

                                    <Button variant="info" onClick={() => cancel()}>
                                        Cancel
                                    </Button>
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
                            <Card.Title as="h5">Question Reports</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Program</th>
                                        <th>Module</th>
                                        <th>Level</th>
                                        <th>Question Type</th>
                                        <th>Assessment Type</th>
                                        <th>Question</th>
                                        <th>Hint</th>
                                        <th>Option1</th>
                                        <th>Option2</th>
                                        <th>Option3</th>
                                        <th>Option4</th>
                                        <th>Answer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pageData.map(pageItem => (
                                        <tr>
                                            <td>{pageItem.program}</td>
                                            <td>{pageItem.module}</td>
                                            <td>{pageItem.level}</td>
                                            <td>{pageItem.questiontype}</td>
                                            <td>{pageItem.assessmenttype}</td>
                                            <td>{pageItem.question}</td>
                                            <td>{pageItem.hint}</td>
                                            <td>{pageItem.option1}</td>
                                            <td>{pageItem.option2}</td>
                                            <td>{pageItem.option3}</td>
                                            <td>{pageItem.option4}</td>
                                            <td>{pageItem.answer}</td>
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

export default QuestionReport;