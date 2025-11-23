import { Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'

const TopBar = () => {
    return (
        <div className='bg-[#3313E5] text-white text-s py-4 px-4 flex justify-end items-center gap-6 sticky z-10 top-0'>
            <div className='flex items-center gap-1'>
                <Phone size={14}/>
                <span>0123.456.789</span>
            </div>
            <div className='flex items-center gap-1'>
                <Mail size={14}/>
                <span>contact@scheduler.com</span>
            </div>
            <div className='flex items-center gap-1'>
                <MapPin size={14}/>
                <span>Phường Bách Khoa, Hai Bà Trưng, Hà Nội</span>
            </div>
        </div>
    )   
}

export default TopBar   