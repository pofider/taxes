import React from 'react'
import { observer } from 'mobx-react'
import { formatCZDate } from '../utils'

export default observer(({ fee }) => <div>
  <h2>Author fees to Jan Blaha</h2>

  <div>
    <label>Date</label>
    <input disabled type='text' value={formatCZDate(fee.date)} />
    <label>CZK</label>
    <input disabled type='text' value={fee.amountCZK} />
  </div>

</div>)
