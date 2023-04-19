const Footer = () => {
    return (
        <footer>
            <div className="footer">
                <div className="row">
                    <a href="https://www.linkedin.com/in/leonardo-oliv-almeida" target="_blank"><i className="fa fa-linkedin"></i></a>
                    <a href="https://github.com/leonardo-alm" target="_blank"><i className="fa fa-github"></i></a>
                    <a href="mailto:leonardo.olv94@gmail.com"><i className="fa fa-thin fa-envelope"></i></a>
                    <a href="tel:+5584988495054"><i className="fa fa-phone"></i></a>

                </div>

                <div className="row">
                    <ul>
                        <li><a href="#">Contact us</a></li>
                        <li><a href="#">Our Services</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms & Conditions</a></li>
                        <li><a href="#">Career</a></li>
                    </ul>
                </div>

                <div className="row">
                    Copyright © 2023 - All rights reserved | Developed By: <a
                        href="https://www.linkedin.com/in/leonardo-oliv-almeida"
                        target="_blank">
                        Leonardo Almeida
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer