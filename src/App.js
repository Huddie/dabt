import React, { Component } from 'react';
import './App.css';
import ABButton from './ABButton';
import bkgimage from './bkgd.jpg';
import logo from './logo.png';

import Blur from 'react-css-blur'


const sectionStyle = {
  position: 'absolute', 
  top: 0, 
  bottom: 0, 
  left: 0, 
  right: 0,
  backgroundImage: `url(${bkgimage})`,
};

const logoStyles = {
  width: '20%',
  height: '20%',
  backgroundImage: `url(${logo})`,
};

const centerStyles = {
  paddingTop: 50,
  display: 'flex', 
  justifyContent: 'center', 
  width: "100%",
}

const centerNavStyles = {
  paddingTop: 50,
  display: 'flex', 
  justifyContent: 'align-right', 
  width: "100%",
}

const navbarStyle = {
  list: 'none',
  margin: 0,
  padding: 0,
}

const listStyle = {
  display: 'inline',
}

const aStyle = {
  fontSize: 20,
  padding: '8px',
  color: 'white'
}

const textCar = {
  width: '100%',
  height: 'auto',
  padding: '50px',
}

const carContent = {
  color:'black',
  display:'flex',
  alignItems:'center',
}
class App extends Component {
  render() {
    return(
      <body>
        <div style={sectionStyle}>
          <div style={{display: 'flex', paddingLeft: 20, paddingTop: 10}}>
            <img width="auto" height="100"  src={logo}/>
            <h1 style={{paddingLeft: 20, color: "white"}}>Krusty Kab</h1>
            <div style={centerNavStyles}>
                <ul style={navbarStyle}>
                <li style={listStyle}><a style={aStyle}>Home</a></li>
                <li style={listStyle}><a style={aStyle}>Call a cab</a></li>
                <li style={listStyle}><a style={aStyle}>Swag Shop</a></li>
                <li style={listStyle}><a style={aStyle}>Contact Us: 000-000-0000</a></li>
                <li style={listStyle}><a style={aStyle}>Address: 1000 Krusty Lane</a></li>
                <li style={listStyle}><a style={aStyle}>About</a></li>
              </ul>
            </div>
          </div>
          <h1 align="center" style={{color: "white"}}>We are known as the best cab company ever</h1>
          <h4 align="center" style={{color: "white"}}>If you are interested in a ride, click below!</h4>
          <div style={centerStyles}>
            <ABButton  id="foo">Call A Cab</ABButton>
          </div>
        </div>
      </body>
    );
  }
}

export default App;
