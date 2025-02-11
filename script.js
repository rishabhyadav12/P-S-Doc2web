// Function to convert the DOCX file to HTML
function convertDocxToHtml() {
    const fileInput = document.getElementById('fileInput');
    const output = document.getElementById('output');

    if (fileInput.files.length === 0) {
        alert("Please select a file to upload.");
        return;
    }

    const file = fileInput.files[0];
    
    // Using Mammoth.js to parse the DOCX file
    const reader = new FileReader();
    reader.onload = function(event) {
        const arrayBuffer = reader.result;
        
        mammoth.convertToHtml({arrayBuffer: arrayBuffer})
            .then(function(result) {
                let htmlContent = result.value;
                
                // Add line breaks after the specified tags
                htmlContent = addLineBreaksAfterTags(htmlContent);
                
                // Remove extra spaces inside text content (within HTML tags)
                htmlContent = removeExtraSpaces(htmlContent);

                const splitContent = splitSectionsByHeadings(htmlContent);
                displaySections(splitContent);
            })
            .catch(function(err) {
                console.error("Error converting the DOCX file", err);
            });
    };
    
    reader.readAsArrayBuffer(file);
}

// Function to replace multiple spaces with a single space
function removeExtraSpaces(html) {
    // This regex will match two or more spaces and replace them with a single space
    return html.replace(/\s{2,}/g, ' ');
}

// Function to add a line break after specific tags
function addLineBreaksAfterTags(content) {
    // Add a newline after closing tags for h1, h2, h3, p, ul, ol, li
    return content.replace(/<\/(h1|h2|h3|p|ul|ol|li)>/g, "</$1>\n");
}


// Function to split the HTML content into sections by H2 headings
function splitSectionsByHeadings(htmlContent) {
    // Define the headings to look for (Overview, Trends, etc.)
    const headings = ["Overview", "Trends", "Analysis", "Geo", "Share", "News"];
    
    const sectionRegex = /<h2>(.*?)<\/h2>(.*?)((?=<h2)|$)/gs;
    let match;
    let sections = {};

    while ((match = sectionRegex.exec(htmlContent)) !== null) {
        const sectionTitle = match[1].trim();
        const sectionContent = match[2].trim();

        if (headings.includes(sectionTitle)) {
            sections[sectionTitle] = sectionContent;
        }
    }

    return sections;
}

// Function to send the section data to the PHP backend
function sendToDatabase(sectionName, content) {
    const formData = new FormData();
    formData.append('section_name', sectionName);
    formData.append('content', content);

    fetch('save_section.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);  // Show success message
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to save data');
    });
}

// Function to disable or enable the send button based on textarea content
function toggleButtonState(textarea, button) {
    // Check if the textarea is empty
    if (textarea.value.trim() === "") {
        button.disabled = true;  // Disable the button
    } else {
        button.disabled = false; // Enable the button
    }
}

// Function to display the sections one by one with a smooth fade-in effect
function displaySections(sections) {
    const output = document.getElementById('output');
    output.style.display = 'block'; // Show the output section
    
    // List of section IDs to fill in the corresponding textareas
    const sectionIds = ["Overview", "Trends", "Analysis", "Geo", "Share", "News"];
    
    let sectionCount = 0; // Counter to handle sequential display

    sectionIds.forEach(section => {
        const sectionContainer = document.createElement('div');
        sectionContainer.classList.add('section');
        
        const label = document.createElement('label');
        label.setAttribute('for', `${section.toLowerCase()}Textarea`);
        label.textContent = section;
        
        const textarea = document.createElement('textarea');
        textarea.id = `${section.toLowerCase()}Textarea`;
        textarea.readOnly = false;  // Allow user to edit
        
        if (sections[section]) {
            textarea.value = sections[section]; // Populate the textarea with content
        } else {
            textarea.value = ""; // If there's no content for that section, leave it blank
        }

        // Create the button
        const button = document.createElement('button');
        button.textContent = `Send ${section} to Database`;
        button.classList.add('send-button');
        button.disabled = textarea.value.trim() === ""; // Disable the button if textarea is empty
        button.onclick = () => sendToDatabase(section.toLowerCase(), textarea.value);

        // Add event listener to toggle button state based on textarea content
        textarea.addEventListener('input', () => toggleButtonState(textarea, button));

        sectionContainer.appendChild(label);
        sectionContainer.appendChild(textarea);
        sectionContainer.appendChild(button);  // Add the button below the textarea
        output.appendChild(sectionContainer);

        // Sequential fade-in effect
        setTimeout(() => {
            sectionContainer.style.display = 'block';

            // Apply CodeMirror to the textarea
            initializeCodeMirror(textarea);
        }, sectionCount * 500); // Delay for smooth transition

        sectionCount++;
    });
}


// Function to initialize CodeMirror on the given textarea
function initializeCodeMirror(textarea) {
    // Initialize CodeMirror editor for the textarea
    CodeMirror.fromTextArea(textarea, {
        lineNumbers: true,         // Display line numbers
        mode: "xml",               // Set mode for HTML (you can change to JavaScript or CSS if needed)
        theme: "dracula",          // Set theme (you can change it to your preferred theme)
        readOnly: false,            // Set the editor to read-only
        lineWrapping: true,        // Enable line wrapping
    });
}

// Dark mode to light mode
const btn = document.getElementById("toggleBtn");
        const stylesheet = document.getElementById("stylesheet");
        const icon = document.getElementById("modeIcon");

        // Initial mode setup based on localStorage
        if (localStorage.getItem("theme") === "light") {
            stylesheet.href = "light.css";
            icon.classList.replace("fa-moon", "fa-sun");
        }

        btn.onclick = () => {
            const isDark = stylesheet.href.includes("dark.css");
            stylesheet.href = isDark ? "light.css" : "dark.css";
            icon.classList.toggle("fa-moon", isDark);
            icon.classList.toggle("fa-sun", !isDark);
            localStorage.setItem("theme", isDark ? "light" : "dark");
        };
