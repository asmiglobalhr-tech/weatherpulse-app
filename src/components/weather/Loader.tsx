const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        
        {/* Inner pulsing dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white/60 rounded-full animate-pulse"></div>
      </div>
      
      <p className="text-white/80 mt-4 text-lg animate-pulse">
        Getting weather data...
      </p>
    </div>
  );
};

export default Loader;