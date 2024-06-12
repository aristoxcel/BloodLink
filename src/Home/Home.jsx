import { Helmet } from "react-helmet-async"
import Banner from "../Components/Banner"
import Consult from "./Consult"
import Content from "./Content"
import Network from "./Network"



function Home() {
  return (
    <div>
      <Helmet>
        <title>BloodLink</title>
      </Helmet>
      <Banner/>
      <Content/>
      <Network/>
      <Consult/>
 
    </div>
  )
}

export default Home