import React, { Component } from 'react';
import OneNote from './OneNote.js';


class ViewNotes extends Component{

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            notes: []
        }
    }

    componentDidMount() {
        fetch('/notes').then((res)=>{
            if (res.status === 500) res.send('Could not fetch data');
            return res.json();
        }).then((data)=>{
            let obj = {notes: data}
            console.log('data', data)
            this.setState(obj)
        }).catch(error => console.error(error));
    }

    handleDelete(topic) {
        console.log(topic);
        fetch('/' + topic, {
           method: 'DELETE'
          }).then((res) => {
            console.log('res', res);
            return res.json();
          }).then((data)=>{
            console.log('data', data);
            // let notes = this.state.notes.slice();
            // data.forEach((note)=>{
            //   notes.push(note);
            // })
            let obj = {notes: data};
            //console.log('notes', notes)
            this.setState(obj);
          });
    }

   render(){
      return(
        <div>
            <h1>YOUR NOTES</h1>
            {this.state.notes.map(note =>
                <OneNote topic = {note.topic} notes = {note.notes} delete = {this.handleDelete}/>
            )}
        </div>
      );
   }
}
export default ViewNotes;