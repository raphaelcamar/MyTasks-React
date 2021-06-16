import Document, {Html, Head, Main, NextScript} from 'next/document';

export default class MyDocument extends Document{
  render(){
    return (
      <Html lang="pt_BR">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap" rel="stylesheet" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <link rel="shortcut icon" href="/logo.svg" type="image/svg" />
          <meta name="description" content="Controle as tarefas do seu dia 
            a dia com uma aplicação simples e fácil de ser utilizado" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}