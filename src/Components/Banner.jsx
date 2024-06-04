

function Banner() {
  return (
    <div className="relative">
        <div
      className=' w-full object-fill bg-no-repeat bg-center min-h-[calc(100vh-72px)]'
      style={{
        backgroundImage: `url(${'banner4.png'})`,
      }}
    >
       <div className="absolute top-10 lg:top-14 left-10 lg:left-16 lg:ml-28">
       <h1 className="font-roboto text-4xl md:text-5xl lg:text-6xl font-bold text-red-700 lg:text-sky-900">Because of You,</h1>
       <h1 className="font-roboto text-4xl md:text-5xl lg:text-6xl font-bold text-red-700 lg:text-sky-900">Life Doesn’t Stop</h1>
        <h1 className="w-3/5 pt-4 lg:pt-6 text-2xl md:text-3xl  font-semibold text-sky-900 lg:text-red-700">Be part of the BloodLink and Sign up to donate blood with pride </h1>
       </div>
       <div className="absolute lg:bottom-96 md:bottom-96 bottom-44 lg:right-64 md:right-32 right-6 flex gap-6">
        <button className="btn px-6 py-2 bg-[#c4052bcd] rounded-md shadow-md text-white text-xl font-roboto font-bold hover:text-[#c4052bcd] hover:bg-white  border border-red-100">Join as a Donar</button>
        <button className="btn  px-6 py-2 text-[#c4052bcd] rounded-md shadow-md text-xl font-roboto font-bold hover:text-white hover:bg-[#c4052bcd] border border-red-100">Search Donars</button>
       </div>
    </div>
    </div>
    
  )
}

export default Banner