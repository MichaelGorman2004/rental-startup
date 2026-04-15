"""File upload utility for handling image uploads.

Provides a shared upload function that validates file type and size,
generates a unique filename, and saves the file to the local uploads directory.
"""

import asyncio
import uuid
from pathlib import Path

from fastapi import UploadFile

from app.core.exceptions import BusinessRuleError

# Upload configuration
UPLOAD_DIR = "uploads"
ALLOWED_IMAGE_TYPES: set[str] = {"image/png", "image/jpeg", "image/webp"}
MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024  # 5MB

# Error messages
INVALID_FILE_TYPE_MSG = "Invalid file type. Allowed types: PNG, JPEG, WebP."
FILE_TOO_LARGE_MSG = "File too large. Maximum size is 5MB."
EMPTY_FILE_MSG = "Uploaded file is empty."

# Extension mapping for content types
CONTENT_TYPE_EXTENSIONS: dict[str, str] = {
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "image/webp": ".webp",
}


def _validate_content_type(content_type: str | None) -> str:
    """Validate that the file content type is allowed.

    Args:
        content_type: MIME type of the uploaded file.

    Returns:
        Validated content type string.

    Raises:
        BusinessRuleError: If content type is not allowed.
    """
    if not content_type or content_type not in ALLOWED_IMAGE_TYPES:
        raise BusinessRuleError(INVALID_FILE_TYPE_MSG)
    return content_type


def _generate_unique_filename(content_type: str) -> str:
    """Generate a unique filename using UUID and file extension.

    Args:
        content_type: MIME type used to determine extension.

    Returns:
        Unique filename string (e.g., "a1b2c3d4.png").
    """
    extension = CONTENT_TYPE_EXTENSIONS[content_type]
    return f"{uuid.uuid4()}{extension}"


async def save_upload(file: UploadFile, subfolder: str) -> str:
    """Save an uploaded file to the local uploads directory.

    Validates file type and size, generates a unique filename,
    creates the target directory if needed, and writes the file.

    Args:
        file: The uploaded file from the request.
        subfolder: Subdirectory under uploads/ (e.g., "organizations", "venues").

    Returns:
        Relative URL path (e.g., "/uploads/organizations/uuid.png").

    Raises:
        BusinessRuleError: If file type is invalid or file is too large.
    """
    content_type = _validate_content_type(file.content_type)

    # Read file content and validate size
    content = await file.read()

    if not content:
        raise BusinessRuleError(EMPTY_FILE_MSG)

    if len(content) > MAX_FILE_SIZE_BYTES:
        raise BusinessRuleError(FILE_TOO_LARGE_MSG)

    # Generate unique filename and build path
    filename = _generate_unique_filename(content_type)
    target_dir = Path(UPLOAD_DIR) / subfolder
    file_path = target_dir / filename

    # Perform blocking I/O off the async event loop
    try:
        await asyncio.to_thread(target_dir.mkdir, parents=True, exist_ok=True)
        await asyncio.to_thread(file_path.write_bytes, content)
    except OSError as exc:
        msg = "Failed to save the uploaded file. Please try again."
        raise BusinessRuleError(msg) from exc

    return f"/{UPLOAD_DIR}/{subfolder}/{filename}"
