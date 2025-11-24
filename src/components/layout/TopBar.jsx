import { Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'
import { contactInfo } from '../../constants'

const TopBar = () => {
    return (
        <div className='bg-[#3313E5] text-white text-s py-4 px-4 flex justify-end items-center gap-6 sticky z-10 top-0'>
            <div className='flex items-center gap-1'>
                <Phone size={14}/>
                <span>{contactInfo.phone}</span>
            </div>
            <div className='flex items-center gap-1'>
                <Mail size={14}/>
                <span>{contactInfo.email}</span>
            </div>
            <div className='flex items-center gap-1'>
                <MapPin size={14}/>
                <span>{contactInfo.address}</span>
            </div>
        </div>
    )   
}

export default TopBar   