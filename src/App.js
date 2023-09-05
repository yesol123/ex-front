import {useEffect,useState}  from'react'
import './App.css';
import axios from 'axios'
//.env환경변수 설정할 수 있는 파일


function List({data,setData}){
  const remove = (id)=>{
    axios.delete(`${process.env.REACT_APP_SERVER}/abc/${id}`)//index.js에서도  axios.delete로 맞춰줘야함 
    .then(res=>{
      setData(res.data);
    })
    
  }
  return(
      
      <>
      {
        data.map(obj=>(
        <li key ={obj.id}>
        {obj.msg}
        <button onClick={()=>{remove(obj.id)}}>삭제</button>
        </li>

        ))

      }
      
      </>
    )

}

function Write({setData}){
  const insert = (e)=>{
    e.preventDefault();
    let msg = e.target.msg.value;

    axios.post(`${process.env.REACT_APP_SERVER}/insert`,{msg})// 메세지 안의 메세지! 내용 저장
    //console.log(e.target.msg.value); 이벤트 타깃 안의 내용! 
    .then(res=>{
      setData(res.data)
    })
  }

  return(
  <div>
  <form onSubmit={insert}>
    <input type="text" name="msg"/>
    <input type="submit" value="저장"/>
  </form>
  </div>
  )
}

function App() {
  const[data,setData] = useState([]);

  const getData = ()=>{
    axios.get(`${process.env.REACT_APP_SERVER}/abc`)
    .then(res=>{
      setData(res.data);
    });

  }

  useEffect(()=>{
    getData();
  },[])
  
  
  // axios.get('http://localhost:3030/abc?id=100')
  // .then(res=>{
  //   console.log(res)
  // })

  
  // axios.post('http://localhost:3030/insert',{id:1000,name:'신규데이터'})
  
  


  return (
   <div>
    <h2>한줄댓글({data.length})</h2>
    <Write setData={setData}/>
    <ul>
      <List data={data}  setData={setData}/> 
    </ul>
   </div>
  );
}
//data 프롭스
export default App;
