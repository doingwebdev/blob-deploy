console.log('➡ javascript loaded');

document.querySelector('button').addEventListener('click', async () => {
   const date = document.getElementById('btcdate').value;
   console.log(`date entered: ${date}`)
   const resultContainer = document.getElementById('BitcoinPriceCheckResults');
   let json = await handleBitcoinPriceCheck(btcdate, resultContainer);
   // handle the resolved promise here
   console.log(`🔥 handleBitcoinPriceCheck resolved with ${json}`);
   console.log('🔥 handleBitcoinPriceCheck resolved');
});

async function handleBitcoinPriceCheck(date, resultElement) {
   console.log(`Button clicked for btcdate = "${date}"`);
   try {
      const api = 'https://api.coindesk.com/v1/bpi/currentprice/USD.json';
      const web = 'https://www.coindesk.com/indices/xbx';
      const response = await fetch(api);
      const json = await response.json();
      const message = `Bitcoin Price as of ${json.time.updated}:\n\n${json.bpi.USD.rate} ${json.bpi.USD.code}\n\n${json.disclaimer}.\n\nSee also ${web}.`;
      // const message = `Bitcoin Price:  as of ${json.time.updated}\r\r\t\n\n${json.disclaimer}`;
      resultElement.innerText = message;
      resultElement.textContent = message;
      console.log(json);
      console.log(message);
      return message;
   } catch (error) {
      console.error('Error fetching current Bitcoin price:', error);
      return error;
   }
}

