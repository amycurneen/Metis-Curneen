class AffectrError(Exception):
    pass

class ClientError(AffectrError):
    """Thrown when there was an error processing the request"""
    pass