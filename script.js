// 平滑滚动到指定区域
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滚动
            header.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 联系表单提交
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const message = this.querySelector('textarea').value;
            
            // 简单的表单验证
            if (!name || !phone || !message) {
                alert('请填写完整的咨询信息');
                return;
            }
            
            // 模拟表单提交
            alert('感谢您的咨询！我们将在24小时内与您联系。');
            this.reset();
        });
    }

    // 滚动动画效果
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.service-card, .case-card, .credential-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // 添加CSS动画类
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .header {
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    // 电话号码格式化
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) {
                value = value.slice(0, 11);
            }
            if (value.length > 7) {
                value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7);
            } else if (value.length > 3) {
                value = value.slice(0, 3) + '-' + value.slice(3);
            }
            e.target.value = value;
        });
    });

    // 服务卡片悬停效果增强
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 案例卡片点击展开详情（如果有更多内容）
    const caseCards = document.querySelectorAll('.case-card');
    caseCards.forEach(card => {
        card.addEventListener('click', function() {
            // 这里可以添加展开详情的逻辑
            const title = this.querySelector('h3').textContent;
            console.log('查看案例详情：', title);
        });
    });
});

// 页面加载完成后的额外效果
window.addEventListener('load', function() {
    // 添加加载完成动画
    document.body.classList.add('loaded');
    
    // 欢迎消息
    setTimeout(() => {
        console.log('欢迎访问张律师个人网站！');
    }, 1000);
});

// 简单的返回顶部功能
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 添加返回顶部按钮
window.addEventListener('scroll', function() {
    let scrollTop = document.createElement('div');
    scrollTop.className = 'scroll-top';
    scrollTop.innerHTML = '↑';
    scrollTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        font-size: 20px;
        z-index: 1000;
    `;
    
    if (!document.querySelector('.scroll-top')) {
        document.body.appendChild(scrollTop);
    }
    
    const existingScrollTop = document.querySelector('.scroll-top');
    if (window.pageYOffset > 300) {
        existingScrollTop.style.opacity = '1';
        existingScrollTop.style.visibility = 'visible';
    } else {
        existingScrollTop.style.opacity = '0';
        existingScrollTop.style.visibility = 'hidden';
    }
    
    existingScrollTop.onclick = scrollToTop;
});