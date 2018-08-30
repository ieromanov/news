import React, { Component } from 'react';

import { Icon, Title, NavigationBar } from '@shoutem/ui'

export default class HeaderBack extends Component {
    render() {
        const { goBack } = this.props.navigation;
        return (
            <NavigationBar
                styleName="inline"
                hasHistory
                centerComponent={<Title>{this.props.title}</Title>}
                navigateBack={()=>goBack(null)}
            />
        );
    }
}