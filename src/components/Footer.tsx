import React from "react";
import { Facebook, Instagram } from "iconsax-react";
import { TwitterLogo, SnapchatLogo } from "@phosphor-icons/react";
import { motion } from "framer-motion";

const navigation = {
  about: [
    { name: "About TTIPS", href: "#" },
    { name: "Intellectual Property", href: "#" },
    { name: "Tech Commercialisation", href: "#" },
    { name: "Resources", href: "#" },
    { name: "Grant Awards", href: "#" },
  ],
  resources: [
    { name: "TTIPS Showcase", href: "#" },
    { name: "Faculty Innovation", href: "#" },
    { name: "Student Innovation", href: "#" },
    { name: "Industry Innovation", href: "#" },
    { name: "Contact", href: "#" },
  ],
  quickLinks: [
    { name: "UG Home", href: "#" },
    { name: "ORID Home", href: "#" },
    { name: "MIS Web", href: "#" },
    { name: "Sakai LMS", href: "#" },
  ],
  legal: [
    { name: "Claim", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#153D6D] ">
      <motion.div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24  flex sm:flex-row flex-col gap-y-5 sm:gap-y-0   sm:justify-between items-center">
        <motion.div
          initial={{ y: 100, opacity: 0.3 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0 }}
          viewport={{ once: false }}
        >
          <h3 className="text-lg font-poppins font-bold leading-6 text-[#EAEAEB] text-center sm:text-left">
            About
          </h3>
          <ul
            role="list"
            className="sm:mt-6  mt-3 space-y-2 font-lato flex flex-col sm:block items-center sm:text-left"
          >
            {navigation.about.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-base leading-6 text-gray-300 hover:text-white font-lato "
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ y: 100, opacity: 0.3 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          viewport={{ once: false }}
        >
          <h3 className="text-lg font-poppins font-bold leading-6 text-[#EAEAEB] text-center  sm:text-left">
            Support
          </h3>
          <ul
            role="list"
            className="sm:mt-6  mt-3  space-y-2 flex flex-col  sm:block items-center sm:text-left"
          >
            {navigation.resources.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-base leading-6 text-gray-300 hover:text-white font-lato "
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ y: 100, opacity: 0.3 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          viewport={{ once: false }}
        >
          <h3 className="text-base font-poppins  font-bold leading-6 text-[#EAEAEB]  text-center sm:text-left">
            Quick Links
          </h3>
          <ul
            role="list"
            className="sm:mt-6  mt-3 space-y-2 flex sm:block flex-col items-center sm:text-left"
          >
            {navigation.quickLinks.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-sm leading-6 text-gray-300 hover:text-white font-lato"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ y: 100, opacity: 0.3 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          viewport={{ once: false }}
          className="space-y-3 mt-2 sm:mt-0"
        >
          <div className="flex gap-3">
            <div className=" h-12 w-12 sm:h-14 sm:w-14 cursor-pointer  border-2 border-[#CCCCCC] rounded-full flex items-center justify-center hover:text-white hover:-translate-y-2 transition-all">
              <Facebook size="25" color="#CCCCCC" variant="Bold" />
            </div>
            <div className=" h-12 w-12 sm:h-14 sm:w-14 cursor-pointer border-2 border-[#CCCCCC] rounded-full flex items-center justify-center  text-white hover:-translate-y-2 transition-all">
              <TwitterLogo size={25} color="#CCCCCC" />
            </div>
            <div className=" h-12 w-12 sm:h-14 sm:w-14 cursor-pointer border-2 border-[#CCCCCC] rounded-full flex items-center justify-center  text-white hover:-translate-y-2 transition-all">
              <SnapchatLogo size={25} color="#CCCCCC" />
            </div>
            <div className=" h-12 w-12 sm:h-14 sm:w-14 cursor-pointer border-2 border-[#CCCCCC] rounded-full flex items-center justify-center  text-white hover:-translate-y-2 transition-all">
              <Instagram color="#CCCCCC" />
            </div>
          </div>
          <p className="text-[#EAEAEB] text-center sm:text-right tracking-normal font-normal font-lato text-base ">
            UG TechOnline &copy; 2021
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
