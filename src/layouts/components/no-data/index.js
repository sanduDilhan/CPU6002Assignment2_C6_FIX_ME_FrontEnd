import React from 'react';
import './style.scss';
const App = (props) => {
  return <div className={'no-data'}>
    <p>{props.message}</p>
  </div>
}
export default App;
