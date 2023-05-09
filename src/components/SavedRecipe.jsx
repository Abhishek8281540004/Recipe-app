import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useGetUserID } from '../hooks/useGetUserID'


function SavedRecipe() {
  const [savedRecipes, setSavedRecipes] = useState([])
  
  const userID = useGetUserID()
  useEffect(() => {
  

   const fetchSavedRecipe  = async () =>{
    try {
      const response = await axios.get(`http://localhost:8000/recipes/savedRecipes/${userID}`)
      console.log("RESPONSE",response);
      setSavedRecipes(response.data.savedRecipes)
      
      
   } catch (error) {
    console.log(error);
   }
   }

   
   
   fetchSavedRecipe()
  }, [])

  console.log(savedRecipes);
  
  return (
   <div>
    <h1>SavedRecipes</h1>
    <ul>
      {savedRecipes.map((recipe)=>{
      return(
     <><li key={recipe._id}>
        
        
          <h2>{recipe.name}</h2>
          
        
        <div>
          <p>{recipe.instructions}</p>
          <p>{recipe.ingredients}icredients</p>
        </div>
        <img src={recipe.imageurl} alt={recipe.name} />
        <p>Cooking Time: {recipe.cookingTime}(minutes)</p>
      </li></> )
    })}</ul>
   </div>
  )
}

export default SavedRecipe

