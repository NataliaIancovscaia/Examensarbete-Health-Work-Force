
import HeroSection from "../components/Herosection";
import JobMenu from "../components/JobMenu";
import NavigationBar from "../components/NavigationBar"



const Home = () => {
  return (
    <div >
     <NavigationBar />
     <HeroSection/>
     <JobMenu/>
    </div>
  )
}

export default Home;