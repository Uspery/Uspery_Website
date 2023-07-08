
function Calculate_age(dateOfBirth) { 
    const today = moment();
    const birthDate = moment(dateOfBirth, 'YYYY-MM-DD');
    const yearsDiff = today.diff(birthDate, 'years');
    return yearsDiff;
}

function GetJson(callback) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open("GET", "../team/src/teamData.json", true);
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
            // Função para criar os itens no HTML
            function createItems(data) {
                var sigla = data["sigla"];
              
                // Criação da seção de criador
                var section = document.createElement("section");
                section.classList.add("section-cards");
                section.id = sigla;
              
                // Criação do elemento de cartão
                var card = document.createElement("div");
                card.classList.add("card", "about");
              
                // Criação da coluna de texto
                var columnText = document.createElement("div");
                columnText.classList.add("column-text", "about");
              
                // Criação da imagem
                var image = document.createElement("img");
                image.classList.add("member-img");
                image.src = data["imageUrl"];
                image.alt = data["name"];
              
                // Criação do contêiner para o título com a imagem e o nome do usuário
                var titleContainer = document.createElement("div");
                titleContainer.classList.add("container-title");
              
                // Criação do título do criador
                var title = document.createElement("h2");
                title.classList.add("title-card");
                var userName = document.createTextNode(data["name"]);
                title.appendChild(userName); // Adiciona o nome do usuário ao título
              
                // Adiciona o título ao contêiner do título
                titleContainer.appendChild(title);

                if(data["imageUrl"]) // Adiciona a imagem ao contêiner do título caso tenha imagem
                    titleContainer.appendChild(image); 
              
                // Criação da descrição
                var description = document.createElement("h3");
                description.classList.add("text-card-semi");
                description.id = "desc-" + sigla;
              
                // Criação do link "Know more"
                var link = document.createElement("h3");
                link.classList.add("text-card-semi");
                var anchor = document.createElement("a");
                anchor.href = data["url"]; // Usando a propriedade "url" como valor do atributo "href"
                anchor.classList.add("spam-card");
                anchor.textContent = "Know more";
                // link.appendChild(document.createTextNode("Know more: "));
                link.appendChild(anchor);
              
                // Adicionar os elementos à estrutura HTML
                columnText.appendChild(titleContainer); // Adiciona o contêiner do título à coluna de texto
                columnText.appendChild(description);
                columnText.appendChild(link);
                card.appendChild(columnText);
                section.appendChild(card);
              
                // Encontrar a seção de criadores e inserir a nova seção gerada
                var teamSection = document.getElementById("team");
                if (teamSection) {
                  teamSection.appendChild(section);
                }
              
                // Chamar a função generateDescription
                generateDescription(data);
              }
              
              

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

            // Iterar sobre cada objeto do JSON e criar os itens no HTML
            jsonData.forEach(function(person) {
                createItems(person);
            });
        }
        else {
            console.error("Erro ao obter os dados JSON.");
        }
    });
};
