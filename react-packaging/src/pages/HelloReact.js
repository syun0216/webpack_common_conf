import React from 'react';
import { sum } from '@/utils/index';
import '@/styles/index.css';

export default class HelloReact extends React.Component {
  render() {
    return (
      <div>
        <h3>Hello React</h3>     
        <p>{sum(1, 4)}</p>
      </div>
    );
  }
}
