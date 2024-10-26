import { useLocation } from 'react-router-dom'
import { FaRegHeart, FaShareAlt } from "react-icons/fa";

interface Product {
    image: string;
    price: string;
    title: string;
    description: string;
    seller: string;
    date: string;
}

const ItemDetails: React.FC = () => {
    const location = useLocation()
    const { product } = location.state as { product: Product } || {};

    return (
        <div className='grid sm:grid-cols-10  p-6 sm:p-[6rem] sm:px-27 sm:mt-0 mt-[9rem] gap-4  mb-16' style={{ backgroundColor: "#F2F4F5" }}>
            <div className="sm:col-span-7 ml-11  ">
                <div className="w-fill bg-black sm:h-[27rem] flex items-center justify-center">
                    <img src={product.image} className='object-contain h-full w-full"' alt="" />
                </div>
                <div className="sm:h-[13rem] shadow mt-5 rounded-[0.23rem] border-gray-400 border-[1px] p-4">
                    <div className="">
                        <h6 className='text-[1.3rem] font-bold mt-1' style={{ color: "rgb(0,47,52)" }}>Details</h6>
                        <p className='text-[1rem] font-normal ' style={{ color: "rgb(0,47,52)" }} >Item : <span className='text-[1rem] ml-[14rem] font-normal ' style={{ color: "rgb(0,47,52)" }}> {product.title}</span></p>
                    </div>
                    <div className="border-gray-400 border-t-[1px] py-6 mt-5">
                        <h6 className='text-[1.2rem] font-bold mt-1' style={{ color: "rgb(0,47,52)" }}>Description</h6>
                        <p className='text-[1rem] font-normal mt-1' style={{ color: "rgb(0,47,52)" }}>{product.description}</p>

                    </div>
                </div>

            </div>

            <div className="sm:col-span-3 ">
                <div className="border-gray-400 border-[1px] shadow rounded-[0.23rem] h-[10rem] p-4">
                    <div className="flex items-center justify-between">
                        <p className="text-[1.5rem] font-bold mt-1 " style={{ color: "rgb(0,47,52)" }}>₹ {product.price}</p>
                        <div className="flex justify-between w-16">
                            <FaShareAlt />
                            <FaRegHeart />
                        </div>

                    </div>
                    <p className="text-[1.3rem] font-bold mt-1 " style={{ color: "rgb(0,47,52)" }} >{product.title}</p>
                    <p className="text-[1rem] font-normal mt-1 " style={{ color: "rgb(0,47,52)" }}>{product.description}</p>
                    <p className="text-[0.7rem] font-normal mt-1 " style={{ color: "rgb(0,47,52)" }} >
                        {new Date(product.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
                    </p>
                </div>
                <div className="border-gray-400 mt-3 border-[1px]  shadow rounded-[0.23rem] h-[10rem] p-4">
                    <div className="flex items-center">
                        <img className='w-14' src="/avatar.png" alt="" />
                        <h6 className="text-[1.3rem] font-bold ml-2 text-teal-900" >{product.seller}</h6>
                    </div>
                    <div
                        className='w-fill h-[3rem] mt-3 rounded-[0.3rem] font-bold cursor-pointer flex items-center justify-center border-[2px] hover:border-[4px] border-teal-900 hover:border-teal-700'
                    >Chat with seller</div>

                </div>

                <div className="border-gray-400 border-[1px] mt-5 shadow rounded-[0.23rem] p-5 h-[7rem]">
                    <h6 className='font-bold text-[1.3rem] text-teal-900'>Posted in</h6>
                    <p className='text-teal-900 mt-3 font-bold text-[0.9rem]'>{new Date(product.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}</p>
                </div>

            </div>

        </div>
    )
}

export default ItemDetails