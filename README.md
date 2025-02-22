# Projeto Gamificação em The News

## Introdução
<div align="justify">
  
  Este projeto de gamificação foi desenvolvido para aumentar o engajamento dos leitores da `newsletter`. Ao clicar no link da `newsletter`, o usuário realiza um auto `login` via parâmetros e é redirecionado para sua área pessoal ou para o `dashboard` administrativo (no caso de administradores).
</div>

   ## Detalhes Perfil

  <div align="justify">
    
  Na área do usuário após o usuário entra no link do e-mail ele cairá na tela principal na qual terá todos detalhes associados ao usuário logado, sendo exibidos na página do usuário são exibidos dados essenciais para a gamificação, como o seu `streak`, `experiência`, `nível`, `total de leituras`, `recorde` e um `histórico detalhado` das aberturas mostrado com um calendário que os dias lidos estão pintados demostrando quais foram, incentivando a manutenção de hábitos de leitura, também sistema conta com modo `light` e `dark`, e sistema responsivo se adaptando para diferentes tamanho de tela. Abaixo imagens do sistema
</div>
 <div align="center">
    <br>
    <br>
    <img src="/img-projeto/perfil.jpeg">
    <br>
    <br>
     <img src="/img-projeto/perfil-mobile.jpeg">  
    <br>
    <br>
 </div>
   <div align="start">
    
   ## Detalhes do Dashboard
  </div>  
   <div align="justify">
     
   Já o dashboard administrativo é composto por diversos componentes visuais de engajamento, cadastros e rankings, permitindo uma análise estratégica dos dados. Tendo os seguintes gráficos  
   
   - **Gráfico de Engajamento Geral:** Apresenta o engajamento mensal e permite o filtro por ano.
   - **Cards Informativos:** Dois cards exibem o total de cadastros no sistema e o total de leituras realizadas.
   - **Gráfico de Pizza (Pie Chart):** Mostra o engajamento distribuído por ano, facilitando a identificação do ano com melhor performance.
    - **Card de Leitores Mais Engajados:** Lista os usuários com maior engajamento, com filtros por streak, nível e número de leituras.
   - **Gráfico de Engajamento dos Cadastros:** Exibe a quantidade de cadastros por mês, com opção de filtro por ano.
  
 <div align="center">
    <br>
    <br>
    <img src="/img-projeto/dashboard.png">
    <br>
    <br>
    <img src="/img-projeto/dashboard-mobile.jpeg">
    <br>
    <br>
</div>
<br>
<p align="justify">

## Tecnologias Utilizadas
<div align="justify">
  
  O sistema foi implementado utilizando `Next.js`, `React`, `TypeScript`, `SQLite`, `Prisma` e `Tailwind CSS`, garantindo uma estrutura escalável, de alta performance e com uma experiência de usuário intuitiva e interativa
</div>

### Desafios Encontrados
<div align="justify">
  
  Um dos principais desafios enfrentados foi a necessidade de um domínio online para consumir a API `webhook`. Após extensas pesquisas, optei por utilizar o `Ngrok`, que possibilitou a criação de um túnel do ambiente `localhost`, permitindo que as requisições fossem acessíveis na web e que todos os testes necessários fossem realizados.

  Outro desafio significativo foi a implementação da lógica de auto login, que integra a validação dos streaks dos usuários com o cálculo da experiência. Essa solução garantiu a correta contagem dos dias consecutivos de acesso (desconsiderando os domingos) e impediu que o streak fosse incrementado mais de uma vez por dia, entre outras validações detalhadas.
</div>

### Organização do Projeto
<div align="justify">
  
  Para estruturar a aplicação, utilizei o padrão de pastas do **Next.js**, aproveitando a nova abordagem do **App Router**. Dentro da pasta `app`, separei as rotas em pastas específicas — como `(private)`, onde ficam as páginas principais que requerem maior segurança (ex.: **dashboard** e **perfil**), além das rotas públicas. Esse formato facilita a navegação e a manutenção das rotas de forma organizada.

  A lógica de negócio foi isolada na pasta **services**, onde concentro funcionalidades mais complexas, como o cálculo de `streaks` e `XP`. Já os **custom hooks** (pasta **hooks**) armazenam lógicas de estado e side effects reaproveitáveis em diversos componentes. Na pasta **api**, ficam as rotas que atuam como *backend* dentro do **Next.js**, possibilitando consultas ao banco de dados de forma centralizada.

  Por fim, a pasta **components** agrupa os elementos de interface (UI) em subpastas, conforme a finalidade (ex.: `dashboard`, `perfil`), permitindo que cada componente seja facilmente identificado e reutilizado. Essa divisão em camadas (**rotas**, **services**, **hooks**, **components**) busca manter o código limpo, modular e de fácil escalabilidade.
</div>

## Estrutura dos Dados (SQL) e Processamento

### Estrutura do SQL
<div align="justify">
  
 A estrutura do banco de dados foi organizada em duas tabelas principais:
 
  - **Tabela de Usuários:**  
    Armazena os dados essenciais de cada usuário, como o email, identificador único e métricas de gamificação (`streaks`, `XP`, `nível`, etc.). Essa tabela é responsável por manter os dados fundamentais dos usuários que interagem com a plataforma.
  
  - **Tabela de Histórico:**  
    Registra cada interação ou evento de engajamento realizado pelo usuário na plataforma. Essa tabela funciona como um log, permitindo acompanhar e relacionar cada ação à conta do usuário, o que é fundamental para atualizar e manter o registro dos `streaks` e demais métricas.
  
  Essa divisão entre tabelas garante a integridade dos dados, facilitando a manutenção, a escalabilidade e a análise do comportamento dos usuários na plataforma.
</div>

### Inserções e Consultas
<div align="justify">
  
Para gerenciar a persistência e a recuperação de dados, o sistema utiliza o `Prisma` como `ORM`, que abstrai os detalhes do `SQL` e facilita as operações de inserção e consulta. Em resumo:

- **Inserções:**  
  Sempre que ocorre uma nova interação, o sistema verifica se o usuário já existe. Se não, um novo registro é criado. Além disso, cada evento de engajamento gera um registro na tabela de histórico, garantindo o acompanhamento contínuo das atividades.

- **Consultas:**  
  São realizadas verificações para determinar, por exemplo, se já existe um registro de interação para o dia atual ou se as condições para atualizar os `streaks` e `XP` são atendidas. Essa abordagem permite identificar rapidamente se o usuário deve ter seus dados atualizados ou se a operação deve ser ignorada para evitar duplicidades.

Essa estratégia assegura que os dados, como informações do usuário e histórico

</div>

### Escalabilidade
A estrutura do banco de dados foi planejada para suportar o crescimento do volume de dados e o aumento das interações dos usuários. O uso do `Prisma` facilita a implementação de otimizações, como indexação, garantindo que as operações de inserção e consulta mantenham sua performance mesmo em cenários de alta demanda. Dessa forma, o sistema está preparado para evoluir de forma consistente e eficiente.

## Testes Realizados

<div align="justify">
  
  Para validar foi implementada uma suíte de testes unitários utilizando `Jest` para validar a lógica principal do gerenciamento de `streaks` e `XP`. Esses testes garantem que a função responsável por atualizar os dados do usuário execute corretamente operações como a criação de um novo usuário, a atualização condicional de `streaks` e `XP` com base na diferença de dias, e o registro adequado do histórico, tudo sem duplicidade. O resultado dos testes confirma que todos os cenários críticos foram cobertos e que a lógica se comporta conforme o esperado.
</div>

## Relatório de Análise e Sugestões de Melhorias

### Decisões Técnicas

<div align="justify">
  
  Escolhi o `Next.js` por sua excelência como `framework` para aplicações `React`, oferecendo uma ampla variedade de bibliotecas e demonstrando agilidade e facilidade de uso em diversos contextos. Para garantir uma melhor organização e segurança no acesso ao banco de dados `SQLite`, foi adotado o `Prisma`. Além disso, utilizei o `Tailwind CSS` para acelerar o desenvolvimento da interface visual, considerando o prazo restrito do projeto. Por fim, o `TypeScript` foi incorporado, proporcionando tipagem estática que eleva a precisão do código e auxilia na detecção de erros em tempo de execução.
</div>

### Sugestões de Melhorias

<div align="justify">
  
  Com um prazo de desenvolvimento ampliado, aprimoraríamos a interface do `dashboard` com a implementação de novas funcionalidades e a incorporação de elementos visuais que incentivem os usuários a aumentar seus `streaks`. Adicionalmente, planeja-se reforçar o sistema de auto login, por meio da implementação de uma lógica mais robusta e segura, poder fazer um sistema completo com cadastro e login para o usuário poder acessar a qualquer momento e poder integrar mais funcionalidades também.
</div>
<br>

 ## Vídeo demonstrativo
 
  <p align="center"> Aqui está o vídeo demonstrativo da interface do projeto veja 
    <a href="https://www.youtube.com/watch?v=7fIitb86Yug&ab_channel=EduardoFrancoSeco">clicando aqui!</a>
  </p>

  <br>

  # Como Instalar?

  Para instalar a aplicação use o código no seu CMD(Prompt de Comando):

    git clone https://github.com/Projeto-Banco-em-C/aplicacao-front-end.git

  Agora instale as dependências usando esse comando

    npm i

  Com isso já é possível rodar o projeto para isso rode mais esse comando

    npm run start

  
  ## ADM
  Agora se voce quer ver o dashboard e é adimistrador do site ou da equipe abra seu navegador e digite 

    http://localhost:3000/?email=adm@gmail.com&id=1

  ## Usuario
  Agora se voce é usuario abra seu navegador e digite 

    http://localhost:3000/?email=teste1@gmail.com&id=5141c5va-34s7-4j1a-7523-56464224353b5f

<br>
<br>

<div align="center" style="display: inline_block">
  <br>
  <p>Linguagens utilizadas para a aplicação</p>

  <img align="center" alt="Next" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" /> 
  <img align="center" alt="Next" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />
  <img align="center" alt="Next" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg" />
  <img align="center" alt="Next" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg" />
  <img align="center" alt="Next" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" />
  <img align="center" alt="Next" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />

</div>
<br>

<div align="start">
  
## Desenvolvedor

- **Eduardo Franco Seco:**  
  <a href="https://github.com/eduardofranco572" align="center">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white">
  </a>
  <a href="https://www.linkedin.com/in/eduardo-franco572/" align="center">
    <img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank">
  </a>  

</div>
