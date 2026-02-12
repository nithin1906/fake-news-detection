interface XAIHeatmapProps {
    wordImportances: [string, number][]; // Array of [word, importance]
}

const XAIHeatmap = ({ wordImportances }: XAIHeatmapProps) => {
    // Helper to normalize importance for opacity/color intensity
    const getBackgroundColor = (importance: number) => {
        // Importance is between -1 and 1 usually, or unbounded.
        // For this MVP, let's assume -1 (Real) to 1 (Fake).
        // Or magnitude.

        // Simple visualization:
        // Red for Fake (positive importance), Green for Real (negative importance)
        // Opacity based on absolute value.

        const absValue = Math.min(Math.abs(importance), 1);

        if (importance > 0) {
            // Contributing to Fake (Red - Editorial Red #8B1A1A is rgb(139, 26, 26))
            return `rgba(139, 26, 26, ${absValue * 0.5 + 0.1})`;
        } else {
            // Contributing to Real (Green - using a deep green #15803d is rgb(21, 128, 61))
            return `rgba(21, 128, 61, ${absValue * 0.5 + 0.1})`;
        }
    };

    return (
        <div className="font-serif text-lg leading-relaxed text-ink text-justify">
            {wordImportances.map(([word, importance], index) => (
                <span
                    key={index}
                    title={`Importancia: ${importance.toFixed(3)}`}
                    className="inline-block px-0.5 rounded mx-0.5 cursor-help transition-colors border-b border-transparent hover:border-warm-gray/50"
                    style={{
                        backgroundColor: getBackgroundColor(importance),
                    }}
                >
                    {word}
                </span>
            ))}
        </div>
    );
};

export default XAIHeatmap;
