import React, { Component } from 'react';
import './App.css';
import axios from "axios"
import Part2 from './Part2.js'

class App extends Component {
  constructor(){
    super();
    this.state = {
      deckId : '',
      value:0,
      status: false
    }
  }

  getID = () =>{
    axios
      .get("https://deckofcardsapi.com/api/deck/new/shuffle/")
      .then(response =>{
        this.setState({
          deckId:response.data.deck_id,
          status:true
        })
      })
      .catch(err=>{
        console.log(err)
      })
  }

changeState =()=>{
  this.setState({
    status : true
  })
}

  handleChange = (event)=>{
    this.setState({
      [event.target.name]:event.target.value
    })
  }


  render() {
    const {deckId, status } = this.state;
    console.log(this.state)

    if(!status){
    return (
      <>
      <div>Welcome to Blackjack
      <br/>
        <button onClick={this.getID}>New game</button>
      <br/>


        <button onClick={this.changeState}>Join</button>
          <input
            onChange = {this.handleChange}
            type = 'text'
            placeholder = 'insert deckId '
            className = 'inputBox'
            value = {deckId}
            name = 'deckId'
            >
          </input>
      </div>
      <br/>
      <h1>{this.deckId}</h1>

      </>);
    }else{
      return(
          <>
        <Part2 deckId={this.state}/>
        </>
    )
    }
  }
}

export default App;
