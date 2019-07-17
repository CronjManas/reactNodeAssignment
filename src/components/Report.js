import React, {Component} from 'react';
import './Report.css'
class Report extends Component{
    render(){
        return (
    
            <div className="report">
                <div className="report-title">
                    {this.props.report.title}
                </div>
                <div className="report-body">
                    <div className="image">
                        <img src={this.props.report.image} alt="report cover"/>
                    </div>
                    <p className="description">
                        {this.props.report.description}     
                    </p>
                    <p>Published On : {this.props.report.publishDate.toString()}</p>
                    <p>Cost: {this.props.report.cost}</p>
                </div>
                
            </div>

        );
    }
}

export default Report;