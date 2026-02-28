# Equipment Inspection Management System
## Sistema de Gestión de Inspecciones de Equipos de Izaje

Sistema integral para la gestión de inspecciones de equipos de izaje con control de acceso, seguimiento de certificaciones y auditoría completa.

## 🎯 Características

- **Gestión de Equipos**: Código único e historial completo
- **Sistema de Semáforo**: Verde/Amarillo/Rojo por vigencia de inspecciones  
- **Inspecciones Externas**: Cada 6 meses (certificadas)
- **Inspecciones en Sitio**: Cada 2 meses (programa de color)
- **Reportes de Desincorporación**: Documentación de equipos fuera de servicio
- **Auditoría Completa**: Log de operaciones con usuario y fecha/hora
- **Control de Acceso**: 3 perfiles (Admin, Ingeniero, HSE)
- **Exportación**: Reportes en PDF y CSV

## 📁 Estructura

```
aparejo/
├── backend/               # FastAPI + SQLAlchemy
│   ├── app/
│   │   ├── models/        # Entidades
│   │   ├── schemas/       # Validación Pydantic
│   │   ├── utils/         # Servicios/lógica
│   │   ├── routers/       # Endpoints API
│   │   ├── main.py
│   │   ├── config.py
│   │   └── database.py
│   └── requirements.txt
│
├── frontend/              # React + Vite
│   ├── src/
│   │   ├── pages/         # Vistas
│   │   ├── components/    # Componentes
│   │   ├── context/       # Estado global
│   │   ├── services/      # Llamadas API
│   │   └── hooks/         # Custom hooks
│   └── package.json
│
├── database/
│   └── schema.sql         # Esquema MariaDB
│
└── .env.example
```

## 🚀 Quick Start

### Backend
```bash
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r backend/requirements.txt
cd backend
uvicorn app.main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

**Acceso:**
- Frontend: http://localhost:5173
- API: http://localhost:8000
- Docs: http://localhost:8000/docs

## 📋 Perfiles

| Función | Admin | Ingeniero | HSE |
|---------|:-----:|:---------:|:---:|
| Ver equipos | ✓ | ✓ | ✓ |
| Editar equipos | ✓ | ✓ | ✗ |
| Registrar inspecciones | ✓ | ✓ | ✓ |
| Ver reportes | ✓ | ✓ | ✓ |
| Audit trail | ✓ | ✓* | ✓* |
| Administrar usuarios | ✓ | ✗ | ✗ |

*Solo sus propias inspecciones

## 🔐 Seguridad

- JWT + bcrypt
- RBAC (Control por roles)
- Auditoría completa
- IP logging

## 📊 Reportes

- Equipment Status (semáforo)
- Deincorporation
- Inspection Schedule  
- Compliance

Exportables a PDF/CSV
