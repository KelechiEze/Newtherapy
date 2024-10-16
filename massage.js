// Highlight the active link in the sidebar
const sidebarLinks = document.querySelectorAll('.service-list a');
sidebarLinks.forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});
