import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Nav, Navbar, Container} from 'react-bootstrap';
import { createContext, useState } from 'react';
import data from './data.js';
import {Routes, Route, Link, useNavigate, Outlet, useParams} from 'react-router-dom';
import Detail from './routes/Detail.js';
import axios from 'axios';
import Cart from './routes/cart.js';

/*

lifeCycle

페이지에 장착되는 순간 (mount)
페이지에서 업데이트 되는 순간 (update)
페이지에서 제거가 되는 순간 (unmount)


useEffect

1. 재렌더링 마다(mount or update) 코드를 실행하고 싶으면

  useEffect(()=>{})

2. mount시 1회만 코드를 실행하고 싶으면

  useEffect(()={},[])

3. 특정 state 변경시 useEffect를 실행하려면

  useEffect(()=>{},[count])

4. useEffect 실행 전에 코드를 실행하려면

  uesEffect(()=>{

    return()=.{
    }
    
    })


서버와 통신하는 방법

1. GET : 데이터를 서버에서 가지오 올 때

2. POST : 데이터를 서버에 보낼 때


서버에 요청하는 방법

1. XMLHttpRequest
2. fetch()
3. axios


스테이트 전체 공유

1. Context API (리액트 기본문법)
2. Redux (라이브러리)

*/






function App() {

  let [shoes, setShoes] = useState(data);
  let [clickCount, setClickCount] = useState(0);
  let [재고] = useState([10,11,12]);

  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}} href="#home">Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('detail')}} href="#features">Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      

      <Routes>
        <Route path='/' element={
          <>
            <div className='main-bg'></div>
            <div className='container'>
              <div className='row'>
                {
                  shoes.map((a, i)=>{
                    return(
                    <Card shoes={shoes[i]} i={i}></Card>
                    )
                  })
                }
              </div>
            </div>
            <button onClick={()=>{

              if(clickCount === 0){
                axios.get(`https://nujabescode.github.io/data2.json`)
                .then((data)=>{
                  console.log(data.data)
                  // setShoes(copy => [...copy, ...data.data]);
                  let copy = [...shoes, ...data.data];
                  setShoes(copy);
                  // copy = shoes.concat(data.data);
                  // setShoes(copy);
                  setClickCount(1);
                })
                .catch(()=>{
                  console.log('실패')
                })
              }else if(clickCount === 1){
                axios.get(`https://nujabescode.github.io/data3.json`)
                .then((data)=>{
                  console.log(data.data)
                  let copy = [...shoes, ...data.data];
                  setShoes(copy);
                  setClickCount(2);
                })
                .catch(()=>{
                  console.log('실패')
                })
              }else{
                alert("더 이상 불러올 데이터가 없습니다.")
              }
            }}>더보기</button>
         </>
        }/>
        <Route path='/detail/:id' element={
            <Detail shoes={shoes}/>
        }/>
        <Route path='/cart' element={<Cart/>}/>

        <Route path='/about' element={<About/>}>
          <Route path='member' element={<div>멤버페이지</div>}/>
          <Route path='location' element={<div>위치정보</div>}/>
        </Route>

        <Route path='/event' element={<Event/>}>
          <Route path='one' element={<div>첫 주문시 배송 무료</div>}/>
          <Route path='two' element={<div>5만원 이상 구매시 10% 할인</div>}/>
        </Route>

        <Route path='*' element={<div>없는페이지입니다.</div>}/>
      </Routes>


      
    </div>
  );


}


function About(){

  return(

    <div>
      <h4>회사정보</h4>
      <Outlet></Outlet>
    </div>

  )
}


function Event(){

  return(
    <div>
      <h4>르무통 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}


function Card(props){

   return (

          <div className='col-md-4'>
            <img src={'https://github.com/NujabesCode/NujabesCode.github.io/blob/main/shoes' + (props.i+1) + '.jpg?raw=true'} width='80%'></img>
            <h4>{props.shoes.title}</h4>
            <p>{props.shoes.price}</p>
          </div>
   )
 }





export default App;
