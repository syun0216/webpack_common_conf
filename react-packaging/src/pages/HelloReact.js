import React from 'react';
import { sum } from '@/utils/index';
import '@/styles/index.css';
import bg from '../assets/chris-pickett--QKpblZde5I-unsplash.jpg';

export default class HelloReact extends React.Component {
  render() {
    return (
      <div>
        <p>{sum(1, 4)}</p>
        <img src={bg} alt="bg" />
      </div>
    );
  }
}
