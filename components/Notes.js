import React, { Component } from 'react';

class Notes extends Component{

    constructor(props) {
        super(props);
    }


   render(){
      return(
        <div>
            <h1>NOTE CREATOR</h1>
            <form action = "/notes" method = "post">
                <input type="text" className = "searchBar" name ="topic" placeholder = "topic..."></input>
                <input type="text" className = "searchBar" name = "notes" placeholder = "notes..."></input>
                <input type="submit" className = "dataSubmit"></input>
            </form>
        </div>
      );
   }
}
export default Notes;