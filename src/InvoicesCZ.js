import React from 'react'
import { observer } from 'mobx-react'

export default observer(({ invoices, add }) => <div>
  <h2>Invoices from CZ, with VAT 21</h2>
  <button onClick={add}>Add invoice</button>
  {invoices.map((i) =>
    <div>
      <label>Amount</label>
      <input type='text' style={{color: 'red'}} value={i.amount} onChange={(ev) => (i.amount = ev.target.value)} />
    </div>
  )}

</div>)
