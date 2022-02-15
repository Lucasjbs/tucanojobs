import React from 'react';

function Questions() {
  return (
      <div className="questionsBG">
        <br></br>
        <ul>
        <li>
            <h3>Como funciona a candidatura às vagas?</h3>
            <h5>O primeiro passo é cadastrar seu perfil na plataforma, inserindo um nome de usuário que deve ser único e 
                uma senha. </h5>
            <h5>Depois de se cadastrar, o candidato terá que preencher um formulário com suas informações 
                pessoais como nome completo, email, telefone, entre outras.</h5>
            <h5>Também é importante enviar o seu currículo, no formato PDF e o link de um vídeo curto do 
                YouTube falando sobre suas competências.</h5>
        </li>
        <br></br>

        <li>
            <h3>Como deve ser feito o vídeo do YouTube?</h3>
            <h5>Primeiramente, vídeo deve ter no máximo 3 minutos de duração. É recomendável que o candidato
                coloque a visibilidade do vídeo como "Não Listado" para que apenas aqueles que tiverem o link
                do vídeo tenham acesso à ele.</h5>
            <h5>Também recomendamos que o vídeo tenha informações como: nome completo, idade, passatempos, 
                cidade onde mora atualmente e disponibilidade de mudança, escolaridade, curso, data de formatura
                experiência profissional, habilidades e diferencial.</h5>
        </li>
        <br></br>
        
        <li>
            <h3>Terminei meu cadastro, e agora?</h3>
            <h5>Seus dados estarão disponíveis na lista de candidatos e as empresas que se interessarem 
                pelo seu currículo poderão fazer contato através do email ou telefone.</h5>
        </li>
        <br></br>
        </ul>
        
        <br></br>
      </div>
  );
}

export default Questions;
