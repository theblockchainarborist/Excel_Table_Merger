<template>
    <div class="modal-uploader-overlay">
        <div class="merge-wizard" >
            <!-- Header Content -->
            <div id="wizard-header">
                <h2 class="panel-title" >
                    Merge Wizard
                </h2>
                <input class="close-btn" type="button" value="X" v-on:click="closeWizard">
            </div>
            <!-- Wizard Body -->
            <div id="wizard-body">

                <div id="match-on-column-div">
                    <label class="wizard-label" for="match-on">Which column should we use to match row values?</label>
                    <select class="drop-down" name="match-on" id="match-on-drop-down" v-model="matchOn">
                        <option v-for="(column, index) in getColumnList" :key="index" >
                            {{ column }}
                        </option>
                    </select>
                </div>

                <div id="column-order-div">
                    <p class="wizard-label">
                        Please choose the order of the columns as they should appear in the new table.
                    </p>
                    <div id="column-order-rows" v-for="(column, index) in getColumnList" v-bind:key="index">
                        <p class="column-order-rows-label">
                            {{column}}
                        </p>
                        <select class="drop-down" name="match-on" id="match-on-drop-down" v-model="columnOrder[index].outputColumnNumber">
                            <option v-for="(column, index) in getColumnList" v-bind:key="index">
                                Column {{ index + 1 }}
                            </option>
                        </select>    
                    </div>
                </div>

                <div>
                    <input type="button" value="Generate Merged Table" v-on:click="generateMergedTable">
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import store from '../../store/index';

export default {
    name: "merge-wizard",
    data() {
        return {
            matchOn: this.value,
            columnOrder: [],
            missingWizardData: false
        }
    },
    methods: {
        closeWizard() {
            store.commit("SHOW_MERGE_WIZARD", false);
        },
        generateMergedTable() {
            let columnOrderMap = new Map();

            this.columnOrder.forEach(column => {
                if (column.outputColumnNumber === undefined) {
                    // handle missing data fields
                    this.missingWizardData = true;
                }

                let num = column.outputColumnNumber.match(/\d+/g);
                console.log(num)
                columnOrderMap.set(num, column.name)
            });
            console.log(columnOrderMap)
            // We generate the new table and present it.
        }
    },
    computed: {
        getColumnList() {
            let columns = [];
            let savedColumns = store.state.savedColumns;

            savedColumns.forEach(column => {
                let columnLabel = column.columnValues[0]
                columns.push(columnLabel)
            });
            let filteredColumnList = Array.from(new Set(columns));

            console.log(filteredColumnList.length)
            for (let i = 0; i < filteredColumnList.length; i++) {
                this.columnOrder.push({
                    name: filteredColumnList[i],
                    outputColumnNumber: undefined
                })
            }
            return filteredColumnList
        }
    }
}
</script>

<style>

.merge-wizard {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 80%;
    background-color: rgb(231, 231, 214);
    border: solid 2px black;
    border-radius: 20px;
}

#wizard-header {
    display: flex;
    align-items: center;
    border-bottom: solid 1px black;
    height: 40px;
    justify-content: right;
}

#wizard-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 90%;
    width: 99%;
}

#match-on-column-div {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.drop-down {
    width: fit-content;
    height: fit-content;
    font-size: 20px;
}

.wizard-label {
    font-size: 25px;
    color: black;
}

#column-order-rows {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    font-weight: 600;
}

.column-order-rows-label {
    margin-right: 10px;
}

</style>