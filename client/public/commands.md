# Databricks Commands & Scripts Reference

**Last Updated:** October 20, 2025  
**Comprehensive Reference for:** CLI, Python SDK, SQL, AI Functions, dbutils, REST API, and MLflow

---

## Table of Contents

1. [Databricks CLI Commands](#databricks-cli)
2. [Python SDK Reference](#python-sdk)
3. [SQL Language Reference](#sql-reference)
4. [AI & ML Commands](#ai-ml-commands)
5. [Databricks Utilities (dbutils)](#dbutils)
6. [REST API Reference](#rest-api)
7. [MLflow Commands](#mlflow)
8. [Delta Lake Commands](#delta-lake)
9. [Unity Catalog Commands](#unity-catalog-commands)
10. [Lakebase (OLTP) Commands](#lakebase-commands)

---

## Databricks CLI Commands {#databricks-cli}

The Databricks CLI provides command-line access to the Databricks platform for automation and scripting.

### Installation

```bash
# Install via Homebrew (macOS/Linux)
brew tap databricks/tap
brew install databricks

# Install via pip
pip install databricks-cli

# Verify installation
databricks --version
```

### Authentication

```bash
# Configure authentication
databricks configure --token

# Login with OAuth
databricks auth login --host https://your-workspace.cloud.databricks.com

# List configured profiles
databricks auth profiles

# Use specific profile
databricks --profile <profile-name> <command>
```

### Workspace Commands

```bash
# List workspace objects
databricks workspace list /Users/your.email@company.com

# Export notebook
databricks workspace export /path/to/notebook notebook.py --format SOURCE

# Import notebook
databricks workspace import /path/to/notebook notebook.py --language PYTHON

# Export directory recursively
databricks workspace export-dir /source/path ./local/path --format SOURCE

# Import directory
databricks workspace import-dir ./local/path /target/path

# Delete workspace object
databricks workspace delete /path/to/object

# Create directory
databricks workspace mkdirs /path/to/directory

# Get object status
databricks workspace get-status /path/to/object
```

### Cluster Commands

```bash
# List all clusters
databricks clusters list

# Get cluster details
databricks clusters get --cluster-id <cluster-id>

# Create cluster
databricks clusters create --json-file cluster-config.json

# Start cluster
databricks clusters start --cluster-id <cluster-id>

# Restart cluster
databricks clusters restart --cluster-id <cluster-id>

# Terminate cluster
databricks clusters delete --cluster-id <cluster-id>

# Permanent delete
databricks clusters permanent-delete --cluster-id <cluster-id>

# Resize cluster
databricks clusters resize --cluster-id <cluster-id> --num-workers 5

# List available Spark versions
databricks clusters spark-versions

# List available node types
databricks clusters list-node-types

# List availability zones
databricks clusters list-zones

# Pin cluster (prevent auto-termination)
databricks clusters pin --cluster-id <cluster-id>

# Unpin cluster
databricks clusters unpin --cluster-id <cluster-id>

# Get cluster events
databricks clusters events --cluster-id <cluster-id>

# Change cluster owner
databricks clusters change-owner --cluster-id <cluster-id> --owner-username new.owner@company.com
```

### Jobs Commands

```bash
# List all jobs
databricks jobs list

# Get job details
databricks jobs get --job-id <job-id>

# Create job
databricks jobs create --json-file job-config.json

# Update job
databricks jobs update --job-id <job-id> --json-file job-config.json

# Delete job
databricks jobs delete --job-id <job-id>

# Run job now
databricks jobs run-now --job-id <job-id>

# Submit one-time run
databricks jobs submit --json-file run-config.json

# List job runs
databricks jobs list-runs --job-id <job-id>

# Get run details
databricks jobs get-run --run-id <run-id>

# Get run output
databricks jobs get-run-output --run-id <run-id>

# Cancel run
databricks jobs cancel-run --run-id <run-id>

# Cancel all runs for a job
databricks jobs cancel-all-runs --job-id <job-id>

# Delete run
databricks jobs delete-run --run-id <run-id>

# Repair failed run
databricks jobs repair-run --run-id <run-id> --rerun-tasks task1,task2

# Export run
databricks jobs export-run --run-id <run-id>
```

### File System (fs) Commands

```bash
# List files
databricks fs ls dbfs:/path/to/directory

# Copy file
databricks fs cp dbfs:/source/file dbfs:/destination/file

# Copy with recursion
databricks fs cp -r dbfs:/source/dir dbfs:/destination/dir

# Create directory
databricks fs mkdirs dbfs:/path/to/directory

# Remove file
databricks fs rm dbfs:/path/to/file

# Remove directory recursively
databricks fs rm -r dbfs:/path/to/directory

# Read file content
databricks fs cat dbfs:/path/to/file

# Move file
databricks fs mv dbfs:/source/file dbfs:/destination/file
```

### Secrets Commands

```bash
# Create secret scope
databricks secrets create-scope --scope my-scope

# List secret scopes
databricks secrets list-scopes

# Delete secret scope
databricks secrets delete-scope --scope my-scope

# Put secret
databricks secrets put-secret --scope my-scope --key my-key

# Get secret (metadata only)
databricks secrets get-secret --scope my-scope --key my-key

# List secrets in scope
databricks secrets list-secrets --scope my-scope

# Delete secret
databricks secrets delete-secret --scope my-scope --key my-key

# Put ACL
databricks secrets put-acl --scope my-scope --principal user@company.com --permission READ

# Get ACL
databricks secrets get-acl --scope my-scope --principal user@company.com

# List ACLs
databricks secrets list-acls --scope my-scope

# Delete ACL
databricks secrets delete-acl --scope my-scope --principal user@company.com
```

### Git Repos Commands

```bash
# List repos
databricks repos list

# Get repo details
databricks repos get --repo-id <repo-id>

# Create repo
databricks repos create --url https://github.com/user/repo --provider github

# Update repo
databricks repos update --repo-id <repo-id> --branch main

# Delete repo
databricks repos delete --repo-id <repo-id>
```

### Unity Catalog Commands

```bash
# List catalogs
databricks catalogs list

# Create catalog
databricks catalogs create --name my_catalog

# Get catalog
databricks catalogs get --name my_catalog

# Update catalog
databricks catalogs update --name my_catalog --comment "Updated description"

# Delete catalog
databricks catalogs delete --name my_catalog

# List schemas
databricks schemas list --catalog-name my_catalog

# Create schema
databricks schemas create --catalog-name my_catalog --name my_schema

# List tables
databricks tables list --catalog-name my_catalog --schema-name my_schema

# Get table
databricks tables get --full-name my_catalog.my_schema.my_table

# List volumes
databricks volumes list --catalog-name my_catalog --schema-name my_schema

# Create volume
databricks volumes create --catalog-name my_catalog --schema-name my_schema --name my_volume --volume-type MANAGED
```

### Pipeline Commands (Delta Live Tables)

```bash
# List pipelines
databricks pipelines list

# Get pipeline
databricks pipelines get --pipeline-id <pipeline-id>

# Create pipeline
databricks pipelines create --json-file pipeline-config.json

# Update pipeline
databricks pipelines update --pipeline-id <pipeline-id> --json-file pipeline-config.json

# Delete pipeline
databricks pipelines delete --pipeline-id <pipeline-id>

# Start pipeline update
databricks pipelines start-update --pipeline-id <pipeline-id>

# Stop pipeline
databricks pipelines stop --pipeline-id <pipeline-id>

# List pipeline updates
databricks pipelines list-updates --pipeline-id <pipeline-id>

# Get pipeline update
databricks pipelines get-update --pipeline-id <pipeline-id> --update-id <update-id>

# List pipeline events
databricks pipelines list-pipeline-events --pipeline-id <pipeline-id>
```

### Model Serving Commands

```bash
# List serving endpoints
databricks serving-endpoints list

# Get serving endpoint
databricks serving-endpoints get --name my-endpoint

# Create serving endpoint
databricks serving-endpoints create --json-file endpoint-config.json

# Update serving endpoint
databricks serving-endpoints update-config --name my-endpoint --json-file config.json

# Delete serving endpoint
databricks serving-endpoints delete --name my-endpoint

# Query serving endpoint
databricks serving-endpoints query --name my-endpoint --json-file input.json

# Get endpoint logs
databricks serving-endpoints logs --name my-endpoint

# Get build logs
databricks serving-endpoints build-logs --name my-endpoint

# Export metrics
databricks serving-endpoints export-metrics --name my-endpoint
```

### Apps Commands

```bash
# List apps
databricks apps list

# Get app details
databricks apps get --name my-app

# Create app
databricks apps create --json-file app-config.json

# Update app
databricks apps update --name my-app --json-file app-config.json

# Delete app
databricks apps delete --name my-app

# Deploy app
databricks apps deploy --name my-app --source-code-path ./app

# Get app logs
databricks apps logs --name my-app

# Stop app
databricks apps stop --name my-app

# Start app
databricks apps start --name my-app
```

### Permissions Commands

```bash
# Get permissions
databricks permissions get --object-type clusters --object-id <cluster-id>

# Set permissions
databricks permissions set --object-type jobs --object-id <job-id> --json-file permissions.json

# Update permissions
databricks permissions update --object-type notebooks --object-id /path/to/notebook --json-file permissions.json

# Get permission levels
databricks permissions get-permission-levels --object-type clusters
```

### Global Flags

```bash
# Use specific profile
--profile <profile-name>

# Output as JSON
--output json

# Output as table
--output table

# Debug mode
--debug

# Specify host
--host https://workspace.cloud.databricks.com

# Specify token
--token <access-token>
```

---

## Python SDK Reference {#python-sdk}

The Databricks SDK for Python provides programmatic access to Databricks services.

### Installation

```bash
pip install databricks-sdk
```

### Authentication

```python
from databricks.sdk import WorkspaceClient

# Using default authentication (reads from .databrickscfg)
w = WorkspaceClient()

# Using token authentication
w = WorkspaceClient(
    host='https://your-workspace.cloud.databricks.com',
    token='your-access-token'
)

# Using OAuth
w = WorkspaceClient(
    host='https://your-workspace.cloud.databricks.com',
    client_id='your-client-id',
    client_secret='your-client-secret'
)

# Using Azure CLI authentication
from databricks.sdk.core import Config
config = Config(
    host='https://adb-xxx.azuredatabricks.net',
    auth_type='azure-cli'
)
w = WorkspaceClient(config=config)
```

### Workspace Operations

```python
# List workspace objects
objects = w.workspace.list('/Users/your.email@company.com')
for obj in objects:
    print(f"{obj.path} - {obj.object_type}")

# Export notebook
content = w.workspace.export('/path/to/notebook', format='SOURCE')
with open('notebook.py', 'wb') as f:
    f.write(content.content)

# Import notebook
with open('notebook.py', 'rb') as f:
    w.workspace.import_(
        path='/path/to/notebook',
        format='SOURCE',
        language='PYTHON',
        content=f.read()
    )

# Delete object
w.workspace.delete('/path/to/object')

# Create directory
w.workspace.mkdirs('/path/to/directory')

# Get object status
status = w.workspace.get_status('/path/to/object')
print(f"Object type: {status.object_type}")
```

### Cluster Operations

```python
from databricks.sdk.service.compute import ClusterSpec, AutoScale

# List clusters
clusters = w.clusters.list()
for cluster in clusters:
    print(f"{cluster.cluster_name}: {cluster.state}")

# Get cluster
cluster = w.clusters.get(cluster_id='cluster-id')

# Create cluster
cluster = w.clusters.create(
    cluster_name='my-cluster',
    spark_version='13.3.x-scala2.12',
    node_type_id='i3.xlarge',
    autoscale=AutoScale(min_workers=1, max_workers=5),
    autotermination_minutes=30
)
print(f"Created cluster: {cluster.cluster_id}")

# Start cluster
w.clusters.start(cluster_id='cluster-id')

# Restart cluster
w.clusters.restart(cluster_id='cluster-id')

# Terminate cluster
w.clusters.delete(cluster_id='cluster-id')

# Resize cluster
w.clusters.resize(cluster_id='cluster-id', num_workers=10)

# Pin cluster
w.clusters.pin(cluster_id='cluster-id')

# Wait for cluster to be running
w.clusters.wait_get_cluster_running(cluster_id='cluster-id')
```

### Jobs Operations

```python
from databricks.sdk.service.jobs import Task, NotebookTask, JobCluster

# List jobs
jobs = w.jobs.list()
for job in jobs:
    print(f"{job.settings.name}: {job.job_id}")

# Create job
job = w.jobs.create(
    name='my-job',
    tasks=[
        Task(
            task_key='task1',
            notebook_task=NotebookTask(
                notebook_path='/path/to/notebook',
                base_parameters={'param1': 'value1'}
            ),
            job_cluster_key='job-cluster'
        )
    ],
    job_clusters=[
        JobCluster(
            job_cluster_key='job-cluster',
            new_cluster=ClusterSpec(
                spark_version='13.3.x-scala2.12',
                node_type_id='i3.xlarge',
                num_workers=2
            )
        )
    ]
)
print(f"Created job: {job.job_id}")

# Run job
run = w.jobs.run_now(job_id=job.job_id)
print(f"Started run: {run.run_id}")

# Get run
run_details = w.jobs.get_run(run_id=run.run_id)
print(f"Run state: {run_details.state.life_cycle_state}")

# Wait for run to complete
w.jobs.wait_get_run_job_terminated_or_skipped(run_id=run.run_id)

# Cancel run
w.jobs.cancel_run(run_id=run.run_id)

# Delete job
w.jobs.delete(job_id=job.job_id)
```

### DBFS Operations

```python
# List files
files = w.dbfs.list('/path/to/directory')
for file in files:
    print(f"{file.path} - {file.file_size} bytes")

# Read file
content = w.dbfs.read('/path/to/file')
print(content.data.decode('utf-8'))

# Write file
w.dbfs.put('/path/to/file', contents=b'Hello, World!')

# Delete file
w.dbfs.delete('/path/to/file')

# Create directory
w.dbfs.mkdirs('/path/to/directory')

# Move file
w.dbfs.move_('/source/path', '/destination/path')
```

### Secrets Operations

```python
from databricks.sdk.service.workspace import AclPermission

# Create secret scope
w.secrets.create_scope(scope='my-scope')

# List scopes
scopes = w.secrets.list_scopes()
for scope in scopes:
    print(scope.name)

# Put secret
w.secrets.put_secret(
    scope='my-scope',
    key='my-key',
    string_value='my-secret-value'
)

# List secrets
secrets = w.secrets.list_secrets(scope='my-scope')
for secret in secrets:
    print(secret.key)

# Delete secret
w.secrets.delete_secret(scope='my-scope', key='my-key')

# Put ACL
w.secrets.put_acl(
    scope='my-scope',
    principal='user@company.com',
    permission=AclPermission.READ
)

# List ACLs
acls = w.secrets.list_acls(scope='my-scope')
for acl in acls:
    print(f"{acl.principal}: {acl.permission}")

# Delete scope
w.secrets.delete_scope(scope='my-scope')
```

### Unity Catalog Operations

```python
from databricks.sdk.service.catalog import CatalogInfo, SchemaInfo, TableInfo

# List catalogs
catalogs = w.catalogs.list()
for catalog in catalogs:
    print(catalog.name)

# Create catalog
catalog = w.catalogs.create(name='my_catalog', comment='My catalog')

# Get catalog
catalog = w.catalogs.get(name='my_catalog')

# Update catalog
w.catalogs.update(name='my_catalog', comment='Updated comment')

# Delete catalog
w.catalogs.delete(name='my_catalog', force=True)

# List schemas
schemas = w.schemas.list(catalog_name='my_catalog')
for schema in schemas:
    print(schema.name)

# Create schema
schema = w.schemas.create(
    name='my_schema',
    catalog_name='my_catalog',
    comment='My schema'
)

# List tables
tables = w.tables.list(catalog_name='my_catalog', schema_name='my_schema')
for table in tables:
    print(f"{table.name} - {table.table_type}")

# Get table
table = w.tables.get(full_name='my_catalog.my_schema.my_table')

# Grant permissions
w.grants.update(
    full_name='my_catalog.my_schema.my_table',
    principal='user@company.com',
    privileges=['SELECT', 'MODIFY']
)
```

### MLflow Operations

```python
from databricks.sdk.service.ml import CreateExperiment, CreateRun

# Create experiment
experiment = w.experiments.create_experiment(
    name='/Users/your.email/my-experiment',
    artifact_location='dbfs:/experiments/my-experiment'
)

# List experiments
experiments = w.experiments.list_experiments()
for exp in experiments:
    print(f"{exp.name}: {exp.experiment_id}")

# Create run
run = w.experiments.create_run(experiment_id=experiment.experiment_id)

# Log metric
w.experiments.log_metric(
    run_id=run.run_id,
    key='accuracy',
    value=0.95,
    timestamp=int(time.time() * 1000)
)

# Log param
w.experiments.log_param(
    run_id=run.run_id,
    key='learning_rate',
    value='0.001'
)

# Update run
w.experiments.update_run(
    run_id=run.run_id,
    status='FINISHED'
)

# Search runs
runs = w.experiments.search_runs(
    experiment_ids=[experiment.experiment_id],
    filter_string='metrics.accuracy > 0.9'
)
```

### Model Serving Operations

```python
from databricks.sdk.service.serving import ServedModelInput, EndpointCoreConfigInput

# List serving endpoints
endpoints = w.serving_endpoints.list()
for endpoint in endpoints:
    print(f"{endpoint.name}: {endpoint.state.ready}")

# Create serving endpoint
endpoint = w.serving_endpoints.create(
    name='my-endpoint',
    config=EndpointCoreConfigInput(
        served_models=[
            ServedModelInput(
                model_name='my_catalog.my_schema.my_model',
                model_version='1',
                workload_size='Small',
                scale_to_zero_enabled=True
            )
        ]
    )
)

# Query endpoint
response = w.serving_endpoints.query(
    name='my-endpoint',
    inputs={'text': 'Hello, world!'}
)
print(response.predictions)

# Delete endpoint
w.serving_endpoints.delete(name='my-endpoint')
```

### Pipeline Operations

```python
from databricks.sdk.service.pipelines import PipelineSpec, NotebookLibrary

# Create pipeline
pipeline = w.pipelines.create(
    name='my-pipeline',
    storage='/dbfs/pipelines/my-pipeline',
    configuration={'key': 'value'},
    clusters=[{
        'label': 'default',
        'num_workers': 2
    }],
    libraries=[
        NotebookLibrary(path='/path/to/notebook')
    ]
)

# Start pipeline update
update = w.pipelines.start_update(pipeline_id=pipeline.pipeline_id)

# Get pipeline
pipeline_info = w.pipelines.get(pipeline_id=pipeline.pipeline_id)

# Stop pipeline
w.pipelines.stop(pipeline_id=pipeline.pipeline_id)

# Delete pipeline
w.pipelines.delete(pipeline_id=pipeline.pipeline_id)
```

---

## SQL Language Reference {#sql-reference}

Comprehensive SQL commands for Databricks SQL and Databricks Runtime.

### DDL (Data Definition Language)

#### Catalog Operations

```sql
-- Create catalog
CREATE CATALOG IF NOT EXISTS my_catalog
COMMENT 'Production catalog';

-- Show catalogs
SHOW CATALOGS;

-- Use catalog
USE CATALOG my_catalog;

-- Describe catalog
DESCRIBE CATALOG my_catalog;

-- Alter catalog
ALTER CATALOG my_catalog SET OWNER TO `data-engineers`;

-- Drop catalog
DROP CATALOG IF EXISTS my_catalog CASCADE;
```

#### Schema Operations

```sql
-- Create schema
CREATE SCHEMA IF NOT EXISTS my_catalog.my_schema
COMMENT 'Analytics schema'
LOCATION 's3://my-bucket/schemas/my_schema';

-- Show schemas
SHOW SCHEMAS IN my_catalog;

-- Use schema
USE my_catalog.my_schema;

-- Describe schema
DESCRIBE SCHEMA EXTENDED my_catalog.my_schema;

-- Alter schema
ALTER SCHEMA my_catalog.my_schema SET DBPROPERTIES ('department' = 'analytics');

-- Drop schema
DROP SCHEMA IF EXISTS my_catalog.my_schema CASCADE;
```

#### Table Operations

```sql
-- Create managed table
CREATE TABLE IF NOT EXISTS my_catalog.my_schema.customers (
    customer_id BIGINT GENERATED ALWAYS AS IDENTITY,
    name STRING NOT NULL,
    email STRING,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP,
    CONSTRAINT valid_email CHECK (email LIKE '%@%')
)
USING DELTA
PARTITIONED BY (DATE(created_at))
TBLPROPERTIES (
    'delta.autoOptimize.optimizeWrite' = 'true',
    'delta.autoOptimize.autoCompact' = 'true'
)
COMMENT 'Customer master data';

-- Create external table
CREATE EXTERNAL TABLE my_catalog.my_schema.events
LOCATION 's3://my-bucket/events/'
AS SELECT * FROM source_table;

-- Create table from query
CREATE TABLE my_catalog.my_schema.aggregated_data
AS SELECT 
    customer_id,
    COUNT(*) as order_count,
    SUM(amount) as total_amount
FROM orders
GROUP BY customer_id;

-- Show tables
SHOW TABLES IN my_catalog.my_schema;

-- Describe table
DESCRIBE TABLE EXTENDED my_catalog.my_schema.customers;

-- Show create table
SHOW CREATE TABLE my_catalog.my_schema.customers;

-- Alter table - add column
ALTER TABLE my_catalog.my_schema.customers
ADD COLUMN phone STRING AFTER email;

-- Alter table - rename column
ALTER TABLE my_catalog.my_schema.customers
RENAME COLUMN phone TO phone_number;

-- Alter table - change column type
ALTER TABLE my_catalog.my_schema.customers
ALTER COLUMN phone_number TYPE VARCHAR(20);

-- Alter table - drop column
ALTER TABLE my_catalog.my_schema.customers
DROP COLUMN phone_number;

-- Alter table - set properties
ALTER TABLE my_catalog.my_schema.customers
SET TBLPROPERTIES ('retention_days' = '365');

-- Alter table - change owner
ALTER TABLE my_catalog.my_schema.customers
SET OWNER TO `data-team`;

-- Drop table
DROP TABLE IF EXISTS my_catalog.my_schema.customers;

-- Undrop table (Delta Lake)
UNDROP TABLE my_catalog.my_schema.customers;

-- Truncate table
TRUNCATE TABLE my_catalog.my_schema.customers;
```

#### View Operations

```sql
-- Create view
CREATE VIEW my_catalog.my_schema.active_customers AS
SELECT *
FROM my_catalog.my_schema.customers
WHERE status = 'active';

-- Create or replace view
CREATE OR REPLACE VIEW my_catalog.my_schema.customer_summary AS
SELECT 
    customer_id,
    name,
    COUNT(order_id) as total_orders
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY customer_id, name;

-- Create temporary view
CREATE TEMP VIEW temp_customers AS
SELECT * FROM customers WHERE created_at >= CURRENT_DATE();

-- Show views
SHOW VIEWS IN my_catalog.my_schema;

-- Describe view
DESCRIBE VIEW my_catalog.my_schema.active_customers;

-- Drop view
DROP VIEW IF EXISTS my_catalog.my_schema.active_customers;
```

#### Materialized View Operations

```sql
-- Create materialized view
CREATE MATERIALIZED VIEW my_catalog.my_schema.customer_metrics
AS SELECT 
    customer_id,
    COUNT(*) as order_count,
    SUM(amount) as lifetime_value,
    MAX(order_date) as last_order_date
FROM orders
GROUP BY customer_id;

-- Refresh materialized view
REFRESH MATERIALIZED VIEW my_catalog.my_schema.customer_metrics;

-- Drop materialized view
DROP MATERIALIZED VIEW my_catalog.my_schema.customer_metrics;
```

#### Volume Operations

```sql
-- Create managed volume
CREATE VOLUME IF NOT EXISTS my_catalog.my_schema.my_volume;

-- Create external volume
CREATE EXTERNAL VOLUME my_catalog.my_schema.external_volume
LOCATION 's3://my-bucket/volumes/external';

-- Show volumes
SHOW VOLUMES IN my_catalog.my_schema;

-- Describe volume
DESCRIBE VOLUME my_catalog.my_schema.my_volume;

-- Drop volume
DROP VOLUME IF EXISTS my_catalog.my_schema.my_volume;
```

### DML (Data Manipulation Language)

#### INSERT Operations

```sql
-- Insert single row
INSERT INTO my_catalog.my_schema.customers (name, email)
VALUES ('John Doe', 'john@example.com');

-- Insert multiple rows
INSERT INTO my_catalog.my_schema.customers (name, email)
VALUES 
    ('Jane Smith', 'jane@example.com'),
    ('Bob Johnson', 'bob@example.com'),
    ('Alice Williams', 'alice@example.com');

-- Insert from SELECT
INSERT INTO my_catalog.my_schema.customers_archive
SELECT * FROM my_catalog.my_schema.customers
WHERE created_at < '2020-01-01';

-- Insert overwrite
INSERT OVERWRITE TABLE my_catalog.my_schema.daily_summary
SELECT 
    DATE(timestamp) as date,
    COUNT(*) as event_count
FROM events
WHERE DATE(timestamp) = CURRENT_DATE()
GROUP BY DATE(timestamp);
```

#### UPDATE Operations

```sql
-- Simple update
UPDATE my_catalog.my_schema.customers
SET status = 'inactive'
WHERE last_order_date < CURRENT_DATE() - INTERVAL 365 DAYS;

-- Update with subquery
UPDATE my_catalog.my_schema.customers c
SET lifetime_value = (
    SELECT SUM(amount)
    FROM orders o
    WHERE o.customer_id = c.customer_id
)
WHERE EXISTS (
    SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id
);

-- Update multiple columns
UPDATE my_catalog.my_schema.customers
SET 
    status = 'vip',
    tier = 'gold',
    updated_at = CURRENT_TIMESTAMP()
WHERE lifetime_value > 10000;
```

#### DELETE Operations

```sql
-- Simple delete
DELETE FROM my_catalog.my_schema.customers
WHERE status = 'deleted';

-- Delete with subquery
DELETE FROM my_catalog.my_schema.orders
WHERE customer_id IN (
    SELECT customer_id
    FROM customers
    WHERE status = 'inactive'
);

-- Delete with join
DELETE FROM my_catalog.my_schema.orders o
WHERE EXISTS (
    SELECT 1
    FROM customers c
    WHERE c.customer_id = o.customer_id
    AND c.status = 'fraud'
);
```

#### MERGE Operations

```sql
-- Merge (upsert) operation
MERGE INTO my_catalog.my_schema.customers target
USING (
    SELECT customer_id, name, email, updated_at
    FROM staging.new_customers
) source
ON target.customer_id = source.customer_id
WHEN MATCHED AND source.updated_at > target.updated_at THEN
    UPDATE SET 
        target.name = source.name,
        target.email = source.email,
        target.updated_at = source.updated_at
WHEN NOT MATCHED THEN
    INSERT (customer_id, name, email, created_at)
    VALUES (source.customer_id, source.name, source.email, CURRENT_TIMESTAMP())
WHEN NOT MATCHED BY SOURCE AND target.status = 'pending' THEN
    DELETE;
```

#### COPY INTO Operations

```sql
-- Copy from cloud storage
COPY INTO my_catalog.my_schema.events
FROM 's3://my-bucket/events/'
FILEFORMAT = PARQUET
PATTERN = '*.parquet'
FORMAT_OPTIONS ('mergeSchema' = 'true')
COPY_OPTIONS ('mergeSchema' = 'true');

-- Copy with schema evolution
COPY INTO my_catalog.my_schema.json_data
FROM 's3://my-bucket/json/'
FILEFORMAT = JSON
FORMAT_OPTIONS ('inferSchema' = 'true');
```

### DQL (Data Query Language)

#### SELECT Operations

```sql
-- Basic select
SELECT * FROM my_catalog.my_schema.customers;

-- Select with WHERE
SELECT name, email
FROM my_catalog.my_schema.customers
WHERE status = 'active'
AND created_at >= '2024-01-01';

-- Select with JOIN
SELECT 
    c.name,
    c.email,
    COUNT(o.order_id) as order_count,
    SUM(o.amount) as total_spent
FROM my_catalog.my_schema.customers c
LEFT JOIN my_catalog.my_schema.orders o 
    ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.name, c.email
HAVING total_spent > 1000
ORDER BY total_spent DESC
LIMIT 100;

-- Select with window functions
SELECT 
    customer_id,
    order_date,
    amount,
    SUM(amount) OVER (
        PARTITION BY customer_id 
        ORDER BY order_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) as running_total,
    ROW_NUMBER() OVER (
        PARTITION BY customer_id 
        ORDER BY order_date DESC
    ) as order_rank
FROM my_catalog.my_schema.orders;

-- Select with CTE
WITH monthly_sales AS (
    SELECT 
        DATE_TRUNC('month', order_date) as month,
        SUM(amount) as total_sales
    FROM orders
    GROUP BY month
),
sales_growth AS (
    SELECT 
        month,
        total_sales,
        LAG(total_sales) OVER (ORDER BY month) as prev_month_sales,
        (total_sales - LAG(total_sales) OVER (ORDER BY month)) / 
            LAG(total_sales) OVER (ORDER BY month) * 100 as growth_pct
    FROM monthly_sales
)
SELECT * FROM sales_growth
WHERE growth_pct > 10;
```

### Delta Lake Commands

```sql
-- Optimize table
OPTIMIZE my_catalog.my_schema.events
WHERE date >= '2024-01-01';

-- Z-order optimization
OPTIMIZE my_catalog.my_schema.events
ZORDER BY (customer_id, event_type);

-- Vacuum (remove old files)
VACUUM my_catalog.my_schema.events RETAIN 168 HOURS;

-- Describe history
DESCRIBE HISTORY my_catalog.my_schema.events;

-- Time travel query
SELECT * FROM my_catalog.my_schema.events
VERSION AS OF 10;

SELECT * FROM my_catalog.my_schema.events
TIMESTAMP AS OF '2024-10-01 00:00:00';

-- Restore table to previous version
RESTORE TABLE my_catalog.my_schema.events
TO VERSION AS OF 10;

RESTORE TABLE my_catalog.my_schema.events
TO TIMESTAMP AS OF '2024-10-01 00:00:00';

-- Convert to Delta
CONVERT TO DELTA parquet.`s3://my-bucket/data/`;

-- Generate manifest file
GENERATE manifest FOR TABLE my_catalog.my_schema.events;

-- Clone table (shallow)
CREATE TABLE my_catalog.my_schema.events_clone
SHALLOW CLONE my_catalog.my_schema.events;

-- Clone table (deep)
CREATE TABLE my_catalog.my_schema.events_backup
DEEP CLONE my_catalog.my_schema.events;
```

### Security & Permissions

```sql
-- Grant privileges
GRANT SELECT ON TABLE my_catalog.my_schema.customers 
TO `data-analysts`;

GRANT ALL PRIVILEGES ON SCHEMA my_catalog.my_schema 
TO `data-engineers`;

GRANT USAGE ON CATALOG my_catalog 
TO `account users`;

-- Revoke privileges
REVOKE SELECT ON TABLE my_catalog.my_schema.customers 
FROM `contractors`;

-- Show grants
SHOW GRANTS ON TABLE my_catalog.my_schema.customers;

SHOW GRANTS TO `data-analysts`;

-- Deny privileges
DENY SELECT ON TABLE my_catalog.my_schema.sensitive_data 
TO `external-users`;
```

---

*This is part 1 of the comprehensive commands reference. The document continues with AI & ML Commands, dbutils, REST API, MLflow, and more...*




## AI & ML Commands {#ai-ml-commands}

### AI Functions

Databricks AI Functions allow you to apply AI models directly in SQL queries.

#### ai_query Function

```sql
-- Query any serving endpoint
SELECT 
    customer_id,
    feedback,
    ai_query(
        'my-sentiment-endpoint',
        feedback
    ) as sentiment
FROM customer_feedback;

-- With custom parameters
SELECT 
    ai_query(
        'my-llm-endpoint',
        'Summarize this text: ' || article_text,
        NAMED_STRUCT(
            'max_tokens', 100,
            'temperature', 0.7
        )
    ) as summary
FROM articles;
```

#### ai_gen Function

```sql
-- Generate text using built-in LLM
SELECT 
    product_name,
    ai_gen(
        'Write a marketing description for: ' || product_name
    ) as description
FROM products;

-- With specific model
SELECT 
    ai_gen(
        'Translate to French: ' || english_text,
        'databricks-meta-llama-3-1-70b-instruct'
    ) as french_translation
FROM content;
```

#### ai_extract Function

```sql
-- Extract structured information
SELECT 
    ai_extract(
        review_text,
        ARRAY('product_name', 'rating', 'sentiment')
    ) as extracted_data
FROM product_reviews;
```

#### ai_classify Function

```sql
-- Classify text
SELECT 
    ticket_id,
    description,
    ai_classify(
        description,
        ARRAY('bug', 'feature_request', 'question', 'complaint')
    ) as category
FROM support_tickets;
```

#### ai_similarity Function

```sql
-- Calculate semantic similarity
SELECT 
    doc1.id as doc1_id,
    doc2.id as doc2_id,
    ai_similarity(doc1.content, doc2.content) as similarity_score
FROM documents doc1
CROSS JOIN documents doc2
WHERE doc1.id < doc2.id
AND ai_similarity(doc1.content, doc2.content) > 0.8;
```

#### ai_forecast Function

```sql
-- Time series forecasting
SELECT 
    product_id,
    ai_forecast(
        COLLECT_LIST(STRUCT(date, sales_amount)),
        30  -- forecast 30 days
    ) as forecast
FROM daily_sales
GROUP BY product_id;
```

### MLflow Commands

#### Python MLflow API

```python
import mlflow
import mlflow.sklearn
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

# Set experiment
mlflow.set_experiment("/Users/your.email/my-experiment")

# Start run
with mlflow.start_run(run_name="random-forest-experiment"):
    # Log parameters
    mlflow.log_param("n_estimators", 100)
    mlflow.log_param("max_depth", 10)
    mlflow.log_param("random_state", 42)
    
    # Train model
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    model = RandomForestClassifier(n_estimators=100, max_depth=10, random_state=42)
    model.fit(X_train, y_train)
    
    # Log metrics
    train_score = model.score(X_train, y_train)
    test_score = model.score(X_test, y_test)
    mlflow.log_metric("train_accuracy", train_score)
    mlflow.log_metric("test_accuracy", test_score)
    
    # Log model
    mlflow.sklearn.log_model(
        model, 
        "model",
        registered_model_name="my_catalog.my_schema.random_forest_model"
    )
    
    # Log artifacts
    mlflow.log_artifact("feature_importance.png")
    
    # Set tags
    mlflow.set_tag("model_type", "classification")
    mlflow.set_tag("framework", "sklearn")
```

#### MLflow Model Registry

```python
from mlflow.tracking import MlflowClient

client = MlflowClient()

# Register model
model_uri = f"runs:/{run_id}/model"
model_details = mlflow.register_model(
    model_uri=model_uri,
    name="my_catalog.my_schema.my_model"
)

# Get model version
model_version = client.get_model_version(
    name="my_catalog.my_schema.my_model",
    version="1"
)

# Update model version
client.update_model_version(
    name="my_catalog.my_schema.my_model",
    version="1",
    description="Production model for customer churn prediction"
)

# Set model version tag
client.set_model_version_tag(
    name="my_catalog.my_schema.my_model",
    version="1",
    key="validation_status",
    value="approved"
)

# Transition model stage
client.transition_model_version_stage(
    name="my_catalog.my_schema.my_model",
    version="1",
    stage="Production",
    archive_existing_versions=True
)

# Set model alias
client.set_registered_model_alias(
    name="my_catalog.my_schema.my_model",
    alias="champion",
    version="1"
)

# Get model by alias
model_uri = "models:/my_catalog.my_schema.my_model@champion"
loaded_model = mlflow.pyfunc.load_model(model_uri)

# Delete model version
client.delete_model_version(
    name="my_catalog.my_schema.my_model",
    version="1"
)

# Delete registered model
client.delete_registered_model(name="my_catalog.my_schema.my_model")
```

#### MLflow Tracking

```python
# Search runs
runs = mlflow.search_runs(
    experiment_ids=["experiment-id"],
    filter_string="metrics.accuracy > 0.9",
    order_by=["metrics.accuracy DESC"],
    max_results=10
)

# Get run
run = mlflow.get_run(run_id="run-id")
print(f"Status: {run.info.status}")
print(f"Parameters: {run.data.params}")
print(f"Metrics: {run.data.metrics}")

# Update run
mlflow.set_tag("run-id", "production_ready", "true")

# Delete run
mlflow.delete_run(run_id="run-id")

# Log batch
mlflow.log_batch(
    run_id="run-id",
    metrics=[
        {"key": "accuracy", "value": 0.95, "timestamp": 1234567890, "step": 1},
        {"key": "loss", "value": 0.05, "timestamp": 1234567890, "step": 1}
    ],
    params=[
        {"key": "learning_rate", "value": "0.001"},
        {"key": "batch_size", "value": "32"}
    ],
    tags=[
        {"key": "model_type", "value": "neural_network"}
    ]
)
```

#### MLflow Projects

```bash
# Run MLflow project from Git
mlflow run https://github.com/user/project \
    -P param1=value1 \
    -P param2=value2 \
    --experiment-name my-experiment

# Run local project
mlflow run . \
    -P alpha=0.5 \
    -P l1_ratio=0.1

# Run on Databricks
mlflow run https://github.com/user/project \
    --backend databricks \
    --backend-config cluster-config.json
```

#### MLflow Models

```python
# Load model
model = mlflow.pyfunc.load_model("models:/my_catalog.my_schema.my_model/1")

# Predict
predictions = model.predict(data)

# Serve model locally
mlflow models serve \
    -m models:/my_catalog.my_schema.my_model/Production \
    -p 5000 \
    --no-conda

# Build Docker image
mlflow models build-docker \
    -m models:/my_catalog.my_schema.my_model/1 \
    -n my-model-image

# Deploy to serving endpoint (via SDK)
from databricks.sdk import WorkspaceClient
from databricks.sdk.service.serving import ServedModelInput, EndpointCoreConfigInput

w = WorkspaceClient()
w.serving_endpoints.create(
    name="my-model-endpoint",
    config=EndpointCoreConfigInput(
        served_models=[
            ServedModelInput(
                model_name="my_catalog.my_schema.my_model",
                model_version="1",
                workload_size="Small",
                scale_to_zero_enabled=True
            )
        ]
    )
)
```

### Feature Engineering

```python
from databricks.feature_engineering import FeatureEngineeringClient

fe = FeatureEngineeringClient()

# Create feature table
fe.create_table(
    name="my_catalog.my_schema.customer_features",
    primary_keys=["customer_id"],
    df=customer_features_df,
    description="Customer demographic and behavioral features"
)

# Write features
fe.write_table(
    name="my_catalog.my_schema.customer_features",
    df=new_features_df,
    mode="merge"
)

# Read features
features_df = fe.read_table(name="my_catalog.my_schema.customer_features")

# Create training set
training_set = fe.create_training_set(
    df=labels_df,
    feature_lookups=[
        FeatureLookup(
            table_name="my_catalog.my_schema.customer_features",
            lookup_key="customer_id"
        ),
        FeatureLookup(
            table_name="my_catalog.my_schema.transaction_features",
            lookup_key="customer_id"
        )
    ],
    label="churn",
    exclude_columns=["customer_id"]
)

# Load training data
training_df = training_set.load_df()

# Log model with feature dependencies
fe.log_model(
    model=model,
    artifact_path="model",
    flavor=mlflow.sklearn,
    training_set=training_set,
    registered_model_name="my_catalog.my_schema.churn_model"
)

# Batch scoring with feature lookup
predictions_df = fe.score_batch(
    model_uri="models:/my_catalog.my_schema.churn_model/1",
    df=customer_ids_df
)
```

### Vector Search

```python
from databricks.vector_search.client import VectorSearchClient

vsc = VectorSearchClient()

# Create vector search endpoint
vsc.create_endpoint(
    name="my-vector-search-endpoint",
    endpoint_type="STANDARD"
)

# Create vector search index
index = vsc.create_delta_sync_index(
    endpoint_name="my-vector-search-endpoint",
    source_table_name="my_catalog.my_schema.documents",
    index_name="my_catalog.my_schema.documents_index",
    pipeline_type="TRIGGERED",
    primary_key="doc_id",
    embedding_source_column="text",
    embedding_model_endpoint_name="my-embedding-endpoint"
)

# Sync index
index.sync()

# Search similar vectors
results = index.similarity_search(
    query_text="machine learning on databricks",
    columns=["doc_id", "title", "text"],
    num_results=10
)

# Search with filters
results = index.similarity_search(
    query_text="data engineering",
    columns=["doc_id", "title"],
    filters={"category": "technical"},
    num_results=5
)

# Delete index
vsc.delete_index(
    endpoint_name="my-vector-search-endpoint",
    index_name="my_catalog.my_schema.documents_index"
)
```

---

## Databricks Utilities (dbutils) {#dbutils}

Databricks Utilities provide helper functions for notebooks.

### File System Utilities (dbutils.fs)

```python
# List files
files = dbutils.fs.ls("/mnt/data/")
for file in files:
    print(f"{file.path} - {file.size} bytes")

# Read file
content = dbutils.fs.head("/mnt/data/sample.txt", maxBytes=1000)
print(content)

# Copy file
dbutils.fs.cp("/source/file.csv", "/destination/file.csv")

# Copy directory recursively
dbutils.fs.cp("/source/dir", "/destination/dir", recurse=True)

# Move file
dbutils.fs.mv("/source/file.csv", "/destination/file.csv")

# Remove file
dbutils.fs.rm("/path/to/file.csv")

# Remove directory recursively
dbutils.fs.rm("/path/to/directory", recurse=True)

# Create directory
dbutils.fs.mkdirs("/path/to/new/directory")

# Put file content
dbutils.fs.put("/path/to/file.txt", "Hello, World!", overwrite=True)

# Mount storage
dbutils.fs.mount(
    source="wasbs://container@storage.blob.core.windows.net",
    mount_point="/mnt/data",
    extra_configs={
        "fs.azure.account.key.storage.blob.core.windows.net": "storage-key"
    }
)

# Unmount
dbutils.fs.unmount("/mnt/data")

# List mounts
mounts = dbutils.fs.mounts()
for mount in mounts:
    print(f"{mount.mountPoint} -> {mount.source}")

# Refresh mounts
dbutils.fs.refreshMounts()
```

### Secrets Utilities (dbutils.secrets)

```python
# Get secret value
api_key = dbutils.secrets.get(scope="my-scope", key="api-key")

# List secret scopes
scopes = dbutils.secrets.listScopes()
for scope in scopes:
    print(scope.name)

# List secrets in scope
secrets = dbutils.secrets.list(scope="my-scope")
for secret in secrets:
    print(secret.key)
```

### Widgets Utilities (dbutils.widgets)

```python
# Create text widget
dbutils.widgets.text("name", "default_value", "Enter name")

# Create dropdown widget
dbutils.widgets.dropdown("environment", "dev", ["dev", "staging", "prod"], "Environment")

# Create combobox widget
dbutils.widgets.combobox("region", "us-east-1", ["us-east-1", "us-west-2", "eu-west-1"], "Region")

# Create multiselect widget
dbutils.widgets.multiselect("categories", "A", ["A", "B", "C", "D"], "Categories")

# Get widget value
name = dbutils.widgets.get("name")
environment = dbutils.widgets.get("environment")

# Remove widget
dbutils.widgets.remove("name")

# Remove all widgets
dbutils.widgets.removeAll()
```

### Notebook Utilities (dbutils.notebook)

```python
# Run another notebook
result = dbutils.notebook.run(
    "/path/to/notebook",
    timeout_seconds=300,
    arguments={"param1": "value1", "param2": "value2"}
)
print(f"Notebook returned: {result}")

# Exit notebook with value
dbutils.notebook.exit("success")
```

### Jobs Utilities (dbutils.jobs)

```python
# Get current job context
job_context = dbutils.jobs.taskValues.get(
    taskKey="previous_task",
    key="output_path",
    default="/default/path",
    debugValue="/debug/path"
)

# Set task value for downstream tasks
dbutils.jobs.taskValues.set(
    key="output_path",
    value="/path/to/output"
)
```

### Data Utilities (dbutils.data)

```python
# Summarize DataFrame
dbutils.data.summarize(df, precise=True)
```

### Credentials Utilities (dbutils.credentials)

```python
# Assume AWS IAM role
dbutils.credentials.assumeRole("arn:aws:iam::123456789012:role/my-role")

# Show current role
current_role = dbutils.credentials.showCurrentRole()
print(current_role)

# Show available roles
roles = dbutils.credentials.showRoles()
for role in roles:
    print(role)
```

---

## REST API Reference {#rest-api}

### Authentication

```bash
# Using Personal Access Token
curl -X GET \
  https://your-workspace.cloud.databricks.com/api/2.0/clusters/list \
  -H 'Authorization: Bearer <access-token>'

# Using OAuth
curl -X GET \
  https://your-workspace.cloud.databricks.com/api/2.0/clusters/list \
  -H 'Authorization: Bearer <oauth-token>'
```

### Workspace API

```bash
# List workspace objects
curl -X GET \
  'https://your-workspace.cloud.databricks.com/api/2.0/workspace/list?path=/Users/your.email' \
  -H 'Authorization: Bearer <token>'

# Export notebook
curl -X GET \
  'https://your-workspace.cloud.databricks.com/api/2.0/workspace/export?path=/path/to/notebook&format=SOURCE' \
  -H 'Authorization: Bearer <token>'

# Import notebook
curl -X POST \
  https://your-workspace.cloud.databricks.com/api/2.0/workspace/import \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "path": "/path/to/notebook",
    "format": "SOURCE",
    "language": "PYTHON",
    "content": "<base64-encoded-content>",
    "overwrite": true
  }'

# Delete object
curl -X POST \
  https://your-workspace.cloud.databricks.com/api/2.0/workspace/delete \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "path": "/path/to/object",
    "recursive": true
  }'
```

### Clusters API

```bash
# List clusters
curl -X GET \
  https://your-workspace.cloud.databricks.com/api/2.0/clusters/list \
  -H 'Authorization: Bearer <token>'

# Create cluster
curl -X POST \
  https://your-workspace.cloud.databricks.com/api/2.0/clusters/create \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "cluster_name": "my-cluster",
    "spark_version": "13.3.x-scala2.12",
    "node_type_id": "i3.xlarge",
    "autoscale": {
      "min_workers": 1,
      "max_workers": 5
    },
    "autotermination_minutes": 30
  }'

# Start cluster
curl -X POST \
  https://your-workspace.cloud.databricks.com/api/2.0/clusters/start \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "cluster_id": "<cluster-id>"
  }'

# Terminate cluster
curl -X POST \
  https://your-workspace.cloud.databricks.com/api/2.0/clusters/delete \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "cluster_id": "<cluster-id>"
  }'
```

### Jobs API

```bash
# List jobs
curl -X GET \
  https://your-workspace.cloud.databricks.com/api/2.1/jobs/list \
  -H 'Authorization: Bearer <token>'

# Create job
curl -X POST \
  https://your-workspace.cloud.databricks.com/api/2.1/jobs/create \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "my-job",
    "tasks": [{
      "task_key": "task1",
      "notebook_task": {
        "notebook_path": "/path/to/notebook",
        "base_parameters": {"param1": "value1"}
      },
      "job_cluster_key": "job-cluster"
    }],
    "job_clusters": [{
      "job_cluster_key": "job-cluster",
      "new_cluster": {
        "spark_version": "13.3.x-scala2.12",
        "node_type_id": "i3.xlarge",
        "num_workers": 2
      }
    }]
  }'

# Run job now
curl -X POST \
  https://your-workspace.cloud.databricks.com/api/2.1/jobs/run-now \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "job_id": <job-id>
  }'

# Get run
curl -X GET \
  'https://your-workspace.cloud.databricks.com/api/2.1/jobs/runs/get?run_id=<run-id>' \
  -H 'Authorization: Bearer <token>'
```

### DBFS API

```bash
# List files
curl -X GET \
  'https://your-workspace.cloud.databricks.com/api/2.0/dbfs/list?path=/path/to/directory' \
  -H 'Authorization: Bearer <token>'

# Read file
curl -X GET \
  'https://your-workspace.cloud.databricks.com/api/2.0/dbfs/read?path=/path/to/file' \
  -H 'Authorization: Bearer <token>'

# Create file
curl -X POST \
  https://your-workspace.cloud.databricks.com/api/2.0/dbfs/put \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "path": "/path/to/file",
    "contents": "<base64-encoded-content>",
    "overwrite": true
  }'

# Delete file
curl -X POST \
  https://your-workspace.cloud.databricks.com/api/2.0/dbfs/delete \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "path": "/path/to/file",
    "recursive": false
  }'
```

### SQL API

```bash
# Execute statement
curl -X POST \
  https://your-workspace.cloud.databricks.com/api/2.0/sql/statements \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "warehouse_id": "<warehouse-id>",
    "statement": "SELECT * FROM my_catalog.my_schema.my_table LIMIT 10",
    "wait_timeout": "30s"
  }'

# Get statement result
curl -X GET \
  'https://your-workspace.cloud.databricks.com/api/2.0/sql/statements/<statement-id>' \
  -H 'Authorization: Bearer <token>'

# Cancel statement
curl -X POST \
  https://your-workspace.cloud.databricks.com/api/2.0/sql/statements/<statement-id>/cancel \
  -H 'Authorization: Bearer <token>'
```

### Serving Endpoints API

```bash
# List serving endpoints
curl -X GET \
  https://your-workspace.cloud.databricks.com/api/2.0/serving-endpoints \
  -H 'Authorization: Bearer <token>'

# Create serving endpoint
curl -X POST \
  https://your-workspace.cloud.databricks.com/api/2.0/serving-endpoints \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "my-endpoint",
    "config": {
      "served_models": [{
        "model_name": "my_catalog.my_schema.my_model",
        "model_version": "1",
        "workload_size": "Small",
        "scale_to_zero_enabled": true
      }]
    }
  }'

# Query endpoint
curl -X POST \
  https://your-workspace.cloud.databricks.com/serving-endpoints/my-endpoint/invocations \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "inputs": {"text": "Hello, world!"}
  }'
```

---

## Unity Catalog Commands {#unity-catalog-commands}

### Catalog Management

```sql
-- Create catalog
CREATE CATALOG IF NOT EXISTS production
COMMENT 'Production data catalog';

-- Set catalog properties
ALTER CATALOG production
SET DBPROPERTIES ('department' = 'analytics', 'owner' = 'data-team');

-- Grant catalog usage
GRANT USAGE ON CATALOG production TO `data-analysts`;
GRANT CREATE SCHEMA ON CATALOG production TO `data-engineers`;

-- Show all catalogs
SHOW CATALOGS;

-- Describe catalog
DESCRIBE CATALOG EXTENDED production;

-- Drop catalog
DROP CATALOG IF EXISTS production CASCADE;
```

### Schema Management

```sql
-- Create schema with location
CREATE SCHEMA IF NOT EXISTS production.customer_data
MANAGED LOCATION 's3://my-bucket/schemas/customer_data'
COMMENT 'Customer data and analytics';

-- Grant schema permissions
GRANT USAGE ON SCHEMA production.customer_data TO `data-analysts`;
GRANT CREATE TABLE ON SCHEMA production.customer_data TO `data-engineers`;
GRANT ALL PRIVILEGES ON SCHEMA production.customer_data TO `admin-group`;

-- Show schemas
SHOW SCHEMAS IN production;

-- Describe schema
DESCRIBE SCHEMA EXTENDED production.customer_data;
```

### External Locations

```sql
-- Create storage credential
CREATE STORAGE CREDENTIAL aws_s3_credential
WITH (
    AWS_IAM_ROLE = 'arn:aws:iam::123456789012:role/databricks-s3-access'
)
COMMENT 'S3 access for production data';

-- Create external location
CREATE EXTERNAL LOCATION production_data
URL 's3://my-company-data/production/'
WITH (STORAGE CREDENTIAL aws_s3_credential)
COMMENT 'Production data storage location';

-- Grant access to external location
GRANT READ FILES ON EXTERNAL LOCATION production_data TO `data-engineers`;
GRANT WRITE FILES ON EXTERNAL LOCATION production_data TO `etl-service-principal`;

-- Show external locations
SHOW EXTERNAL LOCATIONS;

-- Describe external location
DESCRIBE EXTERNAL LOCATION production_data;

-- Drop external location
DROP EXTERNAL LOCATION IF EXISTS production_data;
```

### Delta Sharing

```sql
-- Create share
CREATE SHARE customer_analytics_share
COMMENT 'Shared customer analytics for partners';

-- Add table to share
ALTER SHARE customer_analytics_share
ADD TABLE production.analytics.customer_metrics;

-- Add schema to share
ALTER SHARE customer_analytics_share
ADD SCHEMA production.public_data;

-- Create recipient
CREATE RECIPIENT partner_company
USING ID 'partner-databricks-account-id'
COMMENT 'Partner organization recipient';

-- Grant share access
GRANT SELECT ON SHARE customer_analytics_share TO RECIPIENT partner_company;

-- Show shares
SHOW SHARES;

-- Show all objects in share
SHOW ALL IN SHARE customer_analytics_share;

-- Describe share
DESCRIBE SHARE customer_analytics_share;

-- Revoke share access
REVOKE SELECT ON SHARE customer_analytics_share FROM RECIPIENT partner_company;

-- Drop share
DROP SHARE IF EXISTS customer_analytics_share;
```

### Row-Level and Column-Level Security

```sql
-- Row-level security with dynamic views
CREATE VIEW production.customer_data.customers_filtered AS
SELECT 
    customer_id,
    name,
    email,
    region
FROM production.customer_data.customers
WHERE 
    region = CURRENT_USER() 
    OR IS_MEMBER('global-access');

-- Column-level security with masking
CREATE VIEW production.customer_data.customers_masked AS
SELECT
    customer_id,
    name,
    CASE 
        WHEN IS_MEMBER('pii-viewers') THEN email
        ELSE REGEXP_REPLACE(email, '^(.{2}).*(@.*)$', '$1***$2')
    END AS email,
    CASE
        WHEN IS_MEMBER('pii-viewers') THEN ssn
        ELSE 'XXX-XX-XXXX'
    END AS ssn,
    region
FROM production.customer_data.customers;

-- Grant access to masked view
GRANT SELECT ON VIEW production.customer_data.customers_masked TO `all-users`;
```

### Audit and Lineage

```sql
-- Query audit logs
SELECT 
    event_time,
    user_identity.email,
    request_params.full_name_arg AS table_accessed,
    action_name
FROM system.access.audit
WHERE action_name = 'getTable'
    AND event_date >= CURRENT_DATE() - INTERVAL 7 DAYS
ORDER BY event_time DESC;

-- Query table lineage
SELECT 
    source_table_full_name,
    target_table_full_name,
    source_type,
    target_type
FROM system.access.table_lineage
WHERE target_table_full_name = 'production.gold.customer_360'
ORDER BY event_time DESC;

-- Query column lineage
SELECT 
    source_table_full_name,
    source_column_name,
    target_table_full_name,
    target_column_name
FROM system.access.column_lineage
WHERE target_table_full_name = 'production.gold.customer_360';
```

---

## Lakebase (OLTP) Commands {#lakebase-commands}

### Database Instance Management

```sql
-- Create Lakebase instance
CREATE DATABASE INSTANCE ecommerce_oltp
WITH (
    instance_type = 'db.r5.xlarge',
    storage_size = 500,
    backup_retention_days = 7,
    multi_az = true
);

-- Show database instances
SHOW DATABASE INSTANCES;

-- Describe database instance
DESCRIBE DATABASE INSTANCE ecommerce_oltp;

-- Alter database instance
ALTER DATABASE INSTANCE ecommerce_oltp
SET (
    instance_type = 'db.r5.2xlarge',
    storage_size = 1000
);

-- Drop database instance
DROP DATABASE INSTANCE IF EXISTS ecommerce_oltp;
```

### Transactional Tables

```sql
-- Create transactional table with constraints
CREATE TABLE ecommerce_oltp.orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    CONSTRAINT valid_status CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
    CONSTRAINT positive_amount CHECK (total_amount > 0)
);

-- Create foreign key relationship
CREATE TABLE ecommerce_oltp.order_items (
    item_id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(order_id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    CONSTRAINT positive_quantity CHECK (quantity > 0)
);

-- Create indexes
CREATE INDEX idx_orders_customer ON ecommerce_oltp.orders(customer_id);
CREATE INDEX idx_orders_date ON ecommerce_oltp.orders(order_date);
CREATE INDEX idx_orders_status ON ecommerce_oltp.orders(status);
```

### Sync Tables (OLTP to Analytics)

```sql
-- Create synced table for analytics
CREATE SYNCED TABLE production.sales.orders_analytics
AS SELECT 
    order_id,
    customer_id,
    order_date,
    status,
    total_amount
FROM ecommerce_oltp.orders;

-- Synced table automatically updates as OLTP data changes
-- Query analytics data
SELECT 
    DATE(order_date) as date,
    status,
    COUNT(*) as order_count,
    SUM(total_amount) as revenue
FROM production.sales.orders_analytics
WHERE order_date >= CURRENT_DATE() - INTERVAL 30 DAYS
GROUP BY date, status
ORDER BY date DESC;
```

### Python Integration with Lakebase

```python
import psycopg2
import os

# Connect to Lakebase
conn = psycopg2.connect(
    host=os.getenv("LAKEBASE_HOST"),
    database="ecommerce_oltp",
    user=os.getenv("LAKEBASE_USER"),
    password=os.getenv("LAKEBASE_PASSWORD"),
    port=5432
)

cursor = conn.cursor()

# Insert with transaction
try:
    cursor.execute("""
        INSERT INTO orders (customer_id, status, total_amount)
        VALUES (%s, %s, %s)
        RETURNING order_id
    """, (12345, 'pending', 99.99))
    
    order_id = cursor.fetchone()[0]
    
    cursor.execute("""
        INSERT INTO order_items (order_id, product_id, quantity, unit_price)
        VALUES (%s, %s, %s, %s)
    """, (order_id, 67890, 2, 49.995))
    
    conn.commit()
    print(f"Order {order_id} created successfully")
    
except Exception as e:
    conn.rollback()
    print(f"Error: {e}")
    
finally:
    cursor.close()
    conn.close()
```

---

**End of Comprehensive Databricks Commands & Scripts Reference**

This reference covers all major command-line interfaces, APIs, and scripting methods for Databricks. For the latest updates and additional commands, refer to the [official Databricks documentation](https://docs.databricks.com).

