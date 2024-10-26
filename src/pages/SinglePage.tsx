import React, { Suspense } from 'react';
import Footer from '../components/Footer'
import Header from '../components/Header'
import Category from '../components/Category'
const ItemDetails = React.lazy(()=> import('../components/ItemDetails'))
const SinglePage:React.FC = () => {
  return (
    < div style={{backgroundColor:"#F2F4F5"}}>
    <Header />
    <Category/>
    <Suspense fallback={<div>Loading...</div>}>
        <ItemDetails />
      </Suspense>
    <Footer/>
    </div>
  )
}

export default SinglePage