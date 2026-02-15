"""Development and QA scripts for VenueLink backend.

Usage via Poetry:
    poetry run qa       - Run all QA checks
    poetry run lint     - Run ruff linter
    poetry run format   - Format code with black
    poetry run typecheck - Run mypy type checker
"""

import sys
from subprocess import run


def run_command(cmd: list[str], description: str) -> int:
    """Run a command and return exit code."""
    print(f"\n{'='*60}")
    print(f"  {description}")
    print(f"{'='*60}")
    result = run(cmd, check=False)  # noqa: S603
    return result.returncode


def qa() -> int:
    """Run all quality checks: lint, typecheck, format-check."""
    print("\n🔍 Running Quality Assurance Checks...\n")

    # Run linter
    if run_command(
        ["poetry", "run", "ruff", "check", "app/", "alembic/"],
        "🔍 Linting with Ruff",
    ):
        print("\n❌ Linting failed!")
        return 1

    # Run type checker
    if run_command(
        ["poetry", "run", "mypy", "app/", "--strict"],
        "🔎 Type checking with mypy",
    ):
        print("\n❌ Type checking failed!")
        return 1

    # Check formatting
    if run_command(
        ["poetry", "run", "black", "app/", "alembic/", "--check"],
        "🎨 Checking formatting with Black",
    ):
        print("\n❌ Format check failed! Run 'poetry run format' to fix.")
        return 1

    print("\n" + "="*60)
    print("  ✅ All QA checks passed!")
    print("="*60 + "\n")
    return 0


def lint() -> int:
    """Run ruff linter."""
    return run_command(
        ["poetry", "run", "ruff", "check", "app/", "alembic/"],
        "🔍 Running Ruff Linter",
    )


def lint_fix() -> int:
    """Run ruff linter with auto-fix."""
    return run_command(
        ["poetry", "run", "ruff", "check", "app/", "alembic/", "--fix"],
        "🔧 Running Ruff Linter (auto-fix)",
    )


def format_code() -> int:
    """Format code with black."""
    return run_command(
        ["poetry", "run", "black", "app/", "alembic/"],
        "🎨 Formatting with Black",
    )


def typecheck() -> int:
    """Run mypy type checker."""
    return run_command(
        ["poetry", "run", "mypy", "app/", "--strict"],
        "🔎 Type Checking with mypy",
    )


def test() -> int:
    """Run pytest test suite."""
    return run_command(
        ["poetry", "run", "pytest"],
        "🧪 Running Test Suite",
    )


def dev() -> int:
    """Start development server."""
    print("\n🚀 Starting development server...")
    print("    URL: http://localhost:8000")
    print("    Docs: http://localhost:8000/api/docs")
    print("\n")
    result = run(
        ["poetry", "run", "uvicorn", "app.main:app", "--reload"],  # noqa: S603, S607
        check=False,
    )
    return result.returncode


if __name__ == "__main__":
    # Allow running as a script: python scripts.py qa
    if len(sys.argv) > 1:
        command = sys.argv[1]
        func = globals().get(command)
        if callable(func):
            sys.exit(func())
        else:
            print(f"Unknown command: {command}")
            sys.exit(1)
