import React, { Component } from 'react';

class OneNote extends Component{

    constructor(props) {
        super(props);
    }


   render(){
      return(
        <div className = "rendered-note">   
            <li>Topic: {this.props.topic}</li>
            <li>Notes: {this.props.notes}</li>
            <button onClick = {()=>{this.props.delete(this.props.topic)}}>Delete</button>      
        </div>
      );
   }
}
export default OneNote;