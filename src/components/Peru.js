import React from 'react'
import { observer } from 'mobx-react'

export default observer(({ peru }) => <div>
  <h2>Invoice Peru</h2>

  <div>
    <label>Date</label>
    <input type='text' style={{color: 'red'}} value={peru.dateStr} onChange={(ev) => (peru.updateDate(ev.target.value))} />
    <label>CZK</label>
    <input disabled type='text' value={peru.amountCZK} onChange={(ev) => (peru.amountCZK = ev.target.value)} />
    <label style={{color: 'red'}}>USD</label>
    <input type='text' value={peru.amountStrUSD} onChange={(ev) => (peru.updateAmountUSD(ev.target.value))} />
  </div>

</div>)
