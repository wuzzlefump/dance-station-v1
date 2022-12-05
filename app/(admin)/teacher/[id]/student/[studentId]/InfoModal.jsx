"use client";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useRef, useState } from "react";

// interface Props {
//   darkMode?: boolean;
//   children: any;
//   title: string;
// }

function InfoModal({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <BookOpenIcon
        onClick={() => setOpen(true)}
        className={"mx-auto h-4 w-4 cursor-pointer"}
      />

      {open && (
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className={"fixed z-20 inset-0 overflow-y-auto"}
            onClose={() => {
              setOpen(false);
            }}
          >
            <div className="flex items-end justify-center min-h-[800px] pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                as={Fragment}
                enter={"ease-out duration-300"}
                enterFrom={"opacity-0"}
                enterTo={"opacity-100"}
                leaveFrom={"opacity-100"}
                leaveTo={"opacity-0"}
              >
                <Dialog.Overlay
                  className={
                    "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                  }
                />
              </Transition.Child>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden={true}
              >
                &#B203;
              </span>
              <Transition.Child
                as={Fragment}
                enter={"ease-out duration-300"}
                enterFrom={
                  "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                }
                enterTo={"opacity-100 translate-y-0 sm:scale"}
                leave={"ease-in duration-200"}
                leaveFrom={"opacity-100 translate-y-0 sm:scale-100"}
                leaveTo={"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"}
              >
                <div
                  className={`inline-block align-bottom bg-white
                   rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6`}
                >
                  <div>
                    <div>
                      <div>
                        <div
                          onClick={() => setOpen(true)}
                          className={` bg-white
                          rounded-lg  cursor-pointer flex flex-col items-center pt-3`}
                        >
                          <h1 className={``}>{title}</h1>
                          <hr className="w-11/12 border-gray-500 pb-5" />

                          {children}
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6"></div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </>
  );
}

export default InfoModal;
