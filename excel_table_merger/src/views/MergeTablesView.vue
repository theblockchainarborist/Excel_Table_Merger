<template>
    <div id="merge-tables-view-outer-div">
        <div id="title-head">
            <h1 class="title">
                Excel Table Merger
            </h1>
        </div>
        <div id="buttons-head">
            <menu-buttons />
        </div>
        <div id="tables-area" v-if="showTable">
            <tables />
        </div>
        <div v-if="showUpdateFilePanel">
            <upload-file />
        </div>
        <div v-if="showMergeWizard">
            <merge-wizard />
        </div>
    </div>
</template>

<script>
import MenuButtons from '../components/MenuButtons.vue'
import MergeWizard from '../components/mergeWizardComponents/MergeWizard.vue'
import TableComponent from '../components/tableComponents/TableComponent.vue'
import Tables from '../components/tableComponents/Tables.vue'
import UploadFile from '../components/UploadFile.vue'
import store from '../store'
export default {
  components: { MenuButtons, UploadFile, TableComponent, Tables, MergeWizard },
    name: "merge-tables-view",
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {
        showUpdateFilePanel() {
            return store.state.showFileUploader
        },
        showTable() {
            return store.state.uploadedFiles
        },
        showMergeWizard() {
            return store.state.showMergeWizard
        }
    }

}
</script>

<style>

#merge-tables-view-outer-div {
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-template-areas:
    'title head-buttons'
    'tables tables';
    background-color: rgb(243, 234, 234);
    width: 100%;
    height: 100%;
    color: black;
    position: fixed;
}

#title-head {
    grid-area: title;
    border: solid;
    height: fit-content;
    height: 6vh;
}

#buttons-head {
    grid-area: head-buttons;
    border: solid green;
    height: fit-content;
    height: 6vh;
}

#tables-area {
    display: flex;
    flex-direction: column;
    grid-area: tables;
    border: solid purple;
    min-height: 88vh;
    overflow-y: auto;
    overflow-x: auto;
}

.title {
    display: flex;
    background-color: red;
    width: 100%;
    height: 100%;
    margin: 0px;
    justify-content: center;
    align-items: center;
}


</style>