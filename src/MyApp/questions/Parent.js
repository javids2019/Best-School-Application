import React, { useState } from "react";
import Child from './Child'
  
function Parent() {    
 
  
    const [state, setState] = useState({});

    function handleCallback(childData) {
        setState({msg: childData})
    }
  
    
        const {msg} = state;
        return(
           <div>
             <h1> {msg}</h1>
             <Child parentCallback = {handleCallback}/>    
           </div>
        );
    
}
  
export default Parent;