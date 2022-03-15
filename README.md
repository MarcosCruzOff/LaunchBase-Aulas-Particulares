# LaunchBase: Aulas-Particulares

## :rocket: Sobre o desafio: 4-1 <i>Header</i>

Esse é o primeiro desafio da sequência de criação de um site de aulas particulares. A ideia é aplicar, em pequenas doses, os conhecimentos aprendidos nas aulas anteriores. Aqui criamos apenas um arquivo HTML que contém uma `tag header`, e um arquivo CSS para a estilização do mesmo

## Técnologia usada no desafio

- HTML

- CSS

- JavaScript

- Node ( é necessário baixar )

- Express

É necessário usar o comando <code>npm install express</code>

<br />

## :rocket: Sobre o desafio: 4-2 <i> Card do Professor </i>

Nessa etapa adicionei uma lib o `browser-sync` e o `npm-run-all` e comecei a criação do card para apresentação das informações do professor.

Neste caso eu preferi instalar as libs citadas a cima como devDependencies. As configurações da mesma se encontra no arquivo `package.json`

## Mudanças

Estilização para o desafio 4-2 modificado.

<br />

## :rocket: Sobre o desafio: 4-3 <i> Formulário e Rota de cadastro do Professor </i>

Nessa etapa foi criado um formulário de cadastro do professor e uma rota do tipo post que irá realizar as validações e salvar os dados enviados.

## Arquivos

- Foi adicionado um arquivo `teachers.js` que é responsável pelo CRUD da aplicação, por hora foi desenvolvido apenas o método POST.

- Foi adicionado um arquivo `database.json` que será o responsável por armazenar as informações dos cadastrados

- Houve mudanças no arquivo `server.js` agora inserimos novas rotas a este

<br/>

## :rocket: Sobre o desafio: 4-4 <i> Apresentação, edição e formatação dos dados de um professor </i>

Foi criado duas rotas: uma para apresentar os dados do professor (show) e outra para a edição dos dados cadastrados (edit). Além disso, foi feita a formatação dos dados cadastrados para a exibição no HTML

## Arquivos

No arquivo `server.js` adicionado duas novas rotas:

- `server.get('/teachers/:id', teachers.show);` exibe o professor cadastrado

- `server.get('/teachers/:id/edit', teachers.edit);` exibe as informações do professor para atualizações

<br />

## :rocket: Sobre o desafio: 4-5 <i> HTTP: PUT e DELETE </i>

Duas novas rotas: PUT e DELETE para a atualização e remoção, respectivamente, dos dados cadastrados de um professor.

## Arquivos

No arquivo `teachers.js` adicionado duas novas rotas:

- `server.put('/teachers', teachers.put);` rota que acessa a função put do arquivo `teacher.js` para atualizar as informações de algum professor cadastrado no arquivo `database.json`

- `server.delete('/teachers', teachers.delete);` rota que acessa a função delete do arquivo `teacher.js` para deletar algum professor cadastrado no arquivo `database.json`

<br />

## :rocket: Sobre o desafio: 4-6 <i> Listagem de professores </i>

listagem de todos os professores salvos no arquivo json e apresentá-dos em formato de tabela.

## Mudanças

- Arquivos `.html` foram alterados para trabalhar agora com `.njk`

<br />

## :rocket: Sobre o desafio: 4-7 <i> Estruturando estudantes </i>

reaproveitando todos os códigos ja criados dos professores para os estudantes toda a estrutura já criada para os professores. e implementando a lógia de menu ativado

<br/>

## :rocket: Sobre o desafio: 5-1 <i> Refatorando aplicação e configurando o BD </i>

### Criando Banco de dados

Utilizando a ferramenta BeekeperStudio, para a visualização gráfica, para criar **tabelas e queries** em um banco de dados chamado **my_teacher**.
Podendo assim deixar salvos os dados do clientes tanto em um aquivo `json` e no **banco de dados**

### Refatorando o Código

Após o banco de dados criado, foi preciso refatorar a aplicação para utilizá-lo.Seguintes alterações realizadas:

- Nova estrutura de pastas (src, app e lib);

### Configurando BD na aplicação

Por fim, biblioteca `pg` instalada. Um arquivo de configuração do banco de dados foi criado (em uma pasta **config**) utilizando o objeto `Pool`.
