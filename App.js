/*
 * Main React App file
 */

// Importing all component and function files

import React from 'react';
import './App.css';
import HeaderTop from './components/layout/HeaderTop';
import Header from './components/layout/Header';
import Buttons from './components/Buttons';
import Stranger from './StrangerPP.mp4';
import Bottom from './components/layout/Bottom';
import BottomTop from './components/layout/BottomTop';
import Alert1 from './components/Alert1';
import Alert2 from './components/Alert2';
import Alert3 from './components/Alert3';
import Alert4 from './components/Alert4';
import Alert5 from './components/Alert5';
import axios from 'axios';
import { Spring, Transition, animated } from 'react-spring/renderprops';
import Background1 from './components/layout/Background1';
import Background2 from './components/layout/Background2';
import Background3 from './components/layout/Background3';
import Background4 from './components/layout/Background4';
import Background5 from './components/layout/Background5';
import ThumbsUp1 from './components/ThumbsUp1';
import ThumbsUp1_g from './components/ThumbsUp1_g';
import ThumbsUp1_r from './components/ThumbsUp1_r';
import Tic from './components/Tic';
import Mic from './components/Mic';
import Mic_g from './components/Mic_g';
import ThumbsUp3 from './components/ThumbsUp3';
import ThumbsUp3_g from './components/ThumbsUp3_g';
import ThumbsUp3_r from './components/ThumbsUp3_r';
import ReloadButton from './components/ReloadButton';
import Rate from './components/Rate';
import Rate_g from './components/Rate_g'
import Play from './components/Play';
import Pause from './components/Pause';
import FastForward from './components/FastForward';

const VIDEO = {
  src: Stranger,
  type: 'video/mp4'
};

/*
 * Main App class to be rendered
 */
class App extends React.Component {

  // Defining super constructor state object

  constructor(props){
    super(props)
    this.state = {
      src: VIDEO.src,
      type: VIDEO.type,
      camera: false,
      screen_one: false,
      screen_two: false,
      screen_three: false,
      screen_four: false,
      screen_five: false,
      counter: false,
      count: 0,
      coke_num: 0,
      countdown: 5,
      background_one: false,
      background_two: false,
      background_three: false,
      background_four: false,
      background_five: false,
      shiftkey: 0,
      finish: false,
      thumbsup_1: false,
      thumbsup_1_g: false,
      thumbsup_1_r: false,
      mic: false,
      mic_g: false,
      thumbsup_3: false,
      thumbsup_3_g: false,
      thumbsup_3_r: false,
      rate: false,
      rate_g: false,
      run_one: true,
      play_state: false,
      pause_state: false,
      ff_state: false 
    }
  }

  intervalID = 0;

  /*
   * Purpose: Plays the rendered video
   * Inputs: None
   * Returns: Void
   */
  playVideo = () => {
    this.refs.vidRef.play();

    if(this.state.finish === false) {
      this.setState({
      counter: true,
      background_one: false,
      background_two: true,
      background_five: false
      }, this.screenOnetimer);

    } else {
      this.setState({
        background_one: false,
        background_two: true,
        background_five: false
      });
    }

  }
  
  /*
   * Purpose: Pauses the video
   * Inputs: None
   * Returns: Void
   */
  pauseVideo = () => {
    this.refs.vidRef.pause();

    this.setState({
      background_one: true,
      background_two: false,
      background_five: false
    })

  }

  /*
   * Purpose: Async fast forward request function, acts on 
   *          returned gesture response
   * Inputs: None
   * Returns: Void
   */
  ffVideo = async () => {

    const delay = ms => new Promise(res => setTimeout(res, ms));

    await axios.get('http://10.1.195.77/ffVideo')
                .then(res => {
                  console.log(res.data)
                  this.ff_response = res.data
                  return this.ff_response
                })
    
    console.log(this.ff_response);

    if (this.ff_response === 1 || this.ff_response === 0) {
      this.refs.vidRef.playbackRate = 1;
      console.log('Video Starting...')
      this.setState ({
        play_state: true
      });
      this.playVideo();
      this.playShift();
      if (this.state.finish === true) {
        await delay(1500);
        this.pauseWait();
      }
    } else if (this.ff_response === 4) {
      this.ffVideo();
    } else if (this.ff_response === 2) {
      this.refs.vidRef.playbackRate = 1;
      console.log('Video Pausing...')
      this.setState ({
        pause_state: true
      })
      this.pauseVideo();
      this.pauseShift();
      await delay(1500);
      this.setState ({
        finish: true
      }, this.playWait);
  } else {
    this.ffVideo();
  }

}
  /*
   * Purpose: Reloads the reactJS app
   * Inputs: None
   * Returns: Void
   */
  reloadPage = () => {
    this.setState({
      finish: false
    })
    window.location.reload();
  }
  
  /*
   * Purpose: Enables video playback volume
   * Inputs: None
   * Returns: Void
   */
  enableMute = () => {    
    document.getElementById("STRANGER").muted = true;

  }

  /*
   * Purpose: Mutes video playback volume
   * Inputs: None
   * Returns: Void
   */
  disableMute = () => {
    document.getElementById("STRANGER").muted = false;

  }

  /*
   * Purpose: Async screen one request function, looking 
   *          for thumbs up from user, if not declines     
   * Inputs: None
   * Returns: Void
   */
  screenOne = async () => {
    
    await axios.get('http://10.1.195.77/screenOne')
                  .then(res => {
                    console.log(res.data)
                    this.response = res.data
                    return this.response
                  })
                          
    console.log(this.response);
  
    if (this.response === 3) {
      console.log('Thumbs Up Received');
      this.response = 0;
      this.setState ({
        screen_one: false,
        thumbsup_1: false,
        thumbsup_1_g: true,
        background_two: false,
        background_three: true
        }, this.shiftP1);
    } else {
      console.log('Thumbs Down Received');
      this.response = 0;
      this.setState ({
        screen_one: false,
        thumbsup_1: false,
        thumbsup_1_r: true,
        background_two: false,
        background_four: true
      }, this.shiftN1);
    }
    
  }

  /*
   * Purpose: Async screen one accept shift function, 
   *          alters UI for thumbs up response         
   * Inputs: None
   * Returns: Void
   */
  shiftP1 = async () => {
    if(this.state.shiftkey === 2) {
      this.setState ({
        thumbsup_1_g: false,
        background_two: true,
        background_three: false
      })
    }
    if(this.state.shiftkey === 4) {
      this.setState ({
      screen_two: true,
      mic: true,
      shiftkey: 0
      }, this.screenTwo)
    }
    else {
      this.setState ({
        shiftkey: this.state.shiftkey += 1
      })
      setTimeout(this.shiftP1, 500)
    }
  }

  /*
   * Purpose: Async screen one decline shift function, 
   *          alters UI for no response       
   * Inputs: None
   * Returns: Void
   */
  shiftN1 = async () => {
    if(this.state.shiftkey === 2) {
      this.setState ({
        thumbsup_1_r: false,
        background_two: true,
        background_four: false
      })
    }
    if(this.state.shiftkey === 4) {
      this.setState ({
        shiftkey: 0
      }, this.pauseWait)
    }
    else {
      this.setState ({
        shiftkey: this.state.shiftkey += 1
      })
      setTimeout(this.shiftN1, 500)
    }
  }

  /*
   * Purpose: Async screen two request function, looking 
   *          for number from user, if not declines         
   * Inputs: None
   * Returns: Void
   */
  screenTwo = async () => {

    this.enableMute();
    
    await axios.get('http://10.1.195.77/screenTwo')
                .then(res => {
                  console.log(res.data)
                  this.response2 = res.data
                  return this.response2
                })

    console.log(this.response2);

    if (this.response2 > 0) {
      console.log('They want ' + this.response2 + ' cokes!');
      this.setState ({
        coke_num: this.response2,
        screen_two: false,
        background_two: false,
        background_three: true,
        mic: false,
        mic_g: true
      }, this.shiftP2);
    } else {
      console.log("They don't want any cokes");
      this.enableMute();
      this.setState ({
        screen_two: false,
        mic: false
      })
    }

  }

  /*
   * Purpose: Async screen two accept shift function, 
   *          alters UI for number response         
   * Inputs: None
   * Returns: Void
   */ 
  shiftP2 = async () => {
    if(this.state.shiftkey === 2) {
      this.setState ({
        background_two: true,
        background_three: false,
        mic_g: false
      })
    }
    if(this.state.shiftkey === 4) {
      this.setState ({
      screen_three: true,
      thumbsup_3: true,
      shiftkey: 0
      }, this.screenThree)
    }
    else {
      this.setState ({
        shiftkey: this.state.shiftkey += 1
      })
      setTimeout(this.shiftP2, 500)
    }
  }

  /*
   * Purpose: Async screen three request function, looking 
   *          for thumbs up from user, if not declines     
   * Inputs: None
   * Returns: Void
   */
  screenThree = async () => {

    this.disableMute();

    await axios.get('http://10.1.195.77/screenThree')
                .then(res => {
                  console.log(res.data)
                  this.response3 = res.data
                  return this.response3
                })
    
    console.log(this.response3);

    if (this.response3 === 3) {
      console.log('Thumbs Up Received');
      this.setState ({
        screen_three: false,
        background_two: false,
        background_three: true,
        thumbsup_3: false,
        thumbsup_3_g: true
      }, this.shiftP3);
    } else {
      console.log('Thumbs Down Received');
      this.setState ({
        screen_three: false,
        thumbsup_3: false,
        thumbsup_3_r: true,
        background_two: false,
        background_four: true
      }, this.shiftN3);
    }

  }

  /*
   * Purpose: Async screen three accept shift function, 
   *          alters UI for thumbs up response         
   * Inputs: None
   * Returns: Void
   */
  shiftP3 = async () => {
    if(this.state.shiftkey === 2) {
      this.setState ({
        background_two: true,
        background_three: false,
        thumbsup_3_g: false
      })
    }
    if(this.state.shiftkey === 4) {
      this.setState ({
      screen_four: true,
      counter: true,
      shiftkey: 0
      }, this.screenFourtimer)
    }
    else {
      this.setState ({
        shiftkey: this.state.shiftkey += 1
      })
      setTimeout(this.shiftP3, 500)
    }
  }

  /*
   * Purpose: Async screen three decline shift function, 
   *          alters UI for no response       
   * Inputs: None
   * Returns: Void
   */
  shiftN3 = async () => {
    if(this.state.shiftkey === 2) {
      this.setState ({
        thumbsup_3_r: false,
        background_two: true,
        background_four: false
      })
    }
    if(this.state.shiftkey === 4) {
      this.setState ({
        shiftkey: 0,
        counter: true,
        count: 7
      }, this.screenOnetimer)
    }
    else {
      this.setState ({
        shiftkey: this.state.shiftkey += 1
      })
      setTimeout(this.shiftN3, 500)
    }
  }

  /*
   * Purpose: Async halt function, wait 4 seconds before 
   *          starting rating alert sequence      
   * Inputs: None
   * Returns: Void
   */
  screenFiveHalt = async() => {

    const delay = ms => new Promise(res => setTimeout(res, ms));
    
    await delay(4000);

    this.setState ({
      screen_five: true,
      rate: true
    }, this.screenFive);
  
  }

  /*
   * Purpose: Async screen five request function, looking 
   *          for number from user, if not declines     
   * Inputs: None
   * Returns: Void
   */
  screenFive = async() => {

    this.enableMute();

    await axios.get('http://10.1.195.77/screenFive')
                .then(res => {
                  console.log(res.data)
                  this.response5 = res.data
                  return this.response5
                })
    
    console.log(this.response5);

    if (this.response5 > 0) {
      console.log('They rate ' + this.response5 + ' stars!');
      this.setState ({
        screen_five: false,
        background_two: false,
        background_three: true,
        rate: false,
        rate_g: true
      }, this.shiftP5);
    } else {
      console.log("They don't want to rate");
      this.enableMute();
      this.setState ({
        screen_five: false,
        rate: false
      })
    }

  }

  /*
   * Purpose: Async screen five accept shift function, 
   *          alters UI for number response         
   * Inputs: None
   * Returns: Void
   */
  shiftP5 = async () => {

    this.disableMute();

    if(this.state.shiftkey === 2) {
      this.setState ({
        background_two: true,
        background_three: false,
        rate_g: false
      })
    }
    if(this.state.shiftkey === 4) {
      this.setState ({
      shiftkey: 0
      }, this.pauseWait)
    }
    else {
      this.setState ({
        shiftkey: this.state.shiftkey += 1
      })
      setTimeout(this.shiftP5, 500)
    }
  }

  /*
   * Purpose: Async play request function, acts on 
   *          returned gesture response         
   * Inputs: None
   * Returns: Void
   */
  playWait = async () => {

    const delay = ms => new Promise(res => setTimeout(res, ms));

    await axios.get('http://10.1.195.77/playWait')
                .then(res => {
                  console.log(res.data)
                  this.play_response = res.data
                  return this.play_response
                })
    
    console.log(this.play_response);

    if (this.play_response === 1) {
      console.log('Video Starting...')
      this.setState ({
        play_state: true
      });
      this.playVideo();
      this.playShift();
      if (this.state.finish === true) {
        await delay(1500);
        this.pauseWait();
      }
    } else if (this.play_response === 0) {
      this.playWait();
    } 

  }

  /*
   * Purpose: Async play intialise shift function, 
   *          alters UI for play response         
   * Inputs: None
   * Returns: Void
   */
  playShift = async () => {
    if(this.state.shiftkey === 2) {
      this.setState ({
        play_state: false,
        shiftkey: 0
      })
    }
    else {
      this.setState ({
        shiftkey: this.state.shiftkey += 1
      })
      setTimeout(this.playShift, 500)
    }
  }

  /*
   * Purpose: Async pause request function, acts on 
   *          returned gesture response         
   * Inputs: None
   * Returns: Void
   */
  pauseWait = async () => {

    const delay = ms => new Promise(res => setTimeout(res, ms));

    await axios.get('http://10.1.195.77/pauseWait')
                .then(res => {
                  console.log(res.data)
                  this.pause_response = res.data
                  return this.pause_response
                })

    console.log(this.pause_response);

    if (this.pause_response === 2) {
      console.log('Video Pausing...')
      this.setState ({
        pause_state: true
      })
      this.pauseVideo();
      this.pauseShift();
      await delay(1500);
      this.setState ({
        finish: true
      }, this.playWait);
    } else if (this.pause_response === 4) {
      console.log('Video Fast Forwarding...')
      this.setState ({
        ff_state: true,
        background_one: false,
        background_two: false,
        background_five: true,
        finish: true
      })
      this.refs.vidRef.playbackRate = 1.75;
      this.ffVideo();
      this.ffShift();

    } else if (this.pause_response === 0) {
      this.pauseWait();
    }

  }

  /*
   * Purpose: Async pause intialise shift function, 
   *          alters UI for pause response         
   * Inputs: None
   * Returns: Void
   */
  pauseShift = async () => {
    if(this.state.shiftkey === 2) {
      this.setState ({
        pause_state: false,
        shiftkey: 0
      })
    }
    else {
      this.setState ({
        shiftkey: this.state.shiftkey += 1
      })
      setTimeout(this.pauseShift, 500)
    }
  }

  /*
   * Purpose: Async fast forward intialise shift function, 
   *          alters UI for fast forward response         
   * Inputs: None
   * Returns: Void
   */
  ffShift = async () => {
    if(this.state.shiftkey === 2) {
      this.setState ({
        ff_state: false,
        shiftkey: 0
      })
    }
    else {
      this.setState ({
        shiftkey: this.state.shiftkey += 1
      })
      setTimeout(this.ffShift, 500)
    }
  }

  /*
   * Purpose: Master app render function         
   * Inputs: None
   * Returns: Rendered react app
   */
  render() {
    return (
      <div className="App">
        <HeaderTop />
        <Header />
        <Transition
          native
          items={this.state.background_one}
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
        >
          {show => show && (props => (
            <animated.div style={props}>
              <Background1 />
            </animated.div>
          ))}
        </Transition>
        <Transition
          native
          items={this.state.background_two}
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
        >
          {show => show && (props => (
            <animated.div style={props}>
              <Background2 />
            </animated.div>
          ))}
        </Transition>  
        <Transition
          native
          items={this.state.background_three}
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
        >
          {show => show && (props => (
            <animated.div style={props}>
              <Background3 />
            </animated.div>
          ))}
        </Transition>
        <Transition
          native
          items={this.state.background_four}
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
          config={{ duration: 1000 }}
        >
          {show => show && (props => (
            <animated.div style={props}>
              <Background4 />
            </animated.div>
          ))}
        </Transition>
        <Transition
          native
          items={this.state.background_five}
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
        >
          {show => show && (props => (
            <animated.div style={props}>
              <Background5 />
            </animated.div>
          ))}
        </Transition>  
        <div style={Style1}>
          <div style={opac}>
            <Transition 
              native
              items={this.state.screen_one}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
            >
              {show => show && (props => (
                <animated.div style={props}>
                  <Alert1 countdown={this.state.countdown} />
                </animated.div>
              ))}
            </Transition>
            <Transition
              native
              items={this.state.screen_two}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
            >
              {show => show && (props => (
                <animated.div style={props}>
                  <Alert2 />
                </animated.div>
              ))}
            </Transition>
            <Transition
              native
              items={this.state.screen_three}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
            >
              {show => show && (props => (
                <animated.div style={props}>
                  <Alert3 coke_num={this.state.coke_num} /> 
                </animated.div>
              ))}
            </Transition>
            <Transition
              native
              items={this.state.screen_four}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
            >
              {show => show && (props => (
                <animated.div style={props}>
                <Alert4 /> 
                </animated.div>
              ))}
            </Transition>
            <Transition
              native
              items={this.state.screen_five}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
            >
              {show => show && (props => (
                <animated.div style={props}>
                <Alert5 /> 
                </animated.div>
              ))}
            </Transition>
            <div style={opac2}>
                 <Transition
              native
              items={this.state.thumbsup_1}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
            >
              {show => show && (props => (
                <animated.div style={props}>
                  <ThumbsUp1 />
                </animated.div>
              ))}
            </Transition>
            <Transition
              native
              items={this.state.thumbsup_1_g}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
            >
              {show => show && (props => (
                <animated.div style={props}>
                  <ThumbsUp1_g />
                </animated.div>
              ))}
            </Transition>
            <Transition
              native
              items={this.state.thumbsup_1_r}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
            >
              {show => show && (props => (
                <animated.div style={props}>
                  <ThumbsUp1_r />
                </animated.div>
              ))}
            </Transition>
            <Transition
              native
              items={this.state.mic}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
            >
              {show => show && (props => (
                <animated.div style={props}>
                  <Mic />
                </animated.div>
              ))}
            </Transition>
            <Transition
              native
              items={this.state.mic_g}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
            >
              {show => show && (props => (
                <animated.div style={props}>
                  <Mic_g />
                </animated.div>
              ))}
            </Transition>
            <Transition
              native
              items={this.state.thumbsup_3}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
            >
              {show => show && (props => (
                <animated.div style={props}>
                  <ThumbsUp3 />
                </animated.div>
              ))}
            </Transition>
            <Transition
              native
              items={this.state.thumbsup_3_g}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
            >
              {show => show && (props => (
                <animated.div style={props}>
                  <ThumbsUp3_g />
                </animated.div>
              ))}
            </Transition>
            <Transition
              native
              items={this.state.thumbsup_3_r}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
            >
              {show => show && (props => (
                <animated.div style={props}>
                  <ThumbsUp3_r />
                </animated.div>
              ))}
            </Transition>
            <Transition
              native
              items={this.state.rate}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
            >
              {show => show && (props => (
                <animated.div style={props}>
                  <Rate />
                </animated.div>
              ))}
            </Transition>
            <Transition
              native
              items={this.state.rate_g}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
            >
              {show => show && (props => (
                <animated.div style={props}>
                  <Rate_g />
                </animated.div>
              ))}
            </Transition>
            <Transition
              native
              items={this.state.screen_four}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
            >
              {show => show && (props => (
                <animated.div style={props}>
                  <Tic />
                </animated.div>
              ))}
            </Transition>
            <Transition
              native
              items={this.state.play_state}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
            >
              {show => show && (props => (
                <animated.div style={props}>
                  <Play />
                </animated.div>
              ))}
            </Transition>
            <Transition
              native
              items={this.state.pause_state}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
            >
              {show => show && (props => (
                <animated.div style={props}>
                  <Pause />
                </animated.div>
              ))}
            </Transition>
            <Transition
              native
              items={this.state.ff_state}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
            >
              {show => show && (props => (
                <animated.div style={props}>
                  <FastForward />
                </animated.div>
              ))}
            </Transition>
            </div>
          </div>
          <video
            id="STRANGER" 
            // min-width="960" height="549"
            min-width="1310" height="749"
            ref="vidRef"
            className="vidStyle"
            src={this.state.src} type={this.state.type}>
          </video>
          <ReloadButton
              reloadPage={this.reloadPage.bind(this)}
          /> 
          <BottomTop />
          <Bottom />
        </div>
      </div>
    );
  }

  /*
   * Purpose: Function ran after intial page render. 
   *          Responsible for camera and background page
   *          startup      
   * Inputs: None
   * Returns: Void
   */
  componentDidMount() {
    this.cameraStartup();
    this.backgroundStartup();
  }

  /*
   * Purpose: Async camera startup function, sends request
   *          through to begin camera analysis        
   * Inputs: None
   * Returns: Void
   */
  cameraStartup = async () => {

    if(this.state.camera === false) {

      await axios.get('http://10.1.195.77/cameraStartup')
                  .then(res => console.log(res.data))
      
      this.setState({
        camera: true
      });

      this.playWait();
    
    }
  
  }

  /*
   * Purpose: Background startup function, tells background
   *          to render in after a set time     
   * Inputs: None
   * Returns: Void
   */
  backgroundStartup = () => {
    this.intervalID = this.myInterval = setInterval(() => {
      
    this.setState({
      count: this.state.count + 1
    });

    if(this.state.count === 5) {
      
      clearInterval(this.intervalID);

      this.setState({
        count: 0
      });

      this.setState({
        background_one: true
      })
    
    }

    }, 1000);

  }

  /*
   * Purpose: Screen one timer function, sets the length
   *          of time before the first alert appears 
   * Inputs: None
   * Returns: Void
   */
  screenOnetimer() {

    if (this.state.counter) {
      this.intervalID = this.myInterval = setInterval(() => {

        this.setState({
          count: this.state.count + 1
        })

        console.log(this.state.count)

        if(this.state.count === 8) {
          
          this.setState({
            screen_one: true
          });

          this.setState({
            thumbsup_1: true
          })

          this.setState({
            counter: false
          });
    
          this.setState ({
            count: 0
          });

          clearInterval(this.intervalID); 

          this.screenOne();

          this.countdownOne();
        
        }
      }, 1000)
    }

  }

  /*
   * Purpose: Screen four timer function, sets the length
   *          of time before the fourth alert disappears 
   * Inputs: None
   * Returns: Void
   */
  screenFourtimer() {

    if (this.state.counter) {
      this.intervalID = this.myInterval = setInterval(() => {

        this.setState({
          count: this.state.count + 1
        })

        console.log(this.state.count)

        if(this.state.count === 4) {
          
          this.setState({
            screen_four: false
          });

          this.setState({
            counter: false
          });
    
          this.setState ({
            count: 0
          });

          clearInterval(this.intervalID);

          if(this.response2  === 3) {
            this.screenFiveHalt();
          } else{
            this.pauseWait();
          }
        
        }
      }, 1000)
    }

  }

  /*
   * Purpose: Screen one countdown function, sets the countdown
   *          timer on the first alert
   *           
   * Inputs: None
   * Returns: Void
   */
  countdownOne = () => {
    this.intervalID = this.myInterval = setInterval(() => {
      
      this.setState({
        countdown: this.state.countdown - 1
      });

    if(this.state.countdown == 0 || this.response == 3) {
      
      clearInterval(this.intervalID);

      this.setState({
        countdown: 5
      });
    
    }

    }, 1000);
  }

}

// Inline Styles

const Style1 = {
  textAlign: 'center',
  //marginTop: '110px'
  marginTop: '80px',
  //position: 'relative'
}

const Style2 = {
  //marginTop: '72px'
  marginTop: '50px'
}

const opac = {
  position: 'relative',
  zIndex: '1000'
}

const opac2 = {
  position: 'relative',
  zIndex: '1001'
}


export default App;
