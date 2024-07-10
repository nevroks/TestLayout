let loader = document.querySelector('.loader')
let circlesContainer = document.querySelector('.circles-container')

window.addEventListener('load', () => {
    loader.classList.add("hide")
    document.querySelector('.header').classList.add('preLoad')
    let circle1 = document.createElement('div');
    circle1.classList.add("first-circle");
    circle1.classList.add('circle')
    let circle2 = document.createElement('div');
    circle2.classList.add("second-circle");
    circle2.classList.add('circle')
    setTimeout(() => {
        document.querySelector('.header').classList.remove('preLoad')
        document.querySelector('.header').classList.add('load')
        setTimeout(() => {
            document.querySelector(".content").classList.add('loaded')
            document.querySelector(".footer").classList.add('loaded')
            circlesContainer.append(circle1)
            circlesContainer.append(circle2)
            document.body.style.overflow = 'auto'
        }, 1000)
        loader.remove()

    }, 1000)
})