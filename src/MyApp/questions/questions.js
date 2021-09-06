import React, { useState, useEffect, Fragment, useContext } from "react";
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import firebase from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import  Constants  from "../../store/constants";
function Questions() {

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

    // ADD FUNCTION
    function addItem() {
        const owner = currentUser ? currentUser.uid : 'unknown';
        const ownerEmail = currentUser ? currentUser.email : 'unknown';
        const pageNewItem = {
            id: uuidv4(),
            program,
            module,
            level,
            questiontype,
            assessmenttype,
            narrative,
            question,
            hint,
            option1,
            option2,
            option3,
            option4,
            answer,
            comments,            
            owner,
            ownerEmail,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
        };
        if (isEditMode) {
            if (editPageData != null) {
                editPageData.program = program;
                editPageData.module = module;
                editPageData.level = level;
                editPageData.questiontype = questiontype;
                editPageData.assessmenttype = assessmenttype;
                editPageData.narrative = narrative;
                editPageData.question = question;
                editPageData.hint = hint;
                editPageData.option1 = option1;
                editPageData.option2 = option2;
                editPageData.option3 = option3;
                editPageData.option4 = option4;
                editPageData.answer = answer;
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
        setDescription('');
        setProgram("");
        setModule("");
        setlevel("");
        setAssessmentType('');
        setQuestionType('');
        setNarrative('');
        setQuestion('');
        setHint('');
        setOption1('');
        setOption2('');
        setOption3('');
        setOption4('');
        setAnswer('');
        setComments('');
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
    }

    function onModuleSelect(item) {
        setModule(item);
    }

    function setModuleAndLevel(module, level) {
      
        levelRefDB.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                if (doc.data().module == module && doc.data().program == program) {
                     
                    items.push(doc.data());
                }
            });  
            setlevel(level);
            setLevelListData(items);
        });

        setTimeout(function () {
            
            setlevel(level);
           
        }, 3000);
    }

    // EDIT FUNCTION
    function editItem(item) {
        setName(item.name);
        setDescription(item.description);
        onProgramSelect(item.program);
        onModuleSelect(item.module);
        setlevel(item.level)
        setQuestionType(item.questiontype);
        setAssessmentType(item.assessmenttype);

        setNarrative(item.narrative);
        setQuestion(item.question);
        setHint(item.hint);
        setOption1(item.option1);
        setOption2(item.option2);
        setOption3(item.option3);
        setOption4(item.option4);
        setAnswer(item.answer);
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
                            <Card.Title as="h5">Questions</Card.Title>
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
                                        </Form.Group>

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


                                        <Form.Group>
                                        
                                            <Form.Group controlId="formOption1">
                                                <Form.Label>Option 1&nbsp;&nbsp;
                                                    <Form.Check value={answer}  checked={answer === option1} 
                                                    onChange={(e) => setAnswer(option1)}
                                                        inline
                                                        custom
                                                        type="radio"
                                                        label="Answer"
                                                        name="chkOption"
                                                        id="chkOption1"
                                                    />
                                                </Form.Label>
                                                <Form.Control type="text" placeholder="Option 1" value={option1}  onChange={(e) => setOption1(e.target.value)} />

                                            </Form.Group>

                                            <Form.Group controlId="formOption2">
                                                <Form.Label>Option 2&nbsp;&nbsp; 
                                                    <Form.Check  checked={answer === option2} 
                                                    onChange={(e) => setAnswer(option2)}
                                                        inline
                                                        type="radio"
                                                        label="Answer"
                                                        name="chkOption"
                                                        id="chkOption2"
                                                    />
                                                    </Form.Label>
                                                <Form.Control type="text" placeholder="Option 2"  value={option2}  onChange={(e) => setOption2(e.target.value)} />
                                            </Form.Group>

                                            <Form.Group controlId="formOption3">
                                                <Form.Label>Option 3&nbsp;&nbsp;
                                                <Form.Check value={answer} 
                                                 checked={answer === option3} 
                                                 onChange={(e) => setAnswer(option3)}
                                                        inline
                                                        type="radio"
                                                        label="Answer"
                                                        name="chkOption"
                                                        id="chkOption3"
                                                    />
                                                </Form.Label>
                                                <Form.Control type="text" placeholder="Option 3" value={option3} onChange={(e) => setOption3(e.target.value)} />
                                            </Form.Group>

                                            <Form.Group controlId="formOption4">
                                                <Form.Label>Option 4&nbsp;&nbsp;
                                                <Form.Check value={answer} 
                                                checked={answer === option4} 
                                                onChange={(e) => setAnswer(option4)}
                                                        inline
                                                        type="radio"
                                                        label="Answer"
                                                        name="chkOption"
                                                        id="chkOption4"
                                                    />
                                                </Form.Label>
                                                <Form.Control type="text" placeholder="Option 4" value={option4} onChange={(e) => setOption4(e.target.value)} />
                                               
                                            </Form.Group>
                                        </Form.Group>
                                    </Form>
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
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Questions</Card.Title>
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
                                        <th>Action</th>
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

export default Questions;