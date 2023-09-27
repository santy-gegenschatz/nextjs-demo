"use client";
import { useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  });

  const createPrompt = async (e) => {
    e.preventDefault(); // Prevents the default refresh by the browser
    console.log('submitting');
    setSubmitting(true);
    
    try {
      // This code will use the fetch API to send a POST request to the API
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user.id
        })
      })

      if (response.ok) {
        router.push('/')
      }

    } catch (error) {
      console.log(error)
    } finally {
      // This will happen anyway
      setSubmitting(false);
    }
  }
  return (
    <Form 
        type = 'Create'
        post = {post}
        setPost = {setPost}
        submitting = {submitting}
        handleSubmit = {createPrompt}
    />
  )
}

export default CreatePrompt