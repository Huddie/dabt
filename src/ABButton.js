import React, { Component } from 'react';
import ABCore from './ABCore';
import firebase from "firebase";

class ABButton extends Component {

  constructor(props) {
    super(props)
    var config = {
      apiKey: "AIzaSyD22AIhw7wfs6gCNMZdC2gXnYmWpI1_veY",
      authDomain: "jhacks-7c79b.firebaseapp.com",
      databaseURL: "https://jhacks-7c79b.firebaseio.com",
      projectId: "jhacks-7c79b",
      storageBucket: "jhacks-7c79b.appspot.com",
      messagingSenderId: "487556590025"
    };
    firebase.initializeApp(config);
    this.generateStyle = this.generateStyle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.logview = this.logview.bind(this);
    this.loginteraction = this.loginteraction.bind(this);

    var core =  new ABCore()
    var styleGuide = core.getStyleID(this.props.id)
    console.log(styleGuide)
    this.state = {
      core: core,
      id: this.props.id,
      backgroundColor: styleGuide.color,
      textColor: 'white',
      cornerRadius: styleGuide.radius,
      fontSize: styleGuide.size

    };

  }

  componentDidMount() {
    this.setState({style: this.generateStyle()})
  }

  handleClick() {
    this.loginteraction()
  }

  logview() {
    var data = eval(this.state.style)
    for (var key in data) {
      if (data.hasOwnProperty(key)) { 
        this.state.core.logView(
          this.state.id,
          key,
          data[key]
        )   
      }
    }
  }

  loginteraction() {
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
    return {
      backgroundColor: this.state.backgroundColor,
      color: this.state.textColor,
      borderRadius: this.state.cornerRadius,
      fontSize: this.state.fontSize
    }
  }

  render() {
    /// Log the view
    this.logview()
    return (
      <button style = {this.state.style} onClick={this.handleClick}>Foo Bar</button>
    );
  }
}

export default ABButton;
