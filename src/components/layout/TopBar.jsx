import { Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'
import { contactInfo } from '../../constants'

const TopBar = () => {
    return (
        <div className="bg-[#3313E5] text-white text-xs sm:text-sm py-3 sm:py-4">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-wrap items-center gap-3 sm:gap-6 justify-between sm:justify-end">
                <div className="flex items-center gap-1 min-w-[140px]">
                    <Phone size={14}/>
                    <span className="truncate">{contactInfo.phone}</span>
                </div>
                <div className="flex items-center gap-1 min-w-[160px]">
                    <Mail size={14}/>
                    <span className="truncate">{contactInfo.email}</span>
                </div>
                <div className="flex items-center gap-1 min-w-[180px]">
                    <MapPin size={14}/>
                    <span className="truncate">{contactInfo.address}</span>
                </div>
            </div>
        </div>
    )   
}

export default TopBar   