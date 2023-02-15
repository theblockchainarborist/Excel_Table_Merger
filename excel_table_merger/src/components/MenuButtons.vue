<template>
    <div id="menu-bar">
        <div class="buttonDiv no-select" v-on:click="addTable">
            <p>
                Add Table
            </p>
        </div>
        <div class="buttonDiv no-select" v-on:click="toggleMergeWizard">
            <p>
                Open Merge Wizard
            </p>
        </div>
        <div class="buttonDiv no-select">
            <p>
                Merge Tables
            </p>
        </div>
        <div class="buttonDiv no-select">
            <p>
                Download Output Table
            </p>
        </div>
    </div>
</template>

<script>
import store from '../store/index';

export default {
    name: "menu-buttons",
    data() {
        return {

        }
    },
    methods: {
        addTable() {
            store.commit("SHOW_FILE_UPLOADER", true);
        },
        toggleMergeWizard() {
            store.commit("SHOW_MERGE_WIZARD", true);
        }
    }
}
</script>

<style>
#menu-bar {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: auto;
}

.buttonDiv {
    display: flex;
    border: solid 2px black;
    width: fit-content;
    padding: 5px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
</style>