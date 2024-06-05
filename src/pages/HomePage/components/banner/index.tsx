import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {Carousel, Popover} from "antd";
import {BannerWrapper} from "./style";
import axios from "axios";
import {FireFilled} from "@ant-design/icons";
const Banner = () => {
    type banner = {
        id: string,
        src: string,
    }
    type hot = {
        id:string,
        title:string,
        content:string,
        tag:string[],
        img:string
    }
    const [bannerList, setBannerList] = useState<banner[]>([]);
    const [hotList, setHotList] = useState<hot[]>([]);

    useEffect(() => {
        // 请求轮播图数据
        axios.get('/json/banner.json').then(res=>{
            setBannerList(res.data);
        })
        axios.get('/json/hotArticle.json').then(res=>{
            setHotList(res.data);
        })
        // 请求热门商品数据
    }, []);

    const navigate = useNavigate()
    function navigatorToNewTab(path:string):void{
        const newTab = window.open(path,"_blank");
        // @ts-ignore
        newTab.focus();
    }
    return (
        <BannerWrapper>
            <div className='container'>
                <div className='banner'>
                    <Carousel autoplay autoplaySpeed={5000}  style={{width:"600px",height:"400px"}}>
                        {bannerList.map(item=>{

                            return (
                                <div className='bannerItem' key={item.id}>
                                    <img   src={item.src} alt={item.src}/>
                                </div>
                            )
                        })}
                    </Carousel>
                    <div className='hotList'>
                        {hotList.map((item)=>{
                            return (
                                <div className='hotListItem' key={item.id} onClick={()=>navigatorToNewTab('/article/'+item.id)}>
                                    <Popover content={item.title} trigger="hover">
                                        <FireFilled style={{fontSize:'20px'}}/><h3 className='title'>{item.title}</h3>
                                    </Popover>
                                    <p className='content'>{item.content}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </BannerWrapper>

    );
}

export default Banner;