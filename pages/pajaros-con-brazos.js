import React from 'react';
import Head from 'next/head';
import {Entity, Scene} from 'aframe-react';
import io from 'socket.io-client'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appRendered: false,
      color: 'red'
    };
    this.position = 0.5;
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      require('aframe');
      require('aframe-animation-component');
      require('aframe-particle-system-component');
      this.setState({ appRendered: true });
      this.socket = io();
      this.socket.on('message', this.handleMessage);
      require('aframe-physics-system');

      document.body.onkeyup = (e)=>{
        if(e.keyCode == 32){
          this.handleMessage();
        }
      };
    }
  }

  handleMessage() {
    this.setState({
      boxPosition: '-1 '+this.position+' -3'
    });
    this.position+=0.5;
  }

  render() {
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>A-Frame React Boilerplate</title>
        </Head>

        {this.state.appRendered &&
          <Scene physics="debug: true">
            <a-box dynamic-body position={this.state.boxPosition} rotation="0 45 0" color="#4CC3D9" shadow></a-box>
            <a-sphere dynamic-body position="0 4.25 -5" radius="1.25" color="#EF2D5E" shadow></a-sphere>
            <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D" shadow></a-cylinder>
            <a-plane static-body position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4" shadow></a-plane>
            <a-image src="/static/bird.jpg" width="200" height="100"></a-image>
          </Scene>
        }
      </div>
    )
  }
}
