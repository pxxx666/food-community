
import React ,{useEffect}from 'react';
import {useSelector,useDispatch} from "react-redux";
import {Layout} from 'antd';
import {Outlet} from "react-router-dom";
import LayoutNav from "./components/layoutNav";
import axios from "axios";
import {getArticleData} from "../store/features/articleDataSlice";

const LayoutPage: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get('/json/articleData.json').then(res=>{
            dispatch(getArticleData(res.data))
        })
    }, []);
  return (
          <Layout>
              <LayoutNav></LayoutNav>
              <Outlet></Outlet>
          </Layout>

  );
};

export default LayoutPage;