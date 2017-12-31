import React from 'react';
import ReactDOM from 'react-dom';

class Topic extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      choices: [],
      currentChoice: '',
      topic: ''
    }

    this.handleChoiceChange = this.handleChoiceChange.bind(this);
    this.handleChoiceSubmit = this.handleChoiceSubmit.bind(this);
    this.handleTopicChange = this.handleTopicChange.bind(this);
    this.handleTopicSubmit = this.handleTopicSubmit.bind(this);
  }

  handleChoiceChange(e) {
    this.setState({currentChoice: e.target.value});
  }

  handleChoiceSubmit() {
    this.state.choices.push(this.state.currentChoice);
    this.setState({currentChoice: ''});
    console.log('Topic:', this.state.topic);
    console.log('Choices:', this.state.choices);
  }

  handleTopicChange(e) {
    this.setState({topic: e.target.value});
  }

  handleTopicSubmit(e) {
    console.log('Submitting topic', this.state.topic);
    e.preventDefault();
  }

  render() {
    return (
      <div className="topic-container">
        <form onSubmit={this.handleTopicSubmit}>
          Topic: <input type="text" onChange={this.handleTopicChange} value={this.state.topic}/><br/>
          <input type="text" onChange={this.handleChoiceChange} value={this.state.currentChoice}/>
          <button type="button" onClick={this.handleChoiceSubmit}>Add choice</button><br/>
          <input type="submit" value="Submit"/>
        </form>
        <ul>
          {this.state.choices.map((choice, index) => (
              <li key={index.toString()}>{choice}</li>
            )
          )}
        </ul>
      </div>
    )
  }
}


export default Topic;