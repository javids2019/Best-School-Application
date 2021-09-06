import React, { useState, useEffect, Fragment, useContext } from "react";
import { Row, Col, Card, Form, Button, Table, Tabs, Tab } from 'react-bootstrap';
import firebase from "../../firebase";
import { collection, query, orderBy, groupBy, collectionGroup } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import CountDown from "../core/countdown";
import ScoreChart from "../core/scoreChart";
import { AuthContext } from '../auth/auth';

function Quiz(props) {

    //No of question selected 
    //No of question Answered
    //Total No of question Asked 
    //Total Score 
    //Percentage 
    //No of incorrect questions 
    //Total time spent 
    //Accuerecy 
    // points


    const { currentUser } = useContext(AuthContext);
    const currentUserId = currentUser ? currentUser.uid : null;
    const [pageData, setpageData] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [paramsQuestion, setParamsQuestion] = useState({});
    const [isQuizCompleted, setQuizCompleted] = useState(false);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [remainingPercentage, setRemainingPercentage] = useState(0);
    const [percentage, setTotalPercentage] = useState(0);
    const [noOfNotAnsweredQuestions, setNoOfNotAnsweredQuestions] = useState(0); 
    const [noOfAnsweredCurrect, setNoOfAnsweredCurrect] = useState(0);
    const [noOfQuestionAnswered, setNoOfQuestionAnswered] = useState(0);
    const [score, setScore] = useState(0);
    const [scorePercentage, setScorePercentage] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState([]);
    const [timerInMin, setTimerInMin] = useState(30);
    const [timerInHr, setTimerInHr] = useState(0);
    const ref = firebase.firestore().collection('question');
    const quizReportRef = firebase.firestore().collection('quizreport');

    function getAllPageData() {
        // setLoading(true);
        const state = props.location.state;
        setParamsQuestion(state);
        var refSearch = ref;
        if (state.program != "") {
            refSearch = refSearch.where('program', '==', state.program)
        }
        if (state.module != "") {
            refSearch = refSearch.where('module', '==', state.module)
        }
        if (state.level != "") {
            refSearch = refSearch.where('level', '==', state.level)
        }
        if (state.assessmenttype != "") {
            refSearch = refSearch.where('assessmenttype', '==', state.assessmenttype)
        }
        if (state.questiontype != "") {
            refSearch = refSearch.where('questiontype', '==', state.questiontype)
        }

        refSearch.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setpageData(items);
            const cItem = items[0];
            cItem.selectedAnswer = "";
            setSelectedAnswer('');
            setCurrentQuestion(cItem);
            console.log(cItem);
        });
    }
    useEffect(() => {
        getAllPageData();
        setTimerInHr(0);
        setTimerInMin(30);
    }, []);

    function handleChange(selectedAnswer) {
        setSelectedAnswer(selectedAnswer);
        currentQuestion.selectedAnswer = selectedAnswer;
    }

    const handleNextClick = (isCompleted) => {
        if (isCompleted) {
            let scoreCount = 0;
            let notAnsweredQuestions = 0;
            let noOfQuestionAnswered = 0;
            pageData && pageData.forEach((item) => {
                if (item.selectedAnswer && item.answer.trim() === item.selectedAnswer.trim()) {
                    scoreCount = scoreCount + 1;
                }
                if (!item.selectedAnswer) {
                    notAnsweredQuestions = notAnsweredQuestions + 1;
                }
                else if (item.selectedAnswer) {
                    noOfQuestionAnswered = noOfQuestionAnswered + 1;
                }
            });
            setNoOfAnsweredCurrect(scoreCount);
            const percentage = ((scoreCount / pageData.length) * 100);
            const remainingPercentage = (100 - percentage);
            setScore(scoreCount);
            setQuizCompleted(true);
            setNoOfNotAnsweredQuestions(notAnsweredQuestions);
            setNoOfQuestionAnswered(noOfQuestionAnswered);
            setTotalQuestions(pageData.length);
            setTotalPercentage(percentage);
            setRemainingPercentage(remainingPercentage);
            const _scorePercentage = [{ key: "Scored %", y: percentage, color: "#1de9b6" },
            { key: "Remaining %", y: remainingPercentage, color: "#ff8a65" },];
            setScorePercentage(_scorePercentage);
      
            addQuizItem(pageData.length, percentage, remainingPercentage,
                notAnsweredQuestions, noOfQuestionAnswered,
            noOfQuestionAnswered, scoreCount, timerInMin, timerInHr);

        } else {
            const nextQuetionsIndex = currentQuestionIndex + 1;
            if (nextQuetionsIndex < pageData.length) {
                setSelectedAnswer('');
                setCurrentQuestionIndex(nextQuetionsIndex);
                setCurrentQuestion(pageData[nextQuetionsIndex]);
                if (pageData[nextQuetionsIndex].selectedAnswer) {
                    setSelectedAnswer(pageData[nextQuetionsIndex].selectedAnswer);
                }
            } 
        }
        console.log(timerInHr);
        console.log(timerInMin);
    }
    function addQuizItem(totalQuestions, 
        percentage, remainingPercentage, noOfNotAnsweredQuestions, 
        noOfAnsweredCurrect, noOfQuestionAnswered,
        score, timerInMin, timerInHr) {
        const owner = currentUser ? currentUser.uid : 'unknown';
        const email = currentUser ? currentUser.email : 'unknown';
        const displayName = currentUser ? currentUser.displayName : 'unknown';
        const program = currentQuestion.program;
        const module = currentQuestion.module;
        const level = currentQuestion.level;
        const assessmenttype = currentQuestion.assessmenttype;
        const questiontype = currentQuestion.questiontype;
        const pageNewItem = {
            id: uuidv4(),
            displayName,
            email,
            program,
            module,
            level, 
            assessmenttype,
            questiontype,
            totalQuestions,
            percentage,
            remainingPercentage,
            noOfNotAnsweredQuestions,
            noOfAnsweredCurrect,
            noOfQuestionAnswered,
            score,
            timerInMin,
            timerInHr,
            owner,
            email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
        };
         
        quizReportRef.doc(pageNewItem.id)
            .set(pageNewItem)
            .catch((err) => {
                console.error(err);
            }); 
    }
    const handlePreviousClick = () => {

        const nextQuetionsIndex = currentQuestionIndex - 1;
        if (nextQuetionsIndex >= 0 && nextQuetionsIndex < pageData.length) {
            setCurrentQuestionIndex(nextQuetionsIndex);
            setCurrentQuestion(pageData[nextQuetionsIndex]);
            if (pageData[nextQuetionsIndex].selectedAnswer) {
                setSelectedAnswer(pageData[nextQuetionsIndex].selectedAnswer);
            }
        } 
    }
    return (
        <Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col md={10}>
                                    <Card.Title as="h5">Quiz {paramsQuestion.program} - {paramsQuestion.module} - {paramsQuestion.level}</Card.Title>
                                </Col>
                               
                                <Col md={2}>
                                    <span>Question {currentQuestionIndex + 1}</span>/{pageData.length} <br />
                                    {!isQuizCompleted && (<CountDown hours={timerInHr} minutes={timerInMin} />)}
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                            <Col md={10} >
                            
                            {isQuizCompleted && (
                               
                                <Card.Text className="text-primary m-b-1"> Congratulations you have completed the Test !!! </Card.Text>
                               )}
                                </Col>
                            </Row>
                            <Row >
                                {!isQuizCompleted && (
                                    <Col md={10} >
                                        <Card.Title as="h3">{currentQuestion.question}</Card.Title>
                                        <Form>
                                            <Form.Group>

                                                <Form.Group controlId="formOption1">
                                                    <Form.Label>
                                                        <Form.Check checked={selectedAnswer === currentQuestion.option1}
                                                            onClick={(e) => handleChange(currentQuestion.option1)}
                                                            custom
                                                            type="radio"
                                                            label={currentQuestion.option1}
                                                            name={currentQuestion.option1}
                                                            id={currentQuestion.id}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>

                                                <Form.Group controlId="formOption2">
                                                    <Form.Label>
                                                        <Form.Check checked={selectedAnswer === currentQuestion.option2}
                                                            onClick={(e) => handleChange(currentQuestion.option2)}
                                                            type="radio"
                                                            label={currentQuestion.option2}
                                                            name={currentQuestion.option2}
                                                            id={currentQuestion.id}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>

                                                <Form.Group controlId="formOption3">
                                                    <Form.Label>
                                                        <Form.Check
                                                            checked={selectedAnswer === currentQuestion.option3}
                                                            onClick={(e) => handleChange(currentQuestion.option3)}
                                                            type="radio"
                                                            label={currentQuestion.option3}
                                                            name={currentQuestion.option3}
                                                            id={currentQuestion.id}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>

                                                <Form.Group controlId="formOption4">
                                                    <Form.Label>
                                                        <Form.Check
                                                            checked={selectedAnswer === currentQuestion.option4}
                                                            onClick={(e) => handleChange(currentQuestion.option4)}
                                                            type="radio"
                                                            label={currentQuestion.option4}
                                                            name={currentQuestion.option4}
                                                            id={currentQuestion.id}
                                                        />
                                                    </Form.Label>

                                                </Form.Group>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                )}

                                {isQuizCompleted && (
                                    <Col md={6} >
                                        <Card.Header>
                                            <Card.Title as="h5">Score Summary</Card.Title>
                                        </Card.Header>

                                        <Card.Body>
                                            <ScoreChart data={scorePercentage}></ScoreChart>
                                        </Card.Body>
                                    </Col>
                                )}

                                {isQuizCompleted && (
                                    <Col md={6} >
                                        <Card.Header>
                                            <Card.Title as="h5">Score Summary in Detail</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            <Table striped responsive>
                                                <tbody>
                                                    <tr>
                                                        <td>Total No of Questions</td>
                                                        <td><strong>{totalQuestions}</strong></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Correct Answered</td>
                                                        <td><strong>{noOfAnsweredCurrect}/{totalQuestions}</strong></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Percentage</td>
                                                        <td><strong>{percentage}%</strong></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Remininig Percentage </td>
                                                        <td><strong>{remainingPercentage}%</strong></td>
                                                    </tr>
                                                    <tr>
                                                        <td>No of Question Answered</td>
                                                        <td><strong>{noOfQuestionAnswered}/{totalQuestions}</strong></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Not Answered Questions</td>
                                                        <td><strong>{noOfNotAnsweredQuestions}/{totalQuestions}</strong></td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Card.Body>
                                        <Card.Title as="h3">  </Card.Title>
                                    </Col>
                                )}
                            </Row>

                        </Card.Body>
                        <Card.Footer>
                            <Row>

                                <Col md={2}>
                                    {!isQuizCompleted && (
                                        <Button variant="primary" onClick={() => handlePreviousClick()}>
                                            Previous
                                        </Button>
                                    )}
                                </Col>

                                <Col md={8}></Col>
                                <Col md={2}>
                                    <Button variant="success" onClick={() => handleNextClick(currentQuestionIndex + 1 === pageData.length)}>
                                        {currentQuestionIndex + 1 === pageData.length ? 'Finish' : 'Next'}
                                    </Button>

                                </Col>
                            </Row>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
}

export default Quiz;