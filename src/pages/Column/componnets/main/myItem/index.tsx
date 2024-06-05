import React from 'react';
import {ItemWrapper} from "./style";
import {Button, Card} from "antd";
import Meta from "antd/es/card/Meta";
import { SimpleImg } from 'react-simple-img';

const MyItem = (props:any) => {
    return (
        <ItemWrapper>
            <Card
                className='card'
                hoverable
                cover={<SimpleImg className='img' alt="example" src={props.option.img} />}
            >
                <div className='date'>{props.option.date}</div>
                <Meta title={props.option.title} description={props.option.subTitle} />
                <Button type='primary' ghost className='btn'>了解详情</Button>
            </Card>
        </ItemWrapper>
    )
}

export default MyItem;