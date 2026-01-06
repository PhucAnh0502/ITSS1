import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { placeImages } from '../../constants';
import { useLang } from '../../context/LanguageContext';

const SpotCard = ({ spot }) => {
    const navigate = useNavigate();
    const {t} = useLang();
    const randomImageIndex = useMemo(() => {
        const idStr = String(spot.osmId || spot.id || 'default');
        let hash = 0;
        
        for (let i = 0; i < idStr.length; i++) {
            hash = idStr.charCodeAt(i) + ((hash << 5) - hash);
        }
        
        return Math.abs(hash) % placeImages.length;
    }, [spot.osmId]);

    const handleDetailClick = () => {
        const type = spot.type || spot.osmType || 'node';
        const id = spot.id || spot.osmId || spot.osmID || spot.name;
        navigate(`/list/${encodeURIComponent(type)}/${encodeURIComponent(id)}`, { state: { existingData: spot } });
    }
    return (
        <div className="bg-gray-300/50 p-0 flex flex-col md:flex-row h-auto md:h-48 rounded shadow-sm overflow-hidden mb-4">
            {/* Image Section */}
            <div className="w-full md:w-1/3 h-48 md:h-full bg-gray-400">
                <img 
                    src={placeImages[randomImageIndex]} 
                    alt={spot.name} 
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Info Section */}
            <div className="flex-1 p-4 relative flex flex-col justify-between">
                <div>
                    <h3 className="font-bold text-lg mb-2">{spot.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        {/* Description */}
                        <div>
                            <div className="text-gray-800 font-medium pr-2">
                                {spot.address}
                            </div>
                            <div className="text-gray-800 font-medium pr-2 wrap-break-word mt-1">
                                {t('type')}: 
                                <br />
                                {Array.isArray(spot.sports) ? spot.sports.join(", ") : spot.sports}
                            </div>
                        </div>
            
                        {/* Distance Info */}
                        <div className="text-gray-700 space-y-1 text-xs md:text-sm">
                            <p><span className="font-bold">{t('distance')}:</span></p>
                            <p>{t('from_work')}: {(spot.distanceInMeters / 1000).toFixed(2)} km</p>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-end mt-2">
                    <button 
                        className="bg-transparent border border-gray-600 text-gray-700 px-6 py-1 rounded-full text-sm hover:bg-gray-700 hover:text-white transition"
                        onClick={handleDetailClick}
                    >
                    {t('view_details')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SpotCard;