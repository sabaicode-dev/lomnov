'use client'
import { z } from 'zod';
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
import { categories } from '@/libs/const/category';
import { locations } from '@/libs/const/location';
export default function UpdateProperties({ item }: { item: IUpdatePropertiesType }) {

    return (
        <>
            <Toaster position='bottom-right' duration={3000} />
            <div className='max-w-full w-[1400px] m-auto mt-16 h-full'>
                <h1 className='font-[600] leading-[5px] text-[20px] font-helvetica text-helvetica-h4'>Update properties</h1>
                <form action="">
                    <div className='w-full block justify-between flex-row mt-2 gap-1 '>
                        {/* row 1 */}
                        <PostPropertiesTitle title={item.title!} slug={item.title} onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                            throw new Error('Function not implemented.');
                        }} />
                        {/* rich editor */}
                        <PostRichEditor title='Detail*' values={item?.description[0]?.content} />
                        {/* transition sale & rent  */}
                        <h1 className='font-[600] leading-[5px] text-[25px] font-helvetica text-helvetica-paragraph mt-10 tracking-widest '>Type*</h1>
                        <PostSelectTransition onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                            throw new Error('Function not implemented.');
                        }} transitionValue={item?.transition[0]?.content} />
                        {/* row 2 */}
                        <div className='w-full h-[80%] flex flex-1 gap-9 justify-between items-center mt-1'>
                            <PostInputField values={item?.price || 0} placeholder='$' title='Price*' />
                            {/* Category Dropdown (div-based) */}
                            <PostSelectField zIndex='20' title='Category' onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                                throw new Error('Function not implemented.');
                            }} options={categories} defaultOption={{
                                name: item?.category[0]?.content || ''
                            }}
                            />

                        </div>
                        <div className='w-full  h-[80%] flex flex-1 gap-9 justify-between items-center mt-1'>
                            <PostInputField values={item?.address[0]?.content || ''} title='Address*' />
                            {/* Category Dropdown (div-based) */}
                            <PostSelectField title='Location*' onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                                throw new Error('Function not implemented.');
                            }} options={locations} defaultOption={{
                                name: item?.location[0]?.content || ''
                            }} />
                        </div>
                        {/* properties att */}
                        <div className='w-full mt-5'>
                            <div className='bg-gray-50 shadow-md w-full h-full p-2 rounded-t-[12px] border-gray-[#D9D9D9] border-b-[2px]'>
                                <div className='w-[380px] h-auto flex justify-between items-center'>
                                    <span className='font-helvetica leading-3 tracking-widest my-3 text-[18px] text-helvetica-paragraph font-bold text-gray-700'>Properties attributes*</span>
                                </div>
                            </div>
                            <div className='bg-white shadow-md w-full h-full rounded-b-[12px] pb-10'>
                                <div className='w-full h-full  flex flex-1 gap-9 px-[20px]'>
                                    <PostInputField values={item?.detail ? item?.detail[0]?.bedrooms : 0} title='Bedrooms' name='detail.0.content.bedrooms' className='border border-[#D9D9D9] shadow-sm ' types='number' />
                                    <PostInputField values={item?.detail ? item?.detail[0]?.bathrooms : 0} title='Bathrooms' name='detail.0.content.bathrooms' className='border border-[#D9D9D9] shadow-sm' types='number' />
                                </div>
                                <div className='w-full h-full  flex flex-1 gap-9 px-[20px]'>
                                    <PostInputField values={item?.detail ? item?.detail[0]?.size : 0} title='Spacious life (m2)' name='detail.0.content.size' className='border border-[#D9D9D9] shadow-sm ' types='text' />
                                    <PostInputField values={item?.detail ? item?.detail[0]?.parking : 0} title='Parking available' name='detail.0.content.parking' className='border border-[#D9D9D9] shadow-sm ' types='number' />
                                </div>
                            </div>
                        </div>
                        {/* Images Upload  */}
                        <div className="w-full mt-5">
                            <PostUploadImages imagePreviews={item?.images} errMsg={true} />
                        </div>
                        <div className="w-full mt-5">
                            <PostMap values={item?.urlmap} onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                                throw new Error('Function not implemented.');
                            }} />
                        </div>
                        <div className="w-full mt-5">
                            <PostToggleButton isChecked={item.status} />
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
