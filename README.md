Note: 
file Server dùng để tạo ra server trog đó ta dùng nó để kết nối với database trong dự án này là mongooDB,
ở đây ta cũng kết nối với file dotenv để lấy biến pord

file App.js dùng để tạo các router và các midlewares: ở file này ta cũng có thể tạo các tuyến đường ở đây nhưng k nên như vậy ta nên tạo các router riêng và import vào file app này

tiếp đến là các file router các file router này có nhiệm vụ là định nghĩa ra các tuyến đường sau đó chạy các function hoặc các midleware ở đây khi đường dẫn trỏ đúng link, ở đây ta tạo các controller để chạy các function khi đúng đường dẫn

file controller dùng để tạo ra các function dùng import vào các file routers ngay ở file này chúng ta muốn kết nối để thao tác với cơ sở dữ liệu thì ta cần tạo 1 model dùng để định nghĩa ra các model các trường

file models sử dụng mongoose và mongoose.schema để tạo model cho các controller khi kết thúc khởi tạo ta cần tạo ra biến và sử dụng cú pháp mongoose.model để tạo ra model