import React, { Component, Fragment } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap/dist/react-bootstrap.min.js";
import "../assets/CollegeDunia.css";
import CollegePic from '../assets/college_02.jpg';
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";

export class CollegeDunia extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             CollegesList:[]
        }
    }
    
    componentDidMount()
    {
        var CollegesList = require('../colleges.json')
        this.setState({
            CollegesList:CollegesList.colleges
        })
    }

    fetchMoreData = () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        setTimeout(() => {
          this.setState({
            CollegesList: this.state.CollegesList.concat(Array.from({ length: 10 }))
          });
        }, 1500);
      };

    render() {

        
        let CollegesList = []
        this.state.CollegesList.forEach((data,index)=>{
            CollegesList.push(<EachCollege data={data} id={index}/>)
        })
        return (
            <Fragment>
                <div className='TopHeaderDiv'>
                    <div className='TopHeaderOne'>
                        <span>TOP UNIVERSITIES</span>
                        <span>TOP COURSES</span>
                        <span>COLLEGES</span>
                        <span>EXAMS</span>
                        <span>NEWS</span>
                        <span>SCHOLARSHIP</span>
                        <span>REVIEWS</span>

                        <div className='BtnOptions'>
                            <span><i className='fa fa-user'></i> LOGIN</span>
                            <button><i className="fa fa-mobile-phone"></i>DOWNLOAD APP</button>
                        </div>
                    </div>

                    <h3>Colleges in North India</h3>
                </div>

                <div className='CollegeListContent'>
                    
                    <InfiniteScroll
                    className='INFITESCROLL'
                    dataLength={this.state.CollegesList.length}
                    next={this.fetchMoreData}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    >
                        {CollegesList}
                    </InfiniteScroll>
        
                </div>
            </Fragment>
        )
    }
}

export default CollegeDunia



class EachCollege extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             data:this.props.data
        }
    }
    
    render() {
        var data = this.state.data
        return (
            <Fragment>
                <div className='EachCollegeDiv'>
                        <div className='PromoteRibbon'><span>PROMOTED</span></div>
                        <img src={CollegePic}></img>
                        <div className='FilterBriefs'>
                            <button>{data.tags[0]} </button>
                            <button>{data.tags[1]}</button>
                            <span>#{data.ranking}</span>
                        </div>

                        <div className='CollegeDetails'>
                            <div className='CollegeInfo'>
                                <h3>{data.college_name}</h3>
                                <span className='DarkText'>{data.nearest_place[0]}<p className='LightText'>| {data.nearest_place[1]}</p></span>
                                <p className='BlueText'>93.75% Match : <span className='DarkText'>{data.famous_nearest_places.split(",")[0]}</span> <span className='DarkText'> {data.famous_nearest_places.split(",")[1]} </span></p> 

                                <button className='BadgeBtn'><span className='BlueText'> {data.offertext} </span></button>
                            </div>



                            <div className='PricingDetails'>
                                <span className='LightText Crossed'> ₹ {data.original_fees} <span className='tag'>{data.discount}</span></span>
                                <h3>₹ {data.discounted_fees}</h3>
                                <small> {data.fees_cycle} </small>
                                <p>{data.amenties[0]} . {data.amenties[1]}</p>
                            </div>
                        </div>
                    </div>
            </Fragment>
        )
    }
}
