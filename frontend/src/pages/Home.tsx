import HeroSection from "../components/HeroSection";
import JobMenu from "../components/JobMenu";
import NavigationBar from "../components/NavigationBar";
import ReviewSlider from "../components/ReviewSlider";

const Home = () => {
  return (
    <div >
     <NavigationBar />
     <HeroSection/>
     <JobMenu/>
     <ReviewSlider/>
    </div>
  )
}

export default Home;