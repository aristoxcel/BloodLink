import { FaFacebookF, FaGithub, FaTwitter } from "react-icons/fa"
import { ImLinkedin } from "react-icons/im";


function Footer() {
  return (
 
    <footer className="bg-[#c4052b] text-gray-100 py-20">
    <div className="container mx-auto flex flex-col items-center space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-roboto text-white">BloodLink</h1>
        <p className="lg:w-1/2 text-center text-gray-300">We connect those in need of blood with generous donors. Join us in making a difference and saving lives through the power of community.</p>
        <div className="flex space-x-6 text-2xl">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="hover:text-white transition-colors duration-300"/>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <ImLinkedin className="hover:text-white transition-colors duration-300"/>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="hover:text-white transition-colors duration-300"/>
            </a>
            <a href="https://www.github.com" target="_blank" rel="noopener noreferrer">
                <FaGithub className="hover:text-white transition-colors duration-300"/>
            </a>
        </div>
        <div className="w-full border-t border-gray-700"></div>
        <p className="text-gray-400 text-sm">© 2024 BloodLink. All Rights Reserved by <span className="text-gray-200">Rakib Hasan</span></p>
    </div>
</footer>

  )
}

export default Footer