<?php
// save_section.php

// Include the database configuration file
include('db_config.php');

// Get the POST data from the frontend
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['section_name']) && isset($_POST['content'])) {
        $section_name = $_POST['section_name'];
        $content = $_POST['content'];

        // Dynamically create a table for each section if it doesn't exist
        $create_table_sql = "CREATE TABLE IF NOT EXISTS `$section_name` (
            id INT AUTO_INCREMENT PRIMARY KEY,
            content TEXT
        )";
        
        // Check if the table already exists or not
        if ($conn->query($create_table_sql) === TRUE) {
            // Table created or already exists
            $insert_sql = "INSERT INTO `$section_name` (content) VALUES (?)";
            $stmt = $conn->prepare($insert_sql);
            $stmt->bind_param("s", $content);  // Bind parameters to the query

            if ($stmt->execute()) {
                echo "$section_name data saved successfully.";
            } else {
                echo "Error: " . $stmt->error;
            }
            $stmt->close();
        } else {
            echo "Error creating table: " . $conn->error;
        }
    } else {
        echo "Section name or content not provided.";
    }
} else {
    echo "Invalid request method.";
}

$conn->close();
?>
