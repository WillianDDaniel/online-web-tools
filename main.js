document.addEventListener('DOMContentLoaded', () => {

    const toogleTheme = document.getElementById('themeCheckbox')
    const toogleThemeLabel = document.getElementById('themeCheckboxLabel')
    const navBar = document.getElementById('navBar')
    const mainSection = document.getElementById('mainSection')
    const footer = document.getElementById('footer')
    const mainImg = document.getElementById('mainImg')

    let isChecked = localStorage.getItem('isChecked')

    isChecked === 'true'
        ? setTheme(true)
        : setTheme(false)

    function setTheme(value) {
        toogleTheme.checked = value

        if (value) {
            navBar.classList.add('main-wt-mode', 'wt-mode')
            mainSection.classList.add('main-wt-mode', 'wt-mode')
            footer.classList.add('main-wt-mode', 'wt-mode')

            mainImg
                ? mainImg.src = '/img/gerador-de-senhas-white.png'
                : ""

        } else {

            navBar.classList.add('main-dk-mode')
            mainSection.classList.add('dk-mode')
            footer.classList.add('main-dk-mode')

            mainImg
                ? mainImg.src = '/img/gerador-de-senhas-dark.png'
                : ""
        }
    }

    toogleThemeLabel.addEventListener('click', () => {

        toogleTheme.checked
            ? toogleTheme.checked = false
            : toogleTheme.checked = true

        if (toogleTheme.checked === true) {

            navBar.classList.remove('main-dk-mode')
            mainSection.classList.remove('dk-mode')
            footer.classList.remove('main-dk-mode')

            navBar.classList.add('main-wt-mode', 'wt-mode')
            mainSection.classList.add('main-wt-mode', 'wt-mode')
            footer.classList.add('main-wt-mode', 'wt-mode')

            mainImg
                ? mainImg.src = '/img/gerador-de-senhas-white.png'
                : ""

            localStorage.setItem('isChecked', "true")


        } else {

            navBar.classList.remove('main-wt-mode', 'wt-mode')
            mainSection.classList.remove('main-wt-mode', 'wt-mode')
            footer.classList.remove('main-wt-mode', 'wt-mode')

            navBar.classList.add('main-dk-mode')
            mainSection.classList.add('dk-mode')
            footer.classList.add('main-dk-mode')

            mainImg
                ? mainImg.src = '/img/gerador-de-senhas-dark.png'
                : ""

            localStorage.setItem('isChecked', "false")
        }
    })
})