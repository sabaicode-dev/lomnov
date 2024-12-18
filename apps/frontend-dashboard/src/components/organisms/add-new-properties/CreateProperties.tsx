/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import CardPostDescription from '@/components/atoms/card-post-description/CardPostDescription'
import Input from '@/components/atoms/InputField/Input'
import SelectOptions from '@/components/atoms/select-options/SelectOptions'
import AddressMap from '@/components/molecules/address-map/AddressMap'
import PhotoAttachment from '@/components/molecules/photo-attachment/PhotoAttachment'
import React, { ChangeEvent, useState } from 'react'
import { categories } from '@/libs/const/categories';
import { transition } from '@/libs/const/transition';
import { locations } from '@/libs/const/locations';
import { IRequestCreatePropperties } from '@/libs/types/request/IRequestCreatePropperties'
import { generateSlug } from '@/libs/functions/generateSlug';
import { extractLatLngFromUrl } from '@/libs/functions/extractLatLngFromUrl'
import Status from '@/components/molecules/status/Status'
import axiosInstance from '@/libs/axios'
import { API_ENDPOINTS } from '@/libs/const/api-endpionts'
export default function CreateProperties() {
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const defaultCategory = { name: "Select" };

    const [properties, setProperties] = useState<IRequestCreatePropperties>({
        title: [{ content: '', language: 'en' }],
        slug: [{ content: '', language: 'en' }],
        description: [{ content: '', language: 'en' }],
        price: 0,
        category: [{ content: '', language: 'en' }],
        location: [{ content: '', language: 'en' }],
        detail: [
            {
                content: {
                    bedrooms: '',
                    bathrooms: '',
                    size: '',
                    parking: '',
                    square: '',
                    fireplace: '',
                    garden: '',
                    patio: '',
                    kitchen: '',
                    land_size: "",
                    road_size: '',
                    pool: ""
                },
                language: 'en'
            }
        ],
        urlmap: '',
        transition: [{ content: '', language: 'en' }],
        status: false,
        thumbnail: '',
        images: [''],  // Corrected here
        coordinate: { type: "Point", coordinates: [0, 0] },
        address: [{ content: '', language: 'en' }]
    });
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length > 0) {
            // Perform validation file size TODO!!
            console.log(files[0].size);
            //======================================
            const selectedFiles = Array.from(files);
            // Store actual files for the form submission
            setProperties((prev): IRequestCreatePropperties => ({
                ...prev,
                images: selectedFiles! as File[] as any,
                thumbnail: selectedFiles[0]! as File as any,
            }))
            // Generate preview URLs for image display (optional)
            const imageUrls = selectedFiles.map(file => URL.createObjectURL(file));
            setImagePreviews(imageUrls);
        }
    }
    const handleRemoveImage = (index: number) => {
        setImagePreviews((prevImages) => prevImages.filter((_, i) => i !== index));
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        console.log(name, value);
        if (name.includes(".")) {
            const [arrayName, index, key, subkey] = name.split(".");
            if (arrayName === 'title') {
                const newSlog = generateSlug(value);
                setProperties(prev => ({
                    ...prev,
                    title: [{ content: value, language: "en" }],
                    slug: [{ content: newSlog, language: "en" }]
                }))
            } else if (arrayName === 'detail') {
                const idx = parseInt(index, 10);
                setProperties(prev => {
                    const updateDatails = [...prev.detail!];
                    updateDatails[idx] = {
                        ...updateDatails[idx],
                        content: {
                            ...updateDatails[idx].content,
                            [subkey]: value,
                        }
                    };
                    return { ...prev, detail: updateDatails }
                });
            } else {
                const indexNum = parseInt(index, 10);
                setProperties(prevState => {
                    const updatedArray = [...prevState[arrayName as keyof IRequestCreatePropperties] as any];
                    updatedArray[indexNum] = { ...updatedArray[indexNum], [key]: value };
                    return { ...prevState, [arrayName]: updatedArray };
                });
            }
        } else {
            if (name === 'urlmap') {
                const result = extractLatLngFromUrl(value);
                const [lat, lng]: [number, number] = result ? result : [0, 0];
                setProperties(prev => ({ ...prev, urlmap: value, coordinate: { type: "Point", coordinates: [lng, lat] } as IRequestCreatePropperties | any }))
            } else {
                setProperties(prevState => ({ ...prevState, [name]: value })); // Update non-nested fields
            }
        }
    }
    const handleStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setIsChecked(checked);
        setProperties(prev => ({ ...prev, status: checked }));
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(properties);
        
        const form = new FormData();
        if (properties.images && properties.images.length > 0) {
            console.log("Image ...");

            properties.images.forEach(image => {
                form.append('images', image);  // Append each image file (not URL)
            });
        }

        // Append the thumbnail (first image as thumbnail)
        if (properties.thumbnail) {
            console.log("thumnail...");

            form.append('thumbnail', properties.thumbnail);  // Append the actual file for thumbnail
        }
        // Append other form fields
        form.append('title', JSON.stringify(properties.title));
        form.append('description', JSON.stringify(properties.description));
        form.append('urlmap', properties.urlmap || "");
        form.append('address', JSON.stringify(properties.address));
        form.append('location', JSON.stringify(properties.location));
        form.append('price', properties?.price.toString());
        form.append('category', JSON.stringify(properties.category));
        form.append('transition', JSON.stringify(properties.transition));
        form.append('detail', JSON.stringify(properties.detail));
        form.append('coordinate', JSON.stringify(properties.coordinate))
        form.append('slug', JSON.stringify(properties.slug))
        form.append('status', properties.status as any);
        try {
            const responses = await axiosInstance.post(API_ENDPOINTS.PROPERTIES, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (responses.status === 200) {
                console.log(responses.data);
                
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form onSubmit={handleSubmit} className='w-full'>
            <div className="w-[100%] mt-[40px] p-[24px] bg-[#F3F4F6] rounded-xls">
                <p className="text-[20px] font-[600]">Overview</p>
                <div className="w-[100%] grid gap-4 grid-cols-2 mt-[20px]">
                    <div className="w-[100%] block mt-[5px]">
                        <Input placeholder='Property Title' name='title.0.content' errorMsg={true} className='bg-BgSoftWhite rounded-md border-[1.5px] border-[#D9D9D9]' onChange={handleInputChange} values={properties?.title[0]?.content} title='Title*' />
                    </div>
                    <div className="w-[100%] block mt-[5px]">
                        <Input placeholder='Property Slug' name='slug.0.content' errorMsg={true} className='bg-BgSoftWhite rounded-md border-[1.5px] border-[#D9D9D9]' onChange={handleInputChange} values={properties?.title[0]?.content} title='Slug(auto)' />
                    </div>
                </div>
                <div className="w-[100%]  mt-[20px] text-[14px]">
                    <CardPostDescription title='Description*' name='description.0.content' onChange={handleInputChange} values={properties.description[0].content} />
                </div>
                <div className="w-[100%] grid gap-4 grid-cols-2 mt-[20px] text-[14px]">
                    <div className="w-[100%] block">
                        <SelectOptions name='category.0.content' title='Categories' options={categories} onChange={handleInputChange} defaultOption={defaultCategory} />
                    </div>
                    <div className="w-[100%] block text-[14px] z-20">
                        <SelectOptions name='transition.0.content' title='Transition' options={transition} onChange={handleInputChange} defaultOption={defaultCategory} />
                    </div>
                </div>
                <div className="w-[100%] grid gap-4 grid-cols-2 mt-[20px] text-[14px]">
                    <div className="w-[100%] block">
                        <Input placeholder='Price $$' types='number' name='price' errorMsg={true} className='bg-BgSoftWhite rounded-md border-[1.5px] border-[#D9D9D9]' onChange={handleInputChange} values={properties.price ?? 0} title='Price*' />
                    </div>
                    <div className="w-[100%] block text-[14px]">
                        <SelectOptions title='Location' name='location.0.content' options={locations} onChange={handleInputChange} defaultOption={defaultCategory} />
                    </div>
                </div>
            </div>
            {/*List Detail*/}
            <div className="w-[100%] mt-[20px]">
                <div className="w-[100%] mt-[20px] p-[24px] bg-[#F3F4F6] rounded-xls">
                    <p className="text-[20px] font-[600]">List Detail</p>
                    <div className="w-[100%] grid gap-4 grid-cols-3 mt-[20px]">
                        <div className="w-[100%] block">
                            <Input types='number' placeholder='Bedrooms' name='detail.0.content.bedrooms' errorMsg={true} className='bg-BgSoftWhite rounded-md border-[1.5px] border-[#D9D9D9]' onChange={handleInputChange} values={properties.detail ? properties?.detail[0]?.content?.bedrooms : 0} title='Bedrooms' />
                        </div>
                        <div className="w-[100%] block">
                            <Input types='number' placeholder='Bathrooms' name='detail.0.content.bathrooms' errorMsg={true} className='bg-BgSoftWhite rounded-md border-[1.5px] border-[#D9D9D9]' onChange={handleInputChange} values={properties.detail ? properties?.detail[0]?.content?.bathrooms : 0} title='Bathrooms' />
                        </div>
                        <div className="w-[100%] block">
                            <Input types='number' placeholder='Square' name='detail.0.content.square' errorMsg={true} className='bg-BgSoftWhite rounded-md border-[1.5px] border-[#D9D9D9]' onChange={handleInputChange} values={properties.detail ? properties?.detail[0]?.content?.square : 0} title='Square' />
                        </div>
                        <div className="w-[100%] mt-[5px]">
                            <Input types='number' placeholder='Size' name='detail.0.content.size' errorMsg={true} className='bg-BgSoftWhite rounded-md border-[1.5px] border-[#D9D9D9]' onChange={handleInputChange} values={properties.detail ? properties?.detail[0]?.content?.size : 0} title='Size' />
                        </div>
                        <div className="w-[100%] mt-[5px]">
                            <Input types='number' placeholder='Pools' name='detail.0.content.pool' errorMsg={true} className='bg-BgSoftWhite rounded-md border-[1.5px] border-[#D9D9D9]' onChange={handleInputChange} values={properties.detail ? properties?.detail[0]?.content?.pool : 0} title='Pools' />
                        </div>
                        <div className="w-[100%] mt-[5px]">
                            <Input types='number' placeholder='Parking' name='detail.0.content.parking' errorMsg={true} className='bg-BgSoftWhite rounded-md border-[1.5px] border-[#D9D9D9]' onChange={handleInputChange} values={properties.detail ? properties?.detail[0]?.content?.parking : 0} title='Parking' />
                        </div>
                        <div className="w-[100%] mt-[5px]">
                            <Input types='number' placeholder='Garden' name='detail.0.content.garden' errorMsg={true} className='bg-BgSoftWhite rounded-md border-[1.5px] border-[#D9D9D9]' onChange={handleInputChange} values={properties.detail ? properties?.detail[0]?.content?.garden : 0} title='Garden' />
                        </div>
                    </div>

                </div>
            </div>
            <PhotoAttachment OnremoveImage={handleRemoveImage} OnImageChange={handleImageChange} imagePreviews={imagePreviews} />
            <AddressMap onChange={handleInputChange} onMapChange={handleInputChange} mapLink={properties.urlmap} />
            <Status name='status' onChecked={handleStatusChange} isChecked={isChecked} />
            <div className="flex justify-start w-[100%] mt-[20px] items-center gap-4">
                <button className="px-[12px] text-[14px] py-[8px] bg-BgSoftWhite text-black rounded-lg">
                    Cancel
                </button>
                <button type='submit' className="px-[12px] text-[14px] py-[8px] bg-Primary text-BgSoftWhite rounded-lg">
                    Create
                </button>
            </div>
        </form>
    )
}
