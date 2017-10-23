import React from 'react'
import { observer } from 'mobx-react'

export default observer(({ invoices, add }) => <div>
  <h2>Invoices from CZ, with VAT 21</h2>
  {<div>
    <label>Date</label>
    <input disabled type='text' value={invoices[0].dateStr} />
    <label>DIC</label>
    <input disabled type='text' value={invoices[0].dic} />
    <label>CZK</label>
    <input disabled type='text' value={invoices[0].amountStrCZK} />
  </div>}
  {invoices.slice(1).map((i) =>
    <div>
      <label>Date</label>
      <input type='text' style={{color: 'red'}} value={i.dateStr} onChange={(ev) => i.updateDate(ev.target.value)} />
      <label>DIC</label>
      <input type='text' style={{color: 'red'}} value={i.dic} onChange={(ev) => i.updateDIC(ev.target.value)} />
      <label>CZK</label>
      <input type='text' style={{color: 'red'}} onChange={(ev) => i.updateAmountCZK(ev.target.value)} />
    </div>
  )}
  <button onClick={add}>Add invoice</button>

</div>)
