import React, { useState, useEffect, Fragment, useContext } from "react";

function CheckAndUncheck() {

    const [stateChecked, setStateChecked] = useState(false);
 


    function checkIt() {
        setStateChecked(true);
  }

  function unCheckIt() {
     setStateChecked(false);
  }

  function handleChange(evt) {
     if(stateChecked !== evt.target.checked) {
        setStateChecked(evt.target.checked);
     }
  }

 
    return (
      <div>
        <div>
          <button onClick={(e) => checkIt(e)}>Check</button> &nbsp;&nbsp;&nbsp; <button 
          onClick={(e) =>unCheckIt(e)}>Uncheck</button>
        </div>
        <br/>
        <div>
          Checkbox :: <input type="checkbox" checked={stateChecked} onChange={(e) => handleChange(e)}/>
        </div>
        <br/>
        <div>
          Radio button :: <input type="radio" checked={stateChecked} onChange={(e) => handleChange(e)}/>
        </div>
      </div>
    );
  }
 

CheckAndUncheck.propTypes = {
}

CheckAndUncheck.defaultProps = {
}

export default CheckAndUncheck;