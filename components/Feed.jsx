"use client";
import {useState, useEffect} from 'react'

import PromptCard from '@components/PromptCard'

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className='w-full flex-start m-3 prompt_layout'>
    {data.map(prompt => (
      <PromptCard 
        key={prompt._id} 
        prompt={prompt} 
        handleTagClick={handleTagClick}
      />
    ))}
  </div>  
  )
}


const Feed = () => {
  const [prompts, setPrompts] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')

  const handleSearchChange = (e) => {
  
  }

  // This is a useEffect that will run only once
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      setLoading(true)
      const data = await response.json()
      console.log(data);
      setPrompts(data)
      setLoading(false)
    }
    fetchPosts()
  }
  , [])

  return (
    <section className='feed'>
      {/* The search bar for prompts */}
      <form className='relative w-full flex-center'>
        <input 
          type = 'text'
          placeholder = 'Search for a tag or username'
          value = {searchText}
          onChange = {handleSearchChange}
          required
          className='search_input'
        />
      </form>

      {/* The list of prompts */}
      <PromptCardList 
        data = {prompts}
        handleTagClick = {() => {}}
      />
    </section>
  )
}

export default Feed