import { MdArrowRight } from "react-icons/md";

function Consult() {
  return (
    <div className="relative py-1 h-[500px] my-16">
      <div className="bg-[url('bloodDonate.jpg')] my-10">
        <div className="bg-black opacity-40">
          <div className="lg:w-[70%] md:w-4/5 mx-auto grid grid-cols-2 gap-5 px-3 md:px-0 ">
            <div
              className="py-16"
              data-aos="fade-left"
              data-aos-easing="ease-in-sine"
              data-aos-delay="100"
            >
              <h1 className="font-roboto text-2xl md:text-4xl lg:text-5xl font-bold uppercase text-white">
              Welcome to BloodLink
              </h1>
              
              <p className="py-4 font-roboto md:text-lg text-sm font-semibold text-white opacity-90">
              Our mission is to connect those in need of blood with generous donors who can provide a lifeline.
              </p>
              <button className="px-3 font-roboto bg-[#c4052b] font-semibold text-lg lg:text-xl text-white rounded flex items-center">
                Contact Us <MdArrowRight className="text-3xl"/>
              </button>
            </div>
            <div></div>
          </div>
        </div>
      </div>

      <div className=" absolute -top-6">
        <div>
          <div className="lg:w-[70%] md:w-4/5 mx-auto grid md:grid-cols-2 grid-cols-1 gap-5  px-3 md:px-0">
            <div></div>
            <div>
              <div
                data-aos="flip-left "
                data-aos-easing="ease-in-sine"
                data-aos-duration="400"
                className="md:ml-4 w-full  shadow-2xl bg-base-100 px-3 md:px-4 pt-10 rounded-lg z-10 bg-white"
              >
                <h1 className="text-lg md:text-2xl font-bold text-[#c4052b] font-roboto opacity-80">
                  Get in touch with us
                </h1>
                <p className=" mt-3 font-poppins text-sm font-medium opacity-70 text-wrap pb-2">
                Join us in making a difference. Whether you're here to donate or seeking assistance, BloodLink is your partner in care, compassion, and community support.
                </p>
                <form className=" py-3 space-y-2">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="input border py-2 px-4 rounded-lg w-full"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="input border py-2 px-4 rounded-lg w-full"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Phone Number"
                    className="input border py-2 px-4 rounded-lg w-full"
                    required
                  />
                  <textarea
                    type="textarea"
                    placeholder="Message"
                    rows={3}
                    className="border rounded-lg px-6 w-full"
                    required
                  />
                  <div className="w-full">
                    <p className="w-full font-roboto  bg-[#c4052b] hover:bg-gradient-to-r hover:from-[#c4052b] hover:to-[#c4052b] hover:ring-2 hover:ring-offset-2 hover:ring-[#c4052b] transition-all ease-out duration-300 font-semibold text-sm lg:text-xl text-white rounded py-2 my-2 text-center">
                      Send us Message
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Consult;
