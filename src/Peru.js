import React from 'react'
import { observer } from 'mobx-react'

export default observer(({ peru }) => <div>
  <h2>Invoice Peru</h2>

  <div>
    <label>Date</label>
    <input type='text' style={{color: 'red'}} value={peru.dateStr} onChange={(ev) => (peru.dateStr = ev.target.value)} />
    <label>Amount</label>
    <input type='text' style={{color: 'red'}} value={peru.amount} onChange={(ev) => (peru.amount = ev.target.value)} />
  </div>

</div>)
