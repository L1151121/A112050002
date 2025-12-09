import React from 'react';

interface SuggestionPanelProps {
  onGetSuggestion: () => void;
  isLoading: boolean;
  suggestion: string | null;
}

export const SuggestionPanel: React.FC<SuggestionPanelProps> = ({ onGetSuggestion, isLoading, suggestion }) => {
  return (
    <div className="w-full px-6 mt-6 pb-10 z-20 relative flex flex-col items-center">
      
      {/* Result Display Area */}
      {suggestion && (
        <div className="w-full mb-4 bg-gradient-to-br from-indigo-900/80 to-purple-900/80 backdrop-blur-md border border-purple-500/30 p-5 rounded-2xl shadow-xl animate-fade-in-up">
          <div className="flex items-start gap-3">
             <div className="mt-1 min-w-[20px]">
               <svg className="w-5 h-5 text-purple-300" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>
             </div>
             <div>
                <h3 className="text-purple-200 text-sm font-bold uppercase tracking-wider mb-1">AI Stylist</h3>
                <p className="text-white text-sm leading-relaxed font-light">
                  {suggestion}
                </p>
             </div>
          </div>
        </div>
      )}

      {/* Main Action Button */}
      <button
        onClick={onGetSuggestion}
        disabled={isLoading}
        className={`
          w-full py-4 rounded-full text-white font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)]
          ${isLoading 
            ? 'bg-slate-700 cursor-not-allowed' 
            : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] active:scale-95'
          }
        `}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Analyzing...</span>
          </div>
        ) : (
          "本日穿搭建議"
        )}
      </button>
    </div>
  );
};
