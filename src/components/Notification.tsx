import * as React from "react";
import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
interface Props {
  prompt: string;
  showNotification: boolean;
  setShowNotification: (boolean: boolean) => void;
}

const Notification = ({
  prompt,
  showNotification,
  setShowNotification,
}: Props) => {
  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0   flex  px-4 py-6  sm:p-6 z-50"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end ">
        <Transition
          show={showNotification}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={`pointer-events-auto w-full max-w-lg overflow-hidden rounded-lg ${
              prompt ===
              "Form received! Your meeting request is in process. Expect confirmation shortly. Thanks!"
                ? "bg-green-50"
                : "bg-red-50 "
            }  shadow-lg ring-1 ring-black ring-opacity-5`}
          >
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {prompt ===
                    "Form received! Your meeting request is in process. Expect confirmation shortly. Thanks!" && (
                    <CheckCircleIcon
                      className="h-5 w-5 text-green-400"
                      aria-hidden="true"
                    />
                  )}
                  {prompt === "Something went wrong" && (
                    <ExclamationCircleIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900">{prompt}</p>
                </div>
                <div className="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    className={`inline-flex rounded-md ${
                      prompt ===
                      "Form received! Your meeting request is in process. Expect confirmation shortly. Thanks!"
                        ? "text-green-400"
                        : "text-red-400 "
                    }  hover:text-gray-500 focus:outline-none focus:ring-2  focus:ring-offset-2`}
                    onClick={() => {
                      setShowNotification(false);
                    }}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default Notification;
