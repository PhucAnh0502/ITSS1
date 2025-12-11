const navLinks = [
    { path: '/map', label: 'マップ' },         
    { path: '/list', label: '提案リスト' },    
    { path: '/settings', label: '設定' },    
];

const contactInfo = {
    phone: "0123.456.789",
    email: "contact@scheduler.com",
    address: "Phường Bách Khoa, Hai Bà Trưng, Hà Nội"
}

const placeImages = [
  // --- GYM & FITNESS (Phòng tập thể hình, tạ, máy móc) ---
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1574680096141-1cddd32e04ca?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1534258936925-c48947387603?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1517963879466-e825c15f9f71?auto=format&fit=crop&w=1000&q=80",

  // --- SÂN BÓNG ĐÁ & SÂN VẬN ĐỘNG (Cỏ nhân tạo, sân cỏ, khung thành) ---
  "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1000&q=80", 
  "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1000&q=80", 
  "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?auto=format&fit=crop&w=1000&q=80", 
  "https://images.unsplash.com/photo-1518091043069-ca5ee48fd017?auto=format&fit=crop&w=1000&q=80", 
  "https://images.unsplash.com/photo-1574629810360-7efadd966b0d?auto=format&fit=crop&w=1000&q=80", 
  "https://images.unsplash.com/photo-1552667466-07770ae110d0?auto=format&fit=crop&w=1000&q=80", 
  "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1000&q=80", 
  "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1000&q=80", 
  "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1000&q=80", 
  "https://images.unsplash.com/photo-1624880357913-a8539238245b?auto=format&fit=crop&w=1000&q=80", 
  // --- YOGA & PILATES (Không gian yên tĩnh, sàn gỗ, thảm tập) ---
  "https://images.unsplash.com/photo-1544367563-12123d895951?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1599447421405-0c1a15c898b0?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1588286840104-4bd39815d0e5?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1593164842264-854604db0060?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1592817027485-6101eb692b4a?auto=format&fit=crop&w=1000&q=80",

  // --- CÔNG VIÊN & CHẠY BỘ (Đường chạy, cây xanh, ngoài trời) ---
  "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1555921015-5532091f6026?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1596727147705-01a298de6bb6?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1611818224795-c1e0b5107e32?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1486218119243-1388350cc8eb?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1519331379826-f95209327348?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1000&q=80",

  // --- BƠI LỘI & HỒ BƠI (Làn bơi, hồ bơi thi đấu, thư giãn) ---
  "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1600965962102-9d260a71890d?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1560179707-f14e90ef3dab?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1575424909138-46b05e5919ec?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1578496781985-452d4a934d50?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1514997621404-54c3e2329e46?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1570742542523-26bb434b9d04?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1560372337-b643a6d68b64?auto=format&fit=crop&w=1000&q=80"
];

const activities = [
    { label: "ジム", trans: "Gym" },
    { label: "ヨガ", trans: "Yoga" },
    { label: "ピラティス", trans: "Pilates" },    
    { label: "クロスフィット", trans: "CrossFit" }, 
    { label: "ボクシング", trans: "Boxing" },     
    { label: "ランニング", trans: "Running" },
    { label: "プール", trans: "Swimming" },       
    { label: "サイクリング", trans: "Cycling" },   
    { label: "ボルダリング", trans: "Bouldering" }, 
    { label: "ゴルフ", trans: "Golf" },          
    { label: "バドミントン", trans: "Badminton" },
    { label: "テニス", trans: "Tennis" },
    { label: "卓球", trans: "Table Tennis" },     
    { label: "バスケ", trans: "Basketball" },     
    { label: "サッカー", trans: "Soccer" },       
    { label: "バレーボール", trans: "Volleyball" }
];

export { navLinks, contactInfo, activities, placeImages };