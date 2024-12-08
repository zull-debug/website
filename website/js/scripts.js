
  function toggleProductPage() {
    const productPage = document.getElementById('product-page');
    const button = document.getElementById('toggle-product-btn');

    // Toggle tampilan produk
    if (productPage.classList.contains('active')) {
        productPage.classList.remove('active');
        button.innerHTML = 'Lihat Produk';
    } else {
        productPage.classList.add('active');
        button.innerHTML = 'Sembunyikan Produk';
        productPage.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Efek scroll smooth
    }
}

function togglePremiumPage() {
    const button = document.getElementById('toggle-premium-btn');
}

  function showCheckoutForm(product, price) {
    const selectedProductText = `
        <div class="notification">
            <span class="icon"></span> 
            <p>Anda Memilih <strong>${product}</strong> Dengan Harga <strong>${price}</strong></p>
        </div>
    `;
    document.getElementById('selected-product').innerHTML = selectedProductText;
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    const checkoutForm = document.getElementById('checkout-form');
    document.getElementById('checkout-form').classList.add('active');
    document.getElementById('checkout-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

let countdownInterval; // Untuk menyimpan interval countdown

function selectPaymentMethod(method) {
  const paymentDescription = document.getElementById('payment-description');
  const paymentQr = document.getElementById('payment-qr');
  const countdownTimer = document.getElementById('countdown-timer');
  const whatsappLink = document.getElementById('whatsapp-link'); // Tombol Kirim Bukti Pembayaran
  
  // Mengubah deskripsi sesuai metode pembayaran
if (method === 'QRIS') {
    paymentDescription.textContent = 'Gunakan QRIS di bawah untuk memproses pembayaran dengan cepat.';
    paymentQr.style.display = 'block';
    paymentQr.src = 'payment/qr/qris.png';
} else if (method === 'Transfer Bank') {
    paymentDescription.innerHTML = `
        <p><strong>Silakan transfer melalui rekening bank berikut:</strong></p>
        <ul style="list-style-type: none; padding: 0;">
            <li style="margin-bottom: 10px;">
                <strong>Bank</strong>: <span style="color: #0E5E96;">SeaBank</span> <!-- Warna SeaBank -->
            </li>
            <li style="margin-bottom: 10px;">
                <strong>Nomor Rekening</strong>: 901503207348
            </li>
            <li>
                <strong>Atas Nama</strong>: ZULKIFLY
            </li>
        </ul>
        <ul style="list-style-type: none; padding: 0;">
            <li style="margin-bottom: 10px;">
                <strong>Bank</strong>: <span style="color: #FF7A00;">Bank Jago</span> <!-- Warna Bank Jago -->
            </li>
            <li style="margin-bottom: 10px;">
                <strong>Nomor Rekening</strong>: 105034165997
            </li>
            <li>
                <strong>Atas Nama</strong>: ZULKIFLY
            </li>
        </ul>
        <p>Pastikan nomor rekening dan nama penerima sesuai sebelum melakukan transfer.</p>
    `;
    paymentQr.style.display = 'none';
} else if (method === 'DANA') {
    paymentDescription.innerHTML = `
        <p><strong>Silakan transfer melalui <span style="color: #00B0FF;">DANA</span> ke nomor berikut:</strong></p>
        <ul style="list-style-type: none; padding: 0;">
            <li style="margin-bottom: 10px;">
                <strong>Nomor DANA:</strong> 082192059164
            </li>
            <li>
                <strong>Atas Nama:</strong> ZULKIFLY
            </li>
        </ul>
        <p>Pastikan nomor dan nama di atas sesuai sebelum melakukan transfer.</p>
    `;
    paymentQr.style.display = 'none';
} else if (method === 'ShopeePay') {
    paymentDescription.innerHTML = `
        <p><strong>Silakan transfer melalui <span style="color: #FF6A00;">ShopeePay</span></strong> ke nomor berikut:</p>
        <ul style="list-style-type: none; padding: 0;">
            <li style="margin-bottom: 10px;">
                <strong>Nomor ShopeePay:</strong> 082192059164
            </li>
            <li>
                <strong>Atas Nama:</strong> zulkifly3646
            </li>
        </ul>
        <p>Pastikan informasi di atas sudah benar sebelum melakukan pembayaran.</p>
    `;
    paymentQr.style.display = 'none';
}

  // Menampilkan countdown dan tombol Kirim Bukti Pembayaran
  countdownTimer.style.display = 'block';
  whatsappLink.style.display = 'block'; // Menampilkan tombol Kirim Bukti Pembayaran
  startCountdown(30);
}

function startCountdown(seconds) {
  const timerElement = document.getElementById('timer');
  let timeLeft = seconds;

  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  countdownInterval = setInterval(() => {
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      alert("Waktu habis! Halaman akan direfresh.");
      window.location.reload();
    }
    timeLeft -= 1;
  }, 1000);
}

function showPaymentInfo() {
  const product = document.getElementById('selected-product').innerText;
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  if (name && email) {
    const message = 
  `*Bukti Pembayaran:*%0A%0A` +
  `*Item:* ${product}%0A` +
  `*Username:* ${encodeURIComponent(name)}%0A` +
  `*Email:* ${encodeURIComponent(email)}%0A%0A` +
  `Silahkan Kirim Screenshot Pembayaran Untuk Melanjutkan Proses%0A` +
  `Pembuatan Akun Panel.`;
    const link = `https://wa.me/6282192059164?text=${message}`;
    document.getElementById('whatsapp-link').setAttribute('href', link);
    document.getElementById('checkout-form').classList.remove('active');
    document.getElementById('payment-info').classList.add('active');
    document.getElementById('payment-info').scrollIntoView({ behavior: 'smooth', block: 'start' });
      
    startCountdown(30);
  } else {
    alert('Harap isi nama dan email.');
  }
}

function refreshAfterPayment() {
  alert("Anda akan diarahkan ke halaman Web WhatsApp Untuk Kirim Bukti Pembayaran.");
  window.location.reload();
}

  function toggleQrSize() {
    const qrCode = document.getElementById('qrisImage');
    qrCode.classList.toggle('large'); // Toggle class 'large' untuk zoom in/zoom out
}

  // Fungsi untuk scroll ke section tertentu
  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  window.onload = function() {
    document.getElementById('preloader').style.display = 'none';
  }

function startVideo() {
    document.getElementById('landing-page').style.display = 'none'; // Sembunyikan layar awal
    const video = document.getElementById('background-video');
    video.muted = false;  // Suara aktif
    video.volume = 0.8;   // Volume 10%
    
    video.play().catch(error => {
        console.log("Autoplay gagal: ", error);
    });
    
    // Simpan status tombol ditekan
    localStorage.setItem('videoStarted', 'true');
}

// Mengecek status di localStorage saat halaman dimuat
document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('background-video');
    const lanjutkanBtn = document.getElementById('lanjutkan-btn');

    // Periksa apakah video harus dimulai otomatis
    if (localStorage.getItem('videoStarted') === 'true') {
        video.muted = false;
        video.volume = 0.8;
        video.play().catch(error => {
            console.log("Autoplay gagal: ", error);
        });
        lanjutkanBtn.style.display = 'none'; // Sembunyikan tombol
    }

    // Event listener untuk tombol Lanjutkan
    lanjutkanBtn.addEventListener('click', function () {
        startVideo();
        this.style.display = 'none'; // Sembunyikan tombol setelah ditekan
    });
});