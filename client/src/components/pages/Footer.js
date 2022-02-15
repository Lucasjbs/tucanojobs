import React from 'react'

// https://mdbootstrap.com/docs/standard/navigation/footer/

function Footer() {
    return (
        <div>
            <footer className="bg-dark text-center text-white">

            <div className="container p-4">

                <section className="mb-4">
                <p>
                    Este site criado por Lucas Junqueira Bastos como um projeto para a faculdade de 
                    Engenharia da Computação. O código deste e outros projetos podem ser encontrados 
                    no <a href='https://github.com/Lucasjbs'>GitHub</a>.
                </p>
                </section>

                <section className="">
                <div className="row">

                    <div className="col-lg-6 col-md-6 mb-4 mb-md-0">
                    <h5 className="text-uppercase">Institucional</h5>

                    <ul className="list-unstyled mb-0">
                        <li>
                        <a href="/aboutus" className="text-white">Sobre nós</a>
                        </li>
                        <li>
                        <a href="/questions" className="text-white">Perguntas frequentes</a>
                        </li>
                        <li>
                        <a href="/talktous" className="text-white">Fale conosco</a>
                        </li>
                    </ul>
                    </div>

                    <div className="col-lg-6 col-md-6 mb-4 mb-md-0">
                    <h5 className="text-uppercase">Filtros populares</h5>

                    <ul className="list-unstyled mb-0">
                        <li>
                        <a href="/candidate/searchby/PHP" className="text-white">Programador PHP</a>
                        </li>
                        <li>
                        <a href="/candidate/searchby/Javascript" className="text-white">Programador JavaScript</a>
                        </li>
                        <li>
                        <a href="/candidate/searchby/ReactJs" className="text-white">Desenvolvedor ReactJs</a>
                        </li>
                    </ul>
                    </div>
                </div>
                </section>

            </div>

            <div className="text-center p-3">
                TUCANOJOBS.COM © 2021 - Todos os direitos reservados
            </div>

            </footer>

        </div>
    )
}

export default Footer