import NavBar from "./components/NavBar"
import Buy from "./components/Buy"
import Sell from "./components/Sell"
import Footer from "./components/Footer"

export default function App() {
  return (
    <>
    <div>
      <NavBar />
    </div>
    <div>
      <Buy />
    </div>
    <div>
      <Sell/>
    </div>
    <div>
      <Footer />
    </div>
    </>
  )
}