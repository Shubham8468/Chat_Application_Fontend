const AuthImagePattern = ({ title, subtitle }) => {
  return <>
  <div className="hidden lg:flex item-center jsutify-center p-12 ">
    <div className=" max-w-md text-center mt-20">
      <div className="grid grid-cols-3 gap-3 mb-8">
        {
          [...Array(9)].map((_, index) => (
            <div key={index} className={`aspect-square rounded-2xl bg-blue-400 ${index % 2 === 0 ? 'animate-pulse' : ''}`}></div>
          ))
        }

      </div>
      <h2 className="text-3xl font-bold  bg-blue-400 text-white rounded-full py-3 px-4">{title}</h2>
      <p className="text-gray-600 mt-4 font-medium border-b border-blue-300 pb-2">{subtitle}</p>
    </div>
  </div>
  </>;
};

export default AuthImagePattern;
