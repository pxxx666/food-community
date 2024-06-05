import styled from "styled-components";
export const ArticleWrapper = styled.div`
  .hidden{
    display: none;
  }
  .background {
    width: 100%;
    height: 440px;
    --s: 200px; /* control the size */
    --c1: rgb(0, 21, 41);
    --c2: rgb(0, 33, 66);
    --c3: rgb(2, 65, 119);

    background: repeating-conic-gradient(from 30deg,
    #0000 0 120deg,
    var(--c3) 0 180deg) calc(0.5 * var(--s)) calc(0.5 * var(--s) * 0.577),
    repeating-conic-gradient(from 30deg,
    var(--c1) 0 60deg,
    var(--c2) 0 120deg,
    var(--c3) 0 180deg);
    background-size: var(--s) calc(var(--s) * 0.577);
  }

  .card {
    margin: 0 auto;
    width: 1000px;
    min-height: 1000px;
    margin-top: -180px;
    background-color: rgb(245, 245, 245);
    border-radius: 10px;
    display: flex;
    justify-content: space-between;

    .aside {
      position: fixed;
      width: 100px;
      height: 600px;
      display: flex;
      flex-direction: column;
      //align-items: center;
      justify-content: center;
      font-size: 30px;
      gap: 10px;
    }

    .container {
      margin-left: 100px;
      padding: 70px 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      //justify-content: center;
      width: 860px;
      min-height: 600px;
      background-color: white;
      gap: 40px;

      .title {
        font-size: 35px;
        font-weight: 700;
      }

      .info {
        height: 50px;
        padding: 0 20px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .user {
          display: flex;
          height: 100%;
          align-items: center;
          gap: 20px;

          .name {
            font-size: 20px;
            font-weight: 600;
          }
        }

        .time {
          height: 100%;
          line-height: 50px;
        }
      }

      .content {
        display: block;
        width: 100%;
        padding: 20px;
        font-size: 20px;
        font-family: '幼圆';

        img {
          width: 300px;
          height: 300px;
          float: left;
          border-radius: 10px;
        }
      }

      .remark {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 700px;

        .remarkTitle {
          font-weight: bold;
          font-size: 20px;
        }

        .textarea {
          background-color: rgb(245, 245, 245);
          height: 100px;
          transition: .5s;
          font-size: 15px;
          
          &:focus{
            
            height: 150px;
          }
        }
        .submit {
          font-size: 18px;
          display: inline-block;
          outline: 0;
          border: 0;
          cursor: pointer;
          will-change: box-shadow,transform;
          background: radial-gradient( 100% 100% at 100% 0%, #89E5FF 0%, #5468FF 100% );
          box-shadow: 0px 0.01em 0.01em rgb(45 35 66 / 40%), 0px 0.3em 0.7em -0.01em rgb(45 35 66 / 30%), inset 0px -0.01em 0px rgb(58 65 111 / 50%);
          padding: 0 2em;
          border-radius: 0.3em;
          color: #fff;
          height: 2.6em;
          text-shadow: 0 1px 0 rgb(0 0 0 / 40%);
          transition: box-shadow 0.15s ease, transform 0.15s ease;
          &:hover {
            box-shadow: 0px 0.1em 0.2em rgb(45 35 66 / 40%), 0px 0.4em 0.7em -0.1em rgb(45 35 66 / 30%), inset 0px -0.1em 0px #3c4fe0;
            transform: translateY(-0.1em);
          }
          &:active {
            box-shadow: inset 0px 0.1em 0.6em #3c4fe0;
            transform: translateY(0em);
          }
        }

        .con-like {
          --red: black;
          position: relative;
          width: 20px;
          height: 20px;
        }

        .con-like .like {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          z-index: 20;
          cursor: pointer;
        }

        .con-like .checkmark {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .con-like .outline,
        .con-like .filled {
          fill: var(--red);
          position: absolute;
        }

        .con-like .filled {
          animation: kfr-filled 0.5s;
          display: none;
        }

        .con-like .celebrate {
          position: absolute;
          animation: kfr-celebrate 0.5s;
          animation-fill-mode: forwards;
          display: none;
        }

        .con-like .poly {
          stroke: var(--red);
          fill: var(--red);
        }

        .con-like .like:checked ~ .checkmark .filled {
          display: block
        }

        .con-like .like:checked ~ .checkmark .celebrate {
          display: block
        }

        @keyframes kfr-filled {
          0% {
            opacity: 0;
            transform: scale(0);
          }

          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes kfr-celebrate {
          0% {
            transform: scale(0);
          }

          50% {
            opacity: 0.8;
          }

          100% {
            transform: scale(1.2);
            opacity: 0;
            display: none;
          }
        }
        .remarkComment{
          transition: .3s;

          &:hover{
            color: rgb(22, 119, 255);
          }
        }
      }
    }
  }


`