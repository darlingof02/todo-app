import React, {Component} from 'react'


class FooterComponent extends Component {
    render() {
        return (
            <footer className='footer'>
                <span className='text-muter link'>All Rights Reserved 2021 @daringof02</span>
            </footer>
        )
    }
}

function FooterFunction() {
    return (
        <div>
            <FooterComponent/>
        </div> 
    )
}

export default FooterFunction;