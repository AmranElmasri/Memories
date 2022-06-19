import React from 'react'
import { useSelector } from 'react-redux';


export default function Posts() {
  const data = useSelector((state) => state.posts);
  console.log(data);
  return (
    <div>Posts</div>
  )
}
