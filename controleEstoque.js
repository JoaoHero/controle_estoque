const readline = require('readline');

let productList = [];

// Criando a interface de entrada e saida de dados
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Função que cria as opções do menu
function menu() {
    console.log("");
    console.log("---------------------------");
    console.log('CONTROLE DE ESTOQUE - CARROS');
    console.log('[1] Novo');
    console.log('[2] Listar Produtos');
    console.log('[3] Remover Produto');
    console.log('[4] Entrada Estoque');
    console.log('[5] Saída Estoque');
    console.log('[0] Sair');
};

// Switch case para validar cada escolha feita do usuário e ter uma tomada de decisão
function processChoice(opcao, product) {
    switch (opcao) {
      case '1':
        newProduct();
        break;
      case '2':
        listOfProducts(product);
        break;
      case '3':
        removeProducts(product);
        break;
      case '4':
        stockEntry(product);
        break;
      case '5':
        stockOut(product);
        break;
      case '0':
        console.log('Encerrando...');
        rl.close();
        break
      default:
        console.log('Opção inválida');
        askOption();
        break
    };
};

// Função que gera a pergunta ao usuário, mostra o menu e captura o seu retorno
function askOption(product) {
    menu();

    rl.question('Digite o número da opção desejada: ', (opcao) => {
        return processChoice(opcao, product);
    });
}

// Função que cria um novo produto
function newProduct() {
    rl.question('Qual o nome do carro? ', (productName) => {
        rl.question('Qual o preço? ', (productPrice) => {
            rl.question('Qual a marca? ', (productBrand) => {
                rl.question('Qual o ano? ', (productYear) => {
                    rl.question('Qual a cor? ', (productColor) => {

                    // Criando um novo objeto com os valores informado do usuário
                    product = {
                        productName: productName,
                        productPrice: productPrice,
                        productBrand: productBrand,
                        productYear: productYear,
                        productColor: productColor,
                        productQuant: 0
                    };

                    console.log("");
                    // Adicionando o produto no array
                    productList.push(product);
                    console.log("Produto cadastrado");

                    // Parar o processamento e chamar a função de capturar o valor das perguntas do menu, passando o produto como argumento
                    return askOption(productList);

                    });
                });
            });
        });
    });
};

// Listando os produtos cadastrados
function listOfProducts(product) {

    // Validar se já tem um produto cadastrado
    if(product != undefined && productList.length != 0) {

        // Interando sobre os valores do objeto
        product.forEach((item, index) => {
            // Incrementando 1 ao valor do index do array, tendo em vista que começa a contar no 0
            index++;
            console.log("");
            console.log(`${index}. ${item.productName} (${item.productPrice}R$) (${item.productColor}) - ${item.productQuant} no estoque`);
        });

        // Parando o processamento e chamando a função de capturar o valor das perguntas do menu
        return askOption(product);

    }else {
        console.log("");
        console.log("Nenhum produto cadastrado");

        // Parando o processamento e chamando a função de capturar o valor das perguntas do menu
        return askOption();
    };

};

// Função para remover os produtos cadastrados
function removeProducts(product) {

    rl.question('Informe a posição do produto a ser removido: ', (position) => {

        // Validar se já tem algum produto cadastrado e se o valor informado para remover não é maior que o número de produtos cadastrados
        if(product != undefined && position <= productList.length && position != 0) {
            // Decrementando o valor inserido do usuário, para se ajustar ao valor do array, tendo em vista que o array começa a contar seus indices no 0
            position--;

            // Removendo o objeto do array
            product.splice(position, 1);

            console.log("");
            console.log("Produto removido com sucesso");

            // Parando o processamento e chamando a função de capturar o valor das perguntas do menu
            return askOption(product);
        }else {
            console.log("");
            console.log("Posição inválida, este item não existe!");

            // Parando o processamento e chamando a função de capturar o valor das perguntas do menu
            return askOption(product);
        };
    });
};

// Função para entrada de estoque
function stockEntry(product) {
    rl.question('Informe a posição do carro: ', (position) => {
        rl.question('Informe a quantidade de Entrada: ', (quant) => {

            // Validando se já tem um produto cadastrado, se a posição informada não é maior que o número de produtos cadastrados e se o valor da posição não é zero
            if(product != undefined && position <= product.length && position != 0) {
                
                 // Decrementando o valor inserido do usuário, para se ajustar ao valor do array, tendo em vista que o array começa a contar seus indices no 0
                position--;

                // Pegando o último valor cadastrado
                lastValue = product[position].productQuant;
                // Somando o último valor com o novo
                newValue = lastValue + parseInt(quant);

                // Alterando o valor da quantidade em estoque no objeto
                product[position].productQuant = newValue;

                console.log("");
                console.log(`Adicionado: ${quant} unidades`);
                console.log(`Produto: ${product[position].productName}`)

                // Parando o processamento e chamando a função de capturar o valor das perguntas do menu
                return askOption(product);

            }else {
                console.log("");
                console.log("Posição inválida, este item não existe!");

                // Parando o processamento e chamando a função de capturar o valor das perguntas do menu
                return askOption(product);
            };
        });
    });
};

// Função para saida de estoque
function stockOut(product) {
    rl.question('Informe a posição do carro: ', (position) => {
        rl.question('Informe a quantidade de saida: ', (quant) => {

            // Validando se já tem um produto cadastrado, se a posição informada não é maior que o número de produtos cadastrados e se o valor da posição não é zero
            if(product != undefined && position <= product.length && position != 0) {
                // Validando se já tem um produto cadastrado, se a posição informada não é maior que o número de produtos cadastrados e se o valor da posição não é zero
                position--;

                // Pegando o último valor cadastrado
                lastValue = product[position].productQuant;

                // Validando se o último valor cadastrado é maior que a quantidade a ser removida, evitando a subtração e deixando o valor negativo
                if(lastValue >= quant) {

                    // subtraindo o último valor com o novo
                    newValue = lastValue - parseInt(quant);

                    // Alterando o valor da quantidade em estoque no objeto
                    product[position].productQuant = newValue;

                    console.log("");
                    console.log(`Removido: ${quant} unidades`);
                    console.log(`Produto: ${product[position].productName}`);

                    // Parando o processamento e chamando a função de capturar o valor das perguntas do menu
                    return askOption(product);

                }else {
                    console.log("");
                    console.log("Não tem este valor em estoque para ser removido");

                    // Parando o processamento e chamando a função de capturar o valor das perguntas do menu
                    return askOption(product);
                };

            }else {
                console.log("");
                console.log("Posição inválida, este item não existe!");

                // Parando o processamento e chamando a função de capturar o valor das perguntas do menu
                return askOption(product);
            };
        });
    });
};
  
askOption();