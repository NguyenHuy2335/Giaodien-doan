document.addEventListener('DOMContentLoaded', function() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartItemsDiv = document.querySelector('.cart-items');
  const cartSummaryDiv = document.querySelector('.cart-summary');

  // Hiển thị sản phẩm trong giỏ
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>Giỏ hàng của bạn đang trống.</p>';
    cartSummaryDiv.innerHTML = '';
    document.querySelectorAll('.cart-count').forEach(el => el.innerText = 0);
    return;
  }

  let html = `
    <table class="cart-table" style="width:100%; border-collapse:collapse;">
      <thead>
        <tr style="background:#f2f6fc;">
          <th style="padding:10px; text-align:left;">Sản phẩm</th>
          <th style="padding:10px;">Giá</th>
          <th style="padding:10px;">Số lượng</th>
          <th style="padding:10px;">Thành tiền</th>
          <th style="padding:10px;"></th>
        </tr>
      </thead>
      <tbody>
  `;
  let total = 0;
  cart.forEach((item, idx) => {
    const priceNum = Number(item.price.replace(/[^\d]/g, ''));
    const itemTotal = priceNum * item.quantity;
    total += itemTotal;
    html += `
      <tr data-idx="${idx}">
        <td style="padding:10px; vertical-align:top;">
          <div style="display:flex; align-items:center; gap:10px;">
            <img src="${item.img}" alt="${item.name}" style="width:60px;height:60px;object-fit:cover;border-radius:8px;">
            <div>
              <strong>${item.name}</strong>
              <div style="font-size:13px;color:#666">${item.desc || ''}</div>
            </div>
          </div>
        </td>
        <td style="padding:10px; color:#007bff; font-weight:600; text-align:center;">${formatPrice(item.price)}</td>
        <td style="padding:10px; text-align:center;">
          <input type="number" min="1" value="${item.quantity}" class="cart-qty" style="width:50px; text-align:center;">
        </td>
        <td style="padding:10px; color:#e11d48; font-weight:600; text-align:center;" class="cart-item-total">${formatPrice(itemTotal)}</td>
        <td style="padding:10px; text-align:center;">
          <button class="cart-remove-btn" title="Xóa" style="background:none; border:none; color:#e11d48; font-size:1.2rem; cursor:pointer;">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });
  html += `
      </tbody>
    </table>
  `;
  cartItemsDiv.innerHTML = html;

  // Tóm tắt đơn hàng
  cartSummaryDiv.innerHTML = `
    <h3>Tóm tắt đơn hàng</h3>
    <div class="summary-row"><span>Tạm tính:</span> <span id="subtotal">${total.toLocaleString('vi-VN')}đ</span></div>
    <div class="summary-row"><span>Tổng cộng:</span> <span id="total">${total.toLocaleString('vi-VN')}đ</span></div>
    <button class="checkout-btn">Thanh toán</button>
  `;

  // Sau khi render nút "Thanh toán", gắn sự kiện click
  setTimeout(function() {
    var checkoutBtn = document.querySelector('.checkout-btn') || document.getElementById('checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = "cash.html";
      });
    }
  }, 0);

  // Cập nhật số lượng trên icon giỏ hàng
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('.cart-count').forEach(el => el.innerText = cartCount);

  // Xóa sản phẩm
  cartItemsDiv.querySelectorAll('.cart-remove-btn').forEach((btn, idx) => {
    btn.addEventListener('click', function() {
      cart.splice(idx, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      location.reload();
    });
  });

  // Cập nhật số lượng
  cartItemsDiv.querySelectorAll('.cart-qty').forEach((input, idx) => {
    input.addEventListener('change', function() {
      let val = parseInt(input.value);
      if (isNaN(val) || val < 1) val = 1;
      cart[idx].quantity = val;
      localStorage.setItem('cart', JSON.stringify(cart));
      location.reload();
    });
  });
});