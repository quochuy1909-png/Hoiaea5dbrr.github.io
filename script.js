let numbers = [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
let scratchCount = 0;

// Hàm cập nhật tiêu đề
function updateTitle() {
    const titleElement = document.getElementById('title');
    titleElement.textContent = `NGƯỜI TRÚNG QUÀ SỐ ${scratchCount + 1} LÀ`;
}

// Hàm tạo hiệu ứng pháo giấy
function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confettiContainer.appendChild(confetti);
    }
}

// Hàm xóa pháo giấy
function clearConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    confettiContainer.innerHTML = '';
}

// Hàm mở hũ và hiển thị kết quả
function openBox() {
    const cardNumberElement = document.getElementById('card-number');
    document.getElementById('open-box-btn').disabled = true;  // Vô hiệu hóa nút mở hũ sau khi đã nhấn

    // Nếu đây là lần mở hũ thứ 7, chọn số 7
    if (scratchCount === 6) {
        cardNumberElement.textContent = 7;
    } else {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        const scratchedNumber = numbers[randomIndex];
        cardNumberElement.textContent = scratchedNumber;
        numbers.splice(randomIndex, 1);
    }

    createConfetti();  // Hiển thị pháo giấy
    scratchCount++;

    // Mở khóa nút "Thẻ kế tiếp" sau khi mở hũ
    document.getElementById('next-card-btn').disabled = false;
}

// Lắng nghe sự kiện nhấn nút "Thẻ kế tiếp"
document.getElementById('next-card-btn').addEventListener('click', () => {
    clearConfetti();
    document.getElementById('card-number').textContent = '?';  // Đặt lại dấu hỏi
    document.getElementById('open-box-btn').disabled = false;  // Kích hoạt lại nút "Mở hũ"
    document.getElementById('next-card-btn').disabled = true;  // Vô hiệu hóa nút "Thẻ kế tiếp" khi bắt đầu lượt mới
    updateTitle();  // Cập nhật tiêu đề cho lượt cào tiếp theo
});

// Lắng nghe sự kiện nhấn nút "Mở hũ"
document.getElementById('open-box-btn').addEventListener('click', openBox);

// Khởi tạo tiêu đề ngay từ đầu
updateTitle();

// Tạo pháo giấy (CSS)
const style = document.createElement('style');
style.innerHTML = `
.confetti {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: red;
    opacity: 0.7;
    animation: fall 5s linear infinite;
}

@keyframes fall {
    0% {
        transform: translateY(-100vh);
    }
    100% {
        transform: translateY(100vh);
        opacity: 0;
    }
}
`;
document.head.appendChild(style);
