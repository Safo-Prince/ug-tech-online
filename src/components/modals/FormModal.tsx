import * as React from "react";
import { Children, FormEvent, Fragment, useState, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Plus, X } from "@phosphor-icons/react";

interface Props {
  open: boolean;
  setOpen: (arg: boolean) => void;
}

const FormModal: React.FC<Props> = ({ open, setOpen }) => {
  const [buttonText, setButtonText] = useState("submit");
  const [formData, setFormData] = useState({
    innovation_name: "",
    description: "",
    keyBenefits: "",
    newKeyword: "",
    keywords: [],
    newDeveloper: "",
    developers: [],
    partnerType: "--select partner type---",
    industry: "",
    applicationAndMarketUtility: "",
    newLink: "",
    links: [],
    email: "",
    contact: "",
    status: "",
    files: [],
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddKeyword = () => {
    const newKeyword = formData.newKeyword.trim();

    if (newKeyword !== "") {
      {
        /* @ts-ignore */
      }
      setFormData((prevData) => ({
        ...prevData,
        keywords: [...prevData.keywords, newKeyword],
        newKeyword: "", // clear the input after adding a keyword
      }));
    }
  };

  {
    /* @ts-ignore */
  }
  const handleRemoveKeyword = (index) => {
    setFormData((prevData) => {
      const newKeywords = [...prevData.keywords];
      newKeywords.splice(index, 1);
      return { ...prevData, keywords: newKeywords };
    });
  };

  const handleAddDeveloper = () => {
    const newDeveloper = formData.newDeveloper.trim();

    if (newDeveloper !== "") {
      {
        /* @ts-ignore */
      }
      setFormData((prevData) => ({
        ...prevData,
        developers: [...prevData.developers, newDeveloper],
        newDeveloper: "", // clear the input after adding a developer
      }));
    }
  };

  {
    /* @ts-ignore */
  }
  const handleRemoveDeveloper = (index) => {
    setFormData((prevData) => {
      const newDevelopers = [...prevData.developers];
      newDevelopers.splice(index, 1);
      return { ...prevData, developers: newDevelopers };
    });
  };

  const handleAddLink = () => {
    const newLink = formData.newLink.trim();

    if (newLink !== "") {
      {
        /* @ts-ignore */
      }
      setFormData((prevData) => ({
        ...prevData,
        links: [...prevData.links, newLink],
        newLink: "", // clear the input after adding a link
      }));
    }
  };

  {
    /* @ts-ignore */
  }
  const handleRemoveLink = (index) => {
    setFormData((prevData) => {
      const newLinks = [...prevData.links];
      newLinks.splice(index, 1);
      return { ...prevData, links: newLinks };
    });
  };

  {
    /* @ts-ignore */
  }
  const handleFileChange = (e: FormEvent) => {
    {
      /* @ts-ignore */
    }
    const selectedFiles = Array.from(e.target.files);
    {
      /* @ts-ignore */
    }
    setFormData((prevData) => ({
      ...prevData,
      files: [...prevData.files, ...selectedFiles],
    }));
  };

  {
    /* @ts-ignore */
  }
  const handleRemoveFile = (index) => {
    setFormData((prevData) => {
      const newFiles = [...prevData.files];
      newFiles.splice(index, 1);
      return { ...prevData, files: newFiles };
    });
  };

  //const response = await fetch("http://localhost:3002/submit-form",

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setButtonText("submitting...");

    try {
      const formDataToSend = new FormData();
      // Append files to FormData
      if (formData.files) {
        for (let i = 0; i < formData.files.length; i++) {
          formDataToSend.append("files", formData.files[i]);
        }
      }

      // Append other form data properties
      Object.keys(formData).forEach((key) => {
        if (key !== "files") {
          {
            /* @ts-ignore */
          }
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await fetch("http://localhost:3002/submit-form", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        console.log("Form submitted successfully");
        setOpen(false);
        // Refresh the page to clear input fields
        window.location.reload();
      } else {
        console.error("Error submitting form");
      }
      setOpen(false);
      setButtonText("submit");
    } catch (error) {
      setButtonText("submit");

      console.error("Error:", error);
    }
  };

  return (
    <Transition.Root static show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6  max-h-[97vh] overflow-y-scroll">
                <div className="absolute right-0 top-0  pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start w-full">
                  <div className="mt-3 text-center  sm:mt-0 sm:text-left w-full ">
                    <Dialog.Title
                      as="h3"
                      className="text-lg  text-center font-semibold leading-6 text-gray-900 mt-6"
                    >
                      Add Your Innovation
                    </Dialog.Title>
                    <form
                      className="mt-2  space-y-3 w-full "
                      onSubmit={handleSubmit}
                    >
                      <input
                        type="text"
                        name="innovation_name"
                        placeholder="Enter your technology or innovation"
                        value={formData.innovation_name}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                      />
                      <input
                        placeholder="Student/Staff ID"
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                      />

                      <textarea
                        placeholder="Description"
                        rows={2}
                        name="description"
                        id="description"
                        value={formData.comment}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                      />
                      <textarea
                        placeholder="Key Benefits"
                        rows={4}
                        name="keyBenefits"
                        id="keyBenefits"
                        value={formData.keyBenefits}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                      />
                      {/* Add Keyword */}
                      <div className="flex  flex-col space-y-1 items-center space-x-2">
                        <div className="flex w-full  rounded-md border  ">
                          <input
                            value={formData.newKeyword}
                            onChange={handleInputChange}
                            placeholder="Add Keyword"
                            name="newKeyword"
                            className="block  w-full  rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm  ring-inset placeholder:text-gray-400 focus:ring-0 ring-0 sm:text-sm sm:leading-6"
                          />
                          <button
                            onClick={handleAddKeyword}
                            className="border-2 border-dotted border-stone-200 py-1 px-1 rounded-md hover:border-[#1391B3]"
                          >
                            <Plus size={20} color="#d6cdcd" />
                          </button>
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-4 grid-rows-3 w-full gap-1 ">
                          {formData.keywords.map((item, index) => (
                            <span
                              key={index}
                              className="py-1 px-1.5 bg-[#E6F1F4] text-[#1391B3] text-sm rounded-md flex space-x-1 items-center justify-between cursor-"
                            >
                              <span>
                                {item.length > 5
                                  ? `${item.slice(0, 7)}...`
                                  : item}
                              </span>
                              <X
                                size={12}
                                className="cursor-pointer"
                                onClick={() => handleRemoveKeyword(index)}
                              />
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Add Developer */}
                      <div className="flex  flex-col space-y-1 items-center space-x-2">
                        <div className="flex  w-full rounded-md border  ">
                          <input
                            value={formData.newDeveloper}
                            onChange={handleInputChange}
                            placeholder="Add Developers"
                            name="newDeveloper"
                            className="block w-full  rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm  ring-inset placeholder:text-gray-400 focus:ring-0 ring-0 sm:text-sm sm:leading-6"
                          />
                          <button
                            onClick={handleAddDeveloper}
                            className="border-2 border-dotted border-stone-200 py-1 px-1 rounded-md hover:border-[#1391B3]"
                          >
                            <Plus size={20} color="#d6cdcd" />
                          </button>
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-4 grid-rows-3 w-full gap-1 ">
                          {formData.developers.map((item, index) => (
                            <span
                              key={index}
                              className="py-1 px-1.5 bg-[#E6F1F4] text-[#1391B3] text-sm rounded-md flex space-x-1 items-center justify-between cursor-"
                            >
                              <span>
                                {item.length > 5
                                  ? `${item.slice(0, 7)}...`
                                  : item}
                              </span>
                              <X
                                size={12}
                                className="cursor-pointer"
                                onClick={() => handleRemoveDeveloper(index)}
                              />
                            </span>
                          ))}
                        </div>
                      </div>
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                        defaultValue="--select category--"
                      >
                        <option>--Select status---</option>
                        <option>Basic Principles Observed</option>
                        <option>Technology Concept Formulated</option>
                        <option>Proof of Concept Validated</option>
                        <option>Technology Validated In Lab</option>
                        <option>
                          Technology Validated in Relevant Environment
                        </option>
                        <option>
                          Technology Demonstrated in Relevant Environment
                        </option>
                        <option>
                          System Prototype Demonstrated in Operational
                          Environment
                        </option>
                        <option>Actual System Completed and Qualified</option>
                        <option>Full Scale Development</option>
                      </select>
                      <select
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                        defaultValue="--select partner type---"
                      >
                        <option>--Select industry---</option>
                        <option>Local Company</option>
                        <option>Foreign Entity</option>
                        <option>Ministry</option>
                        <option>Department or Agency of Government</option>
                      </select>

                      <textarea
                        type="text"
                        placeholder="Application and Market Utility"
                        rows={4}
                        name="applicationAndMarketUtility"
                        id="applicationAndMarketUtility"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                        value={formData.applicationAndMarketUtility}
                        onChange={handleInputChange}
                      />

                      {/* You ddnt add this  */}
                      <div className="flex flex-col items-center  space-x-2">
                        <div className="flex w-full rounded-md border  ">
                          <input
                            value={formData.newLink}
                            onChange={handleInputChange}
                            placeholder="Add Link"
                            name="newLink"
                            className="block   w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm  ring-inset placeholder:text-gray-400 focus:ring-0 ring-0 sm:text-sm sm:leading-6"
                          />
                          <button
                            onClick={handleAddLink}
                            className="border-2 border-dotted border-stone-200 py-1 px-1 rounded-md hover:border-[#1391B3]"
                          >
                            <Plus size={20} color="#d6cdcd" />
                          </button>
                        </div>

                        <div className="grid grid-cols-3 sm:grid-cols-4 grid-rows-3 w-full gap-1  ">
                          {formData.links.map((item, index) => (
                            <span
                              key={index}
                              className="py-1 px-1.5 bg-[#E6F1F4] text-[#1391B3] text-sm rounded-md flex space-x-1 items-center justify-between mt-2"
                            >
                              <span>
                                {item.length > 5
                                  ? `${item.slice(0, 7)}...`
                                  : item}
                              </span>
                              <X
                                size={12}
                                className="cursor-pointer"
                                onClick={() => handleRemoveLink(index)}
                              />
                            </span>
                          ))}
                        </div>
                      </div>

                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                        value={formData.email}
                        onChange={handleInputChange}
                      />

                      <input
                        type="text"
                        name="contact"
                        placeholder="Contact Information"
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                        value={formData.contact}
                        onChange={handleInputChange}
                      />

                      <div className="flex items-center space-x-3">
                        <label
                          id="input-file"
                          className="cursor-pointer border-dotted border-2 w-10 h-10  flex items-center justify-center"
                        >
                          <input
                            id="input-file"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            multiple // Allow multiple files
                          />
                          <Plus size={20} color="#d6cdcd" />
                        </label>
                        <span>Add 3 Images</span>
                      </div>

                      <div className="grid grid-cols-3 grid-rows-3 gap-1">
                        {formData.files &&
                          formData.files.map((file, index) => (
                            <div
                              key={index}
                              className="py-1.5 px-1.5 bg-[#E6F1F4] text-[#1391B3] text-sm rounded-md flex space-x-1 items-center justify-between cursor-"
                            >
                              {/* @ts-ignore */}
                              <span>{file.name}</span>
                              <X
                                size={12}
                                className="cursor-pointer"
                                onClick={() => handleRemoveFile(index)}
                              />
                            </div>
                          ))}
                      </div>

                      <button className="block w-full rounded-md border-0 py-1.5 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-[#153D6D]">
                        {buttonText}
                      </button>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default FormModal;
