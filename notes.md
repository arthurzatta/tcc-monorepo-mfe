### Observações

1. A estilização do css, mesmo com o tailwind, é sobrescrito por outros estilos de outros projetos. É necessário evitar estilizações globais e procurar uma forma de isolar o css entre os projetos. A maneira mais simples séria adicionando um prefixo para cada projeto, no entanto isso é inviável caso precise alterar o prefixo.
2. O ideal pode ser usar uma config padrão para os projetos.
