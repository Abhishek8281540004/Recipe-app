import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useGetUserID } from '../hooks/useGetUserID'
import {useCookies} from "react-cookie"


function Home() {
  const [recipes, setRecipes] = useState([])
  const [savedRecipes, setSavedRecipes] = useState([])
  const [cookies, _] = useCookies(["access_token"])

  const userID = useGetUserID()
  useEffect(() => {
   const fetchRecipe  = async () =>{
    try {
      const response = await axios.get("http://localhost:8000/recipes")
      setRecipes(response.data)
      
      
   } catch (error) {
    console.log(error);
   }
   }

   const fetchSavedRecipe  = async () =>{
    try {
      const response = await axios.get(`http://localhost:8000/recipes/savedRecipes/ids/${userID}`)
      setSavedRecipes(response.data.savedRecipes)
      
      
   } catch (error) {
    console.log(error);
   }
   }

   
   fetchRecipe()
   if(cookies.access_token)fetchSavedRecipe()
   
  }, [])

   const saverecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:8000/recipes",
      {recipeID,
        userID
      },{headers:{authorization:cookies.access_token}})
      setSavedRecipes(response.data.savedRecipes)
      
      
      
   } catch (error) {
    console.log(error);
   }
   }

  const isRecipeSaved = (id) => savedRecipes.includes(id);
  
  return (
   <div>
    <h1>Recipes</h1>
    <ul>{recipes.map((recipe)=>{
      return(
      <li key={recipe._id}>
        
        <div>
          <h2>{recipe.name}</h2>
          <button onClick={()=>saverecipe(recipe._id)} disabled={isRecipeSaved(recipe._id)}>{isRecipeSaved(recipe._id)? "saved" :"save"}</button>
        </div>
        <div>
          <p>{recipe.instructions}</p>
        </div>
        <img src={recipe.imageurl} alt={recipe.name} />
        <p>Cooking Time: {recipe.cookingTime}(minutes)</p>
      </li>)
    })}</ul>
   </div>
  )
}

export default Home
