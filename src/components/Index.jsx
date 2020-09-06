import React, { useContext } from 'react'

class Index extends React.Component {
  render() {
    const { discs } = this.props

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <ul>
          {discs.map(disc => (
            <li key={disc.id}>{disc.name}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Index
