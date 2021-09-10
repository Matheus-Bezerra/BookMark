const menuMobile = document.querySelector('[data-menu]')
const header = document.querySelector('header')
const nav = document.querySelector('nav')
const list = document.querySelector('[data-list]')
menuMobile.addEventListener('click', handleClickMob)

function handleClickMob() {
    const listClass = Array.from(list.classList)
    const isActive = listClass.find(el => el === 'active')

    if(isActive){
        list.classList.remove('active')
        header.style.width = '80%'
        header.style.top = '2rem'
        header.style.backgroundColor = 'unset'
        nav.style.margin = '0rem'
        menuMobile.style.background = 'url(img/icon-hamburger.svg)'
        return
    }
    list.classList.add('active')
    header.style.width = '100%'
    header.style.top = 0
    header.style.backgroundColor = 'rgba(82, 102, 223, .95)'
    nav.style.margin = '5rem'
    menuMobile.style.background = 'url(img/icon-close.svg) no-repeat'
}

console.log(list)



//ShowHideText e Active Items
const items = Array.from(document.getElementsByClassName('features-list'))

const presentationOne = document.getElementById('presentation-1')
const presentationSecond = document.getElementById('presentation-2')
const presentationThird = document.getElementById('presentation-3')

items.forEach(item => item.addEventListener('click', handleActiveItem))

addOrRemoveActive('marcacao')
hideOrShowText('marcacao')

function handleActiveItem(event) {
    const selectedAttribute = event.target.getAttribute('data')
    addOrRemoveActive(selectedAttribute)
    hideOrShowText(selectedAttribute)
}


function addOrRemoveActive(attribute) {
    items.forEach(item => {
        const itemAttribute = item.getAttribute('data')
        if(itemAttribute === attribute) {
            item.classList.add('active')
            return
        }

        item.classList.remove('active')
    })
}

function hideOrShowText(attribute) {
    hideText()
    if(attribute === 'marcacao') {
        presentationOne.style.display = 'flex'
    }
    if(attribute === 'pesquisa') {
        presentationSecond.style.display = 'flex'
    }
    if(attribute === 'compartilhamento') {
        presentationThird.style.display = 'flex'
    }
}

function hideText() {
    presentationOne.style.display = 'none'
    presentationSecond.style.display = 'none'
    presentationThird.style.display = 'none'
}

//Drops do paragrafo

const paragrafoQuestions = document.querySelectorAll('.questions')
const paragrafoResponse = document.querySelectorAll('.questionDrop')
paragrafoQuestions.forEach(question => {
    question.addEventListener('click', handleClickQuestions)
})

function handleClickQuestions(event) {
    const questionSelectedAttribute = event.target.getAttribute('data')
    addOrRemoveQuestion(questionSelectedAttribute)
    event.target.classList.toggle('active')
}

function addOrRemoveQuestion(attribute) {
    paragrafoResponse.forEach(paragrafo => {
        const questionAttribute = paragrafo.getAttribute('data')
        const classQuestion =  paragrafo.classList
        if (questionAttribute ===  attribute) {
            paragrafo.classList.toggle('active') 
        }
    })
}


//FORMULARIO

const form = document.querySelector('.form')
const inputForm = form.querySelector('input')
const btnForm = form.querySelector('.input')

form.addEventListener('submit', event => {
    console.log('Pode enviar o formulario')
    event.preventDefault()
})

const fields = document.querySelectorAll('[required]')

function Validatefield(field) {
    //logica para verificar erros
    function verifyErrors() {
        let foundError = false
    
        for(let error in field.validity) {
            if(field.validity[error] && !field.validity.valid) {
                foundError = error
            }
        }
    
        return foundError
    }

    function CustomMessage(typeError) {
        const messages = {
            text: {
                valueMissing: 'Por favor preencha este campo'
            },
            email: {
                valueMissing: 'Email é Obrigatório',
                typeMismatch: 'Por favor, preencha um email válido'
            }
        }

        return messages[field.type][typeError]
    }

    function setCustomMessage(message) {

        const spanError = field.parentNode.querySelector('span.error')
        const imgError = field.parentNode.querySelector('img.img-error')

        if(message) {
            spanError.classList.add('active')
            spanError.innerHTML = message
            imgError.classList.add('active')
        } else {
            spanError.classList.remove('active')
            spanError.innerHTML = ''
            imgError.classList.remove('active')
        }

    }
    
    return function() {

        const error = verifyErrors()
        
        if(error) {
            const message = CustomMessage(error)
            field.style.border = '4px solid red'
            setCustomMessage(message)
        } else {
            field.style.border = '4px solid green'
            setCustomMessage()
        }
    }

}

function customValidation(event) {


    const field = event.target
    const validation = Validatefield(field)

    validation()

    //Lógica para verificar se existem erros

    const error = Validatefield(field)

    const spanError = field.parentNode.querySelector('span.error')


    // trocar mensagem de required

}

for( field of fields) {
    field.addEventListener('invalid', event => {
        //eliminar o bubble
        event.preventDefault()

        customValidation(event)
    })
    field.addEventListener('blur', customValidation)
}

