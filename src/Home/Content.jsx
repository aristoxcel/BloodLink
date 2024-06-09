import { FaArrowRightLong } from "react-icons/fa6";

function Content() {
  return (
    <div className="my-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10 px-4 lg:px-16 lg:w-4/5 mx-auto">
        <div>
          <img src="donate.jpg" alt="" className="w-full" />
        </div>
        <div className="flex-col space-y-5 ">
          <h1 className="text-2xl font-bold md:text-3xl opacity-80 text-[#c4052b]">
            Together, we can make a difference.
          </h1>

          <p className="lg:text-lg font-roboto opacity-80">
            At BloodLink, we believe in the power of community and the profound
            impact that a single act of kindness can have. Our mission is to
            connect those in need of blood with generous donors who can provide
            a lifeline. Every donation is a step towards saving lives and
            strengthening our community. Together, we can
            create a network of hope and healing. Thank you for being a part of
            BloodLink.
          </p>
          <button className="flex gap-3 items-center text-[#c4052b]">
            Learn more <FaArrowRightLong />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Content;
