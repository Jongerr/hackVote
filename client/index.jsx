import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/index.jsx';
import TopicVote from './components/topicVote.jsx';

if (document.getElementById('root')) {
  ReactDOM.render(<App />, document.getElementById('root'));
} else {
  ReactDOM.render(<TopicVote />, document.getElementById('topic'));
}
