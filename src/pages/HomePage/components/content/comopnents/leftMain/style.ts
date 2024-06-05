import styled from "styled-components";

export const LeftMainWrapper = styled.div`
  .leftMain{
    width: 600px;
    min-height: 600px;

    .tags{
      display: flex;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
    }

    .articleList{
      margin-top: 40px;

      .navbar{
        display: flex;
        justify-content: space-between;

        align-items: center;
      }
      .about{
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
    }
  }

`