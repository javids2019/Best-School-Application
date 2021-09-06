import React, { useState, useEffect, Fragment, useContext } from "react";
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import firebase from "../../firebase";
import {Link} from 'react-router-dom';
import {canUseHistory, useHistory} from 'react-router';
import { AuthContext } from '../auth/auth';

function Dashboard() {

    //No of question selected 
    //No of question Answered
    //Total No of question Asked 
    //Total Score 
    //Percentage 
    //No of incorrect questions 
    //Total time spent 
    //Accuerecy 

    const { currentUser } = useContext(AuthContext);
    const currentUserId = currentUser ? currentUser.uid : null;
    const [questionDistinctList, setQuestionDistinctList] = useState([]);
    const ref = firebase.firestore().collection('question');


    function getAllPageData() {
        // setLoading(true);
        ref.onSnapshot((querySnapshot) => {
            var questionDistinctList = [];
            querySnapshot.forEach((doc) => {
                const pageItem = doc.data()
                const item = { program: pageItem.program, module: pageItem.module, level: pageItem.level, questiontype: pageItem.questiontype, assessmenttype: pageItem.assessmenttype };
                if (questionDistinctList.findIndex((config) => config.program === pageItem.program && config.module === pageItem.module && config.level === pageItem.level && config.questiontype === pageItem.questiontype && config.assessmenttype === pageItem.assessmenttype) === -1) {
                    questionDistinctList.push(item);
                }
            });
            setQuestionDistinctList(questionDistinctList);
            console.log(questionDistinctList);
        });

    }
    useEffect(() => {
        if(currentUser == undefined || currentUser == null) {
            // var canUseHistory = useHistory();
            // canUseHistory.push('/auth/login');
            return (<Link  to={{pathname: '/auth/login'}} ></Link>);
           // return window.location.href = '/auth/login';
         }; 
        getAllPageData();
      
    }, []);
 
    return (
        <Fragment>
            <Row>
                {questionDistinctList.map(questionItem => (
                    <Col md={5} >
                        <Card className='card-social'>
                            <Card.Header>
                                <Card.Title as='h5'> {questionItem.program}  - {questionItem.module} - {questionItem.level}
                                </Card.Title>
                            </Card.Header>
                            <Card.Body  >
                                <div className="row align-items-center justify-content-center card-active">
                                    <div className="col-6">
                                        <h6 className="text-c-purple mb-0">{questionItem.questiontype}</h6>
                                        <h6> <span className="  text-c-blue">{questionItem.assessmenttype}</span></h6>
                                    </div>
                                    <div className="col-6">
                                      

                                        <Link variant="primary"  to={{
                                            pathname: '/quiz',
                                            state: {program: questionItem.program, module: questionItem.module, 
                                                level: questionItem.level, questiontype: questionItem.questiontype, 
                                                assessmenttype: questionItem.assessmenttype}
                                            }} >Start Test</Link>

                                    </div>
                                    <h6 className="text-muted mt-3 mb-0">You can participate in event </h6> &nbsp;&nbsp;&nbsp;   <i className="fa fa-angellist text-c-purple f-50" />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row>
            <Col md={6} xl={4}>
                        <Card>
                            <Card.Header>
                                <Card.Title as='h5'>Rating</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div className="row align-items-center justify-content-center m-b-20">
                                    <div className="col-6">
                                        <h2 className="f-w-300 d-flex align-items-center float-left m-0">4.7 <i className="fa fa-star f-10 m-l-10 text-c-yellow"/></h2>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="d-flex  align-items-center float-right m-0">0.4 <i className="fa fa-caret-up text-c-green f-22 m-l-10"/></h6>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xl-12">
                                        <h6 className="align-items-center float-left"><i className="fa fa-star f-10 m-r-10 text-c-yellow"/>5</h6>
                                        <h6 className="align-items-center float-right">384</h6>
                                        <div className="progress m-t-30 m-b-20" style={{height: '6px'}}>
                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '70%'}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>

                                    <div className="col-xl-12">
                                        <h6 className="align-items-center float-left"><i className="fa fa-star f-10 m-r-10 text-c-yellow"/>4</h6>
                                        <h6 className="align-items-center float-right">145</h6>
                                        <div className="progress m-t-30  m-b-20" style={{height: '6px'}}>
                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '35%'}} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>

                                    <div className="col-xl-12">
                                        <h6 className="align-items-center float-left"><i className="fa fa-star f-10 m-r-10 text-c-yellow"/>3</h6>
                                        <h6 className="align-items-center float-right">24</h6>
                                        <div className="progress m-t-30  m-b-20" style={{height: '6px'}}>
                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '25%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>

                                    <div className="col-xl-12">
                                        <h6 className="align-items-center float-left"><i className="fa fa-star f-10 m-r-10 text-c-yellow"/>2</h6>
                                        <h6 className="align-items-center float-right">1</h6>
                                        <div className="progress m-t-30  m-b-20" style={{height: '6px'}}>
                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '10%'}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <h6 className="align-items-center float-left"><i className="fa fa-star f-10 m-r-10 text-c-yellow"/>1</h6>
                                        <h6 className="align-items-center float-right">0</h6>
                                        <div className="progress m-t-30  m-b-5" style={{height: '6px'}}>
                                            <div className="progress-bar" role="progressbar" style={{width: '0%'}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    </Row>
        </Fragment>
    );
}

export default Dashboard;