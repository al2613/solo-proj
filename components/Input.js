import React, { Component } from 'react';

class Input extends Component{

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            title: "",
            description: "",
            url: "",
            link: "view documentation"
        }
    }

    handleSubmit(event) {
        let saved;
        console.log(event);
        fetch('/developer/' + this.refs.search.value, {
            crossDomain: true,
            "access-control-allow-origin" : "*",
            headers: {'Content-Type':'application/json'},
          }).then((res) => {
            console.log(this.refs.search.value);
            return res.json();
          }).then((data)=>{
            return JSON.parse(data);
          }).then((results)=>{
            console.log('result', results)
            let title = results["documents"][0]["title"];
            let description = results["documents"][0]["excerpt"];
            description = description.replace(/(<([^>]+)>)/ig, "");
            let url = results["documents"][0]["url"];
            this.setState({title: title, description: description, url: url})
          })
          event.preventDefault();

    }

   render(){
      return(
        <div>
            <form onSubmit = {this.handleSubmit}>
                <input type="text" className="searchBar" ref = "search" placeholder = "type a term to search..."></input>
                <input type="submit" className="dataSubmit"></input>
            </form>
            <div>
                <section id="result">{this.state.title}</section>
                <section id="description">{this.state.description}</section>
                <section id="moreInfo"><a href = {this.state.url}>{this.state.link}</a></section>
            </div>
        </div>
      );
   }
}
export default Input;