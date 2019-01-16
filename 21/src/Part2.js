import React, { Component } from 'react';
import axios from 'axios'

class Part2 extends Component{
  constructor(props){
    super(props);
    this.state={
      value:0,
      hand:[],
      remainder:''
    }
  }


  defaultDraw = () =>{
    axios
    .get(`https://deckofcardsapi.com/api/deck/${this.props.deckId.deckId}/draw/?count=2`)
    .then(response =>{
      console.log(response);
      this.setState({
        // value:this.state.value.concat(response.data.cards[0].value).concat(response.data.cards[1].value),
        hand:this.state.hand.concat(response.data.cards[0].image).concat(response.data.cards[1].image),
        remainder: response.data.remaining
      })
    })
    .catch(err=>{
      console.log(err)
    })
  }

  getOneCard = () =>{
    axios
    .get(`https://deckofcardsapi.com/api/deck/${this.props.deckId.deckId}/draw/?count=1`)
    .then(response =>{
      let score = response.data.cards[0].value
      if(score === "KING"||score === "QUEEN"||score === "JACK"){
        score = 10
      }else if(score ==="ACE"){
        score = 1
      }
      this.setState({
        value:this.state.value +  parseInt(score),
        hand:this.state.hand.concat(response.data.cards[0].image),
        remainder: response.data.remaining
      })
    })
    .catch(err=>{
      console.log(err)
    })
  }


  makeOneCard = ()=>{
    return this.state.hand.map((thing)=>{ return <img src = {thing} />})
  }
  // showValue = ()=>{
  //   return this.state.value.map((thing)=>{return <h1>{parseInt(thing)}<h1/>})
  // }

  componentDidMount(){
    this.defaultDraw()
  }

  render(){
    let {hand, value,remainder} = this.state

    console.log(this.state)

    return(
      <>
      <div>
        <button className='Draw' onClick={this.getOneCard}>Draw a Card</button>
        <br/>
        {this.makeOneCard()}

      </div>

      <h1>Remaining Cards: {remainder}</h1>
      </>
  )}
}
export default Part2;
