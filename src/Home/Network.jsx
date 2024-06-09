import { ImLocation2 } from "react-icons/im"

function Network() {
  return (
    <div className="w-4/5 mx-auto my-24 ">
        <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-semibold opacity-80 my-10">We're all over bangladesh</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-3">
            <div className=" flex justify-center">
                <div className="w-36 md:w-44 flex-col justify-center item-center">
                <div className="flex justify-center"><img src="people.png" alt="" className="w-2/5 mb-4"/></div>
                <h1 className="text-center text-2xl md:text-3xl font-bold text-[#c4052b]">450 Donors</h1>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="w-36 md:w-44 flex-col justify-center item-center">
                <div className="flex justify-center"><ImLocation2 className="w-2/5 text-6xl text-[#217a89] mb-6"/></div>
                <h1 className="text-center text-2xl md:text-3xl font-bold text-[#c4052b]">64 Districts</h1>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="w-52 md:w-56 flex-col justify-center item-center">
                <div className="flex justify-center"><img src="images.png" alt="" className="w-[50%] mb-1"/></div>
                <h1 className="text-center text-2xl md:text-3xl font-bold text-[#c4052b]">8 Blood Groups</h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Network