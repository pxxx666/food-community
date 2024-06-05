import styled from "styled-components";

export const BannerWrapper =  styled.div`
  width: 1000px;
  height: 400px;
  margin: 50px auto;
  display: flex;

  .leftBanner {
    width: 650px;
    height: 100%;

    img {
      width: 100%;
    }
  }

  .rightBanner {
    padding: 40px 20px;
    width: 350px;
    height: 100%;
    background-color: white;

    .r-title {
      font-size: 35px;
      font-weight: 700;
    }

    .r-time {
      margin-top: 50px;
      font-weight: 600;

    }

    .r-content {
      margin-top: 30px;
      color: #797777;
    }

    .r-btn {
      margin-top: 30px;
      height: 45px;
      width: 100px;
    }
  }

`