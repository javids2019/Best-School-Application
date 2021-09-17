import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { Form } from 'react-bootstrap';
import Constants from "../../store/constants";

function FileUpload(props) {

  const storageRef = firebase.storage().ref();
  const basePath = 'images/';
  const [isDownloadURL, setIsDownloadURL] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);
  useEffect(() => {

    if ((props.fileName == "") || isDeleted) {
      setFileName('');
      setProgress(0);
      setIsDeleted(false);
      setIsDownloadURL(false);

    }
    else if (props.fileName && !isDeleted) {
      setFileName(props.fileName);
      setProgress(100);
      setIsDownloadURL(true);

      //document.getElementById('uploader').value = 100;
      //document.getElementById('fileButton').text(props.fileName);

      //   var muiRef = storageRef.child(basePath + props.fileName);
      //   muiRef.getMetadata()
      //     .then(function (metadata) {

      //       setIsDownloadURL(true);
      //     }).catch(function (err) {
      //       console.error(err);
      //     });
    }
  });

  function fileUpload(event, uploader, fileButton) {
    var uploader = document.getElementById(uploader);
    var fileButton = document.getElementById(fileButton);
    if (event.target.files.length > 0) {
      var file = event.target.files[0];
      setFileName(file.name);
      var uploadTask = storageRef.child(basePath + file.name).put(file);
      uploadTask.on('state_changed',
        (snapshot) => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.error(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            props.parentCallback({ type: props.type, fileName: file.name, downloadURL: downloadURL });
            setIsDownloadURL(true);
            setProgress(100);
          });
        }
      );
    }
  }
  function remove(fileName) {
    if (fileName != '') {
      var deleteRef = storageRef.child(basePath + fileName);
      deleteRef.delete()
        .then(function () {
          setIsDeleted(true);
          setProgress(0);
          setFileName('');
          setIsDownloadURL(false);
          props.parentCallback({ type: props.type, editMode: false, fileName: '', downloadURL: '' });
        })
        .catch(function (err) {
          setIsDeleted(true);
          setProgress(0);
          setFileName('');
          setIsDownloadURL(false);
          props.parentCallback({ type: props.type, editMode: false, fileName: '', downloadURL: '' });
        })
    }
  }


  return (
    <div>

      {props.isProfileImage && (
        <div onClick={() => document.getElementById('fileButton').click()}
          style={{
            height: "110px", width: "110px",
          }} >
          {props.downloadURL && (
            <img
              src={props.downloadURL}
              style={{
                height: "110px",
                width: "110px",
                border: "1px dashed black",
              }}
            />
          )}
          {props.downloadURL == '' && (
            <div style={{ height: "110px", width: "110px", 'padding-top': '30px', 'padding-left': '10px', border: "1px dashed black", }} >Browse File to Upload &nbsp;
              <i class="fa fa-cloud-upload"></i>
            </div>

          )}
        </div>
      )}
      {!props.isProfileImage && (
        <div className="progress" id="uploader" style={{ height: '30px', }} >
          <div className="progress-bar progress-bar-info " role="progressbar"
            style={{ width: progress + "%" }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
            {!isDownloadURL && (
              <span style={{ 'padding-left': '15px', 'font-size': '14px', 'padding-right': '15px' }}
                onClick={() => document.getElementById('fileButton').click()}
                className="text-success mr-left-15 mr-15">Browse File to Upload &nbsp;
                <i class="fa fa-cloud-upload"></i></span>
            )}

            {isDownloadURL && (
              <span>
                <span onClick={() => document.getElementById('fileButton').click()}>  {fileName}</span> &nbsp;
                <a href={Constants.BLANK_LINK} style={{ 'font-size': '14px', 'padding-right': '10px', cursor: 'pointer' }}
                  class="fa fa-trash text-danger"
                  aria-hidden="true" onClick={() => remove(fileName)}></a></span>
            )}

          </div>
        </div>
      )}

      <Form.Control hidden="true" id="fileButton" size="sm" type="file" className="chat-attach"
        className="mb-3" placeholder={props.placeholder} accept={props.accept}
        onChange={(e) => fileUpload(e, 'uploader', 'fileButton')}>
      </Form.Control>


    </div>
  );

}

export default FileUpload;