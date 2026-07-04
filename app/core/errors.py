class AppError(Exception):
    def __init__(self, message: str, status_code: int = 400, code: str = "bad_request") -> None:
        super().__init__(message)
        self.message = message
        self.status_code = status_code
        self.code = code


class NotFoundError(AppError):
    def __init__(self, message: str = "Resource not found") -> None:
        super().__init__(message, status_code=404, code="not_found")


class ExternalServiceError(AppError):
    def __init__(self, message: str = "Upstream service error") -> None:
        super().__init__(message, status_code=503, code="external_service_error")
