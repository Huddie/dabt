import React, { Component } from 'react';
import ABCore from './ABCore';
import firebase from "firebase";

class ABButton extends Component {

  constructor(props) {
    super(props)
    this.state = {
      core: new ABCore(),
      id: "foo",
      color: "red"
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

  handleClick() {
    this.state.core.log(`records/classes/${this.state.id}/preference/color/${this.state.color}`, {interactions: 1, views: 1})
  }

  render() {
    return (
      <button onClick={this.handleClick}>Foo Bar</button>
    );
  }
}

export default ABButton;
