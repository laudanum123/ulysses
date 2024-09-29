# Ulysses
Alternative UI for Code Executor apps

## Setup Instructions

### Prerequisites
- Conda
- Node.js and npm

### Backend Setup
1. Create and activate the Conda environment:
   ```
   conda env create -f environment.yml
   conda activate your_environment_name
   ```

2. Install pip packages:
   ```
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   Create a `.env` file in the backend directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. Run the backend server:
   ```
   python app.py
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install npm packages:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm start
   ```

The application should now be running on `http://localhost:3000`.