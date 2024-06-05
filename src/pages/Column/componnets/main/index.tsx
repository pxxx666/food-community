import React, {useState,useEffect} from 'react';
import {MainWrapper} from "./style";
import {Menu, MenuProps} from "antd";
import Card from "./myItem";
import MyItem from "./myItem";
import axios from "axios";
type MenuItem = Required<MenuProps>['items'][number];
export type item = {
    id:string,
    title:string,
    subTitle:string,
    img:string,
    date:string,
    type:string
}
const items: MenuItem[] = [
    {
        label: '近期活动',
        key: 'active',
    },
    {
        label: '线上直播',
        key:'live'
    },
    {
        label: '技术开放日',
        key:'open'
    },
    {
        label: 'UUG社区活动',
        key:'community'
    },
    {
        label: '大赛',
        key:'contest'
    },
    {
        label: 'Unite',
        key:'unite'
    }
];
const Main = () => {
    const [current, setCurrent] = useState('active');
    const [currentList, setCurrentList] = useState([]);

    const [allList, setAllList] = useState([]);

    useEffect(() => {
        axios.get('/json/columnData.json').then(res => {
            setAllList(res.data)
            const activeList = res.data.filter((item: item) => item.type === 'active')
            setCurrentList(activeList)
        })
    }, []);
    const checkoutTab = (e:any) => {
        console.log(e.key)
        const newCurrentList = allList.filter((item: item) => item.type === e.key)
        setCurrentList(newCurrentList)
        setCurrent(e.key)
    }
    return (
        <MainWrapper>
            <div >
                <Menu className='tab' onClick={checkoutTab} selectedKeys={[current]} mode="horizontal" items={items} style={{backgroundColor:'rgb(245, 245, 245)'}}/>
            </div>
            {
                currentList.length > 0 ? <div className='itemList'>

                    {
                        currentList.map((item: item)=>{
                            // @ts-ignore
                            return <MyItem key={item.id} option={item}></MyItem>
                        })
                    }
                </div> :
                    <div className='noDep'>
                        <h1 style={{fontSize:'40px'}}>功能尚未开发</h1>
                        <div className="🤚">
                            <div className="👉"></div>
                            <div className="👉"></div>
                            <div className="👉"></div>
                            <div className="👉"></div>
                            <div className="🌴"></div>
                            <div className="👍"></div>
                        </div>
                    </div>

            }


        </MainWrapper>
    )
}

export default Main;