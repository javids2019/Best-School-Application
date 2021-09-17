import React from "react";
  
function Child(props) {
function onTrigger()  {
      props.parentCallback("Welcome to GFG");
    };
  
 
      return (
        <div>
          <br></br> <br></br>
          <button onClick={onTrigger}>Click me</button>
        </div>
      );

      }
  
export default Child;