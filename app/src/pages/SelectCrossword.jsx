import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Spin, Table} from 'antd';
import * as H from '../helpers';
import {Crossword} from '../components';
import dateformat from 'dateformat';
import './SelectCrossword.less';

const SelectCrossword = ({Store, onSelect, _filter, displaynameLookup}) => {
    // get crosswords
    useEffect(() => {
        Store.refreshCrosswords();
    }, []);

    if (!Store.crosswords) {
        return <Spin />;
    } else {
        let ourCrosswords = Store.crosswords.filter(_filter);
        const renderItem = (text, record) => {
            let createdDate = new Date(record.createddate);
            let displayDate = dateformat(createdDate, 'dd mmm yy');
            let emptyVals = H.getEmptyValues(record.binarygrid.length);

            return (
                <div className="item">
                    <div className="left">
                        <div className="title">{record.title}</div>
                        <div className="owner">{displaynameLookup[record.owner]}</div>
                        <div className="date">{displayDate}</div>
                    </div>
                    <div className="right">
                        <Crossword
                            binarygrid={record.binarygrid}
                            numbergrid={record.numbergrid}
                            values={emptyVals}
                            size="micro"
                        />
                    </div>
                </div>
            );
        };

        const cols = [
            {
                dataIndex: 'id',
                render: renderItem,
                onCell: record => ({
                    onClick: () => {
                        onSelect(record);
                    }
                })
            }
        ];

        return <Table className="select-crossword-table" rowKey="id" dataSource={ourCrosswords} columns={cols} />;
    }
};

SelectCrossword.propTypes = {
    Store: PropTypes.object.isRequired,
    _filter: PropTypes.func.isRequired,
    displaynameLookup: PropTypes.object,
    onSelect: PropTypes.func.isRequired
};
SelectCrossword.defaultProps = {
    displaynameLookup: {}
};

export default SelectCrossword;
