# REPOSITÓRIO ARQUIVADO
**O servidor agora está sendo desenvolvido com código-fonte fechado, este repositório foi arquivado e permancerá disponível apenas como histórico.**



================================================



### Código client-side do servidor do BRZ no RageMP.

<table>
    <td><img src="https://github.com/brazucas/ragemp/raw/master/demo/demo2.jpeg" width="300px"/></td>
    <td><img src="https://github.com/brazucas/ragemp/raw/master/demo/demo3.png" width="300px"/></td>
    <td><img src="https://github.com/brazucas/ragemp/raw/master/demo/demo4.png" width="300px"/></td>
</table>

## [Versão WEB](http://gui.brz.gg)

_Veja toda a GUI do servidor online._

### Contribuindo

- Clone o projeto.


    $ git clone https://github.com/brazucas/ragemp-client.git

- Instale as dependências

    - [NodeJS](https://nodejs.org/en/download/package-manager/) 14 ou superior.
    - [Yarn](https://classic.yarnpkg.com/en/docs/install)
    - [NPX](https://www.npmjs.com/package/npx)
        
            $ yarn add -D npx

- Instale os pacotes globais


    $ yarn add -D autoprefixer postcss-cli tailwindcss concurrently cross-env
    
- Instale as dependências do projeto

    
    $ yarn

##### Servindo o projeto em desenvolvimento:

    $ yarn dev
    
##### Build para produção
   
    $ yarn build
    
##### Publicação em produção
   
    $ yarn push
    
_Os arquivos compilados ficam na pasta `public`._

### Suporte do Svelte em IDEs

- Para o IntelliJ IDEA Ultimate e Visual Studio Code, pesquise e instale o plugin Svelte. 
