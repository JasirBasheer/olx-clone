import Footer from '../components/Footer'
import Header from '../components/Header'
import Category from '../components/Category'
import Products from '../components/Products'

const Home:React.FC = () => {
  return (
    <>
    <Header />
    <Category/>
    <Products />
    <Footer/>
    </>
  )
}

export default Home