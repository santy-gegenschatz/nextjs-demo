"use client";

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const MyProfile = () => {
  const { data: session } = useSession()
  const [prompts, setPrompts] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`)
      setLoading(true)
      const data = await response.json()
      // console.log('data: ', data);
      setPrompts(data)
      setLoading(false)
    }
    if (session?.user.id) {
      fetchPosts()
    } else {
      console.log('No session found');
    }
  }
  , [session])

  const handleEdit = (post) => {
    // We want to send the user to the edit page
    // We need to pass the post id to the edit page
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async (post) => {
    // Check that the user is sure that he wants to delete the post
    const hasConfirmed = confirm('Are you sure you want to delete this post?')
    if (hasConfirmed) {
      try {
        // Send a request to the server to delete the post
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE',
        })
        // Reload the page
        window.location.reload()

      } catch (error) {
        console.log('error: ', error);
      }
    }
  }

  return (
    <Profile 
        name = 'My'
        desc = 'Welcome to your personalized profile'
        data = {prompts}
        handleEdit = {handleEdit}
        handleDelete = {handleDelete}
    />
  )
}

export default MyProfile