// main.js - 主要脚本

document.addEventListener('DOMContentLoaded', function() {
    // 导航菜单切换
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // 滚动动画
    const sectionReveal = document.querySelectorAll('.section-reveal');
    
    function checkSections() {
        sectionReveal.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', checkSections);
    checkSections();
    
    // 技能动画
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // main.js - 主要脚本(续)

        // 技能卡片鼠标移入动画
        const progressBar = this.querySelector('.progress');
        const width = progressBar.style.width;
        
        // 重置动画
        progressBar.style.width = '0%';
        
        // 触发动画
        setTimeout(() => {
            progressBar.style.width = width;
        }, 10);
    });
});

// 简历模态框功能
const resumeBtn = document.getElementById('resume-btn');
const resumeModal = document.getElementById('resume-modal');
const closeBtn = document.querySelector('.close-btn');
const pdfViewer = document.getElementById('pdf-viewer');

if (resumeBtn) {
    resumeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        pdfViewer.src = 'assets/docs/resume.pdf';
        resumeModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // 阻止背景滚动
    });
}

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

// 按ESC键关闭模态框
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && resumeModal.style.display === 'block') {
        resumeModal.style.display = 'none';
        document.body.style.overflow = '';
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            e.preventDefault();
            
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// 为导航链接添加active类
function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);
});