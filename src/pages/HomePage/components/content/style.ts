import styled from "styled-components";

export const ContentWrapper = styled.div`
    margin: 40px auto;
    width: 1000px;
    
  .main{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    
    
    
    .rightMain{
      width: 300px;
      height: 600px;
      //background-color: pink;
      .active{
        font-weight: 700;
        color: black;
      }
      .borderRight{
        border-right: 1px solid  rgb(163, 163, 163);
      }
      
      .roleList{
        display: flex;
        gap: 20px;
        width: 100%;
        height: 50px;
        justify-content: center;
        align-items: center;
        background-color: white;
        color: rgb(163, 163, 163);
      }
      
      .timeList{
        margin-top: 5px;
        background-color: white;
        .title{
          display: flex;
          width: 100%;
          height: 50px;
          justify-content: center;
          align-items: center;
          color: rgb(163, 163, 163);
          
          .item{
            width: 50px;
            text-align: center;
            
          }
        }
        .ranking{
          padding: 0 15px;
          
          .user{
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
    
`