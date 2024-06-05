import React, {useEffect, useState} from 'react';
import {Button, Input, Menu, MenuProps} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {Header} from "antd/es/layout/layout";
import useDebounce from "../../../utils/debounce";
import {LayoutNavWrapper} from "./style";
import {useNavigate} from "react-router-dom";

const navItems: MenuProps['items'] = ['主页', '专栏', '课堂','活动','文档'].map((key) => ({
    key,
    label: key,
}));
let menuMap:any  = {
    '主页': '',
    '专栏': 'column',
    '课堂': 'classroom',
    '活动': 'activity',
    '文档': 'document',}
const LayoutNav:React.FC = (props) =>{
    const [keywords,setKeywords] = useState('')
    // 使用防抖函数
    const debouncedSearch = useDebounce((value: string) => {
        console.log(value);
    }, 1000);

    useEffect(() => {
        debouncedSearch(keywords)

    }, [keywords])
    const navigate = useNavigate()

    return(
        <LayoutNavWrapper>
            <Header style={{ display: 'flex', alignItems: 'center', width:'100vw' ,justifyContent: 'center'}}>
                <div className='navbar'>
                    <Menu
                        onClick={(e)=> navigate(menuMap[e.key])}
                        theme="dark"
                        mode="horizontal"
                        items={navItems}
                        style={{ flex: 1, minWidth: 0 }}
                    />
                    <div className='search'>
                        <Input style={{width:'200px'}} placeholder="HORP" value={keywords} onChange={e => setKeywords(e.target.value)}/>
                        <Button>发布</Button>
                        <Button type="primary">关于我们</Button>
                        <UserOutlined style={{color:'white', fontSize:'25px'}}/>
                    </div>
                </div>
            </Header>
        </LayoutNavWrapper>

    )
}

export default LayoutNav;