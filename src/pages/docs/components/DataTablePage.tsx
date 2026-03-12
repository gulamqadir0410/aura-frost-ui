import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { GlassDataTable, type Column } from "@/components/glass/GlassDataTable";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

const users: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Editor", status: "Active" },
  { id: 3, name: "Carol Williams", email: "carol@example.com", role: "Viewer", status: "Inactive" },
  { id: 4, name: "Dave Brown", email: "dave@example.com", role: "Editor", status: "Active" },
  { id: 5, name: "Eve Davis", email: "eve@example.com", role: "Admin", status: "Active" },
  { id: 6, name: "Frank Miller", email: "frank@example.com", role: "Viewer", status: "Inactive" },
  { id: 7, name: "Grace Wilson", email: "grace@example.com", role: "Editor", status: "Active" },
  { id: 8, name: "Hank Moore", email: "hank@example.com", role: "Viewer", status: "Active" },
  { id: 9, name: "Ivy Taylor", email: "ivy@example.com", role: "Admin", status: "Active" },
  { id: 10, name: "Jack Anderson", email: "jack@example.com", role: "Editor", status: "Inactive" },
  { id: 11, name: "Karen Thomas", email: "karen@example.com", role: "Viewer", status: "Active" },
  { id: 12, name: "Leo Jackson", email: "leo@example.com", role: "Admin", status: "Active" },
];

const columns: Column<User>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email", sortable: true },
  { key: "role", header: "Role", sortable: true },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (val: string) => (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
        val === "Active" ? "bg-green-500/10 text-green-600 dark:text-green-400" : "bg-muted text-muted-foreground"
      }`}>
        {val}
      </span>
    ),
  },
];

const tableProps = [
  { name: "columns", type: "Column<T>[]", description: "Column definitions with key, header, sortable, render" },
  { name: "data", type: "T[]", description: "Array of data objects" },
  { name: "loading", type: "boolean", default: "false", description: "Show skeleton loading state" },
  { name: "selectable", type: "boolean", default: "false", description: "Enable row selection with checkboxes" },
  { name: "expandable", type: "(row: T) => ReactNode", description: "Render function for expandable row content" },
  { name: "pageSize", type: "number", default: "10", description: "Rows per page" },
  { name: "stickyHeader", type: "boolean", default: "false", description: "Stick header on scroll" },
  { name: "onRowClick", type: "(row: T, index: number) => void", description: "Row click handler" },
  { name: "emptyMessage", type: "string", default: '"No results found."', description: "Message when data is empty" },
];

export default function DataTablePage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Data Table</h1>
        <p className="text-lg text-muted-foreground">Glass-styled data table with sorting, pagination, selection, and expandable rows.</p>
      </div>

      <ComponentPreview
        code={`import { GlassDataTable, type Column } from "@/components/glass/GlassDataTable";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

const users: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Editor", status: "Active" },
  { id: 3, name: "Carol Williams", email: "carol@example.com", role: "Viewer", status: "Inactive" },
  { id: 4, name: "Dave Brown", email: "dave@example.com", role: "Editor", status: "Active" },
  { id: 5, name: "Eve Davis", email: "eve@example.com", role: "Admin", status: "Active" },
];

const columns: Column<User>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email", sortable: true },
  { key: "role", header: "Role", sortable: true },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (val: string) => (
      <span className={\`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium \${
        val === "Active"
          ? "bg-green-500/10 text-green-600 dark:text-green-400"
          : "bg-muted text-muted-foreground"
      }\`}>
        {val}
      </span>
    ),
  },
];

function Example() {
  return (
    <GlassDataTable
      columns={columns}
      data={users}
      selectable
      pageSize={5}
      expandable={(row) => (
        <div className="text-sm text-muted-foreground">
          <p>Full details for <strong className="text-foreground">{row.name}</strong></p>
          <p className="mt-1">Email: {row.email} · Role: {row.role} · Status: {row.status}</p>
        </div>
      )}
    />
  );
}`}
      >
        <div className="w-full">
          <GlassDataTable
            columns={columns}
            data={users}
            selectable
            pageSize={5}
            expandable={(row) => (
              <div className="text-sm text-muted-foreground">
                <p>Full details for <strong className="text-foreground">{row.name}</strong></p>
                <p className="mt-1">Email: {row.email} · Role: {row.role} · Status: {row.status}</p>
              </div>
            )}
          />
        </div>
      </ComponentPreview>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Loading State</h2>
        <ComponentPreview code={`import { GlassDataTable, type Column } from "@/components/glass/GlassDataTable";

const columns: Column<{ name: string; email: string }>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email", sortable: true },
];

function Example() {
  return <GlassDataTable columns={columns} data={[]} loading />;
}`}>
          <div className="w-full">
            <GlassDataTable columns={columns} data={[]} loading />
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">API Reference</h2>
        <PropsTable props={tableProps} />
      </div>
    </div>
  );
}
