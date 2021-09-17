import React, { useState, useEffect, Fragment, useContext } from "react";
import { Row, Col, Card, Form, Button, Collapse, Table } from 'react-bootstrap';
import firebase from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import Constants from "../../store/constants";
import FileUpload from "../core/fileUpload";
import { AuthContext } from '../auth/auth';
function Students() {

    const { currentUser } = useContext(AuthContext);
    const [pageData, setpageData] = useState([]);
    const [accordionState, setAccordionState] = useState({ accordionKey1: 1, accordionKey2: 1 });

    // Dropdown
    const [classNameList, setClassNameList] = useState([]);
    const [sectionList, setSections] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [studentHouseList, setStudentHouse] = useState([]);
    const [hostelList, setHostelList] = useState([]);
    const [roomList, setRoomList] = useState([]);
    const [transportList, setTransportList] = useState([]);
    const [routeList, setRouteList] = useState([]);

    // Fields
    const [loading, setLoading] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [stateStudent, setStateStudent] = useState(bindDefaultValues());

    // Dropdown
    const classNamesRefDB = firebase.firestore().collection('classnames');
    const sectionsRefDB = firebase.firestore().collection('sections');
    const hostelRefDB = firebase.firestore().collection('hostel');
    const roomDetailsRefDB = firebase.firestore().collection('roomdetails');
    const transportRefDB = firebase.firestore().collection('transport');
    const transportRouteRefDB = firebase.firestore().collection('transportroute');
    const studentHouseRefDB = firebase.firestore().collection('studenthouse');
    const ref = firebase.firestore().collection('students');
    const categoryRefDB = firebase.firestore().collection('category');


    function bindDefaultValues() {
        return {
            id: '',
            AdmissionNo: '',
            RollNumber: '',
            ClassName: '',
            Section: '',
            FirstName: '',
            LastName: '',
            Gender: '',
            DateofBirth: '',
            Category: '',
            Religion: '',
            Caste: '',
            MobileNumber: '',
            Email: '',
            AdmissionDate: '',
            StudentPhoto: '',
            DownloadURLStudentPhoto: '',
            BloodGroup: '',
            StudentHouse: '',
            Height: '',
            Weight: '',
            MedicalHistory: '',
            FatherName: '',
            FatherOccupation: '',
            FatherPhoto: '',
            MotherName: '',
            MotherPhone: '',
            MotherOccupation: '',
            MotherPhoto: '',
            Hostel: '',
            RoomNo: '',
            Transport: '',
            RouteName: '',
            CurrentAddress: '',
            PermanentAddress: '',
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

        classNamesRefDB.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setClassNameList(items);
        });
        categoryRefDB.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setCategoryList(items);
        });
        

        hostelRefDB.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setHostelList(items);
        });
 
        transportRefDB.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setTransportList(items);
        });

        studentHouseRefDB.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setStudentHouse(items);
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
        if (!isEditMode) {
            stateStudent.id = uuidv4();
            stateStudent.owner = owner;
            stateStudent.ownerEmail = ownerEmail;
            stateStudent.createdAt = firebase.firestore.FieldValue.serverTimestamp();
        } else {
            stateStudent.lastUpdate = firebase.firestore.FieldValue.serverTimestamp();
        }
        if (isEditMode) {
            if (stateStudent != null) {
                ref.doc(stateStudent.id)
                    .update(stateStudent)
                    .catch((err) => {
                        console.error(err);
                    });
            }
        } else {
            ref.doc(stateStudent.id)
                .set(stateStudent)
                .catch((err) => {
                    console.error(err);
                });
        }
        cancel();
    }
    function cancel() {
        setStateStudent(bindDefaultValues());
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

  

    function fileUploadCallback(childData) {
        if (childData.type == 'StudentPhoto') {
            stateStudent.DownloadURLStudentPhoto = childData.downloadURL;
            stateStudent.StudentPhoto = childData.fileName;
            let event1 = {
                target: {
                    value: childData.fileName,
                    name: 'StudentPhoto'
                }
            };
            let event2 = {
                target: {
                    value: childData.downloadURL,
                    name: 'downloadURLStudentPhoto'
                }
            };
            handleChange(event1);
            handleChange(event2);
        } else if (childData.type == 'StudentPhoto') {
            stateStudent.DownloadURLStudentPhoto = childData.downloadURL;
            stateStudent.StudentPhoto = childData.fileName;
        }
        console.log(childData);
    }

    // EDIT FUNCTION
    function editItem(item) {
        onSelect('ClassName', item.ClassName);
        setStateStudent(item);
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
        setStateStudent({
            ...stateStudent,
            [evt.target.name]: value
        });
    }
    function onSelect(name, item) {

        if (name == 'ClassName') {
            sectionsRefDB.onSnapshot((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    if (doc.data().classname == item) {
                        items.push(doc.data());
                    }
                });
                setSections(items);
            });
        } else if (name == 'Transport') {
            transportRouteRefDB.onSnapshot((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    if (doc.data().transport == item) {
                        items.push(doc.data());
                    }
                });
                setRouteList(items);
            });
        } else if (name == 'Hostel') {
            roomDetailsRefDB.onSnapshot((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    if (doc.data().hostel == item) {
                        items.push(doc.data());
                    }
                });
                setRoomList(items);
            });
        }
        
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
                                    Students
                                </a>
                            </Card.Title>
                        </Card.Header>
                        <Collapse in={accordionState.accordionKey1 === 1}>
                            <Card.Body>

                                <Row>
                                    <Col md={3}>
                                        <Form.Group>
                                            <Form.Label>Admission No</Form.Label>
                                            <Form.Control tabIndex="1" size="sm" name="AdmissionNo" value={stateStudent.AdmissionNo} className="mb-3" placeholder="Admission No"
                                                onChange={handleChange}>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control size="sm" tabIndex="5" name="FirstName" value={stateStudent.FirstName} className="mb-3" placeholder="First Name"
                                                onChange={handleChange}>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Category</Form.Label>
                                            <Form.Control tabIndex="9" as="select" name="Category" size="sm" value={stateStudent.Category} className="mb-3"
                                                onChange={handleChange}>
                                                <option value="" >Select</option>
                                                {categoryList.map(({ name }, index) => <option value={name} >{name}</option>)}
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Admission Date</Form.Label>
                                            <Form.Control size="sm" tabIndex="13" type="date" name="AdmissionDate" value={stateStudent.AdmissionDate} className="mb-3" placeholder="Admission Date"
                                                onChange={handleChange}>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Height</Form.Label>
                                            <Form.Control size="sm" name="Height" tabIndex="17" value={stateStudent.Height} className="mb-3" placeholder="Height"
                                                onChange={handleChange}>
                                            </Form.Control>
                                        </Form.Group>

                                    </Col>

                                    <Col md={3}>

                                        <Form.Group>
                                            <Form.Label>Roll Number</Form.Label>
                                            <Form.Control size="sm" tabIndex="2" name="RollNumber" value={stateStudent.RollNumber} className="mb-3" placeholder="Roll Number"
                                                onChange={handleChange}>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control size="sm" name="LastName" value={stateStudent.LastName} className="mb-3" placeholder="Last Name"
                                                onChange={handleChange}>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Religion</Form.Label>
                                            <Form.Control size="sm" name="Religion" value={stateStudent.Religion} className="mb-3" placeholder="Religion"
                                                onChange={handleChange}>
                                            </Form.Control>
                                        </Form.Group>
                                

                                        <Form.Group>
                                            <Form.Label>Weight</Form.Label>
                                            <Form.Control size="sm" name="Weight" value={stateStudent.Weight} className="mb-3" placeholder="Weight"
                                                onChange={handleChange}>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Blood Group</Form.Label>
                                            <Form.Control as="select" name="BloodGroup" size="sm" value={stateStudent.BloodGroup} className="mb-3"
                                                onChange={handleChange}>
                                                <option value="">Select</option>
                                                <option value="A+">A+</option>
                                                <option value="B+">B+</option>
                                                <option value="AB+">AB+</option>
                                                <option value="O-">O-</option>
                                                <option value="A-">A-</option>
                                                <option value="B-">B-</option>
                                                <option value="AB-">AB-</option>
                                            </Form.Control>
                                        </Form.Group>

                                    </Col>

                                    <Col md={3}>

                                        <Form.Group>
                                            <Form.Label>Class</Form.Label>
                                            <Form.Control size="sm" name="ClassName" tabIndex="3" as="select" value={stateStudent.ClassName} className="mb-3"
                                                onChange={handleChange}>
                                                <option value="" >Select</option>
                                                {classNameList.map(({ name }, index) => <option value={name} >{name}</option>)}
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Gender</Form.Label>
                                            <Form.Control size="sm" as="select" name="Gender" value={stateStudent.Gender} className="mb-3"
                                                onChange={handleChange}>
                                                <option value="" >Select</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Caste</Form.Label>
                                            <Form.Control size="sm" name="Caste" value={stateStudent.Caste} className="mb-3" placeholder="Caste"
                                                onChange={handleChange}>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Student House</Form.Label>
                                            <Form.Control size="sm" name="StudentHouse" tabIndex="3" as="select" value={stateStudent.StudentHouse} className="mb-3"
                                                onChange={handleChange}>
                                                <option value="" >Select</option>
                                                {studentHouseList.map(({ name }, index) => <option value={name} >{name}</option>)}
                                            </Form.Control>
                                        </Form.Group>
                                        
                                    </Col>

                                    <Col md={3}>

                                        <Form.Group>
                                            <Form.Label>Section</Form.Label>
                                            <Form.Control as="select" name="Section" size="sm" value={stateStudent.Section} className="mb-3"
                                                onChange={handleChange}>
                                                <option value="" >Select</option>
                                                {sectionList.map(({ name }, index) => <option value={name} >{name}</option>)}
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>DateofBirth</Form.Label>
                                            <Form.Control size="sm" name="DateofBirth" type="date" value={stateStudent.DateofBirth} className="mb-3"
                                                placeholder="DateofBirth" onChange={handleChange}>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Mobile Number</Form.Label>
                                            <Form.Control size="sm" name="MobileNumber" value={stateStudent.MobileNumber} className="mb-3"
                                                placeholder="Mobile Number" onChange={handleChange}>
                                            </Form.Control>
                                        </Form.Group>
                                     

                                        <Form.Group>
                                            <Form.Label>Student Photo</Form.Label>
                                            <FileUpload 
                                                placeholder='Student Photo' 
                                                name="StudentPhoto" 
                                                value={stateStudent.StudentPhoto} 
                                                fileName={stateStudent.StudentPhoto}
                                                editMode={isEditMode} 
                                                type="StudentPhoto" 
                                                accept="image/*" 
                                                isProfileImage="true"
                                                downloadURL={stateStudent.DownloadURLStudentPhoto} 
                                                parentCallback={fileUploadCallback} />
                                        </Form.Group>
                                    </Col>

                                </Row>

                                <Row>
                                    <Col md={10} >
                                        <Form.Group>
                                            <Form.Label>Medical History</Form.Label>
                                            <Form.Control as="textarea" name="MedicalHistory" rows="3" value={stateStudent.MedicalHistory} className="mb-3"
                                                placeholder="Medical History" onChange={handleChange}>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Card.Header>
                                    <Card.Title as="h5">Parent Guardian Detail</Card.Title>
                                </Card.Header>

                                <Row>
                                    <Col md={3}>
                                        <Form.Group>
                                            <Form.Label>Father Name</Form.Label>
                                            <Form.Control size="sm" name="FatherName" value={stateStudent.FatherName} className="mb-3"
                                                placeholder="Father Name" onChange={handleChange}>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Mother Name</Form.Label>
                                            <Form.Control size="sm" name="MotherName" value={stateStudent.MotherName} className="mb-3"
                                                placeholder="Mother Name" onChange={handleChange}>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>

                                    <Col md={3}>

                                        <Form.Group>
                                            <Form.Label>Father Occupation</Form.Label>
                                            <Form.Control size="sm" name="FatherOccupation" value={stateStudent.FatherOccupation} className="mb-3"
                                                placeholder="Father Occupation" onChange={handleChange}>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Mother Occupation</Form.Label>
                                            <Form.Control size="sm" name="MotherOccupation" value={stateStudent.MotherOccupation} className="mb-3"
                                                placeholder="Mother Occupation" onChange={handleChange}>
                                            </Form.Control>
                                        </Form.Group>

                                    </Col>

                                    <Col md={3}>
                                        <Form.Group>
                                            <Form.Label>Father Photo</Form.Label>
                                            <Form.Control size="sm" name="FatherPhoto" value={stateStudent.FatherPhoto} className="mb-3"
                                                placeholder="Father Photo" onChange={handleChange}>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Mother Photo</Form.Label>
                                            <Form.Control size="sm" name="MotherPhoto" value={stateStudent.MotherPhoto} className="mb-3"
                                                placeholder="Mother Photo" onChange={handleChange}>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>

                                    <Col md={3}>

                                        <Form.Group>
                                            <Form.Label>Father Phone</Form.Label>
                                            <Form.Control size="sm" name="FatherPhone" value={stateStudent.FatherPhone} className="mb-3"
                                                placeholder="Father Phone" onChange={handleChange}>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Mother Phone</Form.Label>
                                            <Form.Control size="sm" name="MotherPhone" value={stateStudent.MotherPhone} className="mb-3"
                                                placeholder="Mother Phone" onChange={handleChange}>
                                            </Form.Control>
                                        </Form.Group>

                                    </Col>

                                </Row>

                                <Card.Header>
                                        <Card.Title as="h5">Student Address</Card.Title>
                                    </Card.Header>
                                <Row>
                                 

                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Current Address</Form.Label>
                                            <Form.Control as="textarea" name="CurrentAddress" rows="3" value={stateStudent.CurrentAddress} className="mb-3"
                                                placeholder="Current Address" onChange={handleChange}>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Permanent Address</Form.Label>
                                            <Form.Control as="textarea" name="PermanentAddress" rows="3" value={stateStudent.PermanentAddress} className="mb-3"
                                                placeholder="Permanent Address" onChange={handleChange}>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>

                                </Row>
                                <Card.Header>
                                        <Card.Title as="h5">Hostel Details</Card.Title>
                                    </Card.Header>
                                <Row>
                                    <Col md={3}>
                                        <Form.Group>
                                            <Form.Label>Hostel</Form.Label>
                                            <Form.Control as="select" name="Hostel" size="sm" value={stateStudent.Hostel} className="mb-3"
                                                onChange={handleChange}>
                                                <option value="" >Select</option>
                                                {hostelList.map(({ name }, index) => <option value={name} >{name}</option>)}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group>
                                            <Form.Label>Room No</Form.Label>
                                             <Form.Control as="select" name="RoomNo" size="sm" value={stateStudent.RoomNo} className="mb-3"
                                                onChange={handleChange}>
                                                <option value="" >Select</option>
                                                {roomList.map(({ name }, index) => <option value={name} >{name}</option>)}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Card.Header>
                                        <Card.Title as="h5">Transport Details</Card.Title>
                                    </Card.Header>
                                <Row>
                                    <Col md={3}>
                                        <Form.Group>
                                            <Form.Label>Transport</Form.Label>
                                            <Form.Control as="select" name="Transport" size="sm" value={stateStudent.Transport} className="mb-3"
                                                onChange={handleChange}>
                                                <option value="" >Select</option>
                                                {transportList.map(({ name }, index) => <option value={name} >{name}</option>)}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group>
                                            <Form.Label>Route Name</Form.Label>
                                             <Form.Control as="select" name="RouteName" size="sm" value={stateStudent.RouteName} className="mb-3"
                                                onChange={handleChange}>
                                                <option value="" >Select</option>
                                                {routeList.map(({ name }, index) => <option value={name} >{name}</option>)}
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
                                    Student Records
                                </a>
                            </Card.Title>
                        </Card.Header>
                        <Collapse in={accordionState.accordionKey2 === 1}>
                            <Card.Body>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>AdmissionNo</th>
                                            <th>RollNumber</th>
                                            <th>ClassName</th>
                                            <th>Section</th>
                                            <th>FirstName</th>
                                            <th>LastName</th>
                                            <th>Gender</th>
                                            <th>DateofBirth</th>
                                            <th>Category</th>
                                            <th>Religion</th>
                                            <th>Caste</th>
                                            <th>MobileNumber</th>
                                            <th>Email</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pageData.map(pageItem => (
                                            <tr>
                                                <td>{pageItem.AdmissionNo}</td>
                                                <td>{pageItem.RollNumber}</td>
                                                <td>{pageItem.ClassName}</td>
                                                <td>{pageItem.Section}</td>
                                                <td>{pageItem.FirstName}</td>
                                                <td>{pageItem.LastName}</td>
                                                <td>{pageItem.Gender}</td>
                                                <td>{pageItem.DateofBirth}</td>
                                                <td>{pageItem.Category}</td>
                                                <td>{pageItem.Religion}</td>
                                                <td>{pageItem.Caste}</td>
                                                <td>{pageItem.MobileNumber}</td>
                                                <td>{pageItem.Email}</td>
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

export default Students;