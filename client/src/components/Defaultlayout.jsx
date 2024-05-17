import '../resources/defaultlayout.scss';
import { useState , useEffect } from 'react';
export default function Defaultlayout(props) {
  const [username , setusername] = useState("UserName");
  const getusername = ()=>{
    const user = JSON.parse(localStorage.getItem('checkSpense'));
    setusername(user.name);
  }
  useEffect(() => {
    getusername();
  }, [])
  
  return (
    <div className='layout'>
        <div className="header primary">
             <div>
                <h1 className="logo">CHECK EXPENSE</h1>
             </div>
             <div>
                <h1 className="username">{username}</h1>
             </div>
        </div>
        <div className="content">
            {props.children}
        </div>
    </div>
  )
}
