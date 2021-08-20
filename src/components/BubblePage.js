import React, { useEffect, useState } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import fetchColorService from '../services/fetchColorService';

import axiosWithAuth from "../helpers/axiosWithAuth";
import { rejectSeries } from "async";

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() =>{
    fetchColorService()            
    .then(res =>{
      if (res.data.length !== colors.length) {
        setColors(res.data);
      }
  })
  .catch(err => {
      console.log(err);
  })
  },[colors])

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {
    console.log(editColor);
    setEditing(true);
    axiosWithAuth().put(`colors/${editColor.id}`, editColor)
      .then(res => {
        console.log(res)
        let editedColor = res.data;
        let editedColors = [...colors];
        editedColors[editedColor.id - 1] = editedColor;
        setColors(editedColors);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(()=>{
        setEditing(false);
      })
  };

  const deleteColor = (colorToDelete) => {
    axiosWithAuth().delete(`colors/${colorToDelete.id}`)
      .then(res =>{
        console.log(res.data);
        console.log(colors);
        setColors(colors.filter(color => color.id !== res.data))
      })
      .catch(err => {
        console.log(err);
      })
  };

  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions
