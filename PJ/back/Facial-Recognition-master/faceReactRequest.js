import React, { Component } from 'react';

class App extends Component {
  state = {
    result: null,
  };

  handleButtonClick = async () => {
    const data = { /* 보낼 데이터 */ };
    const response = await fetch('/api/do_something', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      this.setState({ result });
    }
  };

  render() {
    const { result } = this.state;
    return (
      <div>
        <button onClick={this.handleButtonClick}>Run Python Code</button>
        {result && <div>Result: {result.result}</div>}
      </div>
    );
  }
}

export default App;
