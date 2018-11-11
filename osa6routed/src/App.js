import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { Table, Media, Grid, Row, Col, Image, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'

const tooltip = (
  <Tooltip id="tooltip">
    <strong>Hey You!</strong> Press create to create.
  </Tooltip>
);

const Anecdote = ({dote}) => {
  return(
  <div>
    <h2>{dote.content}</h2>
    <div>{dote.author}</div>
    <div>{dote.info}</div>
    <div>{dote.votes}</div>
  </div>
)}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table  striped>
      <tbody>
        {anecdotes.map(anecdote =>
          <tr key={anecdote.id}>
            <td><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></td>
            <td>{anecdote.author}</td>
          </tr>
        )}
      </tbody>
    </Table >

  </div>
)

const About = () => (
  <div>
    <Grid>
      <Row className="show-grid">
        <Col xs={10} md={8}>
          <p>According to Wikipedia:</p>

          <em>An anecdote is a brief, revealing account of an individual person or an incident.
            Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
            such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
            An anecdote is "a story with a point."</em>

            <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </Col>
        <Col>
        <Media>
          <Media.Body>
            <Media.Heading>Ada Lovelace</Media.Heading>
            </Media.Body>
            <Media.Left>
            <Image  width={256} height={256} src="https://www.biography.com/.image/t_share/MTE4MDAzNDEwODQwOTQ2MTkw/ada-lovelace-20825279-1-402.jpg" alt="thumbnail" circle />
            </Media.Left>
          </Media>
        </Col>
      </Row>
    </Grid>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log('history', this.props);
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/anecdotes')

  }

  render() {
    return(
      <div>
          <h2>create a new anecdote</h2>
          <form onSubmit={this.handleSubmit}>
            <div>
              content
              <input name='content' value={this.state.content} onChange={this.handleChange} />
            </div>
            <div>
              author
              <input name='author' value={this.state.author} onChange={this.handleChange} />
            </div>
            <div>
              url for more info
              <input name='info' value={this.state.info} onChange={this.handleChange} />
            </div>
              <OverlayTrigger placement="bottom" overlay={tooltip}>
                <Button bsStyle="primary" bsSize="large">create</Button>
              </OverlayTrigger>
          </form>
      </div>
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  clearmessages = () => {
    this.setState({
      message: ''
    })
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({
                  anecdotes: this.state.anecdotes.concat(anecdote),
                  message: 'lisätty uusi anekdootti ' + anecdote.content
                  })
    setTimeout(() => {
          					this.clearmessages()
          				}, 2000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    const messageStyle = {
      color: 'lightgray',
      fontStyle: 'italic',
      fontSize: 11
    }
    const actStyle = {
      fontWeight: "bold",
      color: "blue"
    }
    const navStyle = {
      backgroundColor: 'lightgray',
      color: 'gray',
      fontStyle: 'italic'
    }

    const anecdoteById = (id) =>
      this.state.anecdotes.find(a => a.id === id)

    return (
      <div className="container">
        <Router>
          <div>
            <div style={navStyle}>
              <NavLink  to="/" activeStyle={actStyle}>home</NavLink > &nbsp;
              <NavLink  to="/create" activeStyle={actStyle}>create new</NavLink > &nbsp;
              <NavLink  to="/about" activeStyle={actStyle}>about</NavLink >  &nbsp;
              <NavLink  to="/anecdotes" activeStyle={actStyle}>anecdotes</NavLink >
            </div>
            <div>
              <div style={messageStyle}>{this.state.message}</div>
              <Route exact path="/" render={() => <About />} />
              <Route exact path="/anecdotes" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
              <Route exact path="/anecdotes/:id" render={({match}) =>
                  <Anecdote dote={anecdoteById(match.params.id)} />}
              />
              <Route path="/about" render={() => <About />} />
              <Route path="/create" render={({history}) => <CreateNew history={history} addNew={this.addNew}/>} />
            </div>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
