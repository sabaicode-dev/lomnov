import React, { ChangeEvent } from 'react'
import PostInputField from '../post-input-field/PostInputField'
// import Map from '@/components/molecules/map/Map'
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMap,
} from 'react-leaflet'
import { LatLngExpression } from 'leaflet';
export default function PostMap({ values, onChange }: { values?: string, onChange: (e: ChangeEvent<HTMLInputElement>) => void }) {
    console.log(values);
    const position = [51.505, -0.09] as LatLngExpression
    return (
        <>
            <div className="bg-gray-50 shadow-md w-full h-full p-2 rounded-t-[12px] border-gray-[#D9D9D9] border-b-[2px]">
                <div className="w-[380px] h-auto flex justify-between items-center">
                    <span className="font-helvetica leading-3 tracking-widest my-3 text-[18px] font-bold text-gray-700 text-helvetica-paragraph">Map*</span>
                </div>
            </div>
            <div className="bg-white shadow-md w-full h-full rounded-b-[12px] px-[12px] py-[10px]">
                <div className='w-full h-full  flex flex-1 gap-9 px-[20px]'>
                    <PostInputField onChange={onChange} values={values} name='urlmap' className='border border-[#D9D9D9] shadow-sm ' placeholder='google map link!' />
                </div>
                <div className='w-full h-full -mt-8 -ml-5'>
                    <div className="max-w-[1300px] h-[400px] mx-auto mt-[50px] px-[10px]">
                        <div className="w-full h-full text-black">
                            <MapContainer className='w-72 h-40' center={position} zoom={13} scrollWheelZoom={false}>
                           
                                <Marker position={position}>
                                    <Popup>
                                        A pretty CSS3 popup. <br /> Easily customizable.
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
