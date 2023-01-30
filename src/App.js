import './App.css';

import {useState,useEffect, useRef} from 'react';
import io from "socket.io-client";
import ScrollToBottom from 'react-scroll-to-bottom';





const socket =io("http://localhost:3001");

const checker="Bh4a809"



function App() {

  const bottomRef=useRef(null);
  const[flag,setFlag]=useState(true);
  const[flag2,setFlag2]=useState(true);
  const[msg,setMsg]=useState('');
  const[chat,setChat]=useState([]);
  const[userName,setuserName]=useState('');
  const[password,setPassword]=useState('');
  const sendChat=(e)=>{
    e.preventDefault();
    socket.emit("chat",{msg,userName})
    setMsg('');
  }

  function setflagfun(e){
    e.preventDefault()
    setFlag2(false);
  }

  function setUser(e){
    e.preventDefault()
    if(checker==password){
        setFlag(false);
        const msg=userName+"_joined"
        socket.emit("user-join",{msg});
    }
    else{
      alert("wrong credential")
    }
    
  }

  useEffect(()=>{
    bottomRef.current?.scrollIntoView({behavior:'smooth'});
  })

  useEffect(()=>{
    socket.on("chat",(payload)=>{
      console.log(payload.msg);
      setChat([...chat,payload])
    })

    socket.on("user-join",(payload)=>{
      console.log(payload.userName);
      setChat([...chat,payload])
    })
    
  })



  return <div className="App">

<p>░▀▄░░▄▀</p>
<p>▄▄▄██▄▄▄▄▄░▀█▀▐░▌</p>
<p>█▒░▒░▒░█▀█░░█░▐░▌</p>
<p>█░▒░▒░▒█▀█░░█░░█</p>
<p>█▄▄▄▄▄▄███══════</p>



    {
     flag?

            <div className='form-username'>
               <form onSubmit={setflagfun}>
               <span>Enter your name 
                <input
                    type="text"
                    // placeholder='msg'
                    value={userName}
                    onChange={(e)=>setuserName(e.target.value)}
                    autoFocus
                  />
                  </span>
                  </form>
                  {
                      flag2?<div></div>:
                      <div>
                        <form onSubmit={setUser}>
                          <span>Enter security code 
                            <input
                                type="password"
                                // placeholder='msg'
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                autoFocus
                             /></span>
                        </form>
                        
                      </div>
                  }

            </div>
            :  
          <div>
         
            <p className='cmd-msg'>*/wait for others/* --do not reload or exit--</p>
            
            {chat.map((payload,index)=>{
              return (

                <p key={index}><span className='green'>&#91; {payload.userName}_localhost ~&#93;$</span> {payload.msg}</p>
              )
            })}
            
            <div ref={bottomRef} />

            <form className='chattextform' onSubmit={sendChat}>
            <span className='green'>&#91; {userName}_localhost ~&#93;$ </span> <input
                type="text"
                // placeholder='msg'
                value={msg}
                onChange={(e)=>setMsg(e.target.value)}
                autoFocus
              />
              <button type='submit'>send</button>

            </form>
            
          </div>
        
    }
  </div>
}


export default App;
