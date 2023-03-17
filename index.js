const express = require('express');
const app = express();
require('dotenv');
const port = 3010;
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  organization: 'org-SsEvIFMhp846iNdd79sfbU3l',
  apiKey: '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',
});

const openai = new OpenAIApi(configuration);

const FRONTEND_URL = 'http://localhost:3000';

app.options('*', cors({ origin: FRONTEND_URL, optionsSuccessStatus: 200 }));

app.use(cors({ origin: FRONTEND_URL, optionsSuccessStatus: 200 }));
app.use(bodyParser.json());

app.use(express.static('static'));

app.get('/chat', async (req, res) => {
  const query = req.query.query;
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'You are a useful shopping assistant that recommends products according to user query. You just return name and price for the query in form list separated if list of products is asked, or return bullet points just try to make the answer concise, if user asks you to tell you more about the product return description then only. You show currency as INR and show personalized results for India',
      },
      {
        role: 'user',
        content: query,
      },
    ],
  });
  res.json({ message: completion.data.choices[0].message.content });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
