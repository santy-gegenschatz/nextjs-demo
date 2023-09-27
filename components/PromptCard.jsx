"use client";
import {useState, useEffect} from 'react'
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const PromptCard = ({prompt, handleTagClick, handleEdit, handleDelete}) => {
  const [copied, setCopied] = useState(false);
  const { data: session } = useSession()

  const handleCopy = () => {
    setCopied(prompt.prompt)
    navigator.clipboard.writeText(prompt.prompt)
    setTimeout(() => setCopied("false"), 3000)
  }

  return (
    <div className='p-1 m-1 flex-center prompt_card'>
      <div className='flex justify-between items-start gap-5 m-2'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
          <Image 
            src = {prompt.creator.image}
            alt = {prompt.creator.name}
            width = {32}
            height = {32}
            className = 'rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-800'> 
              {prompt.creator.name} 
            </h3>
            <p className='text-gray-500 font-inter text-sm'>
               {prompt.prompt} 
            </p>
            <p 
              className='m-1 font-inter text-sm blue_gradient cursor-pointer'
              onClick={() => handleTagClick && handleTagClick(prompt.tag)}
            >
              {prompt.tag}
            </p>
            {/* Here we need to check whether the current logged in users is the author */}
            {session?.user.id === prompt.creator._id && usePathname() === '/profile' && (
              <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
              <p
                className='font-inter text-sm green_gradient cursor-pointer'
                onClick={handleEdit}
              >
                Edit
              </p>
              <p
                className='font-inter text-sm orange_gradient cursor-pointer'
                onClick={handleDelete}
              >
                Delete
              </p>
              </div>
            )}
          </div>
        </div>

        <div 
          className='copy_btn'
          onClick={handleCopy}
        >
          <Image 
            src = { copied === prompt.prompt ? 'assets/icons/tick.svg' : 'assets/icons/copy.svg' }
            width={12}
            height={12}
            alt = 'an_image'
          />
        </div>
      </div>
    </div>
  )
}

export default PromptCard
