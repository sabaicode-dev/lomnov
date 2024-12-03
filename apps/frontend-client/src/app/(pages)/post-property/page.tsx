'use client'
import Image from 'next/image';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import banner from "@/images/banner.png";
import PostPropertiesTitle from '@/components/atoms/post-title/PostPropertiesTitle';
import PostRichEditor from '@/components/atoms/post-rich-editor/PostRichEditor';
import PostSelectTransition from '@/components/atoms/post-select-transition/PostSelectTransition';
import PostInputField from '@/components/atoms/post-input-field/PostInputField';
import PostSelectField from '@/components/atoms/post-select-field/PostSelectField';
import PostAtttributes from '@/components/atoms/post-attributes/PostAtttributes';
import PostUploadImages from '@/components/atoms/post-images-upload/PostUploadImages';
import PostMap from '@/components/atoms/post-map/PostMap';
import PostToggleButton from '@/components/atoms/post-toggle-button/PostToggleButton';
import axiosInstance from '@/libs/axios';
import { API_ENDPOINTS } from '@/libs/const/api-endpoints';
const properties = [
  { name: "Apartment" },
  { name: "Villa" },
  { name: "House" },
  { name: "Condo" },
  { name: "Townhouse" },
  { name: "Penthouse" },
  { name: "Duplex" },
  { name: "Studio" },
  { name: "Commercial Property" },
  { name: "Shop/Office Space" },
  { name: "Land" },
  { name: "Residential" },
  { name: "Commercial" },
  { name: "Industrial" },
  { name: "Agricultural" },
  { name: "Mixed-use" },
  { name: "Vacation Home" },
  { name: "Rental Properties" },
  { name: "Fixer-upper" },
  { name: "Luxury Properties" },
  { name: "Foreclosed Properties" },
  { name: "New Developments" },
  { name: "Off-plan Properties" },

];
const defaultCategory = { name: "Select Category" };
export interface IPostPropertiesType {
  title: Array<{ content: string; language: string }>;
  slug: Array<{ content: string; language: string }>;
  description: Array<{ content: string; language: string }>;
  thumbnail: '';
  images: string[];
  urlmap?: string;
  address: Array<{ content: string; language: string }>;
  location: Array<{ content: string; language: string }>;
  price?: number;
  category: Array<{ content: string; language: string }>,
  transition: Array<{ content: string; language: string }>,
  detail?: Array<{ language: string; content: { [key: string]: string } }>,
  status?: boolean;
  coordinate?: Array<{ types: string; coordinates: number[] }>;
}
export default function Page() {
  const [displayMap, setDisplayMap] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isValidate, setIsValidate] = useState<boolean>(false);
  /**
   * defualt select options
   */
  const [defualtOption, _setDefualtOption] = useState<{ name: string }>(defaultCategory);
  // Initialize state for form data
  const [formData, setFormData] = useState<IPostPropertiesType>({
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
          parking: ''
        },
        language: 'en'
      }
    ],
    urlmap: '',
    transition: [{ content: '', language: 'en' }],
    status: true,
    thumbnail: '',
    images: [''],  // Corrected here
    coordinate: [{ types: '', coordinates: [0] }],
    address: [{ content: '', language: 'en' }]
  });


  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  /** Function to generate slug from title*/
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')  // Remove special characters
      .replace(/\s+/g, '-')       // Replace spaces with hyphens
      .replace(/-+/g, '-');       // Replace multiple hyphens with a single hyphen
  };
  /** Handle file input change (for multiple image previews)*/
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    const files = e.target.files;
    if (files) {
      /**  Convert files to URLs and update the state*/
      const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
      /** Extract the first image as a thumbnail */
      const firstImage = imageUrls[0];
      /** set the image to previews when user click upload */
      setImagePreviews(imageUrls);
      /** Update state for images and thumbnail for from submition */
      //@ts-ignore
      setFormData(prevState => ({
        ...prevState,
        images: imageUrls,
        thumbnail: firstImage
      }));
    }
  };
  /** Handle input changes dynamically */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(name, value);

    // Check if the field is part of a nested array
    if (name.includes(".")) {
      if (name === 'title.0.content') {
        // auot update slug base on title 
        const newSlug = generateSlug(value);
        setFormData(prevState => ({
          ...prevState,
          title: [{ content: value, language: 'en' }],
          slug: [{ content: newSlug, language: 'en' }] // Set the generated slug
        }));
      } else {
        const [arrayName, index, key] = name.split(".");
        const indexNum = parseInt(index, 10);
        setFormData(prevState => {
          const updatedArray = [...prevState[arrayName as keyof IPostPropertiesType] as any];
          updatedArray[indexNum] = { ...updatedArray[indexNum], [key]: value };
          return { ...prevState, [arrayName]: updatedArray };
        });
      }
    } else {
      setFormData(prevState => ({ ...prevState, [name]: value })) // Dynamically update the field based on its name
    }
  };

  // Handle form submission
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(imagePreviews);
      // const responses = await axiosInstance.post(`${API_ENDPOINTS.PROPERTIES}`);
      console.log(formData)
    } catch (error) {
      throw error;
    }
  };

  return (
    <main className='w-full bg-[#E6E6E6]'>
      {/* banner */}
      <header className="relative w-full h-[300px]">
        <Image
          src={banner}
          alt="banner"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />
        <div className="absolute left-0 top-0 w-full h-full bg-[#0000004e]"></div>
      </header>
      {/* form  */}
      <div className='w-full h-full'>
        <div className='max-w-full w-[1400px] m-auto mt-16 h-full'>
          <h1 className='font-[600] leading-[5px] text-[20px] font-helvetica text-helvetica-h4'>Create properties</h1>
          <form onSubmit={(e: FormEvent<HTMLFormElement>) => handleFormSubmit(e)} className='w-full h-full p-2' action="">
            <div className='w-full block justify-between flex-row mt-2 gap-1'>
              {/* row 1 */}
              <PostPropertiesTitle errorMsg={isValidate} onChange={handleInputChange} title={formData.title} slug={formData.slug} />
              {/* rich editor */}
              <PostRichEditor errorMsg={isValidate} title='Detail*' name='description.0.content' values={formData.description[0].content} onChange={handleInputChange} />
              {/* transition sale & rent  */}
              <h1 className='font-[600] leading-[5px] text-[25px] font-helvetica text-helvetica-paragraph mt-10 tracking-widest '>Type*</h1>
              <PostSelectTransition onChange={handleInputChange} transitionValue={formData.transition[0].content} />
              {/* row 2 */}
              <div className='w-full h-[80%] flex flex-1 gap-9 justify-between items-center mt-1'>
                <PostInputField onChange={handleInputChange} errorMsg={isValidate} title='Price*' name='price' types='number' placeholder='Properties price' />
                {/* Category Dropdown (div-based) */}
                <PostSelectField
                  options={properties}
                  onChange={handleInputChange}
                  errorMsg={false}
                  name='category.0.content'
                  title='Category*'
                  zIndex='20'
                  defaultOption={defualtOption} // Pass the default option
                />

              </div>
              {/* <div className='w-full h-[80%] flex flex-1 gap-9 justify-between items-center mt-1'> */}
              {/* <PostInputField errorMsg={isValidate} title='Address' name='address' placeholder='Properties address' /> */}
              {/* Category Dropdown (div-based) */}
              {/* <PostSelectField errorMsg={isValidate} name='location' placholer='Select Location' title='Location' /> */}
              {/* </div> */}
              {/* properties att */}
              {/* <div className='w-full mt-5'>
                <PostAtttributes />
              </div> */}
              {/* Images Upload  */}
              <div className="w-full mt-5">
                <PostUploadImages OnImageChange={handleImageChange} imagePreviews={imagePreviews} />
              </div>
              <div className="w-full mt-5">
                <PostMap onChange={handleInputChange} values={formData.urlmap} />
              </div>
              {/* <div className="w-full mt-5">
                <PostToggleButton isChecked={isChecked} onChecked={(e: ChangeEvent<HTMLInputElement>) => setIsChecked(!isChecked)} />
              </div> */}
              <div className='w-full h-full flex justify-end items-center py-2'>
                <div>
                  <button className='px-4 py-2 rounded-md m-2 font-medium text-slate-800 bg-slate-300'>Cancel</button>
                  <button type='submit' className='px-4 py-2 text-white font-medium rounded-md cursor-pointer bg-blue-700'>Create</button>
                </div>
              </div>
            </div>
          </form>
        </div >
      </div >
    </main >
  );
}
