import React from 'react';
import { sum } from '@/utils/index';

export default class HelloReact extends React.Component {
  render() {
    return (
      <div>
        <h3>Hello Webpack</h3>  
        <p>{sum(1, 2)}</p>
      </div>
    );
  }
}
