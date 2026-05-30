import express from 'express';

const app = express();
app.use(express.json());

const VERIFY_TOKEN = 'peluqueria2026';
const MAKE_WEBHOOK = 'https://hook.eu2.make.com/1t8cy97egcbjvpa5p5613mnohpoicq7h';

app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post('/webhook', async (req, res) => {
  res.sendStatus(200);
  await fetch(MAKE_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body)
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log('Servidor OK en puerto ' + PORT));

