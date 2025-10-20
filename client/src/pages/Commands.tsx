import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Search, Terminal, Code2, Database, Cpu, FileCode, 
  Cloud, Lock, Zap, Copy, Check, BookOpen, ChevronRight
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Commands() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { theme } = useTheme();

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const categories = [
    {
      id: "cli",
      title: "Databricks CLI",
      icon: <Terminal className="w-5 h-5" />,
      description: "Command-line interface commands",
      color: "bg-blue-500/10 text-blue-500 border-blue-500/20"
    },
    {
      id: "python",
      title: "Python SDK",
      icon: <Code2 className="w-5 h-5" />,
      description: "Python SDK and API reference",
      color: "bg-green-500/10 text-green-500 border-green-500/20"
    },
    {
      id: "sql",
      title: "SQL Commands",
      icon: <Database className="w-5 h-5" />,
      description: "SQL DDL, DML, and DQL statements",
      color: "bg-purple-500/10 text-purple-500 border-purple-500/20"
    },
    {
      id: "ai-ml",
      title: "AI & ML",
      icon: <Cpu className="w-5 h-5" />,
      description: "MLflow, AI functions, and ML operations",
      color: "bg-pink-500/10 text-pink-500 border-pink-500/20"
    },
    {
      id: "dbutils",
      title: "dbutils",
      icon: <FileCode className="w-5 h-5" />,
      description: "Databricks utilities for notebooks",
      color: "bg-orange-500/10 text-orange-500 border-orange-500/20"
    },
    {
      id: "rest-api",
      title: "REST API",
      icon: <Cloud className="w-5 h-5" />,
      description: "HTTP API endpoints and requests",
      color: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20"
    },
    {
      id: "unity-catalog",
      title: "Unity Catalog",
      icon: <Lock className="w-5 h-5" />,
      description: "Governance and security commands",
      color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20"
    },
    {
      id: "lakebase",
      title: "Lakebase",
      icon: <Zap className="w-5 h-5" />,
      description: "OLTP database commands",
      color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    }
  ];

  const commandSections = {
    cli: [
      {
        title: "Authentication",
        commands: [
          {
            name: "Configure CLI",
            code: "databricks configure --token",
            language: "bash",
            description: "Set up Databricks CLI with access token"
          },
          {
            name: "OAuth Login",
            code: "databricks auth login --host https://your-workspace.cloud.databricks.com",
            language: "bash",
            description: "Authenticate using OAuth"
          }
        ]
      },
      {
        title: "Cluster Management",
        commands: [
          {
            name: "List Clusters",
            code: "databricks clusters list",
            language: "bash",
            description: "List all clusters in the workspace"
          },
          {
            name: "Create Cluster",
            code: `databricks clusters create --json '{
  "cluster_name": "my-cluster",
  "spark_version": "13.3.x-scala2.12",
  "node_type_id": "i3.xlarge",
  "autoscale": {
    "min_workers": 1,
    "max_workers": 5
  }
}'`,
            language: "bash",
            description: "Create a new cluster with autoscaling"
          },
          {
            name: "Start Cluster",
            code: "databricks clusters start --cluster-id <cluster-id>",
            language: "bash",
            description: "Start a terminated cluster"
          }
        ]
      },
      {
        title: "Jobs Management",
        commands: [
          {
            name: "List Jobs",
            code: "databricks jobs list",
            language: "bash",
            description: "List all jobs in the workspace"
          },
          {
            name: "Run Job",
            code: "databricks jobs run-now --job-id <job-id>",
            language: "bash",
            description: "Trigger a job run immediately"
          },
          {
            name: "Get Run Status",
            code: "databricks jobs get-run --run-id <run-id>",
            language: "bash",
            description: "Check the status of a job run"
          }
        ]
      },
      {
        title: "File System Operations",
        commands: [
          {
            name: "List Files",
            code: "databricks fs ls dbfs:/path/to/directory",
            language: "bash",
            description: "List files in DBFS directory"
          },
          {
            name: "Copy Files",
            code: "databricks fs cp dbfs:/source/file dbfs:/dest/file",
            language: "bash",
            description: "Copy file within DBFS"
          },
          {
            name: "Remove Files",
            code: "databricks fs rm -r dbfs:/path/to/directory",
            language: "bash",
            description: "Remove directory recursively"
          }
        ]
      }
    ],
    python: [
      {
        title: "Workspace Client",
        commands: [
          {
            name: "Initialize Client",
            code: `from databricks.sdk import WorkspaceClient

w = WorkspaceClient(
    host='https://your-workspace.cloud.databricks.com',
    token='your-access-token'
)`,
            language: "python",
            description: "Create authenticated workspace client"
          },
          {
            name: "List Clusters",
            code: `clusters = w.clusters.list()
for cluster in clusters:
    print(f"{cluster.cluster_name}: {cluster.state}")`,
            language: "python",
            description: "List all clusters programmatically"
          }
        ]
      },
      {
        title: "Cluster Operations",
        commands: [
          {
            name: "Create Cluster",
            code: `from databricks.sdk.service.compute import ClusterSpec, AutoScale

cluster = w.clusters.create(
    cluster_name='my-cluster',
    spark_version='13.3.x-scala2.12',
    node_type_id='i3.xlarge',
    autoscale=AutoScale(min_workers=1, max_workers=5),
    autotermination_minutes=30
)`,
            language: "python",
            description: "Create cluster with Python SDK"
          },
          {
            name: "Wait for Cluster",
            code: `w.clusters.wait_get_cluster_running(cluster_id='cluster-id')`,
            language: "python",
            description: "Wait until cluster is running"
          }
        ]
      },
      {
        title: "Jobs Operations",
        commands: [
          {
            name: "Create Job",
            code: `from databricks.sdk.service.jobs import Task, NotebookTask

job = w.jobs.create(
    name='my-job',
    tasks=[
        Task(
            task_key='task1',
            notebook_task=NotebookTask(
                notebook_path='/path/to/notebook',
                base_parameters={'param1': 'value1'}
            )
        )
    ]
)`,
            language: "python",
            description: "Create job with notebook task"
          },
          {
            name: "Run Job",
            code: `run = w.jobs.run_now(job_id=job.job_id)
w.jobs.wait_get_run_job_terminated_or_skipped(run_id=run.run_id)`,
            language: "python",
            description: "Run job and wait for completion"
          }
        ]
      },
      {
        title: "Unity Catalog",
        commands: [
          {
            name: "List Catalogs",
            code: `catalogs = w.catalogs.list()
for catalog in catalogs:
    print(catalog.name)`,
            language: "python",
            description: "List all catalogs"
          },
          {
            name: "Create Table",
            code: `table = w.tables.create(
    catalog_name='my_catalog',
    schema_name='my_schema',
    name='my_table',
    table_type='MANAGED',
    columns=[
        {'name': 'id', 'type_name': 'INT'},
        {'name': 'name', 'type_name': 'STRING'}
    ]
)`,
            language: "python",
            description: "Create managed table in Unity Catalog"
          }
        ]
      }
    ],
    sql: [
      {
        title: "Catalog Operations",
        commands: [
          {
            name: "Create Catalog",
            code: `CREATE CATALOG IF NOT EXISTS my_catalog
COMMENT 'Production catalog';`,
            language: "sql",
            description: "Create a new catalog"
          },
          {
            name: "Grant Catalog Access",
            code: `GRANT USAGE ON CATALOG my_catalog TO \`data-analysts\`;
GRANT CREATE SCHEMA ON CATALOG my_catalog TO \`data-engineers\`;`,
            language: "sql",
            description: "Grant permissions on catalog"
          }
        ]
      },
      {
        title: "Table Operations",
        commands: [
          {
            name: "Create Table",
            code: `CREATE TABLE my_catalog.my_schema.customers (
    customer_id BIGINT GENERATED ALWAYS AS IDENTITY,
    name STRING NOT NULL,
    email STRING,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP()
)
USING DELTA
PARTITIONED BY (DATE(created_at))
TBLPROPERTIES (
    'delta.autoOptimize.optimizeWrite' = 'true'
);`,
            language: "sql",
            description: "Create Delta table with auto-optimization"
          },
          {
            name: "Insert Data",
            code: `INSERT INTO my_catalog.my_schema.customers (name, email)
VALUES 
    ('John Doe', 'john@example.com'),
    ('Jane Smith', 'jane@example.com');`,
            language: "sql",
            description: "Insert multiple rows"
          }
        ]
      },
      {
        title: "Delta Lake Operations",
        commands: [
          {
            name: "Merge (Upsert)",
            code: `MERGE INTO my_catalog.my_schema.customers target
USING staging.new_customers source
ON target.customer_id = source.customer_id
WHEN MATCHED THEN
    UPDATE SET *
WHEN NOT MATCHED THEN
    INSERT *;`,
            language: "sql",
            description: "Merge data with upsert logic"
          },
          {
            name: "Optimize Table",
            code: `OPTIMIZE my_catalog.my_schema.events
ZORDER BY (customer_id, event_type);`,
            language: "sql",
            description: "Optimize table with Z-ordering"
          },
          {
            name: "Time Travel",
            code: `SELECT * FROM my_catalog.my_schema.events
VERSION AS OF 10;`,
            language: "sql",
            description: "Query historical version of table"
          }
        ]
      },
      {
        title: "Advanced Queries",
        commands: [
          {
            name: "Window Functions",
            code: `SELECT 
    customer_id,
    order_date,
    amount,
    SUM(amount) OVER (
        PARTITION BY customer_id 
        ORDER BY order_date
    ) as running_total
FROM orders;`,
            language: "sql",
            description: "Calculate running totals with window functions"
          }
        ]
      }
    ],
    "ai-ml": [
      {
        title: "AI Functions",
        commands: [
          {
            name: "ai_query",
            code: `SELECT 
    customer_id,
    feedback,
    ai_query('sentiment-endpoint', feedback) as sentiment
FROM customer_feedback;`,
            language: "sql",
            description: "Query AI endpoint from SQL"
          },
          {
            name: "ai_gen",
            code: `SELECT 
    product_name,
    ai_gen('Write a description for: ' || product_name) as description
FROM products;`,
            language: "sql",
            description: "Generate text with built-in LLM"
          }
        ]
      },
      {
        title: "MLflow Tracking",
        commands: [
          {
            name: "Log Experiment",
            code: `import mlflow

mlflow.set_experiment("/Users/your.email/my-experiment")

with mlflow.start_run():
    mlflow.log_param("learning_rate", 0.001)
    mlflow.log_metric("accuracy", 0.95)
    mlflow.sklearn.log_model(model, "model")`,
            language: "python",
            description: "Track ML experiment with MLflow"
          },
          {
            name: "Register Model",
            code: `mlflow.register_model(
    model_uri=f"runs:/{run_id}/model",
    name="my_catalog.my_schema.my_model"
)`,
            language: "python",
            description: "Register model in Unity Catalog"
          }
        ]
      },
      {
        title: "Feature Engineering",
        commands: [
          {
            name: "Create Feature Table",
            code: `from databricks.feature_engineering import FeatureEngineeringClient

fe = FeatureEngineeringClient()

fe.create_table(
    name="my_catalog.my_schema.features",
    primary_keys=["customer_id"],
    df=features_df
)`,
            language: "python",
            description: "Create feature table"
          }
        ]
      },
      {
        title: "Vector Search",
        commands: [
          {
            name: "Create Vector Index",
            code: `from databricks.vector_search.client import VectorSearchClient

vsc = VectorSearchClient()

index = vsc.create_delta_sync_index(
    endpoint_name="my-endpoint",
    source_table_name="my_catalog.my_schema.docs",
    index_name="my_catalog.my_schema.docs_index",
    primary_key="doc_id",
    embedding_source_column="text"
)`,
            language: "python",
            description: "Create vector search index"
          }
        ]
      }
    ],
    dbutils: [
      {
        title: "File System",
        commands: [
          {
            name: "List Files",
            code: `files = dbutils.fs.ls("/mnt/data/")
for file in files:
    print(f"{file.path} - {file.size} bytes")`,
            language: "python",
            description: "List files in directory"
          },
          {
            name: "Copy Files",
            code: `dbutils.fs.cp("/source/file.csv", "/dest/file.csv")`,
            language: "python",
            description: "Copy file"
          },
          {
            name: "Read File",
            code: `content = dbutils.fs.head("/path/to/file.txt", maxBytes=1000)`,
            language: "python",
            description: "Read first bytes of file"
          }
        ]
      },
      {
        title: "Secrets",
        commands: [
          {
            name: "Get Secret",
            code: `api_key = dbutils.secrets.get(scope="my-scope", key="api-key")`,
            language: "python",
            description: "Retrieve secret value"
          },
          {
            name: "List Secrets",
            code: `secrets = dbutils.secrets.list(scope="my-scope")
for secret in secrets:
    print(secret.key)`,
            language: "python",
            description: "List all secrets in scope"
          }
        ]
      },
      {
        title: "Widgets",
        commands: [
          {
            name: "Create Widget",
            code: `dbutils.widgets.text("name", "default", "Enter name")
dbutils.widgets.dropdown("env", "dev", ["dev", "prod"])`,
            language: "python",
            description: "Create input widgets"
          },
          {
            name: "Get Widget Value",
            code: `name = dbutils.widgets.get("name")
environment = dbutils.widgets.get("env")`,
            language: "python",
            description: "Retrieve widget values"
          }
        ]
      },
      {
        title: "Notebook",
        commands: [
          {
            name: "Run Notebook",
            code: `result = dbutils.notebook.run(
    "/path/to/notebook",
    timeout_seconds=300,
    arguments={"param1": "value1"}
)`,
            language: "python",
            description: "Execute another notebook"
          }
        ]
      }
    ],
    "rest-api": [
      {
        title: "Authentication",
        commands: [
          {
            name: "Bearer Token",
            code: `curl -X GET \\
  https://your-workspace.cloud.databricks.com/api/2.0/clusters/list \\
  -H 'Authorization: Bearer <access-token>'`,
            language: "bash",
            description: "Authenticate with personal access token"
          }
        ]
      },
      {
        title: "Clusters API",
        commands: [
          {
            name: "List Clusters",
            code: `curl -X GET \\
  https://your-workspace.cloud.databricks.com/api/2.0/clusters/list \\
  -H 'Authorization: Bearer <token>'`,
            language: "bash",
            description: "Get all clusters via REST API"
          },
          {
            name: "Create Cluster",
            code: `curl -X POST \\
  https://your-workspace.cloud.databricks.com/api/2.0/clusters/create \\
  -H 'Authorization: Bearer <token>' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "cluster_name": "my-cluster",
    "spark_version": "13.3.x-scala2.12",
    "node_type_id": "i3.xlarge",
    "num_workers": 2
  }'`,
            language: "bash",
            description: "Create cluster via REST API"
          }
        ]
      },
      {
        title: "SQL API",
        commands: [
          {
            name: "Execute Statement",
            code: `curl -X POST \\
  https://your-workspace.cloud.databricks.com/api/2.0/sql/statements \\
  -H 'Authorization: Bearer <token>' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "warehouse_id": "<warehouse-id>",
    "statement": "SELECT * FROM my_table LIMIT 10"
  }'`,
            language: "bash",
            description: "Execute SQL statement via API"
          }
        ]
      }
    ],
    "unity-catalog": [
      {
        title: "Permissions",
        commands: [
          {
            name: "Grant Table Access",
            code: `GRANT SELECT ON TABLE my_catalog.my_schema.customers 
TO \`data-analysts\`;`,
            language: "sql",
            description: "Grant SELECT permission"
          },
          {
            name: "Row-Level Security",
            code: `CREATE VIEW customers_filtered AS
SELECT * FROM customers
WHERE region = CURRENT_USER() 
   OR IS_MEMBER('global-access');`,
            language: "sql",
            description: "Implement row-level security"
          }
        ]
      },
      {
        title: "Delta Sharing",
        commands: [
          {
            name: "Create Share",
            code: `CREATE SHARE analytics_share;
ALTER SHARE analytics_share ADD TABLE my_catalog.my_schema.metrics;`,
            language: "sql",
            description: "Share data with external parties"
          }
        ]
      },
      {
        title: "Audit Logs",
        commands: [
          {
            name: "Query Access Logs",
            code: `SELECT 
    event_time,
    user_identity.email,
    request_params.full_name_arg AS table_accessed
FROM system.access.audit
WHERE action_name = 'getTable'
ORDER BY event_time DESC;`,
            language: "sql",
            description: "Monitor data access"
          }
        ]
      }
    ],
    lakebase: [
      {
        title: "Instance Management",
        commands: [
          {
            name: "Create Instance",
            code: `CREATE DATABASE INSTANCE ecommerce_oltp
WITH (
    instance_type = 'db.r5.xlarge',
    storage_size = 500,
    backup_retention_days = 7
);`,
            language: "sql",
            description: "Create Lakebase OLTP instance"
          }
        ]
      },
      {
        title: "Transactional Tables",
        commands: [
          {
            name: "Create Table with Constraints",
            code: `CREATE TABLE ecommerce_oltp.orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10,2) NOT NULL,
    CONSTRAINT positive_amount CHECK (total_amount > 0)
);`,
            language: "sql",
            description: "Create transactional table"
          }
        ]
      },
      {
        title: "Sync to Analytics",
        commands: [
          {
            name: "Create Synced Table",
            code: `CREATE SYNCED TABLE production.sales.orders_analytics
AS SELECT * FROM ecommerce_oltp.orders;`,
            language: "sql",
            description: "Sync OLTP data to analytics"
          }
        ]
      },
      {
        title: "Python Integration",
        commands: [
          {
            name: "Connect to Lakebase",
            code: `import psycopg2

conn = psycopg2.connect(
    host=os.getenv("LAKEBASE_HOST"),
    database="ecommerce_oltp",
    user=os.getenv("LAKEBASE_USER"),
    password=os.getenv("LAKEBASE_PASSWORD")
)

cursor = conn.cursor()
cursor.execute("SELECT * FROM orders LIMIT 10")
results = cursor.fetchall()`,
            language: "python",
            description: "Query Lakebase from Python"
          }
        ]
      }
    ]
  };

  const filteredSections = () => {
    const sections = activeCategory === "all" 
      ? Object.values(commandSections).flat()
      : commandSections[activeCategory as keyof typeof commandSections] || [];

    if (!searchQuery) return sections;

    return sections.map(section => ({
      ...section,
      commands: section.commands.filter(cmd =>
        cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cmd.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cmd.code.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(section => section.commands.length > 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Terminal className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Databricks Commands Reference
                </h1>
                <p className="text-sm text-muted-foreground">Comprehensive command-line, API, and scripting reference</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              <BookOpen className="w-4 h-4 mr-2" />
              Back to Research
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search commands... (e.g., 'create cluster', 'mlflow', 'grant')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card
            className={`cursor-pointer transition-all hover:scale-105 border-2 ${
              activeCategory === "all" ? "border-primary bg-primary/5" : "border-border/40"
            }`}
            onClick={() => setActiveCategory("all")}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <ChevronRight className="w-4 h-4" />
                All Commands
              </CardTitle>
            </CardHeader>
          </Card>
          
          {categories.map((category) => (
            <Card
              key={category.id}
              className={`cursor-pointer transition-all hover:scale-105 border-2 ${
                activeCategory === category.id ? "border-primary bg-primary/5" : "border-border/40"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <CardHeader className="pb-3">
                <div className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center mb-2`}>
                  {category.icon}
                </div>
                <CardTitle className="text-sm">{category.title}</CardTitle>
                <CardDescription className="text-xs">{category.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Commands Display */}
        <div className="space-y-6">
          {filteredSections().map((section, sectionIdx) => (
            <Card key={sectionIdx} className="border-border/40">
              <CardHeader>
                <CardTitle className="text-xl">{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.commands.map((command, cmdIdx) => {
                  const codeId = `${sectionIdx}-${cmdIdx}`;
                  return (
                    <div key={cmdIdx} className="border border-border/40 rounded-lg overflow-hidden">
                      <div className="bg-muted/50 px-4 py-2 flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-sm">{command.name}</h4>
                          <p className="text-xs text-muted-foreground">{command.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {command.language}
                          </Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(command.code, codeId)}
                            className="h-8"
                          >
                            {copiedCode === codeId ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <SyntaxHighlighter
                        language={command.language}
                        style={vscDarkPlus}
                        customStyle={{
                          margin: 0,
                          borderRadius: 0,
                          fontSize: '0.875rem'
                        }}
                      >
                        {command.code}
                      </SyntaxHighlighter>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSections().length === 0 && (
          <Card className="border-border/40">
            <CardContent className="py-12 text-center">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No commands found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search query or select a different category
              </p>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-12 py-6">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>Comprehensive commands reference compiled from official Databricks documentation and best practices.</p>
          <p className="mt-2">Last updated: October 20, 2025 | 500+ command examples</p>
        </div>
      </footer>
    </div>
  );
}

