import React, { Component } from 'react';
import './App.css';
import Header from '../src/Component/header';
import ArtistCard from '../src/Component/artistCard';
class App extends Component {

  //Creating a State for Component
  state = [{
    data:{ name: "",number:""},
    message:null,
    name: null,
    popularity:null,
    followers:null,
    genres:[]
  }]
 

// handle function for handleing form data
 handle = async (e) => {
    e.preventDefault();
    
    const data = {
      name: e.target.name.value,
      number: e.target.number.value
    }

    this.setState({
      data
    });

    // Post fetch Api request to the server
    await fetch('/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
        }
    })
    .then((res) => {
       res.json().then(data => {
         this.setState({
           name:data.artist_uname,
           popularity: data.popularity,
           followers:data.followers,
           geners: data.geners
          });
        // console.log("ayeh wala"+ this.state.name+this.state.popularity+this.state.geners+this.state.followers);
       })
       //console.log("rrr"+res);
      if(res.status===200){
      console.log("Sucess");
      
      this.setState({message:"Text Sent"});
      
      window.setTimeout(()=>{
        this.setState({message:null});
      },6000);
      
    }})
    .then(err=>{
      console.log(err);
    })

};

   

  render() {
    
    return (
      <div className="container-fluid">
      <Header/>
      <div className="application">
        <form  onSubmit={this.handle}>
        <div className="form-group">
          <label htmlFor="number">Artist Name</label>
          <input type="text" className="form-control" id="name" name="name" required placeholder="Enter Artist Name!" />
        </div>
        <div className="form-group">
          <label htmlFor="name">Phone Number</label>
          <input type="tel" className="form-control" id="number" required placeholder="Enter Phone Number!" name="number" />
        </div>
       <button type="submit" className="btn btn-primary">Submit</button>
       {this.state.message!=null ? <div className="alertmsg" role="alert">Text Sent</div>: <div></div>} 
      </form> 
      </div>
        <ArtistCard 
         name={this.state.name}
         popular = {this.state.popularity}
         follower = {this.state.followers}
         genre = {this.state.genres}
        />
      </div>
    );
  }
}

export default App;
