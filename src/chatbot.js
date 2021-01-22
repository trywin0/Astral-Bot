const phrases = require("./phrases.json")


function rand(arr){
  return arr[Math.floor(Math.random() * arr.length)]
}
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function ask(question){
  let response;
  let answered = false;
  phrases.filter(p=>p.type !== "default").forEach(phrase=>{
    const regexes = phrase.triggers.map(trig=>new RegExp(trig, "mi"))
    const regex = regexes.find(reg=>reg.test(question))
    if(regex && !answered){
      response = rand(phrase.responses)
      if(phrase.variables){
        let vars = {};
        const execed = regex.exec(question);
        Object.entries(phrase.variables).forEach(function([key, value]){
          vars[key] = execed[value]
        })
        Object.entries(vars).forEach(([key, value]) =>{
          response = response.replace(new RegExp(`\{${key}\}`, "g"), value)
        })

      }
      const randomNumRegex = /random\(([0-9]+), ?([0-9]+)\)/
      const randomWordRegex = /randomWord\((.+), ?(.+)\)/
      if(randomNumRegex.test(response)){
        const [str, num1, num2] = randomNumRegex.exec(response)
        response = response.replace(randomNumRegex, randomInteger(parseInt(num1), parseInt(num2)))
      }else if(randomWordRegex.test(response)){
        const [str, word1, word2] = randomWordRegex.exec(response)
        response = response.replace(randomWordRegex, rand([word1, word2]))
      }
      answered = true
    }
  })
  if(!answered){
     const defaultAnswers = phrases.find(p=>p.type === "default").responses;
     response = rand(defaultAnswers)
  }
  return response
}

module.exports = ask

