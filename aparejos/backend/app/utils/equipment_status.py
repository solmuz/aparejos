"""
Equipment status calculation utility
"""
from datetime import datetime, timedelta
import pytz
from app.config import TIMEZONE, ALERT_DAYS_BEFORE_EXPIRY, EXTERNAL_INSPECTION_CYCLE, FIELD_INSPECTION_CYCLE
from app.models.equipment import EquipmentStatusEnum

def calculate_equipment_status(
    last_external_inspection: datetime | None,
    last_field_inspection: datetime | None,
    is_deincorporated: bool
) -> EquipmentStatusEnum:
    """
    Calculate equipment status based on inspection dates
    Green: Both inspections vigentes
    Yellow: Any inspection due within 30 days
    Red: Any inspection overdue or deincorporated
    """
    if is_deincorporated:
        return EquipmentStatusEnum.RED
    
    tz = pytz.timezone(TIMEZONE)
    now = datetime.now(tz)
    
    # Calculate expiry dates (simplified - actual dates from last inspection + cycle)
    external_expiry = None
    field_expiry = None
    
    if last_external_inspection:
        external_expiry = last_external_inspection + timedelta(days=30*EXTERNAL_INSPECTION_CYCLE)
    
    if last_field_inspection:
        field_expiry = last_field_inspection + timedelta(days=30*FIELD_INSPECTION_CYCLE)
    
    # Check if any inspection is overdue
    if external_expiry and external_expiry < now:
        return EquipmentStatusEnum.RED
    if field_expiry and field_expiry < now:
        return EquipmentStatusEnum.RED
    
    # Check if any inspection is due within alert period
    alert_threshold = now + timedelta(days=ALERT_DAYS_BEFORE_EXPIRY)
    if external_expiry and external_expiry <= alert_threshold:
        return EquipmentStatusEnum.YELLOW
    if field_expiry and field_expiry <= alert_threshold:
        return EquipmentStatusEnum.YELLOW
    
    return EquipmentStatusEnum.GREEN
