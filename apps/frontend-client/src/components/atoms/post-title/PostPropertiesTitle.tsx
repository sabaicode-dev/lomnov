import React from 'react'
import PostInputField from '../post-input-field/PostInputField'

export default function PostPropertiesTitle() {
  return (
    <div className='w-full h-[80%] flex flex-1 gap-9 justify-between items-center mt-1'>
      <PostInputField title='Title' placeholder='Properties title' />
      <PostInputField title='Slug' placeholder='Properties slug' />
    </div>
  )
}
