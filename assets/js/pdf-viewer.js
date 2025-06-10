// pdf-viewer.js - 更新的PDF简历查看器功能

document.addEventListener('DOMContentLoaded', function() {
    // 简历按钮和模态框
    const resumeBtn = document.getElementById('resume-btn');
    const resumeModal = document.getElementById('resume-modal');
    const closeBtn = document.querySelector('.close-btn');
    
    // 如果存在简历按钮，添加点击事件
    if (resumeBtn) {
        resumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 显示模态框
            resumeModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // 阻止背景滚动
            
            // 确保PDF内容已准备就绪
            setupPdfContent();
        });
    }
    
    // 设置PDF内容
    function setupPdfContent() {
        const pdfContainer = document.querySelector('.pdf-container');
        if (!pdfContainer) return;
        
        // 创建带装饰的PDF查看区域
        pdfContainer.innerHTML = `
            <div class="resume-wrapper">
                <div class="corner-decoration top-left"></div>
                <div class="corner-decoration top-right"></div>
                <div class="corner-decoration bottom-left"></div>
                <div class="corner-decoration bottom-right"></div>
                
                <iframe src="assets/docs/resume.pdf" class="resume-iframe" frameborder="0"></iframe>
            </div>
        `;
        
        // 添加PDF加载指示器
        const resumeIframe = pdfContainer.querySelector('.resume-iframe');
        if (resumeIframe) {
            // 添加加载状态
            const loadingIndicator = document.createElement('div');
            loadingIndicator.className = 'loading-indicator';
            loadingIndicator.innerHTML = '<div class="spinner"></div><p>加载中...</p>';
            pdfContainer.appendChild(loadingIndicator);
            
            // PDF加载完成后隐藏加载指示器
            resumeIframe.addEventListener('load', function() {
                const indicator = document.querySelector('.loading-indicator');
                if (indicator) {
                    indicator.style.display = 'none';
                }
            });
            
            // PDF加载失败处理
            resumeIframe.addEventListener('error', function() {
                const indicator = document.querySelector('.loading-indicator');
                if (indicator) {
                    indicator.innerHTML = '<p>加载PDF时出现错误。请尝试下载PDF文件查看。</p>';
                }
            });
        }
    }
    
    // 关闭按钮事件
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            resumeModal.style.display = 'none';
            document.body.style.overflow = ''; // 恢复背景滚动
        });
    }
    
    // 点击模态框外部关闭
    window.addEventListener('click', function(e) {
        if (e.target === resumeModal) {
            resumeModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    
    // 添加下载PDF的功能
    const downloadPdfBtn = document.querySelector('.modal-buttons .primary-btn');
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', function() {
            console.log('简历下载请求');
            // 创建下载通知
            const notification = document.createElement('div');
            notification.className = 'download-notification';
            notification.textContent = '开始下载简历...';
            document.body.appendChild(notification);
            
            // 3秒后移除通知
            setTimeout(() => {
                notification.classList.add('fade-out');
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 500);
            }, 3000);
        });
    }
});