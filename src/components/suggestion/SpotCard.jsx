import React from 'react';

const SpotCard = ({ spot }) => {
    return (
        <div className="bg-gray-300/50 p-0 flex flex-col md:flex-row h-auto md:h-48 rounded shadow-sm overflow-hidden mb-4">
            {/* Image Section */}
            <div className="w-full md:w-1/3 h-48 md:h-full bg-gray-400">
                <img 
                    src={spot.image || "https://tse1.mm.bing.net/th/id/OIP.9a2KzOPGDdPO-1Oloy52kgHaFE?rs=1&pid=ImgDetMain&o=7&rm=3"} 
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
                        <div className="text-gray-800 font-medium pr-2">
                            {spot.address}
                        </div>
            
                        {/* Distance Info */}
                        <div className="text-gray-700 space-y-1 text-xs md:text-sm">
                            <p><span className="font-bold">距離:</span></p>
                            <p>職場から : {(spot.distanceInMeters / 1000).toFixed(2)} km</p>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-end mt-2">
                    <button className="bg-transparent border border-gray-600 text-gray-700 px-6 py-1 rounded-full text-sm hover:bg-gray-700 hover:text-white transition">
                    詳細
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SpotCard;