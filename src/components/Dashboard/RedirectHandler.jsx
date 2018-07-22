import React from 'react'
// react-router-dom
import { Redirect } from 'react-router-dom';
//components
import If from '../Operator/If'

class RedirectHandler extends React.Component {
  render(){
    return(
      <div>
    <If test={window.location.pathname == '/dashboard'}>
      <Redirect to="/dashboard/home"/>
    </If>

    <If test={this.props.value == 0}>
      <If test={window.location.pathname !== '/dashboard/home'}>
      	<Redirect to="/dashboard/home"/>
      </If>
    </If>

    <If test={this.props.value == 1}>
      <If test={window.location.pathname !== '/dashboard/conteudos'}>
        <Redirect to="/dashboard/conteudos"/>
      </If>
    </If>

    <If test={this.props.value == 2}>
      <If test={window.location.pathname !== '/dashboard/ranking'}>
        <Redirect to="/dashboard/ranking"/>
      </If>
    </If>




</div>

    )
  }
}
export default RedirectHandler
