import React from 'react';
import ReactDOM from 'react-dom';
import HelloReact from '@/pages/HelloReact';
import HelloWebpack from '@/pages/HelloWebpack';
import bg from './assets/chris-pickett--QKpblZde5I-unsplash.jpg';

const App = () => (
  <div>
    <HelloReact />
    <HelloWebpack />
    <img src={bg} alt="bg" />
  </div>
);

ReactDOM.render(<App />, document.querySelector('#root'));
if (module.hot) { module.hot.accept(); }
