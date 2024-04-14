import Hero from "../components/Hero";
import PlanTrip from "../components/PlanTrip";
import Banner from "../components/Banner";
import ChooseUs from "../components/ChooseUs";
import Faq from "../components/Faq";
import Footer from "../components/Footer";
import { useAuth } from "../components/cotext/auth";
import { useEffect } from "react";

function Home() {

  const [auth ,setauth] = useAuth();

  return (
    <>
        <Hero />
     
      <PlanTrip />
      
      <Banner />
      <ChooseUs />
      <Faq />
      <Footer />
    </>
  );
}

export default Home;
