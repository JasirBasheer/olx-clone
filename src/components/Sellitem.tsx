import { useContext, useEffect, useReducer, useState } from "react";
import { IoClose } from "react-icons/io5";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { fetchItemsFromFireStore, firestore } from "../firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import { AuthContextType, userAuth } from "../context/authContext";
import { ItemContext } from "../context/itemsContext"
import { validateCategory, validateDescription, validateImage, validatePrice, validateTitle } from '../validation/validation'


const actions = {
    setTitle: "setTitle",
    setCategory: "setCategory",
    setPrice: "setPrice",
    setDescription: "setDescription",
    setImage: "setImage"
}

type State = {
    title: string,
    category: string,
    price: string,
    description: string,
    image: any
}


type Action = { type: string; payload?: any };


const initialValues: State = {
    title: "",
    category: "",
    price: "",
    description: "",
    image: null
};


function reducer(state: State, action: Action): State {
    switch (action.type) {
        case actions.setTitle:
            return { ...state, title: action.payload };
        case actions.setCategory:
            return { ...state, category: action.payload };
        case actions.setPrice:
            return { ...state, price: action.payload };
        case actions.setDescription:
            return { ...state, description: action.payload };
        case actions.setImage:
            return { ...state, image: action.payload };
        default:
            return state;
    }
}




interface SellitemProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sellitem: React.FC<SellitemProps> = ({ isOpen, onClose }) => {
    const seller: AuthContextType | null = userAuth()
    const [isLoading, setIsLoading] = useState<Boolean>(false)
    const { setItems } = useContext(ItemContext)


    useEffect(() => {
        console.log(isOpen)
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    async function uploadImageToFirebase(imageFile: any) {
        try {
            const storage = getStorage();
            const timestamp = new Date().getTime();
            const fileName = `${timestamp}_${imageFile.name}`;
            const storageRef = ref(storage, `Images/${fileName}`);
            const snapshot = await uploadBytes(storageRef, imageFile);
            const downloadURL = await getDownloadURL(snapshot.ref);

            return {
                success: true,
                url: downloadURL,
                path: snapshot.ref.fullPath,
                fileName: fileName,
            };
        } catch (error: any) {
            console.error('Error uploading image:', error);
            return {
                success: false,
                error: error.message,
                errorCode: error.code,
                errorDetails: error,
            };
        }
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateTitle(value.title)) return
        if (!validateCategory(value.category)) return
        if (!validatePrice(value.price)) return
        if (!validateDescription(value.description)) return
        if (!validateImage(value.image)) return

        setIsLoading(true)
        try {
            if (value.image) {
                const imageUrl = await uploadImageToFirebase(value.image);
                if (imageUrl.success) {
                    const ProductRef = collection(firestore, 'Products');
                    await addDoc(ProductRef, {
                        title: value.title,
                        category: value.category,
                        price: value.price,
                        description: value.description,
                        image: imageUrl.url,
                        seller: seller?.user?.displayName,
                        date: new Date().toISOString()
                    });


                    const data = await fetchItemsFromFireStore()
                    setItems(data)
                    onClose()

                } else {
                    console.error('Failed to upload image:', imageUrl.error);
                }
            }
        } catch (error) {
            console.error('Error adding document:', error);
        }
    };




    const [value, dispatch] = useReducer(reducer, initialValues)

    return (
        <>

            <div
                className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center"
                onClick={onClose}
            >

                <div
                    className="bg-white rounded-sm p-3 w-[350px] relative z-50 h-[38rem] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >

                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                    >
                        <IoClose className="text-2xl" />
                    </button>

                    <h1 className="mt-7 ml-5 font-bold text-[1.2rem]">Sell item</h1>



                    <div className="p-5" >
                        <div className="pt-2 w-full relative">
                            <input onChange={(e) => dispatch({ type: actions.setTitle, payload: e.target.value })} id="title" value={value?.title} className="w-full border-2 border-black rounded-md p-6 pt-4 pb-2 focus:outline-none peer" placeholder=" " type="text" required />
                            <label htmlFor="title" className="absolute pl-1 pr-1 left-2.5 top-0 bg-white text-sm peer-focus:top-0 peer-focus:text-sm transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-5 ">Title</label>
                        </div>

                        <div className="pt-2 w-full relative">
                            <input onChange={(e) => dispatch({ type: actions.setCategory, payload: e.target.value })} id="Category" className="w-full border-2 border-black rounded-md p-6 pt-4 pb-2 focus:outline-none peer" placeholder=" " type="text" required />
                            <label htmlFor="title" className="absolute pl-1 pr-1 left-2.5 top-0 bg-white text-sm peer-focus:top-0 peer-focus:text-sm transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-5 ">Category</label>
                        </div>

                        <div className="pt-2 w-full relative">
                            <input onChange={(e) => dispatch({ type: actions.setPrice, payload: e.target.value })} id="price" className="w-full border-2 border-black rounded-md p-6 pt-4 pb-2 focus:outline-none peer" placeholder=" " type="text" required />
                            <label htmlFor="title" className="absolute pl-1 pr-1 left-2.5 top-0 bg-white text-sm peer-focus:top-0 peer-focus:text-sm transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-5 ">Price</label>
                        </div>

                        <div className="pt-2 w-full relative">
                            <input onChange={(e) => dispatch({ type: actions.setDescription, payload: e.target.value })} id="description" className="w-full border-2 border-black rounded-md p-6 pt-4 pb-2 focus:outline-none peer" placeholder=" " type="text" required />
                            <label htmlFor="title" className="absolute pl-1 pr-1 left-2.5 top-0 bg-white text-sm peer-focus:top-0 peer-focus:text-sm transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-5 ">Description</label>
                        </div>

                        <div className="pt-2 w-full h-[11rem] relative">
                            <input
                                onChange={(e) => {
                                    if (e.target && e.target.files && e.target.files.length > 0) {
                                        dispatch({ type: actions.setImage, payload: e.target.files[0] });
                                    }
                                }}

                                id="image"
                                className="w-full border-2 border-black h-[11rem] rounded-md p-6 pt-6 pb-2 focus:outline-none peer file:hidden text-[0px] file:text-[0px] hover:cursor-pointer"
                                placeholder=" "
                                type="file"
                                required
                            />
                            {

                                value.image ? (
                                    <img src={value.image ? URL.createObjectURL(value.image) : ""}
                                        className="absolute w-[14rem] h-[11rem] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain"
                                        alt="" />
                                ) : (
                                    <>
                                        <img src="/fileUpload.svg" className="absolute  w-[61px] top-14 left-[6.5rem]" alt="" />
                                        <p className="absolute text-[0.6rem] top-[7rem] left-[5.3rem]">Click to upload images</p>
                                        <p className="absolute text-[0.6rem] top-[7.8rem] left-[6.5rem]">SVG,PNG,JPG</p>
                                    </>
                                )
                            }

                            <label
                                htmlFor="title"
                                className="absolute pl-1 pr-1 left-2.5 top-0 bg-white text-sm peer-focus:top-0 peer-focus:text-sm transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-8"
                            >
                                Title
                            </label>
                            {isLoading ?
                                (

                                    <img src="/loading.gif" className="w-[7rem] my-2 h-15 ml-[4.9rem] rounded items-center bg-slate-400" alt="" />

                                )
                                : (
                                    <button onClick={(e) => handleSubmit(e)} style={{ backgroundColor: 'rgb(0, 47, 52)', color: "white" }} className="w-[18rem] my-2 h-11 mb-3 rounded items-center bg-slate-400">Submit</button>
                                )
                            }
                        </div>



                    </div>



                </div>
            </div>
        </>
    );
}

export default Sellitem