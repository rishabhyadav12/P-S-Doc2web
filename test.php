<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Word Document to HTML Converter</title>
    <link rel="stylesheet" href="dark.css" id="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <!-- CodeMirror Stylesheet -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.5/codemirror.min.css">

<!-- CodeMirror Theme (Optional, for customizing the look) -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.5/theme/dracula.min.css">

</head>
<body>
    <div class="container">
        <h1>P<span style="color:#7f92ff">&</span>S Doc<span style="color:#7f92ff">2</span>Web</h1>
        
        <div class="upload-section">
            <input type="file" id="fileInput" accept=".docx"/>
            <button class="convert-button" onclick="convertDocxToHtml()">Convert</button>
        </div>

        <button id="toggleBtn" class="dark-light-button" title="click to change">
        <i id="modeIcon" class="fas fa-sun"></i> <!-- Default icon: sun (light mode) -->
    </button>

        <div id="output" class="output-section">
            <!-- Textareas will be populated here -->
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.4.2/mammoth.browser.min.js"></script>
    <script src="script.js"></script>
    <!-- CodeMirror JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.5/codemirror.min.js"></script>

<!-- CodeMirror Mode for HTML -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.5/mode/xml/xml.min.js"></script>

<!-- CodeMirror Mode for JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.5/mode/javascript/javascript.min.js"></script>

<!-- CodeMirror Mode for CSS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.5/mode/css/css.min.js"></script>
</body>
</html>
