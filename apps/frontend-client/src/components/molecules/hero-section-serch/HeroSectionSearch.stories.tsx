import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import HeroSectionSearch, { HeroSectionSearchProps } from './HeroSectionSearch';
import { RealEstateItem } from '@/libs/types/api-properties/property-response';

// Sample properties
const sampleProperties: RealEstateItem[] = [
  {
    id: 1,
    user: "user1",
    transaction: "sell",
    category: "villa",
    title: "Beautiful Villa",
    description: "A beautiful villa with a great view.",
    thumbnail: "https://i.pinimg.com/736x/5f/71/e5/5f71e51ad525d565115d27cb368cef9b.jpg",
    images: [
      "https://i.pinimg.com/736x/5f/71/e5/5f71e51ad525d565115d27cb368cef9b.jpg"
    ],
    detail: {
      land_size: "21m x 54m",
      total_land_size: "1134 10m²",
      building_size: "16m x 45m",
      total_building_size: "720m²",
      road_size: "12m",
      bed_room: 4,
      bath_room: 5,
      living_room: 1,
      kitchen: 1,
      parking: 1,
      garden: "garden",
      swimming_pool: "swimming pool"
    },
    address: "123 Main St, Anytown, USA",
    mapurl: "",
    favorite: true,
    status: true,
    lang: "eng"
  },
  {
    id: 2,
    user: "user2",
    transaction: "rent",
    category: "apartment",
    title: "Modern Apartment",
    description: "A modern apartment in the city center.",
    thumbnail: "https://i.pinimg.com/736x/5f/71/e5/5f71e51ad525d565115d27cb368cef9b.jpg",
    images: [
      "https://i.pinimg.com/736x/5f/71/e5/5f71e51ad525d565115d27cb368cef9b.jpg"
    ],
    detail: {
      land_size: "21m x 54m",
      total_land_size: "1134 10m²",
      building_size: "16m x 45m",
      total_building_size: "720m²",
      road_size: "12m",
      bed_room: 4,
      bath_room: 5,
      living_room: 1,
      kitchen: 1,
      parking: 1,
      garden: "garden",
      swimming_pool: "swimming pool"
    },
    address: "456 Market St, Metropolis, USA",
    mapurl: "",
    favorite: true,
    status: true,
    lang: "eng"
  }
];

export default {
  title: 'Components/HeroSectionSearch',
  component: HeroSectionSearch,
  argTypes: {
    properties: { control: 'object' },
    title: {control: 'text'},
    placeholder: { control: 'text' },
    inputClassName: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<HeroSectionSearchProps> = (args) => <HeroSectionSearch {...args} />;

export const Default = Template.bind({});
Default.args = {
  properties: sampleProperties,
  title: "Real Estate Plateform",
  placeholder: "Enter an address...",
  inputClassName: "",
};
