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
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { toast, Toaster } from 'sonner';
import { categories } from '@/libs/const/category';
import { locations } from '@/libs/const/location';
import { IPostPropertiesType } from '@/libs/types/api-properties/property-request';
import { transformedObjectDetails } from '@/libs/functions/transformObject';
import { generateSlug } from '@/libs/functions/generateSlug';
import { extractLatLngFromUrl } from '@/libs/functions/extractLatLngFromUrl';
import axiosInstance from '@/libs/axios';
import { API_ENDPOINTS } from '@/libs/const/api-endpoints';
import Link from 'next/link';
export default function UpdateProperties({ item }: Readonly<{ item: IUpdatePropertiesType }>) {

    const transformedDetail = transformedObjectDetails(item?.detail);
    const itemId = item._id;
    
    const [_isChecked, setIsChecked] = useState<boolean>(false);
    const [imagePreviews, setImagePreviews] = useState<string[]>(item?.images);
    // @ts-ignore
    const username = item?.propertyOwner?.userName;
    // / Define Zod validation schema (shown above)
    const propertySchema = z.object({
        title: z.array(z.object({
            content: z.string().min(1, 'Title is required') // Ensure this is applied correctly to the `content` field
        })).min(1, 'At least one title is required'), // Add min validation to ensure at least one title object exists
        price: z.union([
            z.number().min(1, 'Price must be a positive number'),  // Validates if it's a number and positive
            z.string().refine(val => {
                // Check if the string is a valid number and greater than 0
                const parsedPrice = parseFloat(val);
                return !isNaN(parsedPrice) && parsedPrice > 0;
            }, {
                message: 'Price must be a valid positive number',
            })
        ]),
        category: z.array(z.object({
            content: z.string().nonempty('Category is required')
        })).min(1, 'Category is required'),
        location: z.array(z.object({
            content: z.string().nonempty('Location is required')
        })).min(1, 'Location is required'),
        description: z.array(z.object({
            content: z.string().min(1, 'Description is required')
        })),
        urlmap: z.string().url('Must be a valid URL'),
        status: z.boolean(),
        // Updated images validation to accept File objects or URLs
        images: z.union([
            z.array(z.instanceof(File)), // Array of File objects
            z.array(z.string().url('Each image URL must be a valid URL')) // Array of valid URLs
        ])
            .refine(val => {
                // If it's an array, check that at least one URL or file is provided
                if (Array.isArray(val)) {
                    // Check if it's an array of valid URLs or valid files
                    if (val.every(v => typeof v === 'string' && v.trim() !== '' && v.startsWith('http'))) {
                        return true;  // Valid array of URLs
                    }

                    if (val.every(v => v instanceof File)) {
                        return true;  // Valid array of files
                    }

                    // Mix of strings and files
                    return val.some(v => typeof v === 'string' && v.trim() !== '' && v.startsWith('http')) || val.some(v => v as any instanceof File);
                }
                // @ts-ignore
                // For single values, check if it's a valid File or URL
                return typeof val === 'string' && val.startsWith('http') || val as any instanceof File;
            }, {
                message: 'At least one valid image (URL or File) is required.'
            })

    });

    // Define form state with the transformed `detail`
    const [formData, setFormData] = useState<IPostPropertiesType>({
        ...item,
        detail: transformedDetail || []
    });
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        // @ts-ignore
        const { name, value } = e.target;
        if (name.includes(".")) {
            const [arrayName, index, key, subkey] = name.split(".");
            if (arrayName === 'detail' as keyof IPostPropertiesType) {
                const indexNum = parseInt(index, 10);
                setFormData(prev => {
                    const updatedDetails = [...prev.detail!];
                    updatedDetails[indexNum] = {
                        ...updatedDetails[indexNum],
                        content: {
                            ...updatedDetails[indexNum].content,
                            [subkey]: value
                        }
                    }
                    return { ...prev, detail: updatedDetails };
                });
            } else if (arrayName === 'title') {
                const newSlug = generateSlug(value);
                setFormData(prev => ({
                    ...prev,
                    title: [{ content: value, language: "en" }],
                    slug: [{ content: newSlug, language: "en" }]
                }))
            } else {
                const indexNum = parseInt(index, 10);
                setFormData(prev => {
                    const updatedArray = [...prev[arrayName as keyof IPostPropertiesType] as any];
                    updatedArray[indexNum] = { ...updatedArray[indexNum], [key]: value };
                    return { ...prev, [arrayName]: updatedArray }
                })
            }
        } else {
            if (name === 'urlmap') {
                const result = extractLatLngFromUrl(value);

                const [lat, lng]: [number, number] = result ? result : [0, 0];

                setFormData(prevState => ({
                    ...prevState,
                    urlmap: value,
                    coordinate: { type: "Point", coordinates: [lng, lat] } as IPostPropertiesType | any
                }));
            } else {
                setFormData(prevState => ({ ...prevState, [name]: value })); // Update non-nested fields
            }
        }
    }
    const handleStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked);
        setFormData(prev => ({ ...prev, status: e.target.checked }))
    };
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files) {
            const selectedFiles = Array.from(files);
            // Store actual files for the form submission
            //@ts-ignore
            setFormData(prevState => ({
                ...prevState,
                images: selectedFiles!,  // Store file objects here
                thumbnail: selectedFiles[0]!  // Store the first image as the thumbnail
            }));
            // Generate preview URLs for image display (optional)
            const imageUrls = selectedFiles.map(file => URL.createObjectURL(file));
            setImagePreviews(imageUrls);  // Used for preview
        }
    };

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = new FormData();
        if (formData.images && formData.images.length > 0) {
            formData.images.forEach(image => {
                form.append('images', image);  // Append each image file (not URL)
            });
        }
        // Append the thumbnail (first image as thumbnail)
        if (formData.thumbnail) {
            console.log("thumnail...");

            form.append('thumbnail', formData.thumbnail);  // Append the actual file for thumbnail
        }
        form.append('title', JSON.stringify(formData.title));
        form.append('description', JSON.stringify(formData.description));
        form.append('urlmap', formData.urlmap || "");
        form.append('address', JSON.stringify(formData.address));
        form.append('location', JSON.stringify(formData.location));
        form.append('price', formData?.price.toString());
        form.append('category', JSON.stringify(formData.category));
        form.append('transition', JSON.stringify(formData.transition));
        form.append('detail', JSON.stringify(formData.detail));
        form.append('coordinate', JSON.stringify(formData.coordinate))
        try {
            propertySchema.parse(formData);
            const resp = await axiosInstance.put(`${API_ENDPOINTS.MY_PROPERTY}/${itemId}`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if(resp.status === 200){
                console.log(resp.data);
                
                toast.success("Update Success!",{className:"bg-olive-drab text-white"})
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                // Show validation errors using Toaster
                error.errors.forEach(err => {
                    toast.error(err.message, { className: " bg-olive-drab text-white" }); // Display error message using Toaster
                });
            }
        }
    }
    return (
        <>
            <Toaster position='bottom-right' duration={3000} />
            <div className='max-w-full w-[1400px] m-auto mt-16 h-full'>
                <h1 className='font-[600] leading-[5px] text-[20px] font-helvetica text-helvetica-h4'>Update properties</h1>
                <form action="" onSubmit={handleSubmit}>
                    <div className='w-full block justify-between flex-row mt-2 gap-1 '>
                        {/* row 1 */}
                        <PostPropertiesTitle title={formData.title!} slug={formData.slug ? formData.slug : item.title} onChange={handleInputChange} />
                        {/* rich editor */}
                        <PostRichEditor name='description.0.content' title='Detail*' values={formData?.description[0]?.content} onChange={handleInputChange} />
                        {/* transition sale & rent  */}
                        <h1 className='font-[600] leading-[5px] text-[25px] font-helvetica text-helvetica-paragraph mt-10 tracking-widest '>Type*</h1>
                        <PostSelectTransition onChange={handleInputChange} transitionValue={formData?.transition[0]?.content} />
                        {/* row 2 */}
                        <div className='w-full h-[80%] flex flex-1 gap-9 justify-between items-center mt-1'>
                            <PostInputField name='price' types='number' values={formData?.price || 0} placeholder='$' title='Price*' onChange={handleInputChange} />
                            {/* Category Dropdown (div-based) */}
                            <PostSelectField zIndex='20' title='Category'
                                name='category.0.content'
                                onChange={handleInputChange} options={categories} defaultOption={{
                                    name: formData?.category[0]?.content || 'Select Category'
                                }}
                            />

                        </div>
                        <div className='w-full  h-[80%] flex flex-1 gap-9 justify-between items-center mt-1 '>
                            <PostInputField values={formData?.address[0]?.content || ''} title='Address*' name='address.0.content' onChange={handleInputChange} />
                            {/* Category Dropdown (div-based) */}
                            <PostSelectField title='Location*' name='location.0.content' onChange={handleInputChange} options={locations} defaultOption={{
                                name: formData?.location[0]?.content || 'Select Location'
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
                                    <PostInputField onChange={handleInputChange} values={formData?.detail ? formData?.detail[0]?.content?.bedrooms : 0} title='Bedrooms' name='detail.0.content.bedrooms' className='border border-[#D9D9D9] shadow-sm ' types='number' />
                                    <PostInputField onChange={handleInputChange} values={formData?.detail ? formData?.detail[0]?.content?.bathrooms : 0} title='Bathrooms' name='detail.0.content.bathrooms' className='border border-[#D9D9D9] shadow-sm' types='number' />
                                </div>
                                <div className='w-full h-full  flex flex-1 gap-9 px-[20px]'>
                                    <PostInputField onChange={handleInputChange} values={formData?.detail ? formData?.detail[0]?.content?.size : 0} title='Spacious life (m2)' name='detail.0.content.size' className='border border-[#D9D9D9] shadow-sm ' types='text' />
                                    <PostInputField onChange={handleInputChange} values={formData?.detail ? formData?.detail[0]?.content?.parking : 0} title='Parking available' name='detail.0.content.parking' className='border border-[#D9D9D9] shadow-sm ' types='number' />
                                </div>
                            </div>
                        </div>
                        {/* Images Upload  */}
                        <div className="w-full mt-5">
                            <PostUploadImages imagePreviews={imagePreviews} OnImageChange={handleImageChange} errMsg={true} />
                        </div>
                        <div className="w-full mt-5">
                            <PostMap values={formData?.urlmap} onChange={handleInputChange} />
                        </div>
                        <div className="w-full mt-5">
                            <PostToggleButton isChecked={formData?.status} onChecked={handleStatusChange} />
                        </div>
                        <div className='w-full h-full flex justify-end items-center py-2'>
                            <div>
                                <Link href={`/profile/${username}`} type='reset' className='px-4 py-[11px] rounded-md m-2 font-medium text-slate-800 bg-slate-300'>Back</Link>
                                <button type="submit" className="px-4 py-2 text-white font-medium rounded-md bg-blue-700">
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
