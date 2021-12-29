import './App.css';
import  './Style.css';
import React,{useEffect,useState} from 'react';

function App()

{
  const[User,setUser]=useState([])
  const[name,setName]=useState("")
  const[userName,setUserName]=useState("")
  const[password,setPassword]=useState("")
  const[email,setEmail]=useState("")
  const[mobile,setMobile]=useState("")
  const[city,setCity]=useState("") 
  const[id,setId]= useState(null)
  

  useEffect(()=>{
    getUser()
  },[])


  
  function getUser()
  {
    fetch("http://localhost:8000/users").then((result)=>{
      result.json().then((resp)=>{
        console.warn(resp)
        setUser(resp)
        setName(resp[0].name)
        setId(resp[0].id)
        setUserName(resp[0].userName)
        setPassword(resp[0].password)
        setEmail(resp[0].email)
        setMobile(resp[0].mobile)
        setCity(resp[0].city)
      })
    })
  }


  function saveUser()
  {
    console.warn({name,userName, password, email,mobile,city})
    const data={name,userName, password, email,mobile,city}
  

  fetch("http://localhost:8000/users",{
     method:'POST',
     headers:{
       'Accept':'application/json',
       'Content-Type':'application/json'
     },
      'body':JSON.stringify(data)
  }).then((result)=>
  {
    console.warn("result",result)
    result.json().then((resp)=>
    {
      console.warn("resp",resp)
      getUser()
    })
  })
}



function deleteUser(id)
{     let item =id;
      fetch(`http://localhost:8000/users/${id}`,{
         method: 'DELETE'
        }).then((result)=>{
        result.json().then((resp)=>
        {
        alert(`User with id: ${item} is deleted`);
       getUser()
       })
     })
    }
  

  

function selectUser(id)
    {
     

      let item = User[id-1]
      setId(item.id)
      setName(item.name)
      setUserName(item.userName)
      setPassword(item.password)
      setEmail(item.email)
      setMobile(item.mobile)
      setCity(item.city)
      
    }
  


   function updateUser() 
  
   { 
     let item ={ name,id,userName,password,email,mobile,city}

     fetch(`http://localhost:8000/users/${id}`, {
        method : 'PUT',
        headers : {
          'Accept' : 'application/json',
          'Content-Type' :'application/json'
        },

        body:JSON.stringify(item)

     }).then((result)=>{
         result.json().then
         ((resp)=>{
           getUser()
         })
     })


   }



    return(
      <div className="userList">
        <h1>Data with api call</h1>
        <table border="1" style={{float:'left'}}>
          <tbody>
            <tr>
              <td>id</td>
              <td>Name</td>
              <td>UserName</td>
              <td>Password</td>
              <td>Email</td>
              <td>Mobile</td>
              <td>City</td>
              <td>Operations</td>
            </tr>
           {
             User.map((item,i)=>
             
               <tr key={i}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.userName}</td>
                  <td>{item.password}</td>
                  <td>{item.email}</td>
                  <td>{item.mobile}</td>
                  <td>{item.city}</td>
                  
                  <td><button onClick={()=>deleteUser(item.id)}>DELETE</button></td>
                  <td> <button onClick={()=>selectUser(item.id)}>Update</button></td>
              </tr>
             )
           } 
          </tbody> 
        </table>

        <div className="post">
        <h1>Add New User</h1>
       <input type="text"  placeholder="Name" onChange={(e)=>{setName(e.target.value)}}/>  <br/> <br/>
       <input type="text"  placeholder="UserName" onChange={(e)=>{setUserName(e.target.value)}}/>  <br/> <br/>
       <input type="text"  placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>  <br/> <br/>
       <input type="text"  placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>   <br/> <br/>
       <input type="text" placeholder="Mobile" onChange={(e)=>{setMobile(e.target.value)}}/>   <br/> <br/>
       <input type="text"  placeholder="City" onChange={(e)=>{setCity(e.target.value)}}/>  <br/> <br/>
       <button type="button" onClick={saveUser}>Save New User</button> 

     </div>


        <div clasName="update">
          <h1>Update Existing User</h1>
          <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}}/>  <br/><br/>
          <input type="text" value={userName} onChange={(e)=>{setUserName(e.target.value)}}/>  <br/><br/>
          <input type="text" value={password} onChange={(e)=>{setPassword(e.target.value)}}/> <br/><br/>
          <input type="text" value={email}  onChange={(e)=>{setEmail(e.target.value)}}/>  <br/><br/>
          <input type="text" value={mobile}  onChange={(e)=>{setMobile(e.target.value)}}/>  <br/> <br/>
          <input type="text" value={city}  onChange={(e)=>{setCity(e.target.value)}}/>  <br/><br/>
          <button type="button" onClick={updateUser}>Update</button> 

        </div>

      </div>
 
    )

  } export default App;