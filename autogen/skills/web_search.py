import os
from typing_extensions import Annotated
from pydantic import BaseModel, Field
from openai import OpenAI

class WebSearchInput(BaseModel):
    question: Annotated[str, Field(description="The question to search the web for.")]

def web_search(request: Annotated[WebSearchInput, "Input for web search."]) -> Annotated[str, "Output for web search."]:
    """
    Search the web for relevant information about the question and return the search results in natuarl language form.
    Args:
        request: The question to search the web for.
    Returns:
        WebSearchResult: The answer to the input question based on web search.
    """
    perplexity_api_key = os.environ.get("PERPLEXITY_API_KEY")
    if not perplexity_api_key:
        raise ValueError("PERPLEXITY_API_KEY environment variable is not set.")
    client = OpenAI(api_key=perplexity_api_key, base_url="https://api.perplexity.ai")
    messages = [
        {
            "role": "system",
            "content": (
                "You are an artificial intelligence assistant and you need to "
                "engage in a helpful, detailed, polite conversation with a user."
            ),
        },
        {
            "role": "user",
            "content": (request.question),
        },
    ]
    # chat completion without streaming
    response = client.chat.completions.create(
        model="llama-3.1-sonar-large-128k-online",
        messages=messages,
    )
    return response.choices[0].message.content
