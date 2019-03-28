import React, { Component } from 'react';
import Input from './components/Input.js';
import Notes from './components/Notes.js';
import ViewNotes from './components/ViewNotes.js'



class App extends Component{
   render(){
      return(
         <div>
            <h1>POCKET MDN</h1>
            <Input />
            <div className = "noteswrapper">
               <Notes />
               <ViewNotes />
            </div>
         </div>
      );
   }
}
export default App;