import React from 'react';
import { sum } from '@/utils/index';
import '@/styles/index.css';

export default class HelloReact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curLi: 0,
    };
  }

  clickTodo(i) {
    this.setState({
      curLi: i,
    });
  }

  render() {
    const arr = [1234, 2345, 3456, 5678];
    const { curLi } = this.state;
    return (
      <ul>
        <li className="color-blue">{sum(5, 5)}</li>
        {
          arr.map((v, i) => (
            <li>
              <button type="button" style={curLi === i ? { textDecorationLine: 'line-through', color: '#ff5050' } : null} onClick={() => this.clickTodo(i)}>
                {{ v }}
              </button>
            </li>
          ))
        }
      </ul>
    );
  }
}
