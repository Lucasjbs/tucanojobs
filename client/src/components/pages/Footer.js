import React from 'react'

// https://mdbootstrap.com/docs/standard/navigation/footer/

function Footer() {
    return (
        <div>
            <footer className="bg-dark text-center text-white">

            <div className="container p-4">

                <section className="mb-4">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum
                    repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam
                    eum harum corrupti dicta, aliquam sequi voluptate quas.
                </p>
                </section>

                <section className="">
                <div className="row">

                    <div className="col-lg-6 col-md-6 mb-4 mb-md-0">
                    <h5 className="text-uppercase">Institucional</h5>

                    <ul className="list-unstyled mb-0">
                        <li>
                        <a href="#!" className="text-white">Sobre nós</a>
                        </li>
                        <li>
                        <a href="#!" className="text-white">Perguntas frequentes</a>
                        </li>
                        <li>
                        <a href="#!" className="text-white">Como enviar proposta</a>
                        </li>
                        <li>
                        <a href="#!" className="text-white">Como contratar</a>
                        </li>
                    </ul>
                    </div>

                    <div className="col-lg-6 col-md-6 mb-4 mb-md-0">
                    <h5 className="text-uppercase">Filtros populares</h5>

                    <ul className="list-unstyled mb-0">
                        <li>
                        <a href="#!" className="text-white">Programador Java</a>
                        </li>
                        <li>
                        <a href="#!" className="text-white">Programador PHP</a>
                        </li>
                        <li>
                        <a href="#!" className="text-white">Programador JavaScript</a>
                        </li>
                        <li>
                        <a href="#!" className="text-white">Programador C#</a>
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