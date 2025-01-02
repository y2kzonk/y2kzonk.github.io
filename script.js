function showContent(tabName) {
    const allContent = document.querySelectorAll('.content');
    allContent.forEach(content => {
        content.style.display = 'none';
    });

    const activeContent = document.getElementById(tabName);
    activeContent.style.display = 'block';
    activeContent.style.opacity = '0';
    activeContent.style.animation = 'none'; // Reset the animation
    setTimeout(() => {
        activeContent.style.animation = 'fadeIn 0.5s ease-out forwards'; // Reapply animation
    }, 10);
}
