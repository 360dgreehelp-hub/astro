import { OpenAI } from 'openai';
import html2pdf from 'html2pdf.js';
import type { NumerologyResult } from '../utils/numerology';

const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY as string | undefined;

const client = openaiApiKey
  ? new OpenAI({ apiKey: openaiApiKey, dangerouslyAllowBrowser: true })
  : undefined;

export type ReportInput = {
  numerology: NumerologyResult;
  fullName: string;
  focusArea: string;
  vedicDetails?: {
    rashi?: string;
    nakshatra?: string;
    lagna?: string;
  };
};

export type ReportSections = {
  personality: string;
  career: string;
  relationships: string;
  luckyGuidance: string;
  nameFixes: string;
};

const buildPrompt = (input: ReportInput): string => {
  const { numerology, fullName, focusArea, vedicDetails } = input;
  return `You are Vidhira, a Nepali spiritual numerologist. Using the following numerology insights, craft a nurturing, encouraging report in Nepali English mix (Nepali expressions allowed but keep core English). Include cultural sensitivity for Nepal.

Full Name: ${fullName}
Focus: ${focusArea}
Mulank: ${numerology.mulank.value} (${numerology.mulank.planet}) traits ${numerology.mulank.traits.join(', ')}
Bhagyank: ${numerology.bhagyank.value} (${numerology.bhagyank.planet}) traits ${numerology.bhagyank.traits.join(', ')}
Name Number: ${numerology.nameNumber.value} (${numerology.nameNumber.planet}) traits ${numerology.nameNumber.traits.join(', ')}
Vedic Details: ${JSON.stringify(vedicDetails ?? {})}

Provide sections: Personality, Career Guidance, Relationship Tendency, Lucky Numbers/Colors/Days, Name Fix Suggestions.`;
};

export const generateReport = async (input: ReportInput): Promise<ReportSections> => {
  if (!client) {
    return {
      personality: 'Set up your OpenAI key to generate personalized insights.',
      career: 'Career guidance will appear here after integration with OpenAI.',
      relationships: 'Relationship analysis will be generated once the API key is configured.',
      luckyGuidance: 'Lucky numbers, colors, and days will be listed here.',
      nameFixes: 'Name correction and brand naming advice will be suggested post setup.',
    };
  }

  const prompt = buildPrompt(input);

  const completion = await client.responses.create({
    model: 'gpt-4.1-mini',
    input: prompt,
  });

  const text = completion.output_text ?? '';
  const sections = text.split(/\n\s*\n/);

  return {
    personality: sections[0] ?? '',
    career: sections[1] ?? '',
    relationships: sections[2] ?? '',
    luckyGuidance: sections[3] ?? '',
    nameFixes: sections[4] ?? '',
  };
};

export const downloadReportPdf = (elementId: string, fileName: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  html2pdf().set({
    filename: `${fileName}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
  })
    .from(element)
    .save();
};
