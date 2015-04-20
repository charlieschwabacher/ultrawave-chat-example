Ultrawave = require('ultrawave')
React = require('react')


// create a react component to render the ui

class App extends React.Component {

  onSubmit = (e) => {
    e.preventDefault()
    const input = this.refs.input.getDOMNode()
    const text = input.value
    input.value = ''

    // push the new message onto the array in ultrawave
    this.props.data.push({sender: this.props.id, text: text})
  }

  render() {
    // get the messages array object out from our cursor
    const messages = this.props.data.get()

    // make sure messages stay scrolled to the bottom
    setTimeout(() => {this.refs.messages.getDOMNode().scrollTop = Infinity})

    return <main>
      <header>Ultrawave Chat</header>
      <ul ref='messages'>
        {
          messages.map(({sender, text}, i) =>
            <li className={(sender === this.props.id) ? 'self' : ''} key={i}>
              {text}
            </li>
          )
        }
      </ul>
      <form onSubmit={this.onSubmit}>
        <input type='text' ref='input'/>
        <button type='submit'>Send</button>
      </form>
    </main>
  }

}


// connect to our peering server on port 8081

const ultrawave = new Ultrawave(`ws://${location.hostname}:8081`)


// create a group named "chat" w/ an empty array as initial data, and re-render
// our react component when data changes

ultrawave.joinOrCreate('chat', [], (data) => {
  React.render(<App data={data} id={ultrawave.id}/>, document.body)
})

