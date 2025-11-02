const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-400/5 to-background flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 left-1/3 w-96 h-96 bg-red-400/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        <div className="relative w-24 h-24">
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-400 border-r-blue-400/60"
            style={{
              animation: "spin 2s linear infinite",
            }}
          ></div>

          <div
            className="absolute inset-2 rounded-full border-4 border-transparent border-b-red-400 border-l-red-400/60"
            style={{
              animation: "spin 3s linear infinite reverse",
            }}
          ></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-red-400 rounded-full"></div>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <div
            className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="w-2 h-2 bg-red-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-400/70 rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
