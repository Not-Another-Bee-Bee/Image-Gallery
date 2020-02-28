import React, { Component } from 'react';
import ShareForm from './ShareForm.jsx';
import styled from 'styled-components';
// from submodule AK-service
// import ModalCA from '../../../AK-service/client/comp/ModalCA.jsx';
// import ModalTT from '../../../AK-service/client/comp/ModalTT.jsx';
// import { GreyOverlay } from '../../../AK-service/client/comp/style.jsx';

const Exit = styled.button`
color: white;
background-color: rgba(0,0,0,0);
text-align: center;
border: none;
font-size: 24px;
cursor: pointer;
position: absolute;
top: 7%;
left: 97%;
display: inline-block;
&:hover {
  color: rgb(98,174,247);
  background-color: (0,0,0,0.2)
}
`;

const SaveHome = styled.button`
color: white;
background-color: rgba(0,0,0,0);
text-align: center;
border: rgba(0,0,0,0);
font-size: 16px;
cursor: pointer;
position: absolute;
top: 11%;
left: 88%;
display: inline-block;
outline:0;
`;

const ShareHouse = styled.button`
color: white;
background-color: rgba(0,0,0,0);
text-align: center;
border: rgba(0,0,0,0);
font-size: 16px;
cursor: pointer;
position: absolute;
top: 11%;
left: 80%;
display: inline-block;
outline:0;
`;

const ScheduleTour = styled.button`
color: white;
background-color: rgba(0,106,255,1);
border: 1px solid rgba(0,106,255,1);
padding: 6px 6px;
text-align: center;
display: inline-block;
font-size: 14px;
cursor: pointer;
position: absolute;
top: 6%;
left: 72%;
outline:0;
transition: color 0.3s;
transition: background-color 0.3s;
&:hover {
  color: rgba(0,106,255,1);
  background-color: rgba(0,0,0,0.2);
}
`;

const PhotosTab = styled.button`
color: rgba(0,106,255,1);
background-color: rgba(0,0,0,0);
text-decoration: underline;
text-align: center;
border: rgba(0,0,0,0);
font-size: 16px;
font-weight: 800;
cursor: pointer;
position: absolute;
top: 6%;
left: 0%;
display: inline-block;
outline:0;
`;

const HeaderContainer = styled.div`
display: flex;
flex-direction: row;
position: absolute;
width: 100%;
height: 15%;
`;

//Needs to be a stateful component
class ViewerHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: false,
      activeForm: '',
      modalType: 0
    }
    this.togglePopout = this.togglePopout.bind(this);
    this.closePopout = this.closePopout.bind(this);
    
    // function about contact agent and take a tour button modal
    this.showModalOnclick = this.showModalOnclick.bind(this);
    this.hideModalOnclick = this.hideModalOnclick.bind(this);
  }

  togglePopout() {
    this.setState({ popout: true });
  }

  closePopout() {
    this.setState({ popout: false });
    this.setState({activeForm: ''});
  }

  formClick(formName) {
    this.togglePopout();
    this.setState({ activeForm: formName });
  }

  showModalOnclick(e) {
    // decide which modal to show 
    const whichModal = e.target.innerHTML.includes('Tour') ? 2 : 1;
    
    //  show modal
    this.setState ({ modalType: whichModal });

    // make other parts of the app clickable
    document.addEventListener('click', this.hideModalOnclick, {once: true});
  }

  hideModalOnclick(e) {
    if (e.target.classList[3] === "closeIcon") { // close button clicked
      this.setState ({ modalType: 0 });
    } else if (document.getElementById('summaryModal').contains(e.target)) { // modal other than close button clicked
      // do not hide, but make app part clickable again
      const target = document.getElementById('app');
      target.addEventListener('click', this.hideModalOnclick, {once: true});
    } else { // outside of popup clicked
      this.setState ({ modalType: 0 });
    }
  }


  render() {
    let modal;
    switch(this.state.modalType) {
      case 1: 
        modal = (<span>
                  <ModalCA hideModalOnclick={this.hideModalOnclick}/>
                  <GreyOverlay id="greyOverlay" style={{width: innerWidth, height: innerHeight}}/>
                </span>);
        break;
      case 2:
        modal = (<span>
                  <ModalTT hideModalOnclick={this.hideModalOnclick}/>
                  <GreyOverlay id="greyOverlay" style={{width: innerWidth, height: innerHeight}}/>
                </span>);
        break;
      default:
        modal = '';
    }

    return (
    <HeaderContainer>
      <PhotosTab onClick={this.props.restart}>Photos</PhotosTab>
      <ScheduleTour onClick={this.showModalOnclick} id="schedule">Schedule Tour</ScheduleTour>
      <SaveHome onClick={this.props.save}>{this.props.saved ? '♥ Home Saved': '♡ Save Home'}</SaveHome>
      <ShareHouse onClick={this.showModalOnclick} id="schedule">Contact Agent</ShareHouse>
      <Exit onClick={this.props.close}>X</Exit>
    {this.state.activeForm === "schedule" && <ShareForm close={this.closePopout} />}
    {modal}
    </HeaderContainer>
    
    
    )
  }
}

export default ViewerHeader;
