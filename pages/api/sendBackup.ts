
import wc from '../../lib/wc'
const schedule = require('node-schedule')
const WooCommerce = wc();

schedule.scheduleJob('*/100 * * * * *', async function () {
 try{
    const response = WooCommerce.get('products', {
      per_page: 100,
    })
    const data = await response.json() 
    console.log()
    

  } catch (error) {
    console.log(error)
   
  }
})

