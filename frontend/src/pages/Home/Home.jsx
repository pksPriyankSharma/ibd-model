import React, { useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
// import FindDoctor from "../../components/FindDoctor/FindDoctor";
// import Card from "../../components/Card/Card";
import ExploreDoctor from "../../components/ExploreDoctor/ExploreDoctor";
// import data from "../../db";
const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <ExploreDoctor category={category} setCategory={setCategory} />
      {/* <FindDoctor /> */}
      {/* {data.map((doctor) => (
        <Card
          key={doctor.id}
          name={doctor.name}
          specialist={doctor.specialist}
          experience={doctor.experience}
          fees={doctor.fees}
        />
      ))} */}
      {/* <Card /> */}
    </div>
  );
};

export default Home;
