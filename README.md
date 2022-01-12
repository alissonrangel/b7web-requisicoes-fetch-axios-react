# Anotações da aula de requisições do curos de React do b7web

### Observações:
- não colocar fetch() diretamente no useEffect

#### Métodos HTTP
- VERBO / METHOD = GET, POST, PUT, DELETE
- GET = Pegar alguma info
- POST = Inserir alguma informação do sistema
- PUT = Alterar alguma info do sist
- DELETE = 

- URL / ENDPOINT = Endereço daquela API
- BASE = https://api.meusite.com
- ENDPOINT = BASE + COMANDO ESPECIFICO

#### API modelo para o recurso carro
- POST https://api.meusite.com/carros
- GET https://api.meusite.com/carros
- GET https://api.meusite.com/carros?search=fer
- GET https://api.meusite.com/carros/1
- PUT https://api.meusite.com/carros/1
- DELETE https://api.meusite.com/carros/1

#### Corpo da requisição eu passo os valores que serão enviados
- name
- brand
- year
- price = 120000

#### UTILIZANDO TOKENS - Cabeçalho da requisição
- POST carro - para adiionar um carro
- url = 'https://api.b7web.com.br/carros/api/carro';
- para permitir precisa adicionar um token no body da requisição ou adicionar o token no Authorization do headers

- posso passar o token no cabeçalho
```
body: {
  token: 'daldnad'
}
```
- posso passer o token no atributo 'Authorization' do headers 
```
let result = await fetch(url,{
  method: 'POST',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  }
});
```

#### Salvando token e userName no localStorage, para guardar os dados.


#### Upload de arquivos
- faz um form com os campos que serão enviados
- faz um useState para cada campo
- mas para o campo de upload de img usa o useRef e não o useState
```
let body = new FormData();
body.append('brand', carBrand);
body.append('name', carName);
body.append('price', carPrice);
body.append('year', carYear);
if (carImgField.current.files.length > 0) {
  body.append('photo', carImgField.current.files[0]);
}
let result = await fetch('https://api.b7web.com.br/carros/api/carro', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body
});
```