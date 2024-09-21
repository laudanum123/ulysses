import os

from flask import Flask, Response, request, stream_with_context
from flask_cors import CORS
from openai import OpenAI

app = Flask(__name__)
CORS(app)

# Set a secret key for session management
app.secret_key = 'your_secret_key'

# Load the OpenAI API key from environment variables
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

class ChatSessionManager:
    def __init__(self):
        # Initialize an empty conversation history
        self.conversation_history = []

    def add_message(self, role, content):
        # Append a new message to the conversation history
        self.conversation_history.append({'role': role, 'content': content})

    def get_conversation(self):
        # Return the full conversation history
        return self.conversation_history

    def clear_conversation(self):
        # Clear the conversation history if needed
        self.conversation_history = []


# Create an instance of the ChatSessionManager to hold conversations
chat_manager = ChatSessionManager()

@app.route('/api/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')

    try:
        # Add the user message to the conversation history
        chat_manager.add_message('user', user_message)

        # Use the OpenAI API with the full conversation history
        def generate():
            client = OpenAI(api_key=OPENAI_API_KEY)
            response = client.chat.completions.create(
                model='gpt-4o-mini',
                messages=chat_manager.get_conversation(),  # Send conversation history
                stream=True,
            )

            assistant_message = ''
            for chunk in response:
                if chunk.choices[0].delta.content is not None:
                    chunk_message = chunk.choices[0].delta.content
                    assistant_message += chunk_message
                    if chunk_message:
                        yield chunk_message

            # Add the assistant's response to the conversation history
            chat_manager.add_message('assistant', assistant_message)

        return Response(stream_with_context(generate()), mimetype='text/plain')
    except Exception as e:
        print(f'Error communicating with OpenAI API: {e}')
        return 'Error communicating with OpenAI API', 500

@app.route('/api/clear', methods=['POST'])
def clear_chat():
    # Clear the conversation history
    chat_manager.clear_conversation()
    return 'Conversation cleared', 200

if __name__ == '__main__':
    app.run(port=5000, debug=True)
