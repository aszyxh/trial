from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_name: str = "Property Management API"
    api_prefix: str = "/api"
    cors_allow_origins: list[str] = Field(default_factory=lambda: ["http://localhost:3000"])
    supabase_url: str = Field(default="")
    supabase_service_role_key: str = Field(default="")


@lru_cache
def get_settings() -> Settings:
    return Settings()
