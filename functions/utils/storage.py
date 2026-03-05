"""Firebase Storage upload/download utilities."""

from __future__ import annotations

import os
import tempfile
from datetime import timedelta

import firebase_admin
from firebase_admin import storage


def _ensure_app() -> None:
    """Initialize Firebase app if not already initialized."""
    if not firebase_admin._apps:
        firebase_admin.initialize_app()


def upload_to_storage(
    local_path: str,
    remote_path: str,
    content_type: str = "application/hwp+zip",
) -> str:
    """Upload a file to Firebase Storage and return a signed download URL.

    Args:
        local_path: Path to the local file to upload.
        remote_path: Destination path in the storage bucket.
        content_type: MIME type of the file.

    Returns:
        Signed download URL valid for 1 hour.
    """
    _ensure_app()
    bucket = storage.bucket()
    blob = bucket.blob(remote_path)
    blob.upload_from_filename(local_path, content_type=content_type)
    url: str = blob.generate_signed_url(
        expiration=timedelta(hours=1),
        method="GET",
    )
    return url


def download_from_storage(remote_path: str) -> str:
    """Download a file from Firebase Storage to a temp directory.

    Args:
        remote_path: Path in the storage bucket.

    Returns:
        Local path to the downloaded file.
    """
    _ensure_app()
    bucket = storage.bucket()
    blob = bucket.blob(remote_path)
    suffix = os.path.splitext(remote_path)[1] or ".bin"
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=suffix)
    blob.download_to_filename(tmp.name)
    return tmp.name
