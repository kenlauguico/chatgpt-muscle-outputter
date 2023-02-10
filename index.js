const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.get('/muscles/:exercise', async (req, res) => {
  try {
    // Call the OpenAI API
    const response = await axios.post('https://api.openai.com/v1/completions', {
      prompt: `What are the muscle names for a ${req.params.exercise} work out?`,
      model: "text-davinci-003",
      max_tokens: 128,
      n: 1,
      temperature: 0.5,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.data.choices || response.data.choices.length === 0) {
      console.log(response.data.choices)
      return res.status(500).json({ error: 'No information found' });
    }

    const text = response.data.choices[0].text;

    // Split the text by '\n' and filter out empty strings
    const muscles = text.split('\n')
      .filter(line => line.trim() !== '')
      .map(line => line.replace(/^\d+\.\s+/, '').trim());

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
