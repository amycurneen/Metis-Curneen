"""TheySay Affectr Python Client Library

This module provides a wrapper around the TheySay Affectr API, the
interface to the api is provided by the :py:class:`affectr.Client`
object. See the documentation for that class for how to obtain a reference.

"""

VERSION = (0, 1, 0)

def get_version():
    return '.'.join(str(part) for part in VERSION)

from .client import Client

#import as clientlib so that we don't shadow with the client variable
import client as clientlib

client = None
"""The client to use. Does not exist until
:py:func:`affectr.set_details` has been called.
"""


def set_details(username=None, password=None):
    """Set the global account details to use for requests

    The parameters are your security details which can be found
    on your TheySay developer details page. All are mandatory.
    """
    if username is None:
        raise ValueError("username is required")
    if password is None:
        raise ValueError("password is required")

    global client
    client = Client(username, password)