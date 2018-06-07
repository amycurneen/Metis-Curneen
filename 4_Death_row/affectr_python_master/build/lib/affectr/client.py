import logging

from affectr.httpRequest import HttpRequest
from affectr.exceptions import ClientError
from affectr.objects import *

logger = logging.getLogger(__name__)
API_PATH = '/v1'


class Client(object):
    """
    The main interface to the TheySay Affectr API
    This class is the starting point for interacting with TheySay Affectr.
    """

    base_url = 'https://api.theysay.io'

    def __init__(self, username, password):
        """Create a client

        :param string username: Your username.
        :param string password: Your password.
        """
        self._username = username
        self._password = password

    def api_get(self, path, **kwargs):
        """Issue an GET request to the API

        :param path: the path that will be added to the API prefix
        """
        return self._request('get', API_PATH + path, **kwargs)

    def api_post(self, path, data, **kwargs):
        """Issue a POST request to the API

        :param path: The path that will be added to the API prefix
        :param data: The data to post to the url.
        """
        return self._request('post', API_PATH + path, data=data,
                             **kwargs)

    def api_put(self, path, data={}, **kwargs):
        """Issue a PUT request to the API

        :param path: The path that will be added to the API prefix
        :param data: The data to put to the url.
        """
        return self._request('put', API_PATH + path, data=data,
                             **kwargs)

    def api_delete(self, path, **kwargs):
        """Issue a delete to the API

        :param path: the path that will be added to the API prefix
        :param params: query string parameters
        """
        return self._request('delete', API_PATH + path, **kwargs)

    def _request(self, method, path, **kwargs):
        """Send a request to the Affectr API

        :param method: the HTTP method to use (e.g. +:get+, +:post+)
        :param path: the path fragment of the URL
        """
        request_url = self.base_url + path
        request = HttpRequest(method, request_url)
        logger.debug("Executing request to {0}".format(request_url))

        request.use_http_auth(self._username, self._password)
        request.set_payload(kwargs.get('data').__dict__)

        response = request.perform()

        if type(response) == dict and "error" in response.keys():
            raise ClientError("Received error response calling the API, message was {0}".format(response["error"]))
        return response

    def classify_sentiment(self, text, bias=None):
        return SimpleSentiment(self.api_post("/sentiment", Request(text, bias=bias)))

    def classify_sentence_sentiment(self, text, bias=None):
        return [SentenceSentiment(entry) for entry in self.api_post("/sentiment", Request(text, level="sentence", bias=bias))]

    def classify_word_sentiment(self, text, bias=None):
        return [WordSentiment(entry) for entry in self.api_post("/sentiment", Request(text, level="word", bias=bias))]

    def classify_entity_sentiment(self, text, targets=None, matching=None, bias=None):
        return [EntitySentiment(entry) for entry in self.api_post("/sentiment", Request(text, level="entity", targets=targets, matching=matching, bias=bias))]

    def classify_entity_relation_sentiment(self, text, bias=None):
        return [EntityRelationSentiment(entry) for entry in self.api_post("/sentiment", Request(text, level="entityrelation", bias=bias))]

    def classify_speculation(self, text):
        return [Speculation(entry) for entry in self.api_post("/speculation", Request(text))]

    def classify_intent(self, text):
        return [Intent(entry) for entry in self.api_post("/intent", Request(text))]

    def classify_risk(self, text):
        return [Risk(entry) for entry in self.api_post("/risk", Request(text))]

    def classify_comparison(self, text):
        return [Comparison(entry) for entry in self.api_post("/comparison", Request(text))]

    def named_entities(self, text):
        return [NamedEntity(entry) for entry in self.api_post("/namedentity", Request(text))]

    def pos_tag(self, text):
        return [PosTag(entry) for entry in self.api_post("/postag", Request(text))]

    def dependency_parse(self, text):
        return [DependencyParse(entry) for entry in self.api_post("/depparse", Request(text))]

    def chunk_parse(self, text):
        return [ChunkConstituent(entry) for entry in self.api_post("/chunkparse", Request(text))]


class SentimentBias(object):
    def __init__(self, positive=None, negative=None, neutral=None):
        self.positive = positive
        self.negative = negative
        self.neutral = neutral


class Request(object):
    def __init__(self, text, level=None, ratio=None, targets=None, matching=None, bias=None):
        self.text = text
        self.level = level
        self.ratio = ratio
        self.targets = targets
        self.matching = matching
        self.bias = bias
