<template>
    <div>
        <div v-if="uploadImage" class="image-preview-container">
            <img
                v-if="imagePreview"
                :src="imagePreview"
                class="img-preview"
            >
            <div class="image-info">
                <div class="image-name">{{ uploadImage.name }}</div>
                <div
                    v-if="imagePreview"
                    class="clear-btn"
                    @click="clearFile"
                >Delete</div>
            </div>
        </div>
        <label
            v-else
            class="custom-file-upload"
            :class="{'highlight-drop': uploadZoneVisible}"
            @drop.prevent="addFile"
            @dragover.prevent="uploadZoneVisible=true"
            @dragleave.prevent="uploadZoneVisible=false"
        >
            <input
                type="file"
                @change="imageSubmited"
            >
            <span class="upload-instructions">Drag and drop an image here, or click to browse.</span>
        </label>
    </div>
</template>

<script>
    export default {
        props: {
            image: {
                type: [String],
                required: false,
                default: null
            }
        },
        data() {
            return {
                fetchedImage: null,
                uploadImage: null,
                uploadZoneVisible: null
            }
        },
        computed: {
            imagePreview() {
                if (this.fetchedImage) {
                    return this.fetchedImage
                } else if (this.uploadImage) {
                    return URL.createObjectURL(this.uploadImage)
                } else {
                    return ''
                }
            }
        },
        watch: {
            uploadImage(val) {
                this.fetchedImage = null
                this.$emit('update-image', val)
            }
        },
        created() {
            this.fetchedImage = this.image
        },
        methods: {
            addFile(e) {
                const droppedFile = e.dataTransfer.files[0]
                if (droppedFile) {
                    this.uploadImage = droppedFile
                } else {

                }
            },
            clearFile() {
                if (this.uploadImage) {
                    this.uploadImage = null
                } else if (this.fetchedImage) {
                    this.fetchedImage = null
                }
                this.$emit('update-image', null)
            },
            imageSubmited(e) {
                const file = e.target.files[0]
                if (file) {
                    this.uploadImage = file
                }
            }
        }
    }
</script>

<style scoped>
input[type="file"] {
    display: none;
}
.custom-file-upload {
    min-height: 115px;
    border: 1px dashed #d3d3d3;
    background: #fff;
    width: 100%;
    border-radius: 0.25rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.highlight-drop {
    border: 2px dashed #303030;
}

.upload-instructions {
    font-weight: bold;
    max-width: 180px;
}

.image-preview-container {
    padding: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 20px;
    background: #fff;
    border-radius: 10px;
}

.img-preview {
    width: 100%;
    height: auto;
    max-width: 75px;
    max-height: 75px;
}

.image-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.image-name {
    font-weight: bold;
}

.clear-btn {
    cursor: pointer;
    color: #7f7f7f;
}

@media screen and (min-width: 768px) {
    .custom-file-upload,
    .image-preview-container {
        width: 300px;
    }
}
</style>
