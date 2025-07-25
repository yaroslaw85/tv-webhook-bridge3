
const express = require('express');
const app     = express();
const port    = process.env.PORT || 3000;

app.use(express.json());

// przechowujemy ostatni sygnał i jego czas
let lastSignal    = null;
let lastTimestamp = null;

// odbiór webhooka z TradingView
app.post('/webhook', (req, res) => {
const message = req.body.message;
if (typeof message === 'string') {
 lastSignal    = message;
 lastTimestamp = new Date().toISOString();
 console.log(`Otrzymano sygnał: ${message} @ ${lastTimestamp}`);
 return res.status(200).send('Signal received');
} else {
 return res.status(400).send('Invalid payload');
}
});

// zwracamy sygnał wraz ze znacznikiem czasu
app.get('/signal', (req, res) => {
if (lastSignal) {
 return res.status(200).json({
   signal:    lastSignal,
   timestamp: lastTimestamp
 });
} else {
 return res.status(204).send();
}
});

app.listen(port, () => {
console.log(`Server listening on port ${port}`);
});

