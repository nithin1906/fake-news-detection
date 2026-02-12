interface ErrorBannerProps {
  message: string;
}

export default function ErrorBanner({ message }: ErrorBannerProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 mb-10 animate-fade-up">
      <div className="relative border border-editorial-red/20 bg-editorial-red/[0.03] p-5">
        <div className="absolute top-0 left-0 w-1 h-full bg-editorial-red" />
        <div className="flex items-start gap-3 pl-3">
          <span className="text-editorial-red font-serif text-lg mt-0.5">{'\u2716'}</span>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-editorial-red block mb-1">
              Analysis Error
            </span>
            <p className="font-sans text-sm text-ink/80 italic">
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
