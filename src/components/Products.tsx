import { useContext } from "react";
import { ItemContext } from "../context/itemsContext"
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Product {
  image: string;
  price: string;
  title: string;
  description: string;
  seller: string;
  date: string;
}

interface ItemContextType {
  items: Product[]
}

const Products: React.FC = () => {
  const { items } = useContext<ItemContextType>(ItemContext);

  return (
    <div className="flex flex-col items-center justify-center my-[6rem]">
      <h6 className="self-start ml-[4rem] sm:ml-[10.4rem] font-medium text-[1.5rem]">Fresh recommendations</h6>
      <div className="grid sm:grid-cols-8">
        {items?.map((product: Product, index: number) => {
          return (
            <Link to={'/details'} state={{ product }} key={index} className="sm:col-span-2  cursor-pointer w-[18rem] border-[1px] rounded-[0.3rem] border-slate-400 h-[19rem] ml-5 mt-5 p-2">

              <div className=" relative  w-fill flex flex-col items-center justify-start h-[11rem] overflow-hidden">
                <img
                  src={product.image}
                  className="object-contain w-full h-full"
                  alt=""
                />
                <div className="absolute flex items-center justify-center top-3 right-2 bg-slate-50 rounded-[8rem] shadow-md cursor-pointer w-9 h-8">
                  <FaRegHeart />

                </div>
              </div>
              <div className="ml-2 mt-3">

                <p className="text-[1.2rem] font-bold " style={{ color: "rgb(0,47,52)" }}>₹ {product.price}</p>
                <p style={{ color: "rgb(0,47,52)" }}>{product.title}</p>
                <p style={{ color: "rgb(0,47,52)" }} className="max-w-[16rem] text-[1rem] overflow-hidden whitespace-nowrap text-ellipsis">{product.description}</p>
                <div className="flex justify-between">
                  <p className="text-[0.7rem] font-normal mt-1 " style={{ color: "rgb(0,47,52)" }} >{product.seller}</p>
                  <p className="text-[0.7rem] font-normal mt-1 " style={{ color: "rgb(0,47,52)" }} >
                    {new Date(product.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
                  </p>
                </div>
              </div>

            </Link>

          );
        })}
      </div>
    </div>
  )
}

export default Products