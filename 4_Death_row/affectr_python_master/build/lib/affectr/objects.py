class SentimentScore(object):
    def __init__(self, data):
        self.label = data["label"]


class SimpleSentiment(object):
    def __init__(self, data):
        self.sentiment = SentimentScore(data["sentiment"])
        self.wordCount = data["wordCount"]


class SentenceSentiment(object):
    def __init__(self, data):
        self.sentiment = SentimentScore(data["sentiment"])
        self.start = data["start"]
        self.end = data["end"]
        self.text = data["text"]

class WordPolarityTimeline(object):
    def __init__(self, data):
        self.label = data["label"]
        self.timelineY = data["timelineY"]


class WordSentiment(object):
    def __init__(self, data):
        self.sentiment = data["sentiment"]
        self.wordIndex = data["wordIndex"]
        self.text = data["text"]


class EntitySentiment(object):
    def __init__(self, data):
        self.sentiment = SentimentScore(data["sentiment"])
        self.start = data["start"]
        self.end = data["end"]
        self.sentence = data["sentence"]
        self.sentenceHtml = data["sentenceHtml"]
        self.text = data["text"]
        self.headNoun = data["headNoun"]
        self.headNounIndex = data["headNounIndex"]
        self.salience = data["salience"]


class RelatedEntity(object):
    def __init__(self, data):
        self.head = data["head"]
        self.headIndex = data["headIndex"]
        self.text = data["text"]


class EntityRelationSentiment(object):
    def __init__(self, data):
        self.entity1 = RelatedEntity(data["entity1"])
        self.entity2 = RelatedEntity(data["entity2"])
        self.sentiment = SentimentScore(data["sentiment"])
        self.salience = data["salience"]
        self.sentence = data["sentence"]
        self.sentenceHtml = data["sentenceHtml"]


class Speculation(object):
    def __init__(self, data):
        self.start = data["start"]
        self.end = data["end"]
        self.sentenceIndex = data["sentenceIndex"]
        self.speculationType = data["speculationType"]
        self.text = data["text"]


class Intent(object):
    def __init__(self, data):
        self.start = data["start"]
        self.end = data["end"]
        self.sentenceIndex = data["sentenceIndex"]
        self.intentType = data["intentType"]
        self.text = data["text"]


class Risk(object):
    def __init__(self, data):
        self.start = data["start"]
        self.end = data["end"]
        self.sentenceIndex = data["sentenceIndex"]
        self.riskType = data["riskType"]
        self.text = data["text"]


class Comparison(object):
    def __init__(self, data):
        self.start = data["start"]
        self.end = data["end"]
        self.sentenceIndex = data["sentenceIndex"]
        self.comparisonType = data["comparisonType"]
        self.text = data["text"]

class NamedEntity(object):
    def __init__(self, data):
        self.head = data["head"]
        self.headIndex = data["headIndex"]
        self.start = data["start"]
        self.end = data["end"]
        self.sentence = data["sentence"]
        self.sentenceHtml = data["sentenceHtml"]
        self.text = data["text"]
        self.namedEntityTypes = data["namedEntityTypes"]


class PosTag(object):
    def __init__(self, data):
        self.posTag = data["posTag"]
        self.posTaggedWord = data["posTaggedWord"]
        self.sentenceIndex = data["sentenceIndex"]
        self.stem = data["stem"]
        self.text = data["text"]
        self.wordIndex = data["wordIndex"]


class Dependency(object):
    def __init__(self, data):
        self.predicate = data["predicate"]
        self.relation = data["relation"]


class Dependent(object):
    def __init__(self, data):
        self.text = data["text"]
        self.stem = data["stem"]
        self.wordIndex = data["wordIndex"]


class Governor(object):
    def __init__(self, data):
        self.text = data["text"]
        self.stem = data["stem"]
        self.wordIndex = data["wordIndex"]


class DependencyParse(object):
    def __init__(self, data):
        self.dependency = Dependency(data["dependency"])
        self.dependent = Dependent(data["dependent"])
        if "governor" in data:
            self.governor = Governor(data["governor"])


class Chunk(object):
    def __init__(self, data):
        self.chunkType = data["chunkType"]
        self.start = data["start"]
        self.end = data["end"]
        self.text = data["text"]
        self.sentenceIndex = data["sentenceIndex"]


class ChunkHead(object):
    def __init__(self, data):
        self.posTag = data["posTag"]
        self.posTaggedWord = data["posTaggedWord"]
        self.stem = data["stem"]
        self.text = data["text"]
        self.wordIndex = data["wordIndex"]


class ChunkConstituent(object):
    def __init__(self, data):
        self.chunk = Chunk(data["chunk"])
        self.head = ChunkHead(data["head"])