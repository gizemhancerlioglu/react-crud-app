import React, { Component } from 'react'

class About extends Component {
    render() {
        return (
            <div className="container">
                <div className="py-4">
                    <h4 style={{color:"darkkhaki"}}>Packages installed in the project</h4>
                    <ul style={{color:"gray"}}>
                    <li> bootstrap</li>
                    <li> react-router-dom</li>
                    <li> json-server</li>
                    <li> concurrently</li>
                    <li> react-table</li>
                    <li> formvalidation</li>
                    </ul>
                </div>
                
            </div>
        )
    }
}

export default About;
