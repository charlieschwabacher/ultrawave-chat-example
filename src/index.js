const React = require('react')
const Ultrawave = require('ultrawave')


const ultrawave = new Ultrawave('ws://localhost:8081')
const initialData = {
  topic: 'Welcome!',
  messages: []
}


class App extends React.Component {

  constructor() {
    super()
    this.state = {
      name: ''
    }

    console.log('created App')
  }

  propTypes = {
    root: React.PropTypes.instanceOf(Ultrawave.Cursor).isRequired()
  }

  postMessage = (e) => {
    e.preventDefault()
    const input = this.refs.message.getDOMNode()
    const message = input.value
    input.value = ''

    if (message != null) {
      this.props.root.push('messages', {
        author: this.state.name,
        text: message
      })
    }
  }

  render() {
    console.log('rendering')
    console.log(this.props)
    console.log(this.props.root.get())
    const data = this.props.root.get()

    return (
      <div>
        <h1 className='p2 m0 bg-teal white'>
          Ultrawave Chat
        </h1>
        <div className='col col-3'>
          Topic: {data.topic}
        </div>
        <div className='col col-9'>
          {
            data.messages.map((message) => {
              return (
                <p>
                  <span class='bold'>{message.author}</span>:
                  {message.text}
                </p>
              )
            })
          }
          <form
            onSubmit={this.postMessage}
            className='flex flex-row'
          >
            <input
              type='text'
              className='field-light'
              ref='message'
            />
            <button
              type='submit'
              className='h3 button'
            >
              Send
            </button>
          </form>
        </div>
      </div>
    )
  }

}

ultrawave
  .create('chat', initialData, (root) => {
    React.render(<App root={root}/>, document.body)
  })
  .then(() => {console.log('then')})
  .catch((e) => {console.log(e.stack)})
