sequenceDiagram
    participant User
    participant Browser
    participant Server
    participant Database

    User->>Browser: Enter "My New Note" in the text field
    User->>Browser: Click Save Button
    Browser->>Server: HTTP POST /new_note_spa { content: "My New Note" }
    Server->>Database: Insert new note into database
    Database-->>Server: Acknowledgment of insertion
    Server-->>Browser: JSON { message: "note saved", note: { id: X, content: "My New Note" }}
    Browser->>Browser: Update the list of notes in the UI
    Browser-->>User: Display updated list of notes
