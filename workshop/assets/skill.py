import os
from typing_extensions import Annotated
from pydantic import BaseModel, Field
from openai import OpenAI

class WebSearchInput(BaseModel):
    question: Annotated[str, Field(description="The question to search the answer for")]

    def get(self, key: str):
        try:
            return getattr(self, key)
        except AttributeError:
            return None

def get_question_answer(question: Annotated[WebSearchInput, "Question"]) -> Annotated[str, "Retrieved answer"]:
    """
    Search for an answer to the question and return the result in natural language.
    Args:
        question: The question to search the answer for.
    Returns:
        RetrievedAnswer: The retrieved answer to the input question
    """
    perplexity_api_key = os.environ.get("PERPLEXITY_API_KEY")
    if not perplexity_api_key:
        raise ValueError("PERPLEXITY_API_KEY environment variable is not set.")
    client = OpenAI(api_key=perplexity_api_key, base_url="https://api.perplexity.ai")
    messages = [
        {
            "role": "user",
            "content": question.get("question") + " (in a paragraph)",
        },
    ]
    # chat completion without streaming
    response = client.chat.completions.create(
        model="llama-3.1-sonar-large-128k-online",
        messages=messages,
    )
    return response.choices[0].message.content