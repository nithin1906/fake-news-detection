import { useState } from 'react';

interface XAIHeatmapProps {
  wordImportances: [string, number][];
}

export default function XAIHeatmap({ wordImportances }: XAIHeatmapProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getBackgroundColor = (importance: number) => {
    const absValue = Math.min(Math.abs(importance), 1);
    if (importance > 0) {
      return `rgba(139, 26, 26, ${absValue * 0.55 + 0.08})`;
    } else {
      return `rgba(21, 128, 61, ${absValue * 0.55 + 0.08})`;
    }
  };

  return (
    <div className="font-sans text-base leading-[1.85] text-ink text-justify">
      {wordImportances.map(([word, importance], index) => (
        <span
          key={index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="inline-block px-0.5 mx-[1px] cursor-help transition-all duration-200 border-b border-transparent hover:border-warm-gray/60 relative"
          style={{
            backgroundColor: getBackgroundColor(importance),
            transform: hoveredIndex === index ? 'translateY(-1px)' : 'none',
          }}
        >
          {word}
          {hoveredIndex === index && (
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-ink text-parchment text-[10px] px-2 py-1 whitespace-nowrap z-10 font-bold tracking-wider">
              {importance > 0 ? 'Sospechoso' : 'Creible'}: {Math.abs(importance).toFixed(3)}
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
