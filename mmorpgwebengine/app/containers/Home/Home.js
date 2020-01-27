import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { AddButton } from '../../components/AddButton';
import { TodoList } from '../TodoList';


class Home extends Component {


  ws = null;

  state = {
    messages:[],
    token: '',
  }

  constructor(props) {
    super(props);
  }

  addTodo = () => {
    const { history } = this.props;
    history.push('/create-todo')
  }

  componentDidMount() {
  }

  _websocketConnect = () => {    
    this.ws =new WebSocket(`ws://localhost:3031?token=${this.state.token}`);
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('WS connected')
    }

    this.ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      console.log('WS message');
      //const message = JSON.parse(evt.data)      
      ///this.addMessage(message)
      this.setState({messages: [...this.state.messages, evt.data]});
    }

    this.ws.onclose = () => {
      console.log('WS disconnected')
      // automatically try to reconnect on connection loss
      // this.setState({
      //   ws: new WebSocket(URL),
      // })
    }
  }

  _sendMessage = () => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const message = { name: 'name', message: 'messagem' }
    this.ws.send(JSON.stringify(message))

  }

  _close = () => {
    this.ws.close();
  }

  _clear = () => {
    this.setState({messages: []});
  }

  _handleInput = (event) => {
    const { value } = event.target;

    this.setState({token: value});
  }


  render() {
    return (
      <div>
        <button onClick={() => this._websocketConnect()}>Connect</button>
        <button onClick={() => this._sendMessage()}>Send</button>
        <button onClick={() => this._close()}>Close</button>
        <button onClick={() => this._clear()}>Clear</button>

        <div>
          <span>Message:</span> 
          <div>{this.state.messages.map((m, index) => <p key={index}>{m}</p>)}</div>
        </div>
        <div>
          <span>Token:</span>
          <input type='text' onChange={this._handleInput} vakue={this.state.token}></input>
        </div>
        <TodoList />
        <AddButton addButtonHandler={this.addTodo} />        
      </div>
    )
  }
}

export default withRouter(Home);
