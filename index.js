const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.get('/muscles/:exercise', async (req, res) => {
  try {
    // Call the OpenAI API
    const response = await axios.post('https://api.openai.com/v1/engines/chat-davinci/jobs', {
      prompt: `What muscles does ${req.params.exercise} work out?`,
      max_tokens: 128,
      n: 1,
      temperature: 0.5,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    // Parse the response from the API
    const muscles = response.data.choices[0].text
      .split('\n')
      .filter(line => line.startsWith('- '))
      .map(line => line.substr(2));

    // Return the list of muscles worked out
    res.json({ muscles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
