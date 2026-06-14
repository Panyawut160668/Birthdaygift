document.addEventListener("DOMContentLoaded", () => {
    // ===== Elements =====
    const display = document.getElementById("display");
    const popup = document.getElementById("birthdayPopup");
    const page1 = document.getElementById("page1");
    const page2 = document.getElementById("page2");
    const page3 = document.getElementById("page3");
    const nextto2 = document.getElementById("np_1");
    const prevto1 = document.getElementById("np_2_prev");
    const nextto3 = document.getElementById("np_2_next");
    const closeBtn = document.getElementById("closePopupBtn");
    const buttons = document.querySelectorAll(".left button");
    const textOverlay = document.getElementById("textOverlay");
    const textContainer = document.getElementById("textContainer");
    let index = 0;
    const messageList = [
        "วันนี้เหนื่อยมั้ย",
        "มากอดเค้ามาคั้บ",
        "สุขสันต์วันเกิดนะคั้บบ",
        "ขอให้เป็น 17 ที่ดีน้าา",
        "ขอบคุณนะคั้บบที่เข้ามาในชีวิตเค้า"
    ];
    const successSound = new Audio("./audiant/fellow fellow - ดาวหางฮัลเลย์ (Halley's Comet) [Karaoke version].mp3");
    successSound.volume = 0.4;
    successSound.loop = true;
    let password = "";  
    const key = "160668";
    let typingTimer = null;
    let typingRunning = false;
    function updateDisplay() {
        const text = password.padEnd(6, "_");
        display.textContent = `💖 ${text[0]} ${text[1]} / ${text[2]} ${text[3]} / ${text[4]} ${text[5]}`;
    }
    function resetMessage(msg) {
        display.textContent = msg;
        setTimeout(updateDisplay, 1200);
    }
    function checkPassword() {
        if (password.length !== 6) {
            resetMessage("❌ ม่ายครบบ");
            return;
        }
        if (password === key) {
            successSound.play();
            popup.classList.remove("show");
            page1.style.display = "flex";
        } else {
            password = "";
            resetMessage("💔 ผิดวันแล่ว");
        }
    }
    function handleInput(value) {
        if (!isNaN(value)) {
            if (password.length < 6) password += value;
        } 
        else if (value === "←") {
            password = password.slice(0, -1);
        } 
        else if (value === "❤") {
            checkPassword();
            return;
        }
        updateDisplay();
    }
    function showNextMessage() {
        if (index >= messageList.length) return;
        textContainer.innerHTML = messageList[index];
        textOverlay.classList.add("show");
        setTimeout(() => {
            textOverlay.classList.remove("show");
            index++;
            setTimeout(showNextMessage, 500);
        }, 2000);
    }
    buttons.forEach(btn => {
        btn.addEventListener("click", () => handleInput(btn.textContent));
    });
    prevto1.addEventListener("click", () => {
        page1.style.display = "flex";
        page2.style.display = "none";
    });
    nextto2.addEventListener("click", () => {
        page1.style.display = "none";
        page2.style.display = "flex";
        const target = document.getElementById("typing-m1");
        const text = "เดือนนี้เค้ามีความสุขมากๆเยยยที่ได้อยู่กับเทอ แล้วก็มีสถานะกันจริงๆ   เค้าจะบอกว่าเค้าชอบมากเลยนะคั้บตอนที่เราทำอะไรหลายๆอย่างด้วยกัน   เป็นเดือนแรกที่เค้าคิดว่าคนคนนี้แหละจะรักษาให้ดีที่สุดเลยย";
        let i = 0;
        clearTimeout(typingTimer);
        typingRunning = true;
        target.innerText = "";
        function type() {
            if (!typingRunning) return;
            if (i < text.length) {
                target.innerText += text.charAt(i++);
                typingTimer = setTimeout(type, 40);
            }
        }
        type();
    });
    nextto3.addEventListener("click", () => {
        page2.style.display = "none";
        typingRunning = false;
        clearTimeout(typingTimer);
        showNextMessage();
        page3.style.display = "flex";
        successSound.pause();
        setTimeout(() => {
            document.getElementById("myVideo").style.display = "flex";
            document.getElementById("myVideo").play();
        }, 12750);
    });
    updateDisplay();
});
