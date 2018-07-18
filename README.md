# Batalharte
Este projeto expõe a proposta de uma aplicação para dispositivos móveis que tem como finalidade auxiliar alunos do 9° ano do ensino fundamental em seu processo de aprendizagem referente aos conteúdos de História e Arte. Para tanto, o aplicativo BATALHARTE disponibilizará materiais, ordenados cronologicamente, para serem estudados e exercitados através de um quiz, onde os usuários poderão se desafiar para receber recompensas.

## Objetivos

### Objetivo Geral
O objetivo geral deste projeto trata-se de desenvolver um aplicativo de apoio ao estudo das competências de História e Arte, para alunos do 9° (nono) ano do ensino fundamental, e que possa ser indicado por professores como uma ferramenta para reforçar os conteúdos abordados em sala de aula.

## Objetivos Específicos

* Apresentar os conteúdos de maneira interdisciplinar e de forma *gameficada*;
* Incentivar a busca pelo conhecimento e estimular a interação entre os alunos;
* Desenvolver um aplicativo que se adapte às tecnologias disponíveis nas escolas.

# Contribuição
Para contribuir no desenvolvimento da aplicação mobile Batalharte, inicialmente, será necessário que você clone o repositório em sua máquina.

## Clonando repositório

Para cloner o repositório, utilize o seguinte comando.

> git clone "insira o link para clonar aqui, sem as aspas"

## Instalando dependências

Após clonar o repositório, será necessário instalar as dependências do projeto. Navegue até a pasta do projeto e execute o comando seguinte.

> npm install
ou
> yarn install

## Branchs da aplicação

Após ter as dependências instaladas sem nenhum erro, será necessário navegar para o seu branch de desenvolvimento. Primeiro, confira como estão organizados os branches do projeto:

| Branch | Função |
| ------ | ------ |
| master | Versões em produção (Fase final) |
| dev   | Versões de desenvolvimento |
| 1.0 | Versões desenvolvidas e testadas |

## Navegando entre os branch

Para navegar ao branch desejado, faça:

> git checkout -b "nome do branch, sem as aspas" origin/"nome do branch, sem as aspas"
**Exemplo:** git checkout -b dev origin/dev

## Listando branchs

Para listar os branchs, utilize:

> git branch

## Listando commits

Para listar os commits feitos neste branch, utilize:

> git log

## Verificando status

Para verificar o status do git, faça:

> git status

## Fazendo um commit

Para fazer um commit, siga os passos:

Verifique os arquivos alterados com o seguinte comando.

> git status

Adicione os arquivos desejados.

> git add "caminho do arquivo, sem as aspas"
ou, utilize o camando seguinte para adicionar todos os arquivos alterados
> git add .

Você pode verificar os arquivos adicionados com o comando seguinte

> git status

Agora, escreva uma mensagem de commit.

> git commit -m "Digite sua mensagem, com as aspas"

Antes de enviar para o repositório remoto, verifique se não há nenhuma submissão na sua frente, com o comando seguinte.

> git pull

Se houver alguma alteração em sua frente, o git tentará mesclar as alterações. Se ocorrer erro durante a mesclagem, será necessário arrumar os conflitos com alguma ferramenta especifica (É recomendável utilizar o Visual Studio Code). Se tudo ocorrer bem, você poderá enviar suas alterações para o repositório remoto executando o comando seguinte.

> git push origin "nome do branch que você se encontra, sem as aspas"

-------------------------------------------------------------------
# Let's develop!!! :heart: