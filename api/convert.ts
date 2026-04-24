import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { images } = req.body as { images?: string[] };
  if (!images || images.length === 0) {
    return res.status(400).json({ error: 'Missing page images' });
  }

  try {
    const imageBlocks: Anthropic.ImageBlockParam[] = images.map((b64) => ({
      type: 'image',
      source: { type: 'base64', media_type: 'image/png', data: b64 },
    }));

    const message = await client.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 8192,
      messages: [
        {
          role: 'user',
          content: [
            ...imageBlocks,
            {
              type: 'text',
              text: `You are an expert LaTeX typesetter. Convert this resume PDF (shown as page images) into complete, compilable LaTeX source that looks identical to the original.

FONT MATCHING (critical):
- Examine the font in the image carefully. Is it sans-serif (like Arial, Calibri, Helvetica, Lato, Open Sans) or serif (like Times New Roman, Georgia, Garamond)?
- For sans-serif resumes: use \\usepackage{lato} or \\usepackage[default]{opensans} or \\usepackage{helvet} + \\renewcommand{\\familydefault}{\\sfdefault}
- For serif resumes: use \\usepackage{mathptmx} (Times) or \\usepackage{palatino}
- For modern geometric sans (Calibri-like): use \\usepackage[sfdefault]{cabin} or \\usepackage[sfdefault]{roboto}
- Always include \\usepackage[T1]{fontenc} and \\usepackage[utf8]{inputenc}
- Match font sizes precisely: if the name is large, use \\Huge or \\LARGE; section headers typically \\large or \\Large

LAYOUT (critical):
- Reproduce column structure exactly (single column vs two-column)
- Match margins using \\usepackage{geometry} with exact-looking margins (e.g. margin=0.5in or margin=1in)
- Match spacing between sections, before/after headings, and between bullet points
- Use \\usepackage{enumitem} to control bullet spacing to match original

HORIZONTAL LINES (critical):
- Only add a horizontal rule if one is clearly visible in the image at that exact position
- Use \\noindent\\rule{\\linewidth}{0.4pt} for full-width section dividers
- Never place a rule inside a list, inside a tabular, or between bullet points
- If a rule appears under the name/header, place it immediately after the header block before the first section
- Do not add extra rules that are not in the original

OTHER:
- Preserve all content exactly: names, dates, bullets, URLs, contact info
- Use \\documentclass{article} — avoid document classes that alter fonts
- Output ONLY the raw LaTeX source — no markdown fences, no explanation, nothing else
- Must compile successfully with pdflatex`,
            },
          ],
        },
      ],
    });

    const text = message.content.find((b) => b.type === 'text');
    if (!text || text.type !== 'text') {
      return res.status(500).json({ error: 'No text response from Claude' });
    }

    return res.status(200).json({ latex: text.text.trim() });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return res.status(502).json({ error: `Claude API error: ${message}` });
  }
}
