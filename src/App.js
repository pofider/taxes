import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import GumroadInvoices from './GumroadInvoices.js'
import Fee from './Fee.js'
import { observer, inject } from 'mobx-react'

@inject('store') @observer
class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Taxes generator</h1>
        </header>
        <GumroadInvoices gumroad={this.props.store.gumroad} gumroadSumCZK={this.props.store.gumroadSumCZK} />
        <Fee fee={this.props.store.fee} gumroad={this.props.store.gumroad} />
      </div>
    )
  }
}

export default App
