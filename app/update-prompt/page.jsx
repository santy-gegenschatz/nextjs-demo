"use client";
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  });

//   Let's use a useeffect to fetch the post data
//   We need to get the post id from the router
    useEffect(() => {
        const fetchPost = async () => {
        const response = await fetch(`/api/prompt/${promptId}`)
        console.log(response);
        const data = await response.json()
        console.log(data);
        setPost({
            prompt: data.prompt,
            tag: data.tag
        })
        }
        // We only want to fetch the post if we have a post id
        if (promptId) {
            fetchPost()
        }
    }, [promptId])

  const updatePrompt = async (e) => {
    e.preventDefault(); // Prevents the default refresh by the browser
    if(!promptId) {
        alert('No prompt id');
    }
    setSubmitting(true);
    // Create the try catch finally block to hit the patch api route
    try {
        const response = await fetch(`/api/prompt/${promptId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })
        const data = await response.json()
        console.log(data);
        // Redirect to the home page
        router.push('/')
    } catch (error) {
        console.error(error)
    } finally {
        setSubmitting(false);
    }
  }
  return (
    <Form 
        type = 'Edit'
        post = {post}
        setPost = {setPost}
        submitting = {submitting}
        handleSubmit = {updatePrompt}
    />
  )
}

export default EditPrompt