import styled from "styled-components";

export const BannerWrapper = styled.div`
  .container {
    width: 100vw;
    height: 440px;
    background-color: rgb(0, 21, 41);
    display: flex;
    align-items: center;

    .banner {
      width: 1000px;
      /*background-color: red;*/
      margin: 0 auto;
      height: 400px;
      display: flex;
      justify-content: space-between;

      .bannerItem {
        width: 100%;
        height: 100%;
      }

      .hotList {
        width: 300px;
        height: 400px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;


        .hotListItem {
          cursor: pointer;
          width: 100%;
          height: 125px;
          background-color: rgb(234, 234, 234);
          display: flex;
          flex-direction: column;
          border-radius: 20px;
          padding: 15px;
          gap: 15px;
          transition: .5s;

          &:hover {
            box-shadow: 5px 5px 10px #ccc;
          }

          .title {
            width: 250px;
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 20px;
            height: 20px;
            line-height: 20px;
          }
        }
      }
    }
  }
`