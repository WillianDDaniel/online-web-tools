document.addEventListener('DOMContentLoaded', () => {

    // listeners for theme mode | div and label like a button
    const toogleTheme = document.getElementById('themeCheckbox')
    const toogleThemeLabel = document.getElementById('themeCheckboxLabel')

    // node the html elements to apply color theme
    const navBar = document.getElementById('navBar')
    const mainSection = document.getElementById('mainSection')
    const footer = document.getElementById('footer')

    // main img just for pages that have one
    const mainImg = document.getElementById('mainImg')

    // node for span's of toogle menu, for apply the theme color | in all pages
    const toogleLines = document.querySelectorAll('.toogleLines')

    // variable to save choosed color theme
    let isChecked = localStorage.getItem('isChecked')

    // check if theme color is seted and apply the selected theme | auto inicialized
    isChecked === 'true'
        ? setTheme(true)
        : setTheme(false)

    // function that is called for apply initial theme
    function setTheme(value) {
        toogleTheme.checked = value

        if (value) {
            navBar.classList.add('secondary-wt-mode')
            mainSection.classList.add('wt-mode')
            footer.classList.add('main-wt-mode')

            toogleLines.forEach((element) => {
                element.classList.add('toogle-wt')
            })

            // if actual page have one main img, apply img that's have a right color
            mainImg
                ? mainImg.src = 'https://animecharacters.sirv.com/online-web-tools/gerador-de-senhas-white.png'
                : ""

        } else {

            navBar.classList.add('main-dk-mode')
            mainSection.classList.add('dk-mode')
            footer.classList.add('main-dk-mode')

            toogleLines.forEach((element) => {
                element.classList.add('toogle-dk')
            })

            // if actual page have one main img, apply img that's have a right color
            mainImg
                ? mainImg.src = 'https://animecharacters.sirv.com/online-web-tools/gerador-de-senhas-dark.png'
                : ""
        }
    }


    // listener for choose the theme color
    toogleThemeLabel.addEventListener('click', () => {

        toogleTheme.checked
            ? toogleTheme.checked = false
            : toogleTheme.checked = true

        if (toogleTheme.checked === true) {

            navBar.classList.remove('main-dk-mode')
            mainSection.classList.remove('dk-mode')
            footer.classList.remove('main-dk-mode')

            toogleLines.forEach((element) => {
                element.classList.remove('toogle-dk')
            })

            navBar.classList.add('secondary-wt-mode')
            mainSection.classList.add('wt-mode')
            footer.classList.add('main-wt-mode')

            toogleLines.forEach((element) => {
                element.classList.add('toogle-wt')
            })

            // if actual page have one main img, apply img that's have a right color
            mainImg
                ? mainImg.src = 'https://animecharacters.sirv.com/online-web-tools/gerador-de-senhas-white.png'
                : ""

            // save the choosed theme color
            localStorage.setItem('isChecked', "true")


        } else {

            navBar.classList.remove('secondary-wt-mode')
            mainSection.classList.remove('wt-mode')
            footer.classList.remove('main-wt-mode')

            toogleLines.forEach((element) => {
                element.classList.remove('toogle-wt')
            })

            navBar.classList.add('main-dk-mode')
            mainSection.classList.add('dk-mode')
            footer.classList.add('main-dk-mode')

            toogleLines.forEach((element) => {
                element.classList.add('toogle-dk')
            })

            // if actual page have one main img, apply img that's have a right color
            mainImg
                ? mainImg.src = 'https://animecharacters.sirv.com/online-web-tools/gerador-de-senhas-dark.png'
                : ""

            // save the choosed theme color
            localStorage.setItem('isChecked', "false")
        }
    })
})