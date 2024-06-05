# 社区网站

## 1 完成模块（所有功能）

- 首页页面布局样式
- ⾸⻚模糊搜索框-实现搜索防抖功能点
- ⾸⻚navbar导航组件所有功能
- ⾸⻚轮播图组件所有功能
- ⾸⻚tab组件所有功能
- ⾸⻚热⻔⽂章列表组件所有功能
- ⾸⻚⽂章列表组件功能

- ⽂章详情⻚⻚⾯布局及样式
- 文章详情页页面给作者点赞发布评论功能
- 文章详情页页面回复网友点赞评论功能

- ⽂章专栏⻚tab组件所有功能
- ⽂章专栏⻚⻚⾯布局及样式
- ⽂章专栏⻚卡⽚列表所有功能



**技术栈**：

- react
- react-router(路由)
- style-components(CSS in JS)
- antd
- axios
- react-redux
- redux toolkit
- react-simple-img(图片懒加载)



项目目录




## 2. 实现模块

### 2.1 首页

#### 2.1.1 首页页面样式布局




**实现：**flex布局结合antd实现改样式



#### 2.1.2  ⾸⻚模糊搜索框-实现搜索防抖功能点



**实现（难点）：**自定义hooks函数，用useEffect函数区监听keywords，一旦改变就会调用防抖函数，保证了受控组件的正确使用和防抖功能的实现

```jsx
import {useState} from "react";

function useDebounce(callback: Function, delay: number) {
    const [timer, setTimer] = useState<number>();

    return function (...args: any[]) {
        clearTimeout(timer);
        const newTimer = setTimeout(() => {
            callback(...args);
        }, delay);
        // @ts-ignore
        setTimer(newTimer);
    };
}

export default useDebounce

//layoutNav
<Input style={{width:'200px'}} placeholder="HORP" value={keywords} onChange={e => setKeywords(e.target.value)}/>
const [keywords,setKeywords] = useState('')
    // 使用防抖函数
    const debouncedSearch = useDebounce((value: string) => {
        console.log(value);
    }, 1000);

    useEffect(() => {
        debouncedSearch(keywords)

    }, [keywords])
```



#### 2.1.3 ⾸⻚navbar导航组件所有功能

**实现：**利用antd结合useNavigate实现该功能

```jsx
<Menu
    onClick={(e)=> navigate(menuMap[e.key])}
    theme="dark"
    mode="horizontal"
    items={navItems}
    style={{ flex: 1, minWidth: 0 }}
/>
```



#### 2.1.4 ⾸⻚轮播图组件所有功能

**实现：**利用useEffect函数里面通过axios请求json数据在用antd轮播图组件进行渲染

```jsx
useEffect(() => {
    // 请求轮播图数据
    axios.get('/json/banner.json').then(res=>{
        setBannerList(res.data);
    })
    axios.get('/json/hotArticle.json').then(res=>{
        setHotList(res.data);
    })
    // 请求热门商品数据
}, []);
    
 <Carousel autoplay autoplaySpeed={5000}  style={{width:"600px",height:"400px"}}>
    {bannerList.map(item=>{

        return (
            <div className='bannerItem' key={item.id}>
                <img   src={item.src} alt={item.src}/>
            </div>
        )
    })}
</Carousel>

```





#### 2.1.5 ⾸⻚tab组件所有功能

**实现：**用current存储当前的tab标签，用currentList来存储当前要渲染的List，点击切换列表后调用setCurrent和setCurrent来更新当前状态，将当前list里面的数据通过map函数和props传给MyCard组件，组件内部结合antd进行渲染

```jsx
const [current, setCurrent] = useState('hot');


const [hotArticleList, setHotArticleList]= useState<article[]>([])
const [newArticleList, setNewArticleList]= useState<article[]>([])
const [currentList, setCurrentList] = useState(hotArticleList);
useEffect(() => {
    axios.get('/json/hotArticle.json').then(res=>{
        setHotArticleList(res.data)
        //初次渲染默认热门
        setCurrentList(res.data)
    })
    axios.get('/json/newArticle.json').then(res=>{
        setNewArticleList(res.data)
    })
}, []);
//点击切换列表
const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    setCurrentList(e.key==='hot'?hotArticleList:newArticleList)
};


<div style={{display:'flex',flexDirection:"column",gap:'20px',marginTop:'20px'}}>
    {
        currentList.map(item => {
            // @ts-ignore
            return <MyCard key={item.id} option={item}></MyCard>
        })
    }
</div>
```



#### 2.1.6 ⾸⻚热⻔⽂章列表组件功能


**实现：**基础的css样式实现省略功能，antd实现气泡提示功能，再用useNavigate结合window.open实现跳转新页面功能

```css
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
```

```jsx
{hotList.map((item)=>{
return (
<div className='hotListItem' key={item.id} onClick={()=>navigatorToNewTab('/article/'+item.id)}>
<Popover content={item.title} trigger="hover">
<FireFilled style={{fontSize:'20px'}}/><h3 className='title'>{item.title}</h3>
</Popover>
<p className='content'>{item.content}</p>
</div>
)
})}
```

```jsx
<div className='hotListItem' key={item.id} onClick={()=>navigatorToNewTab('/article/'+item.id)}>
    
    function navigatorToNewTab(path:string):void{
        const newTab = window.open(path,"_blank");
        // @ts-ignore
        newTab.focus();
    }
```



#### 2.1.7 ⾸⻚⽂章列表组件功能




**实现：**该元素里面所有的内容均由传过来的option参数里面结合css实现，跳转则利用useNavigate实现

```jsx
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

&:hover{
      box-shadow: 0 0 10px #ccc;
    }
```



### 2.2 文章详情页

#### 文章数据类型

```json
{
    "id": "01001",
    "title": "10种好吃又简单的寿司 十大家庭版寿司的做法和材料",
    "content": "鱼子酱寿司是一种最常见的寿司的品种，鱼子酱是鲟鳇鱼卵、鲑鱼卵等的腌制品，味道腥咸，色泽乌亮，放在寿司上最合适不过了。",
    "tag": ["彭翔","2024-5-12 12:20:10"],
    "img": "/images/hot1.jpg",
    "completeContent": "寿司，源自日本的一种传统美食，以其精致的外观、独特的口感和丰富的营养成分深受全球食客的喜爱。它不仅仅是一种食物，更是日本饮食文化的一个重要象征，体现了日本人对食材新鲜度的极致追求和对料理艺术的独到理解。接下来，让我们分段详细了解寿司的魅力所在。\n\n寿司的历史与演变\n寿司的历史可追溯至公元前2世纪的日本，最初作为保存鱼肉的方法出现，人们将鱼肉用发酵的米饭包裹，利用米饭中的乳酸菌防腐。随着时间的推移，到了江户时代（17世纪），随着醋的引入，寿司的制作方法发生了革命性的变化，米饭开始用醋调味，这不仅改善了风味，也大大缩短了发酵时间，使得寿司逐渐成为即食食品。现代寿司的形式，如握寿司（Nigiri）、寿司卷（Maki）等，大多形成于这个时期并流传至今。\n\n寿司的种类与制作\n寿司主要分为几大类：握寿司、寿司卷、刺身（虽非传统寿司，但常与寿司一同享用）、手卷（Temaki）及箱寿司（Oshi Sushi）等。握寿司是最具代表性的形式，由醋味饭团上放置一片新鲜生鱼或其他海鲜制成；寿司卷则是在海苔上铺上醋饭，再放上蔬菜、鱼肉等配料卷起切片；刺身则是未经烹饪的新鲜鱼片，展现食材原汁原味；手卷是锥形的手持寿司；箱寿司则是将配料和饭压入模具中制成。\n\n制作寿司的过程中，选用高质量的食材至关重要。特别是海鲜，需确保其新鲜度，以达到最佳口感。同时，制作醋饭的技巧也不容忽视，米饭的温度、湿度以及醋的比例都会影响最终的风味。\n\n寿司的文化意义\n寿司不仅仅是食物，它还承载着深厚的文化意义。在日本，享受寿司常常伴随着仪式感，比如在传统的寿司店（寿司屋），顾客坐在吧台前，由寿司师傅现场制作并逐一递送，这种互动体现了对食物的尊重和对匠人精神的欣赏。此外，寿司也被视为社交媒介，人们在共享寿司的同时增进情感交流。\n\n寿司的全球影响力\n随着全球化的发展，寿司已成为国际美食舞台上的一颗璀璨明星。世界各地都能找到寿司的身影，虽然在不同文化的融合下，寿司的形式和口味可能有所创新和调整，但它依旧保持着对新鲜、简单和美味的核心追求。从高级餐厅到便利快餐，寿司以多样化的形态满足着不同消费者的需求，成为了连接不同文化和人群的美味桥梁。\n\n总之，寿司不仅是味蕾上的享受，更是心灵与文化的一次美妙旅行。它以其独特的魅力跨越国界，成为了世界共赏的美食艺术。",
    "like": "50",
    "comment": [{
      "name": "张三",
      "content": "太厉害了",
      "remarkBack": []
    },{
      "name": "李四",
      "content": "我也想学",
      "remarkBack": []
    },{
      "name": "王五",
      "content": "谢谢分享",
      "remarkBack": [{
        "name": "martin",
        "content": "哈哈哈"
      }]
    }]
  },
```



#### 2.2.0 关键点（传值）

**实现：**利用RTK将所有文章数据存储区来，而访问后利用useParams获得id，从store里面的数据进行筛选，选出文章详情页的响应数据

store

```ts
import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    articleData:[]
}
const articleSlice = createSlice({
    name:'article',
    initialState,

    reducers:{
        getArticleData:(state,{payload}) =>{
            state.articleData = payload
        }
    }
})
export const {getArticleData} = articleSlice.actions
export default articleSlice.reducer;

```

主页通过dispatch存储数据

```tsx
const LayoutPage: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get('/json/articleData.json').then(res=>{
            dispatch(getArticleData(res.data))
        })
    }, []);
  return (
          <Layout>
              <LayoutNav></LayoutNav>
              <Outlet></Outlet>
          </Layout>

  );
};
```

文章详情页通过useSelector获取存储的数据

关键点：跳转页面后读取不到store数据，所以需要重新获取数，而本页跳转的不存在这个问题

```jsx
let articles = useSelector((state: any) => state.article.articleData); 
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
```



#### 2.2.1 ⽂章详情⻚⻚⾯布局及样式





**实现：**利用flex布局和基本的css以及antd相关组件和uiverse组件库实现改样式



#### 2.2.2 文章详情页页面给作者点赞发布评论功能




**作者点赞实现：**定义状态已点赞或未点赞，然后进行两个图标的切换，再利用setCurrentArticle进行更新

```jsx
  // 根据liked状态选择显示HeartOutlined还是HeartFilled
  const HeartIcon = liked ? HeartFilled : HeartOutlined;
  // 使用useState创建一个状态，用于跟踪图标是否被点击
  const [liked, setLiked] = useState(false);
<Badge count={currentArticle.like} offset={[10, 5]}>
    <HeartIcon style={{fontSize:"30px"}} onClick={toggleLike}/>
</Badge>

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
```

**作者评论跳转实现：**

```tsx
<Badge count={currentArticle.comment.length} offset={[10, 5]}>
    <CommentOutlined onClick={toRemark} style={{fontSize:"30px"}}/>
</Badge>
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

```

**评论发布实现：**默认名称为匿名用户，如果输入值不为空则更新文章信息否则antd组件提示显示

```jsx
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
<button className='submit' onClick={e=>submit()}>发表评论</button>
```



#### 2.2.3 文章详情页页面回复网友点赞评论功能



实现：遍历所有的remark.remarkBack，如果存在就把所有的回复添加到页面渲染，利用antd弹出模态框，和发布评论类似，但是它是添加到remarkBack而不是remark

```jsx
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

//绑定数据
<TextArea rows={4} value={replyValue} onInput={e=>handleReplyValue(e)}/>
//回复发表
<Button type="primary" style={{marginTop:'30px', width:'100%'}} onClick={reply}>发表</Button>

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
```



### 2.3  文章专栏页

#### 文章专栏数据类型

```json
{
    "id": "03001",
    "title": "Java从基础到入门",
    "subTitle": "active",
    "img": "/images/active1(1).jpg",
    "date": "2019年08月01日 - 2019年08月03日",
    "type": "active"
  },
```



#### 2.3.1 ⽂章专栏⻚⻚⾯布局及样式



**实现：**利用flex布局和antd加上uiverse库实现其布局（仅开发了近期活动和线上直播，其他功能设置了提示title功能）



#### 2.3.2 ⽂章专栏⻚tab组件所有功能

**实现：**和首页切换功能类似，存储一个current，当切换过滤文章中的不包含改key的文章即获取列表所需要的文章

```jsx
<div >
    <Menu className='tab' onClick={checkoutTab} selectedKeys={[current]} mode="horizontal" items={items} style={{backgroundColor:'rgb(245, 245, 245)'}}/>
</div>
//当前列表
const [currentList, setCurrentList] = useState([]);
//所有列表数据
const [allList, setAllList] = useState([]);

useEffect(() => {
    axios.get('/json/columnData.json').then(res => {
        setAllList(res.data)
        const activeList = res.data.filter((item: item) => item.type === 'active')
        setCurrentList(activeList)
    })
}, []);
const [current, setCurrent] = useState('active');
//切换tab
const checkoutTab = (e:any) => {
    console.log(e.key)
    const newCurrentList = allList.filter((item: item) => item.type === e.key)
    setCurrentList(newCurrentList)
    setCurrent(e.key)
}
```



#### 2.3.3 ⽂章专栏⻚卡⽚列表所有功能




**实现：**判断是否开发了有数据，如果有数据则展示，没有则展示未开发

```jsx
{
    currentList.length > 0 ? <div className='itemList'>

        {
            currentList.map((item: item)=>{
                // @ts-ignore
                return <MyItem key={item.id} option={item}></MyItem>
            })
        }
    </div> :
        <div className='noDep'>
        <h1 style={{fontSize:'40px'}}>功能尚未开发</h1>
        <div className="🤚">
            <div className="👉"></div>
            <div className="👉"></div>
            <div className="👉"></div>
            <div className="👉"></div>
            <div className="🌴"></div>
            <div className="👍"></div>
        </div>
    </div>

}
//关键布局
  .itemList{
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
  }
```

**实现：**借用react-simple-img完成图片懒加载

```jsx
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

```



## 3.项目总结

通过这次项目作业，本人收获颇多，第一次写react项目，完成项目的过程中通过自行查阅资料，对react方面的知识点进行了巩固(redux,react-router等)，对样式方面更加熟悉了，更加深刻地知道了框架之间的差异，增强了对react的热情，对于一些不懂的知识点，本人也会在花时间去学习