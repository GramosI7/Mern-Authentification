import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
        <div >
            <br/>
            <footer style={{ bottom: "0", width: "100%", marginTop:"10px"}} className="page-footer font-small bg-ligth">
                <div className="footer-copyright text-center py-3">© 2018 Copyright:
                    <a href="https://mdbootstrap.com/bootstrap-tutorial/"> MDBootstrap.com</a>
                </div>
            </footer>
        </div>
    )
  }
}
