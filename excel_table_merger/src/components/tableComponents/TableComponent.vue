<template>
    <div id="table-outer-div">
      <table class="table no-select">

        <tbody>
            <th @click="toggleHighlight(header.id)" class="table-header" v-for="header in getHeaders" v-bind:key="header.id">{{header.value}}</th>
                <tr v-for="(row, index) in csvData.slice(1, 10)" :key="index">
                    <td  :class="{ 'table-row': true,  highlighted: isHighlighted(cellIndex) }" v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
                </tr>
            <tbody v-if="showFullTable">
                <tr v-for="(row, index) in csvData.slice(1)" :key="index">
                    <td class="table-row" v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
                </tr>
            </tbody>
            <div class="show-full-table-btn-div">
                <input class="show-full-table-btn" 
                    type="button" 
                    value="Show Full Table"
                    v-on:click="toggleShowFullTable"
                >
            </div>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
import store from '../../store/index';

  export default {
    props: {
        table: {
            type: String,
            required: true
        },
        tableNum: {
            type: Number,
            required: true
        }
    },
    data() {
      return {
        csvData: [],
        headers: [],
        showFullTable: false,
        highlightedColumns: [],
        highlightedValues: {}
      }
    },
    mounted() {
      this.loadCsv()
    },
    methods: {
        async loadCsv() {
            let csvText = this.table
            console.log(csvText)
            const lines = csvText.split('\n');
            const headers = lines[0].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            this.headers = headers
            //console.log(headers);
            const rows = lines.slice(1).map(line => {
                let rowArray = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
                return rowArray;
            });
            this.csvData = [headers, ...rows]
        },
        toggleShowFullTable() {
            this.showFullTable = !this.showFullTable
        },
        isHighlighted(cellIndex) {
        return this.highlightedColumns.includes(cellIndex);
    },
    toggleHighlight(columnIndex) {
        if (this.highlightedColumns.includes(columnIndex)) {
            // Remove the column index from the array if it's already highlighted
            this.highlightedColumns.splice(this.highlightedColumns.indexOf(columnIndex), 1);
            // Remove the values of the highlighted column for each row
            // for (let i = 0; i < this.table.length; i++) {
            //     delete this.highlightedValues[i][columnIndex];
            // }

            let tableData = {
                tableNum: this.tableNum,
                tableColumn: columnIndex,
                id: (this.tableNum * 100) + columnIndex
            }
            console.log("TABLE ID")
            console.log(tableData.id)

            // We remove the column values from the store
            store.commit("REMOVE_TABLE_COLUMN_VALUES", tableData)

        } else {
            // Add the column index to the array if it's not already highlighted
            this.highlightedColumns.push(columnIndex);

            let rowArray = [];

            this.csvData.forEach(row => {
                rowArray.push(row[columnIndex]);
            });
            console.log(rowArray);

            let tableColumn = {
                tableNum: this.tableNum,
                tableColumn: columnIndex,
                columnValues: rowArray,
                id: (this.tableNum * 100) + columnIndex
            }

            // We send the column values to the store for storage
            store.commit("ADD_STORED_TABLE_COLUMN", tableColumn);
        }
        console.log("HIGHLIGHTED COLUMNS")
        console.log(this.highlightedColumns)
        console.log("HIGHLIGHTED VALUES")
        console.log(this.highlightedValues)
    }
    },
    computed: {
        getCSVFile() {
            return store.state.uploadedFile
        },
        getHeaders() {
            let newHeaders = []
            for (let i = 0; i < this.headers.length; i++) {
                newHeaders.push({
                    id: i,
                    value: this.headers[i]
                })
            }
            return newHeaders
        },
        showFullTable() {
            return this.showFullTable
        }
    }
  }
  </script>

<style>

#table-outer-div {
    display: flex;
    justify-content: center;
    width: 100%;
}

.table {
    border: solid 2px black;
    display: flex;
    flex-direction: column;
    width: fill-available;
    margin: 1%;
}

.table-row {
    border: solid 1px black;
}

.table-header {
    border: solid 1px black;
    cursor: pointer;
}

.show-full-table-btn-div {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 1%;
}

.show-full-table-btn {
    font-size: 20px;
    border: solid 1px black;
    border-radius: 5px;
    cursor: pointer;
}
.show-full-table-btn:hover {
    background-color: rgba(0, 128, 0, 0.548);
}

.highlighted {
    background-color: rgba(0, 132, 255, 0.521);
}

.no-select {
    user-select: none;
}
</style>