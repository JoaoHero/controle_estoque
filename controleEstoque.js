const readline = require('readline');

class Program {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.bookList = [];
    }

    askOption() {
        this.menu();

        this.rl.question('Digite o número da opção desejada: ', (option) => {
            this.processChoice(option);
        });
    }

    menu() {
        console.log("");
        console.log("---------------------------");
        console.log('CONTROLE DE ESTOQUE - CARROS');
        console.log('[1] Novo');
        console.log('[2] Listar Produtos');
        console.log('[3] Remover Produto');
        console.log('[4] Entrada Estoque');
        console.log('[5] Saída Estoque');
        console.log('[0] Sair');
    }

    processChoice(opcao) {
        switch (opcao) {
            case '1':
                this.newBook();
                break;
            case '2':
                this.listAllBooks();
                break;
            case '3':
                this.removeBook();
                break;
            case '4':
                this.stockEntry();
                break;
            case '5':
                this.stockOut();
                break;
            case '0':
                console.log('Encerrando...');
                this.rl.close();
                break;
            default:
                console.log('\nOpção inválida');
                this.askOption();
                break;
        }
    }

    newBook() {
        this.rl.question('Qual o nome do livro? ', (name) => {
            this.rl.question('Qual o preço? ', (price) => {
                this.rl.question('Qual o autor? ', (autor) => {
                    this.rl.question('Qual a quantidade de páginas? ', (pages) => {
                        this.rl.question('Qual o ano de lançamento? ', (yearOfRelease) => {

                            let book = {
                                name: name,
                                price: price,
                                autor: autor,
                                pages: pages,
                                yearOfRelease: yearOfRelease,
                                stock: 0
                            }

                            console.log("\nLivro adicionado!");
                            this.bookList.push(book);

                            return this.askOption();
                        });
                    });
                });
            });
        });
    }

    listAllBooks() {
        
        if(this.bookList.length == 0) {
            console.log("\nNenhum livro cadsatrado!");

            return this.askOption();
        }

        console.log("\nLISTANDO OS LIVROS");

        this.bookList.forEach((book, index) => {
            index++;

            console.log(`\n${index} Nome: ${book.name} - (${book.price}) - Páginas: ${book.pages} Autor: ${book.autor} - Estoque: ${book.stock}`);
            console.log("");
        });

        return this.askOption();
    }

    stockEntry() {

        this.rl.question('Informe a posição do livro: ', (positionBook) => {

            positionBook--;

            if(!this.bookList[positionBook]) {
                console.log("\nLivro não encontrado!");

                return this.askOption();
            }

            this.rl.question('Informe a quantidade a ser inserida no estoque: ', (stockQuant) => {

                if(stockQuant < 0) {
                    console.log("\nNão é possível adicionar números negativos!");
                    return this.askOption();
                }

                if(isNaN(stockQuant)) {
                    console.log("\nSó pode adicionar números no estoque!");
                    return this.askOption();
                }

                const selectedBook = this.bookList[positionBook];
                selectedBook.stock += Number(stockQuant);

                console.log(`\nFoi adicionado: ${stockQuant} no estoque, totalizando: ${selectedBook.stock}`);

                return this.askOption();
            });
        })
    }

    stockOut() {

        this.rl.question('Informe a posição do livro: ', (positionBook) => {

            positionBook--;
            
            if(!this.bookList[positionBook]) {
                console.log("\n Livro não encontrado!");

                return this.askOption();
            }

            this.rl.question('Informe a quantidade a ser removida no estoque: ', (stockQuant) => {

                if(stockQuant < 0) {
                    console.log("\nNão é possível adicionar números negativos!");
                    return this.askOption();
                }

                if(isNaN(stockQuant)) {
                    console.log("\nSó pode adicionar números no estoque!");
                    return this.askOption();
                }

                if(stockQuant > this.bookList[positionBook].stock) {
                    console.log("\nNão é possível remover mais do que tem atualmente no estoque!");
                    return this.askOption();
                }

                const selectedBook = this.bookList[positionBook];
                selectedBook.stock -= Number(stockQuant);

                console.log(`\nFoi removido ${stockQuant} do estoque, restando: ${selectedBook.stock}`);

                return this.askOption();
            });
        })
    }

    removeBook() {
        this.rl.question('Informe qual livro deseja remover: ', (positionBook) => {
            positionBook--;

            if(this.bookList.length === 0 || this.bookList.length <= positionBook) {
                console.log("\nLivro não encontrado!");

                return this.askOption();
            }

            // Removendo o objeto do array
            this.bookList.splice(positionBook, 1);

            console.log("\nProduto removido com sucesso");

            return this.askOption();

        });
    }
}

const program = new Program();
program.askOption();