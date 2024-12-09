'use client'
import PostAtttributes from '@/components/atoms/post-attributes/PostAtttributes';
import PostUploadImages from '@/components/atoms/post-images-upload/PostUploadImages';
import PostInputField from '@/components/atoms/post-input-field/PostInputField';
import PostMap from '@/components/atoms/post-map/PostMap';
import PostRichEditor from '@/components/atoms/post-rich-editor/PostRichEditor';
import PostSelectField from '@/components/atoms/post-select-field/PostSelectField';
import PostSelectTransition from '@/components/atoms/post-select-transition/PostSelectTransition';
import PostPropertiesTitle from '@/components/atoms/post-title/PostPropertiesTitle';
import PostToggleButton from '@/components/atoms/post-toggle-button/PostToggleButton';
import { IUpdatePropertiesType } from '@/libs/types/api-properties/property-response'
import React from 'react'
import { Toaster } from 'sonner';

export default function UpdateProperties({ item }: { item: IUpdatePropertiesType }) {
    console.log("Update property:: ", item);
    return (
        <>
            <Toaster position='bottom-right' duration={3000} />
            <div className='max-w-full w-[1400px] m-auto mt-16 h-full'>
                <h1 className='font-[600] leading-[5px] text-[20px] font-helvetica text-helvetica-h4'>Update properties</h1>
                <form action="">
                    <div className='w-full block justify-between flex-row mt-2 gap-1 '>
                        {/* row 1 */}
                        <PostPropertiesTitle title={[]} slug={[]} onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                            throw new Error('Function not implemented.');
                        } }  />
                        {/* rich editor */}
                        <PostRichEditor  />
                        {/* transition sale & rent  */}
                        <h1 className='font-[600] leading-[5px] text-[25px] font-helvetica text-helvetica-paragraph mt-10 tracking-widest '>Type*</h1>
                        <PostSelectTransition onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                            throw new Error('Function not implemented.');
                        } } transitionValue={''} />
                        {/* row 2 */}
                        <div className='w-full h-[80%] flex flex-1 gap-9 justify-between items-center mt-1'>
                            <PostInputField />
                            {/* Category Dropdown (div-based) */}
                            <PostSelectField onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                                throw new Error('Function not implemented.');
                            } } options={[]} defaultOption={{
                                name: ''
                            }}                         
                            />

                        </div>
                        <div className='w-full  h-[80%] flex flex-1 gap-9 justify-between items-center mt-1'>
                            <PostInputField  />
                            {/* Category Dropdown (div-based) */}
                            <PostSelectField onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                                throw new Error('Function not implemented.');
                            } } options={[]} defaultOption={{
                                name: ''
                            }} />
                        </div>
                        {/* properties att */}
                        <div className='w-full mt-5'>
                            <PostAtttributes />
                        </div>
                        {/* Images Upload  */}
                        <div className="w-full mt-5">
                            <PostUploadImages errMsg={false}  />
                        </div>
                        <div className="w-full mt-5">
                            <PostMap onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                                throw new Error('Function not implemented.');
                            } } />
                        </div>
                        <div className="w-full mt-5">
                            <PostToggleButton/>
                        </div>
                        <div className='w-full h-full flex justify-end items-center py-2'>
                            <div>
                                <button className='px-4 py-2 rounded-md m-2 font-medium text-slate-800 bg-slate-300'>Cancel</button>
                                <button type="submit" className="px-4 py-2 text-white font-medium rounded-md bg-blue-700">
                                   Update
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </>
    )
}
