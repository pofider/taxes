import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import invoiceStore from './InvoiceStore.js'
import { Provider } from 'mobx-react'

ReactDOM.render(<Provider store={invoiceStore} ><App /></Provider>, document.getElementById('root'))
registerServiceWorker()
invoiceStore.initialize()
