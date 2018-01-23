import React from 'react';

class TopicVote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topic: '',
      choices: [],
    };

    this.handleUpvote = this.handleUpvote.bind(this);
  }

  componentDidMount() {
    const topicHash = window.location.pathname.slice(1);
    fetch('/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({topicHash}),
    })
    .then((response) => response.json())
    .then((response) => {
      console.log('Vote data:', response);
      const choices = response.choices.map((choice, index) => ({
        choice: choice,
        points: response.votes[index],
      }));
      this.setState({
        topic: response.title,
        choices: choices,
      });
    })
    .catch((err) => console.log(err));
  }

  getUpdatedScore(e) {
    console.log('Upvoted choice at index:', e.target.classList[0]);
    let newChoices = this.state.choices.slice();
    if (e.target.classList[0] === 'inactive') {
      newChoices[e.target.value].points += 1;
      e.target.classList = [];
    } else {
      newChoices[e.target.value].points -= 1;
      e.target.classList = ['inactive'];
    }
    return newChoices;
  }

  handleUpvote(e) {
    let newChoices = this.getUpdatedScore(e);
    this.setState({choices: newChoices}, () => {
      const topicHash = window.location.pathname.slice(1);
      const scores = this.state.choices.map((choice) => choice.points);
      let putBody = {
        topicHash,
        scores,
      };
      fetch('/vote', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(putBody),
      })
      .then((response) => console.log('Successfully put Scores:', response))
      .catch((err) => console.log(err));
    });
  }

  render() {
    return (
      <div>
        Vote Page
        <h3>{this.state.topic}</h3>
        <ul>
          {this.state.choices.map((choice, index) => (
            <li key={index.toString()}>
              <span>{choice.choice}</span>
              <span>  {choice.points} pts  </span>
              <button
                value={index.toString()}
                type="button"
                onClick={this.handleUpvote}
                className="inactive"
              >
               vote
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}


export default TopicVote;
