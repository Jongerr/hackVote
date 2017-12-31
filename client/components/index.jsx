import React from 'react';
import ReactDOM from 'react-dom';
import Topic from './topic.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <span>Hello World!</span>
        <Topic />
      </div>
    )
  }
}

export default App;