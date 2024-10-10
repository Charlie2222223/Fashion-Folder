// /pages/api/generateImage.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface ImageGenerationRequest extends NextApiRequest {
  body: {
    category: string;
    color: string;
    size: string;
  };
}

export default async function handler(req: ImageGenerationRequest, res: NextApiResponse) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key is missing' });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        prompt: `A ${req.body.category} in ${req.body.color} color, size ${req.body.size}`,
        n: 1,
        size: '512x512',
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const imageUrl = response.data.data[0].url;
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
}