import React, { useEffect } from 'react';
import { IoClose } from "react-icons/io5";
import { Carousel } from "flowbite-react";
import { auth, firestore, provider } from "../firebase/firebase"
import { signInWithPopup } from "firebase/auth";
import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore';


interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {


  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const usersRef = collection(firestore, 'users');
      const userDoc = await getDocs(query(usersRef, where('id', '==', result.user.uid)));

      if (userDoc.empty) {
        await addDoc(usersRef, {
          id: result.user.uid,
          username: result.user.displayName,
          email: result.user.email,
          createdAt: serverTimestamp()
        });
      }

      onClose();
    } catch (error: any) {
      console.error("Error signing in:", error);
    }
  };


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;


  return (
    <>

      <div
        className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center"
        onClick={onClose}
      >

        <div
          className="bg-white rounded-sm p-8 w-[420px] max-w-md relative z-50 h-[37rem] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >

          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          >
            <IoClose className="text-2xl" />
          </button>


          <div className="">
            <div className="h-56 sm:h-64 xl:h-80 2xl:h-[13rem]">
              <Carousel slide={false} theme={{
                "indicators": {
                  "active": {
                    "off": "bg-gray-300",
                    "on": "bg-teal-300"
                  },
                  "base": "h-2 w-2 rounded-full",
                  "wrapper": "absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-3"
                },
                "scrollContainer": {
                  "base": "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth",
                  "snap": "snap-x"
                }, "control": {
                  "base": "inline-flex items-center justify-center bg-transparent",
                  "icon": "w-8 text-black"
                }
              }}>

                <div className=" flex flex-col  justify-center items-center">
                  < img src="/guita.png" className='w-[6rem]' alt="..." />
                  <p className='w-60 sm:w-72 text-center pb-5 font-semibold'>Help us become one of the safest places to buy and sell</p>
                </div>
                <div className=" flex flex-col  justify-center items-center">
                  < img src="/love.png" className='w-[6rem]' alt="..." />
                  <p className='w-60 sm:w-72 text-center pb-5 font-semibold'>Close deals from the comfort of your home.</p>
                </div>
                <div className=" flex flex-col  justify-center items-center">
                  < img src="/avatar.png" className='w-[6rem]' alt="..." />
                  <p className='w-60 sm:w-72 text-center pb-5 font-semibold'>Keep all your favourates in one place.</p>
                </div>
              </Carousel>
            </div>

            <div className="">
              <div className=" cursor-pointer flex border-[3px] rounded-md border-black p-2 mt-9">
                <img src="/mobile.svg" className='w-[20px] mx-3' alt="" />
                <p>Continue with phone</p>
              </div>
              <div onClick={handleGoogleLogin} className="border-2 cursor-pointer flex rounded-md border-black p-2 mt-3">
                <img src="/google.png" className='w-[25px] mx-3' alt="" />
                <p>Continue with Google</p>
              </div>
              <div className="flex flex-col  justify-center items-center mt-6 ">
                <p className='font-bold text-[14px]'>OR</p>
                <h3 className='cursor-pointer text-[14px] mt-2 font-bold underline underline-offset-4'>Login with Email</h3>
              </div>
              <div className="flex flex-col  justify-center items-center mt-12">

                <p className='text-[11px]'>All your personal details are safe with us.</p>
                <p className='text-[10px] text-center mt-3 w-[310px]'>If you continue, you are accepting OLX Terms and Conditions and Privacy Policy</p>
              </div>

            </div>

          </div>


        </div>
      </div>
    </>
  );
};

export default Login;
