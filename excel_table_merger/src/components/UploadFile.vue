<template>
        <div class="modal-uploader-overlay">
            <div id="uploader-main-div" class="uploader" >
                <!-- Panel Header -->
                <div class="top-bar">
                    <p  class="bold panel-title">File Uploader</p>
                    <input class="close-btn" type="button" value="X" v-on:click="closeUploader">
                </div>
                <!-- Panel Body -->
                <div id="upload-panel-body">
                    <!-- Upload Button -->
                    <div id="choose-file-div">
                        <div>
                            <p class="center-text">
                                Currently we can only handle CSV files.
                            </p>
                        </div>
                        <div class="file-types-div">
                            <div class="file-types-row">
                                <button class="file-upload-btn" @click="openFileDialog">Choose File</button>
                                <input type="file" ref="fileInput" accept=".csv" @change="uploadFile" style="display: none">
                                <p class="file-type-info">To upload a local CSV file.</p>
                            </div>
                        </div>
                    </div>
                    <!-- Drag N Drop Area -->
                    <div
                        @dragenter="onDragEnter"
                        @dragover="onDragOver"
                        @drop="onDrop"
                        class="image-uploader"
                    >
                        <!-- Text Inside Drag N Drop Area -->
                        <p id="drag-n-drop-text">Drag and Drop to Upload</p>
                    </div>
    
                    <!-- For Testing TODO remove -->
                    <!-- <img v-if="uploadedImageUrl !== ''" :src="uploadedImageUrl" id="uploaded-image" alt="Uploaded Image"> -->
    
                    </div>
                </div>
        </div>
    </template>
    
    <script>
import store from '../store/index';

    export default {
        name: 'upload-file',
        data() {
        return {
            uploadedImageUrl: ''
            };
        },
        methods: {
            closeUploader() {
                store.commit("SHOW_FILE_UPLOADER", false);
                return store.state.showFileUploader;
            },
            openFileDialog() {
                console.log("Opening file dialog")
                this.$refs.fileInput.click()
            },
            uploadFile(event) {
                const file = event.target.files[0]
                console.log(file)
                const reader = new FileReader();
                reader.readAsText(file);
                // once the file is read, convert it to a text
                reader.onload = (e) => {
                const text = e.target.result;
                console.log(text)
                // Store the text string in the store.
                store.commit("SET_UPLOADED_FILE", text);
                store.commit("SHOW_FILE_UPLOADER", false);
                // Save the file as a CSV.
                //const csvFile = new File([text], 'output.csv', {type: 'text/csv'});
                }
            },
            onDragEnter(event) {
                // prevent default behavior
                event.preventDefault()
            },
            onDragOver(event) {
                // prevent default behavior
                event.preventDefault()
            },
            onDrop(event) {
                // prevent default behavior
                event.preventDefault()
                // get the dropped files
                const file = event.dataTransfer.files[0]
                const reader = new FileReader();
                reader.readAsText(file);
                // once the file is read, convert it to a text
                reader.onload = (e) => {
                const text = e.target.result;
                console.log(text)
                // Store the text string in the store.
                store.commit("SET_UPLOADED_FILE", text);
                store.commit("SHOW_FILE_UPLOADER", false);
                }
            }
        },
        computed: {
            getUploaderVisibility() {
                return store.state.showFileUploader
            }
    }
    };
    </script>
    
    <style>
    .modal-uploader-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        background-color: rgba(0, 0, 0, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .uploader {
        background-color: rgb(240, 238, 238);
        border: solid 0.5px rgba(0, 0, 0, 0.479);
        border-radius: 20px;
        width: 35vw;
        height: 75vh;
        color: black;
    }
    /* Header Label */
    #uploader-label-top {
        text-align: center;
        border-bottom: solid 1px black;
        font-weight: 600;
        font-size: 1.3vw;
        margin-top: 0px;
    }
    .bold {
        font-weight: 700;
    }
    #upload-panel-body {
        border-top: solid 1px black;
        width: 100%;
        height: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }
    .image-uploader {
        border: 2px dashed #ccc;
        border-radius: 4px;
        text-align: center;
        width: 85%;
        height: 75%;
        position: relative;
    }
    #drag-n-drop-text {
        color: grey;
    }
    #choose-file-div {
        height: auto;
        width: 90%;
        margin-top: 2%;
    }


    /* NEW CSS BELOW */

    .top-bar {
        display: flex;
        flex-direction: row;
        justify-content: right;
        align-items: center;
        height: 40px;
    }

    .close-btn {
        position: absolute;
        align-self: right;
        z-index: 9999;
        margin-right: 15px;
        width: 30px;
        height: 30px;
        cursor: pointer;
        background-color: rgba(245, 46, 46, 0.753);
        border: solid 1px black;
        border-radius: 5px;
        font-weight: bold;
    }
    .close-btn:hover {
        background-color: rgb(245, 46, 46);
    }

    .panel-title {
        width: 100%;
        height: auto;
        text-align: center;
        text-justify: end;
    }

    .file-types-div {
        display: flex;
        flex-direction: column;
        align-self: left;
        width: 100%;
        height: auto;
    }

    .center-text {
        text-align: center;
    }

    .file-types-row {
        display: flex;
        align-items: center;
    }

    .file-type-info {
        margin-left: 20px;
    }

    .file-upload-btn {
        height: 40px;
    }
    </style>