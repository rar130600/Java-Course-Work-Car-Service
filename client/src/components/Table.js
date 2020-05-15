import React, {Component} from "react";
import {loadTableData} from "../actions/LoadTableData"
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
import cellEditFactory from 'react-bootstrap-table2-editor';


const tableCars = ["color", "_foreign", "mark", "num"];

const tableMasters = ["name"];

const tableServices = [ "name", "cost_foreign", "cost_our"];

const tableWorks = ["date_work", "car1", "master1", "service1"];

class Table extends Component {
    constructor(props) {
        super(props);
        this.handleEmptyTable = this.handleEmptyTable.bind(this);
        this.validatorColumns = this.validatorColumns.bind(this);
        this.handleBeforeSaveCell = this.handleBeforeSaveCell.bind(this);
        this.setLoadedData = this.setLoadedData.bind(this);
        this.insertColumnsInTable = this.insertColumnsInTable.bind(this);

        this.state = {
            loadedData: []
        }

        this.columns = [{
            dataField: 'id',
            text: 'ID',
            sort: true,
            headerStyle: {
                outline: 'none',
                width: '10%'
            }
        }];

        this.pagination = paginationFactory({
            hideSizePerPage: true,
            hidePageListOnlyOnePage: true,

        });

        this.cellEdit = cellEditFactory({
            mode: 'click',
            blurToSave: true,
            autoSelectText: true,
            onStartEdit: (row, column, rowIndex, columnIndex) => { console.log('start to edit!!!'); },
            beforeSaveCell: this.handleBeforeSaveCell,
            afterSaveCell: (oldValue, newValue, row, column) => { console.log('After Saving Cell!!'); }
        });
    }

    async componentDidMount() {
        await this.setLoadedData(this.props.whichTable);
        console.log("MOUNT! ");
    }

    async componentDidUpdate(prevProps) {
        if (this.props.whichTable !== prevProps.whichTable) {
            await this.setLoadedData(this.props.whichTable);
            console.log("Update!");
        }
    }

    async setLoadedData(whithTable) {
        try {
            const data = [];
            await loadTableData(whithTable).then(array => {
                array.forEach(object => {
                    data.push(object);
                 })
            });
            this.insertColumnsInTable();
            this.setState({
                loadedData: data
            })
        } catch (error) {
            console.log(error);
        }
    }

    insertColumnsInTable() {
        this.columns = this.columns.slice(0, 1);
        switch (this.props.whichTable) {
            case "cars":
                this.initColumns(tableCars);
                break;
            case "masters":
                this.initColumns(tableMasters);
                break;
            case "services":
                this.initColumns(tableServices);
                break;
            case "works":
                this.initColumns(tableWorks);
                break;
            default:
        }

    }

    initColumns = (columnsArray) => {
        columnsArray.forEach(name => {
            this.columns.push({
                dataField: name,
                text: name,
                sort: true,
                validator: this.validatorColumns,
                headerStyle: {
                    outline: 'none'
                }
            });
        });
    }

    handleEmptyTable() {
        return (<div>Table is Empty :(</div>);
    }

    validatorColumns(newValue, row, column) {
        if (newValue.toString().length >= 26) {
            return {
                valid: false,
                message: "Too many characters!"
            }
        }
        return true;
    }

    handleBeforeSaveCell(oldValue, newValue, row, column) {
        //сделать confirm Bootstrap window (мб сделать новый класс)
        // let log = window.confirm('Do you want to accept this change?');
        // console.log(log);
        // return log;
        console.log('Before Saving Cell!!');
    }

    render() {
        console.log(this.state.loadedData);
        console.log("RENDER!");
        return (
            <div>
                <h1 style={{textAlign: 'left'}}>{this.props.whichTable}</h1>
                <BootstrapTable
                    bootstrap4
                    keyField='id'
                    data={ this.state.loadedData }
                    columns={ this.columns }
                    noDataIndication={this.handleEmptyTable}
                    bordered={false}
                    pagination={this.state.loadedData.length <= 10 ? "" : this.pagination}
                    cellEdit={this.cellEdit}
                    hover
                />
            </div>
        );
    }
}

export default Table;