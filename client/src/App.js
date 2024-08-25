import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState({
      roll_number: '',
      numbers: [],
      alphabets: [],
      highest_lowercase_alphabet: null
    });
  
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async () => {
        console.log('Submitting JSON input:', jsonInput);
        try {
            const parsedData = JSON.parse(jsonInput);
  
            if (!Array.isArray(parsedData.data)) {
                throw new Error('Input must be an object with a "data" property that is an array');
            }
  
            const res = await axios.post('http://localhost:5000/bfhl', { data: parsedData.data });
            console.log('Server response:', res.data);
            setResponse(res.data);
        } catch (error) {
            console.error('Error:', error.message);
            alert(`Submission error: ${error.message}`);
        }
    };

    const handleOptionChange = (event) => {
        const value = Array.from(
            event.target.selectedOptions,
            (option) => option.value
        );
        setSelectedOptions(value);
    };

    const displayResponse = () => {
        if (!response || selectedOptions.length === 0) return "Please select filter options.";

        let result = {};
        if (selectedOptions.includes('Numbers')) {
            result.numbers = response.numbers;
        }
        if (selectedOptions.includes('Alphabets')) {
            result.alphabets = response.alphabets;
        }
        if (selectedOptions.includes('Highest lowercase alphabet')) {
            result.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
        }

        return JSON.stringify(result, null, 2);
    };

    return (
        <div className="app-container">
            <h1 className="header">{response ? response.roll_number : 'React App'}</h1>
            <textarea
                className="json-input"
                rows="4"
                cols="50"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='Enter JSON input here...'
            />

            <select className="option-select" multiple={true} onChange={handleOptionChange}>
                <option value="Numbers">Numbers</option>
                <option value="Alphabets">Alphabets</option>
                <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
            </select>
            <button className="submit-button" onClick={handleSubmit}>Submit</button>

            <pre className="response-display">{displayResponse()}</pre>
        </div>
    );
}

export default App;
