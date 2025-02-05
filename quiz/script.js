
function switchTheme() {
    const themeStylesheet = document.getElementById('themeStylesheet');
    const currentTheme = themeStylesheet.getAttribute('href');

    // Toggle between 'style1.css' and 'style2.css'
    if (currentTheme === 'style.css') {
        themeStylesheet.setAttribute('href', 'style1.css');
    } else {
        themeStylesheet.setAttribute('href', 'style.css');
    }
}
