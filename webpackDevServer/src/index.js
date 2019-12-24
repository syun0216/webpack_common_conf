import React from 'react'
import ReactDOM from 'react-dom'
import { sum } from './utils'
import './index.css'

class HelloReact extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      curLi: 0
    }
  }

  clickTodo(i) {
    this.setState({
      curLi: i
    })
  }

  render() {
    const arr = [1234,2345,3456,5678];
    const {curLi} = this.state;
    return (
      <ul>
        <li className="color-blue">{sum(5, 5)}</li>
        {
          arr.map((v, i) => (
            <li style={curLi === i ? {textDecorationLine: 'line-through', color: '#ff5050'} : null} onClick={() => this.clickTodo(i)} key={i}>{v}</li>
          ))
        }
      </ul>
    )
  }
}

ReactDOM.render(<HelloReact />, document.querySelector('#root'))

if(module.hot) {
  module.hot.accept()
}