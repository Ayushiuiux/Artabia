<template>

    <div class="mt-1 space-y-2 sm:mt-0 sm:col-span-2">
        <p class="text-sm font-medium text-gray-700">Upload image</p>
        <div
            class="flex justify-center px-6 pt-5 pb-12 border-2 artabia-border-dark-color border-dashed rounded-md"
            @dragover="dragover"
            @dragleave="dragleave"
            @drop="drop"
        >
            <div class="space-y-1 text-center">
                <svg
                    class="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                >
                    <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
                <div class="flex text-sm text-gray-600">
                    <label
                        for="file-upload"
                        class="relative"
                    >
                        <input
                            id="file-upload"
                            ref="file"
                            name="file-upload"
                            type="file"
                            class=" absolute -bottom-24 mt-3 left-8 items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            @change="onChange"
                        >
                    </label>
                    <p class="pl-24 ml-2">or drag and drop</p>
                </div>
                <div class="text-xs text-gray-500 pb-4">
                    JPG, PNG, GIF, SVG, MP4, WEBP, MP3, WAV, OGG, GLB, GLTF<br/>Up to 250MB
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'UploadImage',
        data() {
            return {
              image: ""
            }
        },
        methods: {
            onChange() {
                this.image = this.$refs.file.files[0]
                this.$emit('onImage', this.image)
            },
            dragover(event) {
                event.preventDefault()
                // Add some visual fluff to show the user can drop its files
                if (!event.currentTarget.classList.contains('bg-green-100')) {
                    event.currentTarget.classList.remove('bg-gray-100')
                    event.currentTarget.classList.add('bg-green-100')
                }
            },
            dragleave(event) {
                // Clean up
                event.currentTarget.classList.add('bg-gray-100')
                event.currentTarget.classList.remove('bg-green-100')
            },
            drop(event) {
                event.preventDefault()
                this.$refs.file.files = event.dataTransfer.files
                this.onChange() // Trigger the onChange event manually
                // Clean up
                event.currentTarget.classList.add('bg-gray-100')
                event.currentTarget.classList.remove('bg-green-100')
            }
        }
    }
</script>

<style scoped>

</style>
