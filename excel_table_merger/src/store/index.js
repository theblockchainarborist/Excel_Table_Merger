import { createStore } from 'vuex';

const store = createStore({
    state: {
        showFileUploader: false,
        showMergeWizard: false,
        uploadedFiles: [],
        savedColumns: []
    },
    mutations: {
        SHOW_FILE_UPLOADER(state, show) {
            state.showFileUploader = show;
        },
        SHOW_MERGE_WIZARD(state, show) {
            state.showMergeWizard = show;
        },
        SET_UPLOADED_FILE(state, uploadedFile) {
            state.uploadedFiles.push(uploadedFile)
        },
        ADD_STORED_TABLE_COLUMN(state, tableColumn) {
            state.savedColumns.push(tableColumn)
        },
        REMOVE_TABLE_COLUMN_VALUES(state, tableData) {
            let tableNumber = tableData.tableNum
            let columnNumber = tableData.columnNum

            // We loop through all saved columns and remove any that match both tableNum and columnNum
            state.savedColumns.forEach((entry, index) => {
                if (entry.tableNum === tableNumber && entry.tableColumn === columnNumber) {
                    // Remove the array at the current index if it matches the specified table and column numbers
                    state.savedColumns.splice(index, 1);
                }
            });

        }
    }
});

export default store;