import React, { Component } from 'react';
import ABCore from './ABCore';
import firebase from "firebase";

class ABButton extends Component {

  constructor(props) {
    super(props)
    this.generateStyle = this.generateStyle.bind(this);
    var core =  new ABCore()
    this.state = {
      core: core,
      id: this.props.id,
      color: core.generateColor()
    };
    this.handleClick = this.handleClick.bind(this);
    var config = {
      apiKey: "AIzaSyD22AIhw7wfs6gCNMZdC2gXnYmWpI1_veY",
      authDomain: "jhacks-7c79b.firebaseapp.com",
      databaseURL: "https://jhacks-7c79b.firebaseio.com",
      projectId: "jhacks-7c79b",
      storageBucket: "jhacks-7c79b.appspot.com",
      messagingSenderId: "487556590025"
    };
    firebase.initializeApp(config);
  }

  componentDidMount() {
    this.setState({style: this.generateStyle()})
  }

  handleClick() {
    var data = eval(this.state.style)
    for (var key in data) {
      if (data.hasOwnProperty(key)) { 
        this.state.core.logInteraction(
          `records/classes/${this.state.id}/preferences/${key}/${data[key]}`
        )   
      }
    }
  }

  /// Generate a random styling for the 
  /// the button for a given generation
  generateStyle() {
    return {backgroundColor: this.state.color}
  }

  render() {
    /// Log the view
    this.state.core.logView(
      `records/classes/${this.state.id}/preferences/backgroundColor/${this.state.color}`
    )
    return (
      <button style = {this.state.style} onClick={this.handleClick}>Foo Bar</button>
    );
  }
}

export default ABButton;
