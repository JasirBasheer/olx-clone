import { collection, getDocs } from "firebase/firestore"
import React, { createContext, useEffect, useState } from "react"
import { firestore } from "../firebase/firebase"

export const ItemContext = createContext<any>(null)
interface ItemContextProps {
    children: React.ReactNode
}


interface Product {
    image: string;
    price: string;
    title: string;
    description: string;
    seller: string;
    date: string;
}

export const ItemsContextProvider: React.FC<ItemContextProps> = ({ children }) => {
    const [items, setItems] = useState<Product[]>([])

    useEffect(() => {
        const fetchItemsFromFireSrote = async () => {
            try {
                const productsCollection = collection(firestore, 'Products');
                const productsSnapshot = await getDocs(productsCollection);
                const productsList: any = productsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setItems(productsList)
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        }
        fetchItemsFromFireSrote()
    }, [])


    return (
        <ItemContext.Provider value={{ items, setItems }}>
            {children}
        </ItemContext.Provider>
    )
}

export default ItemsContextProvider