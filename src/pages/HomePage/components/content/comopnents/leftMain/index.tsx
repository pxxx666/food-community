import React, {useEffect, useState} from 'react';
import {LeftMainWrapper} from "./style";
import {Input, Menu, MenuProps, Tag} from "antd";
import {FacebookOutlined} from "@ant-design/icons";
import useDebounce from "../../../../../../utils/debounce";
import MyCard from "../../../../../../components/MyCard";
import axios from "axios";
type MenuItem = Required<MenuProps>['items'][number];
type article = {
    id:string,
    title:string,
    content:string,
    tag:string[],
    img:string
}
const items: MenuItem[] = [
    {
        label: '热门',
        key: 'hot',
    },
    {
        label: '最新',
        key:'new'
    }
];
const LeftMain = () => {
    const [current, setCurrent] = useState('hot');


    const [hotArticleList, setHotArticleList]= useState<article[]>([])
    const [newArticleList, setNewArticleList]= useState<article[]>([])
    const [currentList, setCurrentList] = useState(hotArticleList);
    useEffect(() => {
        axios.get('/json/hotArticle.json').then(res=>{
            setHotArticleList(res.data)
            //初次渲染默认热门
            setCurrentList(res.data)
        })
        axios.get('/json/newArticle.json').then(res=>{
            setNewArticleList(res.data)
        })
    }, []);
    //点击切换列表
    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
        setCurrentList(e.key==='hot'?hotArticleList:newArticleList)
    };
    const tags:any[] = new Array(12).fill('')
    const abouts:string[] = ['新手答疑','技术支持','团结引擎','微信小游戏','C#','C/C++','渲染','性能优化','效果实现','许可证','HMI','下载','安装','UOS','Unity 6','Plasitc','元宇宙','工业']
    //防抖
    const [keywords,setKeywords] = useState('')
    // 使用防抖函数
    const debouncedSearch = useDebounce((value: string) => {
        console.log(value);
    }, 1000);

    useEffect(() => {
        debouncedSearch(keywords)

    }, [keywords])

    return (
        <LeftMainWrapper>
            <div className='leftMain'>
                <div className='tags'>
                    {
                        tags.map((item,index)=>{
                            return (<Tag key={index} icon={<FacebookOutlined />} color="white" style={{color:'black'}}>
                                Facebook 2024
                            </Tag>)
                        })
                    }

                </div>
                <div className='articleList'>
                    <div className='navbar'>
                        <div className='tab'>
                            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{backgroundColor:'rgb(245, 245, 245)'}}/>
                        </div>
                        <div className='search'>
                            <Input style={{width:'200px'}} placeholder="搜索" value={keywords} onChange={e => setKeywords(e.target.value)}/>
                        </div>

                    </div>
                    <div className='about'>
                        {
                            abouts.map((item,index)=>{
                                return <Tag color="blue" key={item}>{item}</Tag>
                            })
                        }

                    </div>
                    <div style={{display:'flex',flexDirection:"column",gap:'20px',marginTop:'20px'}}>
                        {
                            currentList.map(item => {
                                // @ts-ignore
                                return <MyCard key={item.id} option={item}></MyCard>
                            })
                        }
                    </div>



                </div>

            </div>
        </LeftMainWrapper>
    )
}
export default LeftMain;