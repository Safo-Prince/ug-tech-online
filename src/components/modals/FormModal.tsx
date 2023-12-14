import { FormEvent, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Plus, X } from "@phosphor-icons/react";

interface Props {
  open: boolean;
  setOpen: (arg: boolean) => void;
}

interface FormInput {
  keyword: string;
  developer: string;
  link: string;
}

interface InputList {
  keywords: string[];
  developers: string[];
  links: string[];
}

const FormModal: React.FC<Props> = ({ open, setOpen }) => {
  const [input, setInput] = useState<FormInput>({
    keyword: "",
    developer: "",
    link: "",
  });

  const [inputList, setInputList] = useState<InputList>({
    keywords: [],
    developers: [],
    links: [],
  });

  console.log(inputList);
  const handleAddInput = (
    e: FormEvent,
    inputType: keyof FormInput,
    inputListType: keyof InputList
  ) => {
    e.preventDefault();

    if (input[inputType].trim() !== "") {
      setInputList((prev) => ({
        ...prev,
        [inputListType]: [
          ...(prev[inputListType] || []),
          input[inputType].trim(),
        ],
      }));

      setInput({
        ...input,
        [inputType]: "",
      });
    }
  };

  const handleRemoveInput = (type: string, index: number) => {
    setInputList((prev) => ({
      ...prev,
      [type]: prev[type as keyof InputList].filter((_, i) => i !== index),
    }));
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
              <Dialog.Panel className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6 ">
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
                    <form className="mt-2  space-y-3 w-full">
                      <input
                        placeholder="Name of innovation/technology"
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
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                        defaultValue={""}
                      />
                      <textarea
                        placeholder="Key Benefits"
                        rows={2}
                        name="key-benefits"
                        id="key-benefits"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                        defaultValue={""}
                      />

                      <div className="flex items-center space-x-2">
                        <div className="flex  max-w-min rounded-md border  ">
                          <input
                            value={input.keyword}
                            onChange={(e) =>
                              setInput({ ...input, keyword: e.target.value })
                            }
                            placeholder="Add Keyword"
                            className="block  rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm  ring-inset placeholder:text-gray-400 focus:ring-0 ring-0 sm:text-sm sm:leading-6"
                          />
                          <button
                            onClick={(e) =>
                              handleAddInput(e, "keyword", "keywords")
                            }
                            className="border-2 border-dotted border-stone-200 py-1 px-1 rounded-md hover:border-[#1391B3]"
                          >
                            <Plus size={20} color="#d6cdcd" />
                          </button>
                        </div>
                        <div className="grid grid-cols-3 grid-rows-3 gap-1 ">
                          {inputList.keywords.map((item, index) => (
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
                                onClick={() =>
                                  handleRemoveInput("keywords", index)
                                }
                              />
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex  max-w-min rounded-md border  ">
                          <input
                            value={input.developer}
                            onChange={(e) =>
                              setInput({
                                ...input,
                                developer: e.target.value,
                              })
                            }
                            placeholder="Add Developer"
                            className="block  rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm  ring-inset placeholder:text-gray-400 focus:ring-0 ring-0 sm:text-sm sm:leading-6"
                          />
                          <button
                            onClick={(e) =>
                              handleAddInput(e, "developer", "developers")
                            }
                            className="border-2 border-dotted border-stone-200 py-1 px-1 rounded-md hover:border-[#1391B3]"
                          >
                            <Plus size={20} color="#d6cdcd" />
                          </button>
                        </div>
                        <div className="grid grid-cols-3 grid-rows-3 gap-1 ">
                          {inputList.developers.map((item, index) => (
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
                                onClick={() =>
                                  handleRemoveInput("developers", index)
                                }
                              />
                            </span>
                          ))}
                        </div>
                      </div>
                      <select
                        id="location"
                        name="location"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                        defaultValue="--select category--"
                      >
                        <option>--Select status---</option>
                        <option>Research</option>
                        <option>Development</option>
                        <option>Internship</option>
                        <option>Training</option>
                        <option>Course development</option>
                        <option>Innovation</option>
                        <option>Commercialism</option>
                        <option>Multi-purpose</option>
                      </select>
                      <select
                        id="location"
                        name="location"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                        defaultValue="--select partner type---"
                      >
                        <option>--Select industry---</option>
                        <option>Local Company</option>
                        <option>Foreign Entity</option>
                        <option>Ministry</option>
                        <option>Department or Agency of Government</option>
                      </select>

                      <input
                        placeholder="Industry"
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                      />
                      <textarea
                        placeholder="Application and Market Utility"
                        rows={2}
                        name="application-and-market-utility"
                        id="application-and-market-utility"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                        defaultValue={""}
                      />
                      <div className="flex items-center  space-x-2">
                        <div className="flex  max-w-min rounded-md border  ">
                          <input
                            value={input.link}
                            onChange={(e) =>
                              setInput({ ...input, link: e.target.value })
                            }
                            placeholder="Add links"
                            className="block  rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm  ring-inset placeholder:text-gray-400 focus:ring-0 ring-0 sm:text-sm sm:leading-6"
                          />
                          <button
                            onClick={(e) => handleAddInput(e, "link", "links")}
                            className="border-2 border-dotted border-stone-200 py-1 px-1 rounded-md hover:border-[#1391B3]"
                          >
                            <Plus size={20} color="#d6cdcd" />
                          </button>
                        </div>

                        <div className="grid grid-cols-3 grid-rows-3 gap-1 ">
                          {inputList.links.map((item, index) => (
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
                                onClick={() =>
                                  handleRemoveInput("links", index)
                                }
                              />
                            </span>
                          ))}
                        </div>
                      </div>

                      <input
                        placeholder="email"
                        className="block  w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                      />

                      <input
                        placeholder="contact"
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                      />
                      <div className="">
                        <div className="flex items-center space-x-3">
                          <label
                            id="input-file"
                            className="cursor-pointer border-dotted border-2 w-10 h-10  flex items-center justify-center "
                          >
                            <input
                              id="input-file"
                              className="hidden"
                              type="file"
                              multiple
                            />
                            <Plus size={20} color="#d6cdcd" />
                          </label>

                          <span className="text-[#9F9F9F]">Add 3 images</span>
                        </div>
                      </div>

                      <button className="block w-full rounded-md border-0 py-1.5 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-[#153D6D]">
                        Submit
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
