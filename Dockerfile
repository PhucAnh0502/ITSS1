# --- Stage 1: Build Stage ---
# Sử dụng Node.js image phiên bản Alpine để tối ưu kích thước
FROM node:20-alpine AS builder

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy file dependency definition trước để tận dụng Docker Cache
COPY package.json package-lock.json ./

# Cài đặt dependencies (sử dụng npm ci để đảm bảo tính nhất quán - Immutable Builds)
RUN npm ci

# Copy toàn bộ source code vào image
COPY . .

# Build ứng dụng (Vite sẽ tạo thư mục /dist)
RUN npm run build

# --- Stage 2: Production Stage ---
# Sử dụng Nginx Alpine để phục vụ file tĩnh (Static Content Serving)
FROM nginx:1.25-alpine

# Xóa config mặc định của Nginx
RUN rm -rf /etc/nginx/conf.d/*

# Copy file config Nginx tùy chỉnh (sẽ tạo ở bước 2) vào container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy kết quả build từ Stage 1 (thư mục dist) sang thư mục gốc của Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 (Port mặc định của Web Server)
EXPOSE 80

# Chạy Nginx ở chế độ foreground
CMD ["nginx", "-g", "daemon off;"]