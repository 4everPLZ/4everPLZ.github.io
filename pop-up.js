javascript
    
        const autoModal = document.getElementById("autoModal");
        const closeAutoModalBtn = document.getElementById("closeAutoModal");
        const confirmAutoBtn = document.getElementById("confirmAutoBtn");
        const dontShowAgainCheckbox = document.getElementById("dontShowAgain");

        
        window.addEventListener('load', function() {
            // 检查是否已经设置不再显示
            if (!localStorage.getItem('hideAutoPopup')) {
                // 延迟显示，让页面完全加载
                setTimeout(showAutoModal, 1000);
            }
        });

        // 显示自动弹窗
        function showAutoModal() {
            autoModal.classList.add("active");
        }

        // 关闭自动弹窗
        function closeAutoModal() {
            autoModal.classList.remove("active");
            
            // 如果用户勾选了"不再显示"，保存到本地存储
            if (dontShowAgainCheckbox.checked) {
                localStorage.setItem('hideAutoPopup', 'true');
            }
        }

        // 绑定事件
        closeAutoModalBtn.addEventListener("click", closeAutoModal);
        confirmAutoBtn.addEventListener("click", closeAutoModal);

        // 点击模态框外部关闭
        autoModal.addEventListener("click", function(e) {
            if (e.target === autoModal) {
                closeAutoModal();
            }
        });
        
        // 按ESC键关闭弹窗
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeAutoModal();
            }
        localStorage.removeItem('hideAutoPopup');
        });
   