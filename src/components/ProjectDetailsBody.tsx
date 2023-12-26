import { useState, useEffect } from "react";
import fertilizer from "../assets/fertilizer.png";
import { Handshake, Timer } from "@phosphor-icons/react";
import SetMeetingModal from "./modals/SetMeetingModal";
import Notification from "./Notification";
import PartnerWithUs from "./modals/ParrtnerWithUsModal";

const ProjectDetailsBody = () => {
  const [prompt, setPrompt] = useState("");

  const [showNotification, setShowNotification] = useState(false);
  const [open, setOpen] = useState(false);
  const [partnerOpen, setPartnerOpen] = useState(false);

  useEffect(() => {
    if (showNotification) {
      setTimeout(() => setShowNotification(false), 4000);
    }
  });

  return (
    <>
      <Notification
        prompt={prompt}
        setShowNotification={setShowNotification}
        showNotification={showNotification}
      />
      <SetMeetingModal
        open={open}
        setOpen={setOpen}
        setPrompt={setPrompt}
        setShowNotification={setShowNotification}
      />
      <PartnerWithUs
        open={partnerOpen}
        setOpen={setPartnerOpen}
        setPrompt={setPrompt}
        setShowNotification={setShowNotification}
      />
      <div className="max-w-7xl mx-auto lg:px-6 px-8 min-h-min  py-10 font-lato sm:my-20 my-5 flex sm:flex-row flex-col space-x-4 sm:justify-between  space-y-4 sm:space-y-0 ">
        <div className="sm:w-1/2  h-full flex flex-col space-y-4  ">
          <img
            src={fertilizer}
            alt="project-image"
            className="w-full rounded-lg"
          />
          <div>
            <h1 className="font-bold  text-lg mt-4">Description</h1>
            <p className="text-[#56585B] xl:text-lg mt-2">
              A molasses -based and fruit residue-based supplement formulated to
              supply the critical nutrients needed to provide optimal conditions
              for enhanced utilization of fibrous diets in ruminants. The
              supplement is available in molasses-based, fruit residue-based,
              rice straw- based, pineapple waste based, and urea-molasses based
              varieties.
            </p>
          </div>
          <div>
            <h1 className="font-bold  text-lg">
              Application and Market Utility
            </h1>
            <p className="text-[#56585B] xl:text-lg mt-2">
              Scarcity of quality feed, especially in the dry season causes
              ruminants to depend on highly fibrous feeds such as crop residue.
              Consequently, ruminants are unable to maintain the appropriate
              rumen environment for effective utilisation of the diet, which
              impacts negatively on ruminant production.
            </p>
          </div>
          <div>
            <h1 className="font-bold   text-lg">Key Benefits:</h1>
            <ul className="list-inside list-disc mt-2 ">
              <li className="text-[#56585B] xl:text-lg">
                It improves roughage intake and digestibility by livestock.
              </li>
              <li className="text-[#56585B] xl:text-lg ">
                {" "}
                promotes growth rate and reproductive efficiency in livestock.
              </li>
              <li className="text-[#56585B] xl:text-lg">
                Offers improved feed utilization and higher growth in ruminants.
              </li>
            </ul>
          </div>
          <div>
            <h1 className="font-bold  text-lg">Target Market:</h1>
            <ul className="list-disc list-inside mt-2">
              <li className="text-[#56585B] xl:text-lg ">
                Ruminant farmers in areas where molasses or fruit wastes are
                readily available can take advantage of this technology to
                improve their production.
              </li>
              <li className="text-[#56585B] xl:text-lg">
                It is ideal for the large-scale production of multi-nutrient
                supplements for sale to ruminant farmers.
              </li>
            </ul>
          </div>
        </div>

        <div className="sm:w-96 border bg-[#EDEFEF] rounded-lg p-10 border-[#B8B8B8] shadow-sm space-y-4">
          <div>
            <h1 className="font-bold  text-lg">Keywords:</h1>
            <ul className="list-disc list-inside ">
              <li className="text-[#56585B] xl:text-lg ">Agriculture</li>
              <li className="text-[#56585B] xl:text-lg">IOT</li>
              <li className="text-[#56585B] xl:text-lg">Machine Learning</li>
              <li className="text-[#56585B] xl:text-lg">Drones</li>
            </ul>
          </div>
          <div>
            <h1 className="font-bold  text-lg">Developers:</h1>
            <ul className="list-disc list-inside ">
              <li className="text-[#56585B] xl:text-lg ">Safo Prince</li>
              <li className="text-[#56585B] xl:text-lg">Jonathan Irondi</li>
            </ul>
          </div>
          <div>
            <h1 className="font-bold  text-lg">Development status</h1>
            <p className="text-[#56585B] xl:text-lg ">
              At the pre -commercial stage.
            </p>
          </div>
          <div>
            <h1 className="font-bold  text-lg">College</h1>
            <p className="text-[#56585B] xl:text-lg ">
              College of Basic and Applied Science
            </p>
          </div>
          <div>
            <h1 className="font-bold  text-lg">School</h1>
            <p className="text-[#56585B] xl:text-lg ">School of Agriculture</p>
          </div>
          <div>
            <h1 className="font-bold  text-lg">Contact</h1>
            <p className="text-[#56585B] xl:text-lg ">
              Office of Research, Innovation and Development
            </p>
            <p className="text-[#56585B] xl:text-lg ">P.O.Box LG 571, legon</p>
            <p className="text-[#56585B] xl:text-lg ">
              <span>
                Phone:
                <a href="tel:+233-20817-1415">+233 0302 213850</a>
              </span>
            </p>
            <p className="text-[#56585B] xl:text-lg ">
              Email:{" "}
              <a
                href="mailto: orid-ipatt@ug.edu.gh "
                className="text-[#007BFF] text-center"
              >
                orid-ipatt@ug.edu.gh
              </a>
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="rounded-full py-1.5 px-2 sm:px-3.5 sm:py-2 bg-[#324c6d] hover:bg-[#536c8e] text-white flex items-center justify-center space-x-1 "
          >
            <Timer size={20} className="self-center" />
            <span>Set Meeting</span>
          </button>
          <button
            onClick={() => setPartnerOpen(true)}
            className="rounded-full py-1.5 px-2 sm:px-3.5 sm:py-2 bg-[#324c6d] hover:bg-[#536c8e] text-white flex items-center justify-center space-x-1 "
          >
            <Handshake size={20} className="self-center" />
            <span>Partner With Us</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailsBody;
