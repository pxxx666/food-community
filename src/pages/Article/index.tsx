import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import axios from "axios";
import {ArticleWrapper} from "./style";
import {
  CommentOutlined,
  HeartFilled,
  HeartOutlined,
  ShareAltOutlined,
  StarOutlined,
  UserOutlined
} from "@ant-design/icons";
import {Avatar, Badge, Button, Collapse, Drawer, List, notification, Popconfirm} from "antd";
import TextArea from "antd/es/input/TextArea";
type article = {
  id:string,
  title:string,
  content:string,
  tag:any,
  img:string,
  completeContent:string,
  like:number,
  comment:any
}

type comment = {
  name:string,
  content:string,
  remarkBack:any,
}


const Article: React.FC = () => {
  const {id} = useParams();
  let articles = useSelector((state: any) => state.article.articleData);

  const [currentArticle,setCurrentArticle] = useState<article>({
    completeContent: "",
    content: "",
    id: "",
    img: "",
    tag: [],
    title: "",
    like:0,
    comment:[]
  })
  const data:comment[] = currentArticle.comment

  useEffect(() => {
    //如果是跳转页面则重新读取
    if (!articles.length){
      axios.get('/json/articleData.json').then(res=>{
        articles = res.data
        console.log(articles)
        setCurrentArticle(articles.find((item:article)=>item.id === id))
      })
    }else {
      setCurrentArticle(articles.find((item:article)=>item.id === id))
    }

  }, []);


  // 使用useState创建一个状态，用于跟踪图标是否被点击
  const [liked, setLiked] = useState(false);

  //通知
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type: any) => {
    // @ts-ignore
    api[type]({
      message: 'Notification Title',
      description:
          '评论不能为空！！！',
    });
  };
  // 定义一个点击处理函数，用于切换图标状态
  const toggleLike = () => {
    setLiked(!liked);
    if (liked){
      const likes:number = Number( currentArticle.like) - 1
      setCurrentArticle({...currentArticle,like:likes})
    }else {
      const likes:number =Number( currentArticle.like) + 1
      setCurrentArticle({...currentArticle,like:likes})

    }

  };
  //点击评论跳转
  const remarkRef = useRef(null)
  const toRemark = () => {

    // @ts-ignore
    const top = remarkRef.current.getBoundingClientRect().top
    window.scroll({
      top,
      behavior:'smooth'
    })
  }

  // 根据liked状态选择显示HeartOutlined还是HeartFilled
  const HeartIcon = liked ? HeartFilled : HeartOutlined;
  //绑定输入框
  const [inputValue, setInputValue] = useState<string>('');
  const handleInput = (e:any) => {
    setInputValue(e.target.value)
  }
  //发表评论
  const submit = () :void => {
    if (inputValue){
      let myComment:comment = {
        name:'匿名用户',
        content: inputValue,
        remarkBack:[]
      }
      let newComment = [myComment,...currentArticle.comment]
      setCurrentArticle({...currentArticle,comment:newComment})
      setInputValue('')
    }else {
      // 使用Ant Design的通知组件显示警告
      notification.warning({
        message: '评论提示',
        description: '评论内容不能为空，请输入您的评论内容！',
        placement: 'topRight', // 可以调整通知出现的位置
      });
    }
  }
  const [open, setOpen] = useState(false);

  const showDrawer = (name:any) => {
    setSelectedName(name)
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [selectedName,setSelectedName] = useState<string>('')

  const [replyValue,setReplyValue ]= useState<string>('');
  const handleReplyValue = (e:any) => {
    setReplyValue(e.target.value)
  }
  const reply = () =>{
    let newComment = [...currentArticle.comment]
    newComment.forEach((item:comment)=>{
      if (item.name === selectedName){
        item.remarkBack.push({
          name:'匿名用户',
          content: replyValue,
        })
      }
    })
    setCurrentArticle({...currentArticle,comment:newComment})
    setReplyValue('')
    setOpen(false);

  }
  return (
      <ArticleWrapper>
        <div className="background"></div>

        <div className="card">
          <div className='aside'>

            <Badge count={currentArticle.like} offset={[10, 5]}>
              <HeartIcon style={{fontSize:"30px"}} onClick={toggleLike}/>
            </Badge>
            <StarOutlined/>
            <ShareAltOutlined/>
            <Badge count={currentArticle.comment.length} offset={[10, 5]}>
              <CommentOutlined onClick={toRemark} style={{fontSize:"30px"}}/>
            </Badge>


          </div>
          <div className='container'>
            <div className='title'>{currentArticle.title}</div>
            <div className='info'>
              <div className='user'>
                <Avatar size={58} icon={<UserOutlined />} />

                <div className='name'>{currentArticle.tag[0]}</div>
                <Button type="primary">关注</Button>

              </div>
              <div className='time'>发布时间：{currentArticle.tag[1]}</div>
            </div>
            <div className='content'>
              <img  src={currentArticle.img} alt={currentArticle.title}/>
              <p style={{lineHeight:1.5}}>&nbsp;&nbsp;&nbsp;&nbsp;{currentArticle.completeContent}</p>
            </div>
            <div className='remark' ref={remarkRef}>
              <div className='remarkTitle'>评论 {currentArticle.comment.length}</div>
              <TextArea className='textarea'  placeholder="平等表达，友善交流" value={inputValue} onInput={e=>handleInput(e)}/>
              <button className='submit' onClick={e=>submit()}>发表评论</button>


              <List
                  className='ranking'
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={(item, index) => (
                      <>
                        <List.Item className='user'>
                          <List.Item.Meta
                              avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                              title={<a href="#">{item.name}</a>}
                              description={item.content}
                          />
                          <div style={{display:'flex',gap:'10px',alignItems:'center',fontSize:"20px"}}>
                            <div className="con-like">
                              <input className="like" type="checkbox" title="like"/>
                              <div className="checkmark">
                                <svg xmlns="http://www.w3.org/2000/svg" className="outline" viewBox="0 0 24 24">
                                  <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" className="filled" viewBox="0 0 24 24">
                                  <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" className="celebrate">
                                  <polygon className="poly" points="10,10 20,20"></polygon>
                                  <polygon className="poly" points="10,50 20,50"></polygon>
                                  <polygon className="poly" points="20,80 30,70"></polygon>
                                  <polygon className="poly" points="90,10 80,20"></polygon>
                                  <polygon className="poly" points="90,50 80,50"></polygon>
                                  <polygon className="poly" points="80,80 70,70"></polygon>
                                </svg>
                              </div>
                            </div>
                            <CommentOutlined className='remarkComment' onClick={() => showDrawer(item.name)}></CommentOutlined>
                          </div>
                        </List.Item>
                        <Collapse className={item.remarkBack.length > 0 ? '':'hidden'}
                            size="small"
                                  items={item.remarkBack.map((remark:any, remarkIndex:any) => ({
                                    key: `remark-${remarkIndex}`,
                                    label: remark.name+'的消息', // 假设回复也有一个name属性
                                    children: (
                                        <div key={remarkIndex} style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                                          {/* 显示回复的具体内容，这里假设是remark.content */}
                                          <div style={{display:'flex',alignItems:'center',gap:'15px'}}>
                                            <Avatar size={40} icon={<UserOutlined />} />
                                            <div style={{fontWeight:'700'}}>{remark.name}</div>
                                          </div>

                                          <div>{remark.content}</div>
                                        </div>
                                    ),
                                  }))}
                        />
                      </>


                  )}
              />

              <Drawer title="回复评论" onClose={onClose} open={open}>
                <h2 style={{marginBottom:'20px'}}>To: {selectedName}</h2>
                <TextArea rows={4} value={replyValue} onInput={e=>handleReplyValue(e)}/>
                <Button type="primary" style={{marginTop:'30px', width:'100%'}} onClick={reply}>发表</Button>
              </Drawer>

            </div>
          </div>
        </div>

      </ArticleWrapper>
  );
};

export default Article;
