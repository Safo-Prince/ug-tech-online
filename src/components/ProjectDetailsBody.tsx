import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//import fertilizer from "../assets/fertilizer.png";
import { Handshake, Timer } from "@phosphor-icons/react";
import Notification from "./Notification";
import PartnerWithUs from "./modals/PartnerWithUsModal";
import SetMeetingModal from "./modals/SetMeetingModal";
import Hero from "../components/Hero";

const ProjectDetailsBody = () => {
  const [prompt, setPrompt] = useState("");
  //const [innovationName, setInnovationName] = useState('');

  const [showNotification, setShowNotification] = useState(false);
  const [open, setOpen] = useState(false);
  const [partnerOpen, setPartnerOpen] = useState(false);

  useEffect(() => {
    if (showNotification) {
      setTimeout(() => setShowNotification(false), 4000);
    }
  });

  const { id } = useParams();
  //const navigate = useNavigate();
  const [projectDetails, setProjectDetails] = useState({
    // other properties,
  });

  useEffect(() => {
    // Fetch project details based on the ID from the backend
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(
          `https://innovate.ug.edu.gh/api/projects/${id}`
        );
        const data = await response.json();
        setProjectDetails(data);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetails();
  }, [id]);

  if (!projectDetails) {
    return <div>Loading...</div>; // Add a loading indicator
  }

  {
    /* @ts-ignore */
  }
  {
    /* @ts-ignore */
  }
  {/* @ts-ignore */}
  const { innovation_name, description, keyBenefits, applicationAndMarketUtility, keywords, developers, college, status, contact, files, // Assuming files is an array of file paths
  } = projectDetails;

  return (
    <>
    <Hero title= {innovation_name} techId="SOA 03" />

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
        innovationName={innovation_name}
      />
      <PartnerWithUs
        open={partnerOpen}
        setOpen={setPartnerOpen}
        setPrompt={setPrompt}
        setShowNotification={setShowNotification}
        innovationName={innovation_name}
      />

      <div className="max-w-7xl mx-auto lg:px-6 px-8 min-h-min  py-10 font-lato sm:my-20 my-5 flex sm:flex-row flex-col sm:space-x-4 sm:justify-between  space-y-4 sm:space-y-0 ">
        <div className="sm:w-1/2  h-full flex flex-col space-y-4  ">
          {/* @ts-ignore */}
          {/* @ts-ignore */}
          {files && files.length > 0 ? ( <img src={ projectDetails.files && typeof projectDetails.files === "string" && projectDetails.files.length > 0 ? `https://innovate.ug.edu.gh/${projectDetails.files.split(",")[0].trim()}`: `https://innovate.ug.edu.gh/placeholder-image.jpg`} className="rounded-md object-cover" alt={projectDetails.title}
              // style={{ width: "100%", height: "400px" }}
            />
          ) : (
            <div className="placeholder-image">No Image</div>
          )}
          <div>
            <h1 className="font-bold  text-lg mt-4">Description</h1>
            <p className="text-[#56585B] xl:text-lg mt-2">{description}</p>
          </div>
          <div>
            <h1 className="font-bold  text-lg">
              Application and Market Utility
            </h1>
            <p className="text-[#56585B] xl:text-lg mt-2">
              {applicationAndMarketUtility}
            </p>
          </div>
          <div>
            <h1 className="font-bold   text-lg">Key Benefits:</h1>
            <ul className="list-inside list-disc mt-2 ">
              <li className="text-[#56585B] xl:text-lg">{keyBenefits}</li>
            </ul>
          </div>
          {/* ... Additional project details */}
        </div>

        <div className="sm:w-96 w-full border bg-[#EDEFEF] rounded-lg sm:p-10 p-5 border-[#B8B8B8] shadow-sm space-y-4">
          <h1 className="font-bold  text-lg">Keywords:</h1>
          <ul className="list-disc list-inside ">
            {/* @ts-ignore */}
            {typeof projectDetails.keywords === "string" && projectDetails.keywords.length > 0 ? ( projectDetails.keywords.split(",").map((keyword) => (
                <li key={keyword.trim()} className="text-[#56585B] xl:text-lg">
                  {keyword.trim()}
                </li>
              ))
            ) : (
              <li className="text-[#56585B] xl:text-lg">
                No keywords available
              </li>
            )}
          </ul>

          <div>
            <h1 className="font-bold  text-lg">Developers:</h1>
            <ul className="list-disc list-inside ">
              {/* @ts-ignore */}
              {typeof projectDetails.developers === "string" && projectDetails.developers.length > 0 ? ( projectDetails.developers.split(",").map((developer) => (
                  <li
                    key={developer.trim()}
                    className="text-[#56585B] xl:text-lg"
                  >
                    {developer.trim()}
                  </li>
                ))
              ) : (
                <li className="text-[#56585B] xl:text-lg">
                  No developers listed
                </li>
              )}
            </ul>
          </div>

          <div>
            <h1 className="font-bold  text-lg mt-4">Status</h1>
            <p className="text-[#56585B] xl:text-lg mt-2">{status}</p>
          </div>

          <div>
            <h1 className="font-bold  text-lg mt-4">College</h1>
            <p className="text-[#56585B] xl:text-lg mt-2">{college}</p>
          </div>

          <div>
            <h1 className="font-bold  text-lg mt-4">Contact</h1>
            <p className="text-[#56585B] xl:text-lg mt-2">{contact}</p>
          </div>

          <button
            onClick={() => {
              setOpen(true);
            }}
            className="rounded-full py-1.5 px-2 sm:px-3.5 sm:py-2 bg-[#324c6d] hover:bg-[#536c8e] text-white flex items-center justify-center space-x-1 !mt-5"
          >
            <Timer size={20} className="self-center" />
            <span>Set Meeting </span>
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
