<template>
    <div id="tables-outer-div">
        <div v-for="(table, index) in getTables" v-bind:key="index">
            <div class="table-border-div">
                <h2 class="table-title">Table {{index + 1}}</h2>
                <table-component 
                :table="table"
                :tableNum="index + 1"
                />
            </div>
            
        </div>
    </div>
</template>

<script>
import store from '../../store/index';
import TableComponent from './TableComponent.vue';

export default {
  components: { TableComponent },
    name: "tables-component",
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {
        getTables() {
            return store.state.uploadedFiles
        }
    }
}
</script>

<style>

#tables-outer-div {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.table-border-div {
    border: solid 2px black;
    border-radius: 5px;
    margin: 1%;
    width: fit-content;
}

.table-title {
    margin: 0px 15px;
}

</style>