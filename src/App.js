import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Nav, Navbar, Container} from 'react-bootstrap';
import { useState } from 'react';
import data from './data.js';
import {Routes, Route, Link, useNavigate, Outlet, useParams} from 'react-router-dom';
import Detail from './routes/Detail.js';


function App() {

  let [shoes] = useState(data);
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
                    <Card shoes={a} i={i}></Card>
                    )
                  })
                }
              </div>
            </div>
         </>
        }/>
        <Route path='/detail/:id' element={<Detail shoes={shoes}/>}/>

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
