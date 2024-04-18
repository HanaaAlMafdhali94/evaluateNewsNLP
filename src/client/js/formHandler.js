//Make fnction that check url and import it here

import { checkForURL } from "./urlChecker";

const form = document.getElementById('urlForm');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    // Get the URL from the input field
    const formText = document.getElementById('name').value;

    // Check if the URL is valid
    if (checkForURL(formText)) {
        // If the URL is valid, send it to the server
        postData('/api', { url: formText })
            .then(response => {
                console.log('Server response:', response);
                // Handle the response from the server and update dom
                document.getElementById('results').innerHTML = response.score_tag;
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle errors
            });
    } else {
        alert('Invalid URL');
        console.log('Invalid URL');
        // Handle invalid URL
    }

}

// Function to send data to the server
async function postData(url = '', data = {}) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    } catch (error) {
        throw error;
    }
}

export { handleSubmit };

