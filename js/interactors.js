let animations = {
  Acercarme: 'hello',
  Actividad: 'run',
  Amigos: 'walk',
  Asistencia: 'idle',
  Atencion: 'idle',
  Bano: 'idle',
  Bien: 'idle'
}

document.getElementById("icon-result-speech").style.visibility = 'hidden'


function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// let dropdownAcciones = document.getElementById('acciones')
// dropdownAcciones.addEventListener('click', function (e) {
//   e = e || window.event
//   let target = e.target || e.srcElement
//   dropdownAcciones.getElementsByClassName('selected')[0].innerText = target.innerText
//
//   // three snippet code
//   // stackAnimations.push(animations[target.innerText])
//   // fadeAction(stackAnimations[0])
//   // console.log(animations[target.innerText])
// })

var recognition = null

if (!('webkitSpeechRecognition' in window)) {
  upgrade()
} else {
  recognition = new webkitSpeechRecognition()
  recognition.continuous = false
  recognition.interimResults = false

  recognition.onstart = function () {
    // console.log("onstart")
  }
  recognition.onresult = function (event) {
    // console.log("onresult")
    let message = event.results[0][0].transcript

    document.getElementById("icon-result-speech").style.visibility = 'visible'
    document.getElementById('message').innerText = message
    let actionNames = processTranscript(message)
    stackAnimations = actionNames
    console.log('animation stack', stackAnimations)
    if (stackAnimations.length > 0) {
      fadeAction(stackAnimations[0])
    }

  }
  recognition.onerror = function (event) {
    console.log("onerror")
    console.log(event)

  }
  recognition.onend = function () {
    // console.log("onend")
  }

  function startSpeak (event) {
    // console.log("onmousedown")
    final_transcript = ''
    if (recognition != null) {
      recognition.lang = 'es-PE'
      recognition.start()
    } else {
      console.log('recognition is null')
    }
  }

  function stopSpeak (event) {
    // console.log("onmouseup")
    recognition.stop()
  }

}
function upgrade () {
  document.getElementById('info_upgrade').style.visibility = 'visible'
}

function processTranscript(transcript) {
  let words = transcript.split(" ")
  let keywords = words.filter(function (word) {
    return (animations[capitalizeFirstLetter(word)] !== undefined)
  }).map(function (item) {
    return animations[capitalizeFirstLetter(item)]
  })
  return keywords
}