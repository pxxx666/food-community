import styled from "styled-components";

export const MyCardWrapper = styled.div`
  .card{
    background-color: white;
    display: flex;
    gap: 20px;
    padding-left: 15px;
    align-items: center;
    width: 100%;
    border-radius: 20px;
    transition: 0.5s;
    height: 200px;
    .img{
      border-radius: 10px;
      width: 180px;
      height: 180px;
    }
    .container{
      display: flex;
      flex-direction: column;
      gap:20px;

      .title{
        width: 390px;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 20px;
      }
      .content{
        width: 350px;
        font-size: 15px;
      }
    }
    
    &:hover{
      box-shadow: 0 0 10px #ccc;
    }
  }

`