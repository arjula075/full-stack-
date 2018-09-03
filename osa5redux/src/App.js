import React from 'react'
import ReactDOM from 'react-dom'

const Statistiikka = (props) => {
  console.log('this.props', props)

  const klik = () => {
    props.store.dispatch({ type: 'ZERO'})
  }

  const obj = props.store.getState()
  const palautteita = obj.good + obj.bad + obj.ok

  if (palautteita === 0) {
    return (
      <div>
        <h2>stataistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  const avg = (obj.good - obj.bad) / palautteita
  const favPerc = Math.round((obj.good / palautteita) * 100)
  const neuPerc = obj.ok / palautteita
  const badPerc = obj.bad / palautteita

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{obj.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{obj.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{obj.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{avg}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{favPerc}%</td>
          </tr>
        </tbody>
      </table>

      <button onClick={klik}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    console.log('App props', props);
    this.state = {
      store: props.store
    }
  }

  klik = (nappi) => () => {
    console.log('nappi', nappi);
    this.props.store.dispatch({ type: nappi})
  }

  render() {
    console.log('this.state', this.state);
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka store={this.state.store} />
      </div>
    )
  }

}

export default App;
