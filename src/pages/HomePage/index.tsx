import React from "react";
import {HomeWrapper} from "./style";
import Banner from "./components/banner";
import Content from "./components/content";

const HomePage: React.FC = () => {

      return (
          <HomeWrapper>
              <Banner></Banner>
              <Content></Content>
          </HomeWrapper>


      )
};

export default HomePage;
