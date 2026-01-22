import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';


function Detail(props){




    let [count, setCount] = useState(0)
    let [alert, setAlert] = useState(true)
    let [탭, 탭변경] = useState(0)

    useEffect(()=>{
        setTimeout(()=>{setAlert(false)},2000);
        
    },[])


    let {id} = useParams();
    console.log(count);

    return(

        <div className='container'>
            {
                alert==true ?
                <div className="alert alert-warning">
                    2초이내 구매시 할인
                </div> : null
            }
           

            <button onClick={()=>{setCount(count+1)}}>버튼</button>
            <div className='row'>
            <div className='col-md-6'>
                <img src={'https://github.com/NujabesCode/NujabesCode.github.io/blob/main/shoes' + (Number(id) + 1) +'.jpg?raw=true'} width='100%'></img>
            </div>
            <div className='col-md-6'>
                <h4 className='pt-5'>{props.shoes[id].title}</h4>
                <p>{props.shoes[id].content}</p>
                <p>{props.shoes[id].price}</p>
                <button className='btn btn-danger'>주문하기</button>
            </div>
        </div>

            <Nav variant="tabs" defaultActiveKey="link-0">
                <Nav.Item>
                    <Nav.Link eventKey="link-0" onClick={()=>{탭변경(0)}}>버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={()=>{탭변경(1)}}>버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" onClick={()=>{탭변경(2)}}>버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContents 탭={탭}/>
                        

        </div>

    )
}

function TabContents(props){


    if(props.탭==0){
        return <div>내용0</div>
    }else if(props.탭==1){
        return <div>내용1</div>
    }else if(props.탭==2){
        return <div>내용2</div>
    }
}



export default Detail;