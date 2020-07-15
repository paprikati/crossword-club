import React, {Component} from 'react';
import LandingPage from '../pages/LandingPage';
import Edit from '../pages/Edit';
import View from '../pages/View';
import SelectCrossword from '../pages/SelectCrossword';
import {Button} from 'antd';
import './Page.less';
import AddGrid from '../pages/AddGrid';

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'landing',
            selectedCrossword: false
        };
        this.updateStore = this.updateStore.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
    }

    updateStore() {}

    onChangePage(page, selectedCrossword) {
        this.setState({page, selectedCrossword});
    }

    render() {
        const {user, displaynameLookup, _fetch, Store} = this.props;

        let pageContent;

        switch (this.state.page) {
            case 'landing':
                pageContent = <LandingPage onChangePage={this.onChangePage} user={user} />;
                break;

            case 'viewList':
                pageContent = (
                    <SelectCrossword
                        displaynameLookup={displaynameLookup}
                        Store={Store}
                        _filter={x => x.ispublished}
                        onSelect={crossword => this.onChangePage('view', crossword)}
                    />
                );
                break;
            case 'editList':
                pageContent = (
                    <SelectCrossword
                        displaynameLookup={displaynameLookup}
                        Store={Store}
                        _filter={x => !x.ispublished && x.owner === user.id}
                        onSelect={crossword => this.onChangePage('edit', crossword)}
                    />
                );
                break;
            case 'create':
                pageContent = <Edit Store={Store} onChangePage={this.onChangePage} mode="create" _fetch={_fetch} />;
                break;
            case 'edit':
                const crossword = this.state.selectedCrossword;
                pageContent = (
                    <Edit Store={Store} onChangePage={this.onChangePage} mode="update" crossword={crossword} _fetch={_fetch} />
                );
                break;
            case 'view':
                pageContent = <View crossword={this.state.selectedCrossword} />;
                break;
            case 'addGrid':
                pageContent = <AddGrid _fetch={_fetch} onChangePage={this.onChangePage} />;
                break;
            default:
                pageContent = <div>ERROR in switch statement Frame.jsx</div>;
        }

        return (
            <div>
                <div className="crossword-page-header">
                    <Button size="large" icon="home" onClick={() => this.onChangePage('landing')} />
                    <div className="text">Crossword Club</div>
                    <Button size="large" icon="logout" onClick={this.props.logout} />
                </div>
                {pageContent}
            </div>
        );
    }
}

export default Page;
