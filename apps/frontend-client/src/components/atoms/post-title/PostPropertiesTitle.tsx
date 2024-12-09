import React, { ChangeEvent } from 'react'
import PostInputField from '../post-input-field/PostInputField'
interface IPostPropertiesTitleProps {
  title: Array<{ content: string; language: string }>;
  slug: Array<{ content: string; language: string }>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errorMsg?:boolean
}
export default function PostPropertiesTitle({ title, slug,errorMsg, onChange}: IPostPropertiesTitleProps) {

  return (
    <div className='w-full h-[80%] flex flex-1 gap-9 justify-between items-center mt-1'>
      <PostInputField errorMsg={errorMsg} name='title.0.content' onChange={onChange} values={title[0].content} title='Title' placeholder='Properties title' />
      <PostInputField errorMsg={errorMsg} name='slug.0.content' className='border-none' onChange={onChange} values={slug[0].content} title='Slug' placeholder='Properties slug' />
    </div>
  )
}
