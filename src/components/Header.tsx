import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoMenuOutline } from "react-icons/io5";
import { IoIosArrowDown, IoMdCheckmark } from "react-icons/io";
import { SlLocationPin } from "react-icons/sl";
import Login from './Login';
import { userAuth, AuthContextType } from "../context/authContext"
import Sellitem from './Sellitem';
import { Link } from 'react-router-dom';

type LanguageType = 'ENGLISH' | 'हिंदी';
type PlaceType = 'Kerala' | 'Mumbai' | 'Delhi';


const Header: React.FC = () => {
  const [click, setClick] = useState<boolean>(false);
  const [isSellClicked, setisSellClicked] = useState<boolean>(false);
  const [language, setLanguage] = useState<LanguageType>('ENGLISH');
  const [inpclick, setInpclick] = useState<boolean>(false);
  const [place, setPlace] = useState<PlaceType>('Delhi');
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const auth: AuthContextType | null = userAuth()

  console.log(auth)


  const handlePlaceChange = (selectedplace: PlaceType): void => {
    setPlace(selectedplace);
    setInpclick(prev => !prev);
  };

  const handleLanguageChange = (selectedLanguage: LanguageType): void => {
    setLanguage(selectedLanguage);
    setClick(prev => !prev);
  };

  return (<>

    <div className='fixed top-0 left-0 w-full bg-gray-100 grid grid-cols-10 z-50'>
      <div className="col-span-8 flex items-center">
        <IoMenuOutline className="absolute left-4 top-5 text-3xl md:hidden text-gray-500" />
        <Link to={'/'}>
          <img className='p-4 w-20 cursor-pointer' src="/olx-logo.png" alt="olx logo" />
        </Link>
        <div className="relative sm:block hidden mr-3">
          <input
            type="text"
            onClick={() => setInpclick(prev => !prev)}
            value={place}
            placeholder='Search city,area or locality'
            className='px-10 w-[270px] outline-none focus:border-teal-400 h-12 border-2 rounded border-black'
          />
          <FaSearch className="absolute left-3 top-4 text-gray-500" />
          <IoIosArrowDown
            onClick={() => setInpclick(prev => !prev)}
            style={{ fontWeight: '100', opacity: 0.7 }}
            className={`absolute right-3 top-3 transition-transform duration-500 text-2xl ${inpclick ? 'rotate-180' : 'rotate-0'}`}
          />

          {inpclick && (
            <ul className="absolute sm:block hidden bg-white shadow-lg rounded-md mt-0 w-[270px]">
              {(['Delhi', 'Kerala', 'Mumbai'] as PlaceType[]).map((placeOption) => (
                <li
                  key={placeOption}
                  className={`px-4 py-2 hover:bg-teal-200 cursor-pointer flex items-center ${place === placeOption ? 'bg-slate-300' : ''}`}
                  onClick={() => handlePlaceChange(placeOption)}
                >
                  <SlLocationPin className='mr-3' /> {placeOption}
                </li>
              ))}
            </ul>
          )}
        </div>
        <input
          type="text"
          placeholder='Find Cars,Mobile Phones and More...'
          className='sm:w-[771px] w-[751px] rounded-tl sm:ml-0 ml-10 rounded-bl px-4 h-12 my-3 outline-none focus:border-teal-400 border-2 border-black'
        />
        <button
          type='submit'
          className='bg-teal-950 sm:w-[51px] w-[11rem] rounded-tr rounded-br h-12'
        >
          <FaSearch className="text-gray-50 ml-4" />
        </button>
      </div>

      <div className="col-span-2 sm:flex hidden  justify-between items-center pr-4">
        <div className="relative">
          <p
            className="cursor-pointer flex items-center"
            onClick={() => setClick(prev => !prev)}
          >
            {language}
            <IoIosArrowDown
              style={{ fontWeight: '100', opacity: 0.7 }}
              className={`transition-transform duration-500 text-3xl ${click ? 'rotate-180' : 'rotate-0'}`}
            />
          </p>

          {click && (
            <ul className="absolute sm:block hidden bg-white shadow-lg rounded-md mt-2 w-auto">
              {(['ENGLISH', 'हिंदी'] as LanguageType[]).map((lang) => (
                <li
                  key={lang}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center"
                  onClick={() => handleLanguageChange(lang)}
                >
                  {lang} {language === lang ? <IoMdCheckmark /> : ''}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="sm:flex hidden items-center space-x-4">
          {auth?.user ? (
            <p className="text-md font-bold cursor-pointer" onClick={auth.logout}> {auth.user.displayName?.split(' ')[0] || 'User'} </p>
          ) : (
            <p onClick={() => setIsLoginOpen(true)} className="text-md font-bold border-b-2 cursor-pointer border-black hover:border-transparent">
              Login
            </p>
          )}

          <div className="relative sm:inline-block hidden ">
            <img src="/addButton.png" className='cursor-pointer w-[97px]' onClick={() => {
              if (auth?.user) {
                setisSellClicked((prev) => (!prev))
              } else {
                setIsLoginOpen((prev) => (!prev))
              }

            }} alt="" />
          </div>
        </div>
      </div>
    </div>
    {isLoginOpen && <Login
      isOpen={isLoginOpen}
      onClose={() => setIsLoginOpen(false)}
    />}
    {isSellClicked && <Sellitem
      isOpen={isSellClicked}
      onClose={() => setisSellClicked(false)}

    />}
  </>

  );
};

export default React.memo(Header)