import React from 'react'
import { observer } from 'mobx-react'

export default observer(({ invoices, add }) => <div>
  <h2>Invoices from CZ, with VAT 21</h2>
  <div>
    <small>Invoice for authors fee (previous one)</small>
  </div>
  {<div>
    <label style={{color: 'red'}}>Id</label>
    <input type='text' style={{color: 'red'}} value={invoices[0].id} onChange={(ev) => (invoices[0].id = ev.target.value)} />
    <label style={{color: 'red'}}>Date</label>
    <input type='text' style={{color: 'red'}} onChange={(ev) => invoices[0].updateDate(ev.target.value)} />
    <label style={{color: 'red'}}>DIC</label>
    <input disabled type='text' value={invoices[0].dic} />
    <label style={{color: 'red'}}>CZK</label>
    <input type='text' style={{color: 'red'}} onChange={(ev) => invoices[0].updateAmountCZK(ev.target.value)} />
  </div>}
  <div>
    <small>The rest of czech invoices</small>
  </div>
  {invoices.slice(1).map((i) =>
    <div>
      <label style={{color: 'red'}}>Id</label>
      <input type='text' value={i.id} onChange={(ev) => (i.id = ev.target.value)} />
      <label style={{color: 'red'}}>Date</label>
      <input type='text' style={{color: 'red'}} onChange={(ev) => i.updateDate(ev.target.value)} />
      <label style={{color: 'red'}}>DIC</label>
      <input type='text' style={{color: 'red'}} value={i.dic} onChange={(ev) => i.updateDIC(ev.target.value)} />
      <label style={{color: 'red'}}>CZK</label>
      <input type='text' style={{color: 'red'}} onChange={(ev) => i.updateAmountCZK(ev.target.value)} />
    </div>
  )}
  <button onClick={add}>Add invoice</button>

</div>)
