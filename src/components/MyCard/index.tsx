import React from 'react';
import {Card, Popover, Tag} from "antd";
import {MyCardWrapper} from "./style";
import {useNavigate} from 'react-router-dom'
const MyCard = (props:any) => {
    const navigate = useNavigate()
    return (
        <MyCardWrapper>
            <div className='card' onClick={()=>{navigate('/article/'+props.option.id)}}>
                <img alt="example" className='img' src={props.option.img} />
                <div className='container'>
                    <Popover content={props.option.title} trigger="hover">
                        <h3 className='title'>{props.option.title}</h3>
                    </Popover>
                    <p className='content'>{props.option.content}</p>
                    <div className='tagList'>
                        {
                            props.option.tag.map((item:string)=>{
                                return <Tag color="cyan" key={item}>{item}</Tag>
                            })
                        }

                    </div>
                </div>
            </div>
        </MyCardWrapper>

    )
}
export default MyCard;