const Ultrawave = require('ultrawave')
const React = require('react')

class App extends React.Component {
  onSubmit = (e) => {
    e.preventDefault()
    const input = this.refs.input.getDOMNode()
    this.props.data.push(input.value)
    input.value = ''
  }

  render() {
    return <main>
      <header>Ultrawave Chat</header>
      <ul>
        {this.props.data.get().map((message, i) =>
          <li key={i}>{message}</li>
        )}
      </ul>
      <form onSubmit={this.onSubmit}>
        <input type='text' ref='input'/>
        <button type='submit'>Send</button>
      </form>
    </main>
  }
}

(new Ultrawave('ws://localhost:8081')).joinOrCreate('chat', [], (data) => {
  React.render(<App data={data}/>, document.body)
})