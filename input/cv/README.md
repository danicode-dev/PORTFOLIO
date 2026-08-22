# SIDN Cost Control

Proyecto completo para control de gasto de campañas publicitarias sobre datos procesados en BigQuery.

El repositorio unifica tres capas de trabajo:

- backend FastAPI conectado a BigQuery
- SQL versionado de tablas y vistas
- frontend React/Vite conectado a la API

## Estructura del proyecto

```text
sidn-genaiarena-equipo4/
|-- backend/
|   |-- app/
|   |   |-- routers/
|   |   |-- services/
|   |   |-- bigquery_client.py
|   |   |-- cache.py
|   |   |-- config.py
|   |   |-- main.py
|   |   `-- models.py
|   |-- requirements.txt
|   `-- __init__.py
|-- docs/
|   `-- assets/
|-- frontend/
|   |-- public/
|   |-- src/
|   |-- package.json
|   `-- vite.config.js
|-- sql/
|   `-- bigquery/
|       |-- tables/
|       |-- views/
|       `-- README.md
|-- .env.example
|-- .gitignore
`-- README.md
```

## Tecnologías

- Python 3.11
- FastAPI
- Uvicorn
- Google BigQuery
- Pydantic
- React 18
- Vite
- Tailwind CSS
- Recharts

## Requisitos previos

- Python 3.11
- Node.js 20 o superior
- Credenciales válidas de Google Cloud para consultar BigQuery

## Puesta en marcha local

Clonar el repositorio:

```powershell
git clone https://github.com/sidn-datascience/sidn-genaiarena-equipo4.git
cd sidn-genaiarena-equipo4
```

Crear el entorno virtual del backend:

```powershell
python -m venv backend/venv
```

Instalar dependencias:

```powershell
backend/venv/Scripts/python.exe -m pip install -r backend/requirements.txt
cmd /c npm install --prefix frontend
```

Crear los archivos de entorno:

```powershell
copy .env.example .env
copy frontend/.env.example frontend/.env
```

Levantar backend y frontend:

```powershell
backend/venv/Scripts/python.exe -m uvicorn backend.app.main:app --reload
cmd /c npm run dev --prefix frontend
```

Atajos para Windows desde la raíz del repo:

```powershell
.\start-backend.cmd
.\start-frontend.cmd
.\start-dev.cmd
```

Servicios disponibles:

- API: `http://127.0.0.1:8000`
- Swagger: `http://127.0.0.1:8000/docs`
- Frontend: `http://127.0.0.1:5173`

Acceso local de la demo del frontend:

- Usuario: `sidn`
- Contraseña: `sidn`

## Endpoints disponibles

- `GET /api/health`
- `GET /api/campaigns/summary`
- `GET /api/campaigns/{campaign_id}/risk-history`
- `GET /api/alerts`
- `GET /api/clients/summary`
- `GET /api/clients/{client_id}/campaigns`

## Vista de Clientes: cambios implementados

Se ha añadido una nueva capa de navegación por clientes usando `account` como identificador provisional del cliente. En esta primera versión no se ha tocado SQL; toda la agregación se hace en backend a partir del resumen de campañas existente.

La guía operativa resumida de esta funcionalidad está en [docs/clientes/README.md](docs/clientes/README.md).

### Backend

- Nuevo modelo `ClientSummary` en `backend/app/models.py`.
- Nuevo router `backend/app/routers/clients.py`.
- Nueva lógica en `backend/app/services/campaign_service.py`:
  - `get_client_summary(period)`
  - `get_client_campaigns(client_id, period)`
- Orden operativo de clientes:
  - primero severidad global
  - luego número de campañas en alerta
  - luego volumen de gasto
  - luego número de campañas

### Frontend

- Nueva ruta `/clients` con listado de clientes.
- Nueva ruta `/clients/:id` con detalle del cliente.
- Nuevo acceso en sidebar: `Clientes`.
- Nuevos hooks:
  - `useClients`
  - `useClientCampaigns`
- Nueva capa API:
  - `fetchClientsSummary`
  - `fetchClientCampaigns`
- Nuevos mocks para clientes en `frontend/src/mocks/clients.js`.
- Identificadores de campana compactos con accion de copiado.
- Accesos rapidos `Ver cliente` desde dashboard y alertas.
- Exportacion de la campana actual en `CSV` y `JSON`.
- Insight V1 sin IA para diagnostico, evidencia y accion sugerida.

### Detalle operativo por cliente

La pantalla de detalle del cliente incluye:

- KPIs agregados del cliente reutilizando la lógica de campañas
- tabla de campañas del cliente ordenada por criticidad
- panel derecho con una campaña seleccionada
- gráfico de evolución y proyección
- resumen textual de picos detectados

### Evolución y picos

El gráfico de gasto se ha ampliado para:

- marcar picos automáticos cuando `cost >= avg_cost_7d * 1.2`
- pintar en rojo los tramos reales o proyectados fuera de presupuesto
- mantener la estética actual del producto
- mostrar un resumen textual de anomalías relevantes bajo el gráfico

### Exportacion e insights V1

La campana seleccionada en cliente o detalle de campana permite:

- exportar el contexto actual a `CSV`
- exportar el contexto actual a `JSON`
- abrir un insight determinista basado en metricas ya calculadas

La documentacion especifica de esta capa esta en [README_INSIGHTS_V1.md](README_INSIGHTS_V1.md).

## Notas de funcionamiento

- `Periodo actual` se calcula con la última fecha disponible en BigQuery para el dataset del MVP. No depende de la fecha del sistema local.
- `GET /api/alerts` devuelve el mismo subconjunto activo de campañas en `RIESGO` o `VIGILAR` que se usa en el resumen de campañas.
- La nueva capa de clientes reutiliza exactamente esa misma foto activa, por lo que clientes, campañas y alertas quedan alineados.
- El login actual del frontend es una pantalla demo cliente para facilitar la navegación local del MVP.

## BigQuery

El MVP trabaja sobre el dataset compartido `extraccion_anonimizada`.

### Tabla base existente

- `extraccion_googgleads`
  Tabla fuente con el detalle operativo de Google Ads. Es el punto de partida sobre el que se construye el resto de la capa analítica.

### Objetos creados para el MVP

#### Tabla

- `tb_campaign_budget_demo`
  Tabla de presupuestos de referencia utilizada por el MVP para comparar gasto acumulado, proyección y margen disponible.

#### Vistas

- `vw_campaign_daily_base`
  Primera capa de consolidación diaria. Agrupa el dato por `account`, `campaign_id` y `date`, y resume gasto, clics, conversiones y valor de conversión.

- `vw_campaign_daily_active`
  Filtra la vista base para conservar únicamente días con actividad relevante, evitando que días sin actividad distorsionen el análisis.

- `vw_campaign_daily_enriched`
  Añade métricas temporales clave, como gasto acumulado e indicador de media móvil de gasto de 7 días (`avg_cost_7d`).

- `vw_campaign_risk_demo`
  Vista principal de riesgo del MVP. Combina actividad diaria enriquecida y presupuestos, recalcula el acumulado dentro del periodo presupuestario y estima el gasto futuro.

- `vw_campaign_risk_summary`
  Conserva la fila más reciente de cada campaña para ofrecer una foto actual lista para backend, dashboard y priorización.

- `vw_campaign_alerts`
  Vista orientada a alertas que parte del resumen actual y filtra campañas en `VIGILAR` o `RIESGO`.

El SQL versionado para recrear la tabla y las vistas está en `sql/bigquery/`.

## Consultas SQL de validación en BigQuery

Estas consultas sirven para verificar que backend y frontend están alineados con la capa analítica actual.

### 1. Foto actual por campaña

```sql
SELECT
  account,
  campaign_id,
  date,
  budget_amount,
  cumulative_cost,
  projected_cost_until_period_end,
  remaining_margin_until_period_end,
  risk_status
FROM `sidn-genaiarena-equipo4.extraccion_anonimizada.vw_campaign_risk_summary`
ORDER BY account, campaign_id;
```

### 2. Alertas activas

```sql
SELECT
  account,
  campaign_id,
  date,
  budget_amount,
  cumulative_cost,
  projected_cost_until_period_end,
  remaining_margin_until_period_end,
  risk_status
FROM `sidn-genaiarena-equipo4.extraccion_anonimizada.vw_campaign_alerts`
ORDER BY remaining_margin_until_period_end ASC;
```

### 3. Resumen por cliente provisional (`account`)

```sql
SELECT
  account AS client_id,
  account AS client_name,
  COUNT(DISTINCT campaign_id) AS total_campaigns,
  SUM(CASE WHEN risk_status = 'RIESGO' THEN 1 ELSE 0 END) AS risk_campaigns,
  SUM(CASE WHEN risk_status = 'VIGILAR' THEN 1 ELSE 0 END) AS watch_campaigns,
  SUM(CASE WHEN risk_status = 'OK' THEN 1 ELSE 0 END) AS ok_campaigns,
  ROUND(SUM(cumulative_cost), 2) AS total_cost,
  ROUND(SUM(budget_amount), 2) AS total_budget,
  ROUND(SUM(projected_cost_until_period_end), 2) AS total_projected_spend,
  ROUND(SUM(remaining_margin_until_period_end), 2) AS remaining_margin,
  CASE
    WHEN SUM(CASE WHEN risk_status = 'RIESGO' THEN 1 ELSE 0 END) > 0 THEN 'RIESGO'
    WHEN SUM(CASE WHEN risk_status = 'VIGILAR' THEN 1 ELSE 0 END) > 0 THEN 'VIGILAR'
    ELSE 'OK'
  END AS risk_status
FROM `sidn-genaiarena-equipo4.extraccion_anonimizada.vw_campaign_risk_summary`
GROUP BY account
ORDER BY
  CASE
    WHEN SUM(CASE WHEN risk_status = 'RIESGO' THEN 1 ELSE 0 END) > 0 THEN 0
    WHEN SUM(CASE WHEN risk_status = 'VIGILAR' THEN 1 ELSE 0 END) > 0 THEN 1
    ELSE 2
  END,
  (SUM(CASE WHEN risk_status IN ('RIESGO', 'VIGILAR') THEN 1 ELSE 0 END)) DESC,
  total_cost DESC,
  total_campaigns DESC;
```

### 4. Campañas de un cliente concreto

```sql
SELECT
  account,
  campaign_id,
  date,
  cumulative_cost,
  budget_amount,
  projected_cost_until_period_end,
  remaining_margin_until_period_end,
  risk_status
FROM `sidn-genaiarena-equipo4.extraccion_anonimizada.vw_campaign_risk_summary`
WHERE account = 'VALOR_DEL_ACCOUNT'
ORDER BY
  CASE risk_status
    WHEN 'RIESGO' THEN 0
    WHEN 'VIGILAR' THEN 1
    ELSE 2
  END,
  remaining_margin_until_period_end ASC;
```

### 5. Días pico para una campaña concreta

```sql
SELECT
  account,
  campaign_id,
  date,
  cost,
  avg_cost_7d,
  ROUND(((cost - avg_cost_7d) / avg_cost_7d) * 100, 2) AS spike_pct
FROM `sidn-genaiarena-equipo4.extraccion_anonimizada.vw_campaign_risk_demo`
WHERE campaign_id = 'VALOR_DEL_CAMPAIGN_ID'
  AND avg_cost_7d > 0
  AND cost >= avg_cost_7d * 1.2
ORDER BY spike_pct DESC, date DESC;
```

## Validación técnica realizada

Se ha validado la implementación con:

- `python -m pytest -q`
- `npm test -- --run`
- `npm run build`

## Estado actual

La versión integrada actual cubre:

- resumen actual de campañas
- histórico de riesgo por campaña
- alertas activas
- nueva navegación por clientes
- detalle operativo por cliente
- proyección de gasto para detección temprana de riesgo
- gráfico con picos automáticos y sobrepaso en rojo
- frontend conectado a endpoints reales

## Siguientes pasos

- introducir nombres reales de cliente mediante una tabla de aliases
- desplegar backend en un entorno compartido
- desplegar frontend en un entorno compartido
- ampliar filtros y consultas de negocio
- evolucionar la lógica de predicción y alertado
