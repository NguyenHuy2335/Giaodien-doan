// Page transition loader
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="http"]:not([target="_blank"]), a[href^="/"], a[href^="#"]:not([href="#"])');
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    transition.innerHTML = '<span class="loader"></span>';
    document.body.appendChild(transition);
    

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.href && !this.classList.contains('no-transition')) {
                e.preventDefault();
                transition.classList.add('active');
                
                setTimeout(() => {
                    window.location.href = this.href;
                }, 500);
            }
        });
    });   
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.querySelector('i').classList.remove('fa-moon');
    darkModeToggle.querySelector('i').classList.add('fa-sun');
}

function formatPrice(price) {
    // Nếu là chuỗi có ký tự không phải số, loại bỏ
    price = typeof price === 'string' ? Number(price.replace(/[^\d]/g, '')) : price;
    return price.toLocaleString('vi-VN') + 'đ';
}
window.formatPrice = formatPrice; // Cho phép dùng ở các file JS khác
