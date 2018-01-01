import React from 'react';
import ReactDOM from 'react-dom';

class TopicVote extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>{JSON.stringify(window.location)}</p>
        Vote Page
      </div>
    )
  }
}


export default TopicVote;

// console.log('DOM element', document.getElementById('topic'));

// ReactDOM.render(<TopicVote />, document.getElementById('topic'));