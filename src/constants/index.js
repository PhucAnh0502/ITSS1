const navLinks = [
    { path: '/map', label: 'map' },         
    { path: '/list', label: 'suggest_list' },    
    { path: '/settings', label: 'setting' },    
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
  "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1517130038641-a774d04afb3c?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1623874514711-0f321325f318?auto=format&fit=crop&w=1000&q=80",

  // --- SÂN BÓNG ĐÁ & SÂN VẬN ĐỘNG (Cỏ nhân tạo, sân cỏ, khung thành) --- 
  "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?auto=format&fit=crop&w=1000&q=80", 
  "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1000&q=80", 
  "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1564687978103-511228eb1816?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cyVDMyVBMm4lMjBiJUMzJUIzbmclMjAlQzQlOTElQzMlQTF8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1709089878099-df2b08d1e466?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cyVDMyVBMm4lMjBiJUMzJUIzbmclMjAlQzQlOTElQzMlQTF8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1754940776796-57812fd7f88f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHMlQzMlQTJuJTIwYiVDMyVCM25nJTIwJUM0JTkxJUMzJUExfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1711937579586-32ecfa8fe62b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHMlQzMlQTJuJTIwYiVDMyVCM25nJTIwJUM0JTkxJUMzJUExfGVufDB8fDB8fHww",
  "https://plus.unsplash.com/premium_photo-1684713510655-e6e31536168d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cyVDMyVBMm4lMjBiJUMzJUIzbmclMjAlQzQlOTElQzMlQTF8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1698466631717-c98321f7ea85?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cyVDMyVBMm4lMjBiJUMzJUIzbmclMjAlQzQlOTElQzMlQTF8ZW58MHx8MHx8fDA%3D",

  // --- YOGA & PILATES (Không gian yên tĩnh, sàn gỗ, thảm tập) ---
  "https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1602827114685-efbb2717da9f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8eW9nYSUyMCUyNiUyMHBpYXRlcyUyMHBsYWNlc3xlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1599447421376-611783057464?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHlvZ2ElMjAlMjYlMjBwaWF0ZXMlMjBwbGFjZXN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1661308411865-4fce7576bef8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHlvZ2ElMjAlMjYlMjBwaWF0ZXMlMjBwbGFjZXN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1599447421376-611783057464?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHlvZ2ElMjAlMjYlMjBwaWF0ZXMlMjBwbGFjZXN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1758599879559-efc4a3fb4243?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHlvZ2ElMjAlMjYlMjBwaWF0ZXMlMjBwbGFjZXN8ZW58MHx8MHx8fDA%3D",

  // --- CÔNG VIÊN & CHẠY BỘ (Đường chạy, cây xanh, ngoài trời) ---
  "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFya3xlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1561133211-6067fc8e7348?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGFya3xlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1605540827677-693bad36b91f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBhcmt8ZW58MHx8MHx8fDA%3D",
  "https://media.istockphoto.com/id/2219287893/photo/young-adult-child-workout-outdoor-public-park-run-walk-hold-water-bottle-with-mature-middle.webp?a=1&b=1&s=612x612&w=0&k=20&c=QQJ7L3m_mok9Ldzsf5BfJyf4QtntIxV9hAIr8v6MxZE=",
  "https://images.unsplash.com/photo-1651149704341-a8f5398bd7d0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFyYXRob25zJTIwZmllbGRzfGVufDB8fDB8fHww",
  "https://media.istockphoto.com/id/624458084/photo/outdoors-stadium-runway-scenery.webp?a=1&b=1&s=612x612&w=0&k=20&c=7qTZaOAaNPt7FKv8Mj0mIZQTjJqk0GHHWkEJiYZlHFM=",
  "https://media.istockphoto.com/id/2235457405/photo/sunset-at-the-running-track.webp?a=1&b=1&s=612x612&w=0&k=20&c=RrXL6_5mBtjq96thEe16Uh0aGBpYIZBPSWJ9hRl2b4o=",
  "https://images.unsplash.com/photo-1765261371855-967aef597a9b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFyYXRob25zJTIwZmllbGRzfGVufDB8fDB8fHww",

  // --- BƠI LỘI & HỒ BƠI (Làn bơi, hồ bơi thi đấu, thư giãn) ---
  "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1600965962102-9d260a71890d?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1575424909138-46b05e5919ec?auto=format&fit=crop&w=1000&q=80",
  "https://plus.unsplash.com/premium_photo-1676638836435-8c03501bb959?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3dpbW1pbmclMjBwb29sfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3dpbW1pbmclMjBwb29sfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHN3aW1taW5nJTIwcG9vbHxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1557459325-b6733cbeae9c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3dpbW1pbmclMjBwb29sc3xlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1669613357541-1b7321bb273d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHN3aW1taW5nJTIwcG9vbHN8ZW58MHx8MHx8fDA%3D",

  // --- SÂN CẦU LÔNG ---
  "https://images.unsplash.com/photo-1626721105368-a69248e93b32?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJhZG1pbnRvbiUyMGNvdXJ0fGVufDB8fDB8fHww",
  "https://media.istockphoto.com/id/654106838/photo/man-playing-badminton.webp?a=1&b=1&s=612x612&w=0&k=20&c=iLNK-2hWvj4BmM4hlaQcQ1Emo8VrREHZ8fFINwzEh40=",
  "https://images.unsplash.com/photo-1723633236252-eb7badabb34c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGJhZG1pbnRvbiUyMGNvdXJ0fGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1732955365693-fbd795199803?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGJhZG1pbnRvbiUyMGNvdXJ0fGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1717659487323-7783a99bcf61?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzN8fGJhZG1pbnRvbiUyMGNvdXJ0fGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzR8fGJhZG1pbnRvbiUyMGNvdXJ0fGVufDB8fDB8fHww",
  "https://plus.unsplash.com/premium_photo-1709049359083-d1d666912035?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODd8fGJhZG1pbnRvbiUyMGNvdXJ0fGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1595220427358-8cf2ce3d7f89?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJhZG1pbnRvbnxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1733141731755-272381a17c59?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGJhZG1pbnRvbnxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1626721105368-a69248e93b32?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFkbWludG9ufGVufDB8fDB8fHww",
];

const activities = [
    { label: "gym", trans: "Gym" },
    { label: "yoga", trans: "Yoga" },
    { label: "pilates", trans: "Pilates" },    
    { label: "crossfit", trans: "CrossFit" }, 
    { label: "boxing", trans: "Boxing" },     
    { label: "running", trans: "Running" },
    { label: "swimming", trans: "Swimming" },       
    { label: "cycling", trans: "Cycling" },   
    { label: "bouldering", trans: "Bouldering" }, 
    { label: "golf", trans: "Golf" },          
    { label: "badminton", trans: "Badminton" },
    { label: "tennis", trans: "Tennis" },
    { label: "table_tennis", trans: "Table Tennis" },     
    { label: "basketball", trans: "Basketball" },     
    { label: "soccer", trans: "Soccer" },       
    { label: "volleyball", trans: "Volleyball" }
];

export { navLinks, contactInfo, activities, placeImages };