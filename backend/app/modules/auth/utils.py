"""Authentication utility functions."""

import re
from app.modules.auth.constants import STUDENT_EMAIL_REGEX

def is_valid_student_email(email: str) -> bool:
    """
    Validate if an email address belongs to a .edu domain.
    
    Args:
        email: The email address to validate.
        
    Returns:
        bool: True if valid .edu email, False otherwise.
    """
    return bool(re.match(STUDENT_EMAIL_REGEX, email))
