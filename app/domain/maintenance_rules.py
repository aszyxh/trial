from dataclasses import dataclass


URGENT_KEYWORDS = ("leak", "burst", "gas", "electrical", "overflow", "fire")


@dataclass(frozen=True)
class MaintenanceClassification:
    category: str
    urgency_level: str
    is_urgent: bool


def classify_maintenance_issue(raw_issue_text: str) -> MaintenanceClassification:
    normalized_text = raw_issue_text.lower()
    if any(keyword in normalized_text for keyword in URGENT_KEYWORDS):
        return MaintenanceClassification(category="emergency", urgency_level="Urgent", is_urgent=True)
    return MaintenanceClassification(category="general", urgency_level="Non-Urgent", is_urgent=False)
