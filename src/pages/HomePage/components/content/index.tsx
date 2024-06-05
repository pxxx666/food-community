import React,{useState,useEffect} from 'react';
import {ContentWrapper} from "./style";
import {Alert, Avatar, List} from "antd";

import LeftMain from "./comopnents/leftMain";
import axios from "axios";
type user ={
    no:number,
    name:string,
    score:string
}

const Content = () => {
    const data:user[] = [
        {
            no:1,
            name: '张三',
            score:'+345'
        },
        {
            no:2,
            name: 'lisi',
            score:'+335'
        },
        {
            no:3,
            name: 'wangwu',
            score:'+325'
        },
        {
            no:4,
            name: 'dz666',
            score:'+315'
        },
        {
            no:5,
            name: 'askdk',
            score:'+305'
        },
        {
            no:6,
            name: 'okcojo',
            score:'+295'
        },        {
            no:7,
            name: 'ncnka',
            score:'+285'
        },        {
            no:8,
            name: 'pckln',
            score:'+275'
        },        {
            no:9,
            name: 'ncman',
            score:'+265'
        }
    ];

    return (
        <ContentWrapper>
            <div className='inform'>
                <Alert message="开发者社区首页、文章模板改版啦！~欢迎您移步至【建议与反馈】专区提供宝贵建议~" type="info" showIcon closable/>
            </div>
            <div className='main'>
                <LeftMain></LeftMain>
                <div className='rightMain'>
                    <div className='roleList'>

                        <div className='roleItem active'>博主榜</div>
                        <div className='roleItem'>答主榜</div>
                        <div className='roleItem'>讲师榜</div>
                        <div className='roleItem'>全能榜</div>

                    </div>
                    <div className='timeList'>
                        <div className='title'>
                            <div className='item active borderRight' >本月</div>
                            <div className='item borderRight'>季度</div>
                            <div className='item borderRight'>年度</div>
                            <div className='item'>总榜</div>
                            <div >*每月结算一次</div>
                        </div>

                        <List
                            className='ranking'
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={(item, index) => (
                                <List.Item className='user'>
                                    <div>{item.no}</div>
                                    <List.Item.Meta
                                        className='name'
                                        avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                                        title={<a href="#">{item.name}</a>}
                                    />
                                    <div>{item.score}</div>
                                </List.Item>
                            )}
                        />


                    </div>

                </div>

            </div>
        </ContentWrapper>
    );
};

export default Content;