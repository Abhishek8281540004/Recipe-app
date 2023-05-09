import React, { useState } from 'react'
import axios from 'axios'
import { useGetUserID } from '../hooks/useGetUserID'
import { useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie'

function CreateRecipe() {
  const userID = useGetUserID() 
  const [cookies, _] = useCookies(["access_token"])

  const[recipe, setRecipe] = useState({
    name:"",
    ingredients:[],
    instructions:"",
    imageurl:"",
    cookingTime:0,
    userOwner:userID,
  })
  const navigate = useNavigate()

  
  const handleChange = (event) =>{
    const{name,value} = event.target
    setRecipe({...recipe, [name]:value})

  }

  const addIcredient = () => {
    setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]})   //setting recipe as it is and adding empty objeact to ingredients
  }

  const handlIncredientChange = (event,idx) =>{
    const {value} = event.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({...recipe,ingredients})
    
  }

 const onSubmit = async (event) =>{
   event.preventDefault()
   try {
      await axios.post("http://localhost:8000/recipes",recipe,
      {headers:{authorization:cookies.access_token}})
      alert("receipe created")
      navigate("/")
   } catch (error) {
    console.log(error);
   }
 }
  return (
    <div >
      <h2>Create recipe</h2>

      <form onSubmit={onSubmit} style={{"display":"grid"}}>
        <label htmlFor="name" style={{"textAlign":"center"}}>Name</label>
        <input style={{"width":"600px","marginLeft":"500px","marginTop":"30px"}} type="text" id='name' name='name' onChange={handleChange} />
        <label htmlFor="ingredients" style={{"textAlign":"center","marginTop":"30px"}}>incredients</label>
        {recipe.ingredients.map((ingredient, idx)=>{
          return(
          <input key={idx} type='text' name='ingredients' value={ingredient} onChange={(event) =>handlIncredientChange(event, idx)}></input>)
        })}
        <button onClick={addIcredient} type='button' style={{"width":"200px","marginLeft":"650px","marginTop":"30px"}}>Add Incredient</button>

        <label htmlFor="instructions" style={{"textAlign":"center","marginTop":"30px"}}>instructions</label>
        <textarea style={{"width":"600px","marginLeft":"500px","marginTop":"30px"}} name="instructions" id='instructions' onChange={handleChange}></textarea>
        <label htmlFor="imageurl" style={{"textAlign":"center"}}>Image Url</label>
        <input style={{"width":"600px","marginLeft":"500px","marginTop":"30px"}} type="text" id='imageurl' name='imageurl' onChange={handleChange} />
        <label htmlFor="cookingTime" style={{"textAlign":"center","marginTop":"30px"}}>Cooking time (minutes)</label>
        <input style={{"width":"600px","marginLeft":"500px","marginTop":"30px"}} type="text" id='cooingTime' name='cookingTime' onChange={handleChange} />
        <button  type='submit' style={{"width":"200px","marginLeft":"650px","marginTop":"30px"}}>create recipe</button>
      </form>
    </div>
  )
}

export default CreateRecipe
