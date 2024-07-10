/* Phone Mask */
mask('[data-tel-input]');

// Удаляем '+' если больше ничего не введено, чтобы показать placeholder
const phoneInputs = document.querySelectorAll('[data-tel-input]');
phoneInputs.forEach((input) => {
    input.addEventListener('input', () => {
        if (input.value == '+') input.value = '';
    })
    input.addEventListener('blur', () => {
        if (input.value == '+') input.value = '';
    })
});

const form = document.querySelector('.focus__cta-form')

function toggleOpenForm() {
    form.classList.toggle("hidden")

    document.querySelector(".open-form-btn").classList.toggle("hidden")
    document.querySelector(".sumbit-form-btns").classList.toggle("hidden")
    document.querySelector(".hidden-text").classList.toggle("hidden")


    document.querySelector(".show-cases").classList.toggle("form-open")
    document.querySelector(".show-cases__mobile-text").classList.toggle("form-open")
    document.querySelector(".focus__cta__buttons__form-section").classList.toggle("form-open")
    document.querySelector(".focus").classList.toggle("form-open")
}
const acces = {
    name: false,
    phone: false
}
let data = {
    name: '',
    phone: '',
    isTeleOrWhats: false
}

function toggleSumbitButton() {
    if (acces.name && acces.phone) {
        document.querySelector(".sumbit-form-btns__sumbit").classList.remove("disabled")
        document.querySelector(".sumbit-form-btns__sumbit").disabled = false
    } else {
        document.querySelector(".sumbit-form-btns__sumbit").classList.add("disabled")
        document.querySelector(".sumbit-form-btns__sumbit").disabled = true
    }
}
document.querySelector(".open-form-btn").addEventListener("click", () => {
    toggleOpenForm()
    document.querySelector(".response").classList.add("hidden")
    toggleSumbitButton()
})
document.querySelector(".sumbit-form-btns__close").addEventListener("click", () => {
    toggleOpenForm()
})

document.querySelector("#numder").addEventListener("input", (e) => {
    if (e.target.value.length >= 16) {
        document.querySelector("#numder").classList.add("right")
        acces.phone = true
    } else {
        acces.phone = false
        document.querySelector("#numder").classList.remove("right")
    }
    data = {...data, phone: e.target.value }
    toggleSumbitButton()
})
document.querySelector("#name").addEventListener("input", (e) => {
    if (e.target.value.length >= 3) {
        acces.name = true
        document.querySelector("#name").classList.add("right")
    } else {
        acces.name = false
        document.querySelector("#name").classList.remove("right")
    }
    data = {...data, name: e.target.value }
    toggleSumbitButton()
})
document.querySelector('#telegramCheckBox').addEventListener('input', (e) => {
    data = {...data, isTeleOrWhats: e.target.checked }
})

function resolveResponse(response) {
    toggleOpenForm()
    console.log(response.status);
    if (response.status === 200) {
        document.querySelector(".response").classList.remove("hidden")
    } else {
        document.querySelector(".response").classList.remove("hidden")
        document.querySelector(".response").innerHTML = `Упс,что-то пошло не так,попробуйте позже.Код:${response.status}`
    }
}
document.querySelector(".sumbit-form-btns__sumbit").addEventListener('click', () => {
    // fetch('https://jsonplaceholder.typicode.com/todos/1')
    //     .then(data => data.json())
    //     .then(response => resolveResponse(response))
    console.log(data)
    let xhr = new XMLHttpRequest()
    xhr.open('POST', '/api/send_notify')
    xhr.setRequestHeader("Content-type", 'application/json')
    xhr.send(JSON.stringify(data))
    console.log(xhr.status)
    resolveResponse(xhr)
})