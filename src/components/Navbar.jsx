import React from 'react'
import {Link} from 'react-router-dom'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'

function Navbar() {

  const [cookies, setCookies] = useCookies(["access_token"])
  
  const navigate = useNavigate()

  const logout = () => {
    setCookies("access_token","")
    window.localStorage.removeItem("userID")
    navigate('/auth')
  }
  return (
    <div style={{'background':'black',"height":'50px'}}>
      <Link style={{'color':'white','marginLeft':'300px',"textDecoration":'none','fontSize':"30px"}} to={'/'}>Home</Link>
      <Link style={{'color':'white','marginLeft':'100px',"textDecoration":'none','fontSize':"30px"}} to={'/create'}>Create reciepe</Link>
      
      {!cookies.access_token ? (<Link style={{'color':'white','marginLeft':'100px',"textDecoration":'none','fontSize':"30px"}} to={'/auth'}>Login/register</Link>)
      :(
      <>
      <Link style={{'color':'white','marginLeft':'100px',"textDecoration":'none','fontSize':"30px"}} to={'/saved'}>Saved recipe</Link>
      <button onClick={logout}>LogOut</button></>
      )}
      
    </div>
  )
}

export default Navbar
