# Definição

Aqui estará descrito como está sendo implementada essa funcionalidade de controle de acesso aos conteúdos da aplicação.

* O que foi pedido: Quando um projetista fizer login aparecerá para ele somente os projetos que ele está trabalhando e para a diretoria e adm aparecerá tudo como está hoje para edição, etc...

Para resolver essa situação optei por definir na base de dados de usuários um nível de permissão para cada novo funcionário que está sendo adicionado, baseado num conceito global de permissões.

Com isso em mente foram definidos os perfis como:

1. read
2. write
3. admin

Os usuários **read** são capazes apenas de ler os conteúdos salvos na base de dados, sem a possibilidade de alterar qualquer valor.

Os usuários **write** tem permissões pensadas para os projetistas, onde os mesmos podem editar os conteúdos a que tem acesso e projetos que estão envolvidos.

Já os usuários com permissão **admin** foram pensados para os usuários da administração da empresa, onde os mesmos terão acesso a todos os conteúdos e poderão editar qualquer informação relacionada aos projetos e aos usuários.

---

Atualmente, como este projeto visa atender apenas uma pequena parcela da população, apenas os usuários **admin** terão acesso à funcionalidade de cadastrar novos usuários, assim como mudar as permissões destes.

---

Será necessário criar um middleware especial que usa as informações do usuário (o ID deste) para definir os dados dos projetos que serão enviados para o cliente baseado na permissão deste.