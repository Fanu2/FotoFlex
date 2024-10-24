document.addEventListener('DOMContentLoaded', function () {
    const imageEditorContainer = document.getElementById('tui-image-editor-container');

    const imageEditor = new tui.ImageEditor(imageEditorContainer, {
        includeUI: {
            loadImage: {
                path: '',  // Initially no image loaded
                name: 'SampleImage',
            },
            theme: {}, // Default theme, but you can customize it
            menu: ['crop', 'flip', 'rotate', 'draw', 'shape', 'icon', 'text', 'mask', 'filter'], // Full set of features
            initMenu: 'filter', // Default menu shown
            uiSize: {
                width: '100%', // Ensure the editor takes up the full width of its container
                height: '700px' // Set the height to ensure the UI is visible
            },
            menuBarPosition: 'bottom', // Toolbar appears at the bottom
        },
        cssMaxWidth: 1200, // Adjust this as needed
        cssMaxHeight: 800, // Adjust this as needed for your screen
        usageStatistics: false // Turn off tracking usage statistics
    });

    // Upload image from local input
    document.getElementById('upload-image-button').addEventListener('change', function (e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function () {
            const dataURL = reader.result;
            imageEditor.loadImageFromURL(dataURL, 'New Image')
                .then(() => {
                    imageEditor.clearUndoStack(); // Reset undo stack after new image load
                })
                .catch((err) => {
                    console.error('Error loading image:', err);
                });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    });

    // Save image event
    document.getElementById('save-button').addEventListener('click', function () {
        const dataURL = imageEditor.toDataURL();
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'editedImage.png'; // Define the download file name
        link.click();
    });
});
