import { firestore } from "firebase";
import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Card, Table } from 'react-bootstrap';
import firebase from "../../firebase";

function LoginHistory() {
    const [pageData, setpageData] = useState([]);
    const ref = firebase.firestore().collection('loginhistory');
   
    function getAllPageData() {
        ref.orderBy("lastUpdate", "desc").onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setpageData(items);
        });
    }

    useEffect(() => { 
        getAllPageData();
    }, []);

    const options = {
        year: "2-digit",
        month:"2-digit",
        day:"2-digit",
        hour:  "2-digit",
        minute: "2-digit"
        }
   
    return (
        <Fragment> 
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Login History</Card.Title>
                        </Card.Header>
                        <Card.Body>

                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Type</th>
                                        <th>LoginAt</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pageData.map(pageItem => (
                                        <tr>
                                            <td>{pageItem.name}</td>
                                            <td>{pageItem.email}</td>
                                            <td>{pageItem.type}</td>
                                            <td>{(pageItem.lastUpdate.toDate()).toLocaleTimeString("en-US",options)}</td>  
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

export default LoginHistory;