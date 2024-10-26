import { IoIosArrowDown } from "react-icons/io";


const Category: React.FC = () => {

  return (
    <div className='  sm:flex hidden bg-slate-50 py-1 mt-[4.7rem]  items-center justify-center'>
      <div className="grid bg-white py-2 grid-flow-col auto-cols-max w-full gap-4 items-center justify-center">


        <h6 className='flex items-center text-sm text text-gray-800 font-bold hover:text-gray-900 cursor-pointer'>
          ALL CATEGORIES <IoIosArrowDown />
        </h6>
        <ul>

        </ul>
        <p className="text-sm text-gray-700 hover:text-gray-900 cursor-pointer">Cars</p>
        <p className="text-sm text-gray-700 hover:text-gray-900 cursor-pointer">Motorcycles</p>
        <p className="text-sm text-gray-700 hover:text-gray-900 cursor-pointer">Mobile Phones</p>
        <p className="text-sm text-gray-700 hover:text-gray-900 cursor-pointer">For Sale: Houses & Apartments</p>
        <p className="text-sm text-gray-700 hover:text-gray-900 cursor-pointer">Scooters</p>
        <p className="text-sm text-gray-700 hover:text-gray-900 cursor-pointer">Commercial & Other vehicles</p>
        <p className="text-sm text-gray-700 hover:text-gray-900 cursor-pointer">For Rent: Houses & Apartments</p>
      </div>
    </div>
  )
}

export default Category