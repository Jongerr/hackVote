import React from 'react';
import ReactDOM from 'react-dom';

class TopicVote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topic: '',
      choices: []
    }
  }

  componentDidMount() {
    const topicHash = window.location.pathname.slice(1);
    fetch('/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({topicHash})
    })
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
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