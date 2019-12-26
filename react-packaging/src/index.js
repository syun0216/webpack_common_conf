import React from 'react';
import ReactDOM from 'react-dom';
import HelloReact from '@/pages/HelloReact';

ReactDOM.render(<HelloReact />, document.querySelector('#root'));
if (module.hot) { module.hot.accept(); }
