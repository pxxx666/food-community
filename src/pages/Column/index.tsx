import React from 'react';
import {ColumnWrapper} from "./style";
import Banner from "./componnets/banner";
import Main from "./componnets/main";


const Column = () => {
    return (
        <ColumnWrapper>
            <Banner></Banner>
            <Main></Main>
        </ColumnWrapper>
    )
}

export default Column;