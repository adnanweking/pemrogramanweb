document.addEventListener('DOMContentLoaded', function () {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.site-nav a');

    navLinks.forEach(function (link) {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    const revealElements = document.querySelectorAll('.hero, .page-header, .intro-card, .feature-card, .content-block, .cta-panel, .contact-section');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15
        });

        revealElements.forEach(function (element) {
            element.classList.add('reveal');
            observer.observe(element);
        });
    } else {
        revealElements.forEach(function (element) {
            element.classList.add('show');
        });
    }

    const forms = document.querySelectorAll('.contact-form');

    forms.forEach(function (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const requiredFields = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;

            requiredFields.forEach(function (field) {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('input-error');
                } else {
                    field.classList.remove('input-error');
                }
            });

            let status = form.querySelector('.form-status');

            if (!status) {
                status = document.createElement('p');
                status.className = 'form-status';
                form.appendChild(status);
            }

            if (isValid) {
                status.textContent = 'Terima kasih! Pesan Anda berhasil disiapkan.';
                status.classList.remove('error');
                status.classList.add('success');
                form.reset();
            } else {
                status.textContent = 'Mohon lengkapi semua kolom yang wajib diisi.';
                status.classList.remove('success');
                status.classList.add('error');
            }
        });
    });
});