
function Calculate_age(dateOfBirth) { 
    const today = moment();
    const birthDate = moment(dateOfBirth, 'YYYY-MM-DD');
    const yearsDiff = today.diff(birthDate, 'years');
    return yearsDiff;
}

function GetJson(callback) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open("GET", "src/teamData.json", true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var jsonData = JSON.parse(xhr.responseText);
          callback(jsonData); // Chama o callback com os dados JSON
        } else {
          callback(null); // Chama o callback com null em caso de erro
        }
      }
    };
    xhr.send(null);
}

function getInformationBySigla(jsonFile, sigla) {    
    for (let i = 0; i < jsonFile.length; i++) {
        if (jsonFile[i].sigla === sigla) {
            return jsonFile[i];
        }
    }
    
    return null; // Retorna null se a sigla não for encontrada
}

function replaceAgeInText(text, age) {
    return text.replace('{age}', age);
}

addEventListener("load", (event) => {});
onload = (event) => {
    GetJson(function(jsonData) {
      if (jsonData) {
        // Função para gerar a descrição com base nos dados do JSON
        function generateDescription(data) {
            var sigla = data["sigla"];
            var descriptionElement = document.getElementById("desc-" + sigla);
            if (descriptionElement) {
              var age = Calculate_age(data["dateOfBirth"]);
              var replacedText = replaceAgeInText(data["description"], age);
              descriptionElement.innerHTML = replacedText;
            }
          }

        // Iterar sobre cada objeto do JSON
        jsonData.forEach(function(person) {
          generateDescription(person);
        });
      } else {
        console.error("Erro ao obter os dados JSON.");
      }
    });
  };

// var desc_yuri = document.getElementById("desc-yuri-dantas");
// desc_yuri.innerHTML = `"Hi!
//                         My name is Yuri Dantas, I'm `+ yuri_age +` years old, I'm from Goiânia-GO, I'm CEO and Copydesk at Uspery. I'm  graduated in basic information technology. I have a passion for writing, and in 2021 I started my first written project."`

// var desc_pedro = document.getElementById("desc-pedro-henrique");
// desc_pedro.innerHTML = `"Hi!
//                         My name is Pedro Henrique, I'm `+ pedro_age +` years old, I'm CEO and Systems Analyst at Uspery.  I'm graduated in Systems Development from ETEC."`

// var desc_leonardo = document.getElementById("desc-leonardo-ieva");
// desc_leonardo.innerHTML = `"Hi!
//                         My name is Leonardo Ieva, I'm `+ leonardo_age +` years old, I'm Web Developer Junior at Uspery. I'm styding Science Computer from Impacta."`

// var desc_carol = document.getElementById("desc-carol-oliveira");
// desc_carol.innerHTML = `"Hi!
//                          My name is Caroline Oliveira, I'm ` + carol_age + ` years old, I'm Back-end Developer at Uspery. I'm graduand in Systems Development at ETEC and I'm styding Computer Science at Universidade São Judas Tadeu."`