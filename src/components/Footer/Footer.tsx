import React, {Component} from "react";

class Footer extends Component {

    render() {
        return (

            <div className="footer">
                <p>
                    🚀 Built with <a target="_blank" href="https://facebook.github.io/react/">React</a>🚀
                </p>
                <p>
                    See source code on <a target="_blank"
                                          href="https://github.com/VikasDayananda/tune-app">GitHub</a>
                </p>
                <p className="footerCopyRight">© 2019 Vikas Dayananda</p>
            </div>
        )
    }
}

export default Footer;