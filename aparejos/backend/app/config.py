"""
Configuration settings for the application
"""
import os
from dotenv import load_dotenv

load_dotenv()

# Database Configuration
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "mysql+pymysql://user:password@localhost:3306/equipment_inspections"
)

# JWT Configuration
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

# Timezone Configuration
TIMEZONE = os.getenv("TIMEZONE", "America/Bogota")

# Inspection Cycle Configuration (in months)
EXTERNAL_INSPECTION_CYCLE = int(os.getenv("EXTERNAL_INSPECTION_CYCLE", "6"))  # 6 months
FIELD_INSPECTION_CYCLE = int(os.getenv("FIELD_INSPECTION_CYCLE", "2"))  # 2 months

# Alert Configuration (in days)
ALERT_DAYS_BEFORE_EXPIRY = int(os.getenv("ALERT_DAYS_BEFORE_EXPIRY", "30"))  # 30 days

# File Upload Configuration
UPLOAD_DIR = os.getenv("UPLOAD_DIR", "./uploads")
MAX_FILE_SIZE = int(os.getenv("MAX_FILE_SIZE", "10485760"))  # 10 MB

# API Configuration
API_HOST = os.getenv("API_HOST", "0.0.0.0")
API_PORT = int(os.getenv("API_PORT", "8000"))

# CORS Configuration
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000").split(",")
