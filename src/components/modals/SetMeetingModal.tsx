import * as React from "react";
import { FormEvent, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { EnvelopeIcon } from "@heroicons/react/20/solid";

interface Props {
  setPrompt: (arg: string) => void;
  open: boolean;
  setOpen: (arg: boolean) => void;
  setShowNotification: (arg: boolean) => void;
  innovationName: string;
}

const SetMeetingModal: React.FC<Props> = ({
  open,
  setOpen,
  innovationName
}) => {
  const [formData, setFormData] = useState({
    company_name: '',
    contact_person_name: '',
    phone_number: '',
    user_email: '',
    purpose: '',
  });
  const [buttonText, setButtonText] = useState("Send");


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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setButtonText('Sending...');
  
    try {
      // Make a POST request to the backend API
      const response = await fetch('https://innovate.ug.edu.gh/api/submit-meeting-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          innovation_name: innovationName,
        }),
      });
  
      if (response.ok) {
        console.log('Form submitted successfully');
        // Refresh the page to clear input fields
        window.location.reload();
      } else {
        console.error('Error submitting form:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setButtonText('Send');
    }
  };
  

  return (
    <>
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
                <Dialog.Panel className="relative w-full transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6 ">
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
                        Set a Meeting
                      </Dialog.Title>
                      <form className=" " onSubmit={handleSubmit}>
                        <div>
                          <label className="block text-sm font-medium leading-6 text-gray-900 text-left ">
                            Name of The Company
                          </label>
                          <div className="mt-2">
                          <input
                            name="company_name"
                            value={formData.company_name}
                            onChange={handleInputChange}
                            className="block w-full bg-[#F8F8F8] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] disabled:ring-gray-200 sm:text-sm sm:leading-6"
                            placeholder="Enter name of the company"
                          />
                          </div>
                        </div>
                        <div className="mt-3">
                          <label className="block text-sm font-medium leading-6 text-gray-900  text-left">
                            Name of Contact Person
                          </label>
                          <div className="mt-2">
                          <input
                            name="contact_person_name"
                            value={formData.contact_person_name}
                            onChange={handleInputChange}
                            className="block w-full bg-[#F8F8F8] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] disabled:ring-gray-200 sm:text-sm sm:leading-6"
                            placeholder="Enter full name"
                          />
                          </div>
                        </div>
                        <div className="mt-3">
                          <label className="block text-sm font-medium leading-6 text-gray-900  text-left">
                            Contact Person's Phone Number
                          </label>
                          <div className="mt-2">
                          <input
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleInputChange}
                            className="block w-full bg-[#F8F8F8] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] disabled:ring-gray-200 sm:text-sm sm:leading-6"
                            placeholder="Enter phone number"
                          />
                          </div>
                        </div>
                        <div className="mt-3">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900 text-left"
                          >
                            Email
                          </label>
                          <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <EnvelopeIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </div>
                            <input
                              name="user_email"
                              value={formData.user_email}
                              onChange={handleInputChange}
                              className="block w-full bg-[#F8F8F8] rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                              placeholder="Email address"
                            />
                          </div>
                        </div>
                        <div className="mt-3">
                          <label
                            htmlFor="comment"
                            className="block text-sm font-medium leading-6 text-gray-900 text-left"
                          >
                            Purpose
                          </label>
                          <div className="mt-2">
                          <textarea
                            name="purpose"
                            value={formData.purpose}
                            onChange={handleInputChange}
                            rows={4}
                            placeholder="Your message"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6 bg-[#F8F8F8] focus:ring-[#153D6D]"
                          />
                          </div>
                        </div>

                        <div className="w-full flex justify-center mt-3">
                          <button className="block w-full rounded-md border-0 py-1.5 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-[#153D6D]">
                            {buttonText}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default SetMeetingModal;
