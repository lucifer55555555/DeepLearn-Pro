
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Code } from 'lucide-react';

// A very simple "markdown" to React element converter.
export function MarkdownRenderer({ content }: { content: string }) {
  if (!content) {
    return null;
  }
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let currentCodeBlock: string[] = [];
  let codeLang = '';

  const lines = content.trim().split('\n');

  lines.forEach((line, index) => {
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        // End of code block
        elements.push(
          <pre key={`code-${index}`} className="bg-background/80 font-code text-sm p-4 rounded-md my-4 overflow-x-auto">
            <code>{currentCodeBlock.join('\n')}</code>
          </pre>
        );
        currentCodeBlock = [];
        inCodeBlock = false;
        codeLang = '';
      } else {
        // Start of code block
        inCodeBlock = true;
        codeLang = line.trim().substring(3);
      }
      return;
    }

    if (inCodeBlock) {
      currentCodeBlock.push(line);
      return;
    }
    
    if (line.startsWith('# ')) {
      elements.push(<h1 key={index} className="font-headline text-3xl font-bold mt-8 mb-4 border-b pb-2">{line.substring(2)}</h1>);
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={index} className="font-headline text-2xl font-bold mt-6 mb-3 border-b pb-2">{line.substring(3)}</h2>);
    } else if (/^\d+\.\s/.test(line)) {
        elements.push(<p key={index} className="leading-relaxed my-2 pl-4"><span className="font-semibold mr-2">{line.match(/^\d+\./)?.[0]}</span>{line.substring(line.indexOf('.') + 2)}</p>);
    } else if (line.includes('**')) {
      const parts = line.split('**');
      elements.push(
        <p key={index} className="leading-relaxed my-4">
          {parts.map((part, i) =>
            i % 2 === 1 ? <strong key={i} className="font-semibold">{part}</strong> : part
          )}
        </p>
      );
    } else if (line.trim() === '') {
      elements.push(<div key={index} className="h-4" />);
    } else {
      elements.push(<p key={index} className="leading-relaxed my-4">{line}</p>);
    }
  });

  // If a code block is still open at the end
  if (inCodeBlock) {
    elements.push(
      <pre key="code-end" className="bg-background/80 font-code text-sm p-4 rounded-md my-4 overflow-x-auto">
        <code>{currentCodeBlock.join('\n')}</code>
      </pre>
    );
  }

  return <div>{elements}</div>;
}
