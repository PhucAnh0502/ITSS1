import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Settings, Home } from "lucide-react";
import { useLang } from '../context/LanguageContext';

const NotFoundPage = () => {
    const navigate = useNavigate();
    const { t } = useLang();

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-start md:justify-center px-4 pt-8 pb-12 md:pt-12">
                <div className="w-full max-w-lg text-center">
                    {/* Phần số 404 với hiệu ứng màu chủ đạo */}
                    <div className="mb-8">
                        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-500">
                            404
                        </h1>
                        <div className="h-1.5 w-20 bg-linear-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-2"></div>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {t("page_not_found")}
                    </h2>
                    
                    <p className="text-gray-500 mb-10">
                        {t("page_not_found_message")}
                    </p>

                    <div className="flex flex-col gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-full bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            <Home size={20} />
                            {t("go_back")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;