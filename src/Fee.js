import React from 'react'
import { observer } from 'mobx-react'

export default observer(({ fee, gumroad }) => <div>
  <h2>Author fees to Jan Blaha</h2>

  <div>
    <label>Date</label>
    <input type='text' value={fee.date.toLocaleDateString('cz')} />
    <label>Amount</label>
    <input type='text' value={fee.amountCZK.get()} />
  </div>

</div>)
