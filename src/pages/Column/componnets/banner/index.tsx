import React from 'react';
import {BannerWrapper} from "./style";
import {Button} from "antd";

const Banner = () => {
    return (
        <BannerWrapper>
            <div className='leftBanner'>
                <img src='/images/columnBanner.jpg' alt=""/>
            </div>
            <div className='rightBanner'>
                <div className='r-title'>Unite Shanghai</div>
                <div className='r-title'>2024</div>
                <div className='r-time'>2024年7月23日-25日</div>
                <div className='r-content'>门票限时优惠中</div>
                <Button type='primary' className='r-btn'>立即购票</Button>
            </div>
        </BannerWrapper>
    )
}

export default Banner;