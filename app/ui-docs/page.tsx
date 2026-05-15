'use client'
import { useState } from 'react'
import {
  Button, Badge, InputField, Card, CardHeader, CardBody, CardFooter,
  Divider, Spinner, ProgressBar, Toggle, Checkbox, Radio,
  Tabs, Avatar, Skeleton, Alert, Tooltip, Popover,
  Pagination, Dropdown, Table, FileUpload, Modal, Toast,
} from '@/components/ui'
import { Toolbar } from '@/components/patterns/Toolbar'
import { FormLayout, FormSection } from '@/components/patterns/FormLayout'
import { EmptyState } from '@/components/patterns/EmptyState'
import {
  Plus, Trash2, Search,
  Package, Eye, Filter, LayoutGrid, AlignJustify,
  List, Zap, Upload,
} from 'lucide-react'

function DocPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-bg-page)] px-8 py-10 flex flex-col gap-16">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">Trustabl Design System</h1>
        <p className="text-sm text-[var(--color-text-tertiary)] mt-1">Component reference — sizes, tokens, states, props</p>
      </div>
      {children}
    </div>
  )
}

function DocSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)] whitespace-nowrap">{title}</h2>
        <div className="flex-1 h-px bg-[var(--color-border-muted)]" />
      </div>
      {children}
    </section>
  )
}

function Variant({ label, spec, children }: { label: string; spec?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline gap-3">
        <span className="text-xs font-semibold text-[var(--color-text-primary)] uppercase tracking-wide">{label}</span>
        {spec && <span className="text-[11px] font-mono text-[var(--color-accent-default)]">{spec}</span>}
      </div>
      <div className="flex flex-wrap items-center gap-3 p-4 rounded-[var(--radius-base)] bg-[var(--color-bg-surface)] border border-[var(--color-border-muted)]">
        {children}
      </div>
    </div>
  )
}

function SpecTable({ rows }: { rows: [string, string][] }) {
  return (
    <table className="w-full text-[11px] font-mono border-collapse">
      <tbody>
        {rows.map(([key, val]) => (
          <tr key={key} className="border-b border-[var(--color-border-muted)] last:border-0">
            <td className="py-1.5 pr-4 text-[var(--color-text-secondary)] whitespace-nowrap">{key}</td>
            <td className="py-1.5 text-[var(--color-accent-default)]">{val}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function PropTable({ rows }: { rows: [string, string, string, string][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[11px] border-collapse">
        <thead>
          <tr className="border-b border-[var(--color-border-muted)]">
            {['Prop', 'Type', 'Default', 'Description'].map(h => (
              <th key={h} className="py-2 px-3 text-left text-[var(--color-text-tertiary)] font-semibold uppercase tracking-wide">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([prop, type, def, desc]) => (
            <tr key={prop} className="border-b border-[var(--color-border-muted)] last:border-0">
              <td className="py-2 px-3 font-mono text-[var(--color-accent-default)]">{prop}</td>
              <td className="py-2 px-3 font-mono text-[var(--color-text-secondary)]">{type}</td>
              <td className="py-2 px-3 font-mono text-[var(--color-text-tertiary)]">{def}</td>
              <td className="py-2 px-3 text-[var(--color-text-secondary)]">{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function TwoCol({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[1fr_1fr] gap-6 items-start">
      <div>{left}</div>
      <div className="p-4 rounded-[var(--radius-base)] bg-[var(--color-bg-surface)] border border-[var(--color-border-muted)]">{right}</div>
    </div>
  )
}

export default function UIDocsPage() {
  const [toggle, setToggle] = useState(true)
  const [checkbox, setCheckbox] = useState(true)
  const [radio, setRadio] = useState('a')
  const [activeTab, setActiveTab] = useState('all')
  const [activeToolbarTab, setActiveToolbarTab] = useState('all')
  const [view, setView] = useState('grid')
  const [dropdown, setDropdown] = useState('langflow')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<string[]>([])
  const [modal, setModal] = useState(false)

  const platformOptions = [
    { label: 'Langflow', value: 'langflow' },
    { label: 'Autogen', value: 'autogen' },
    { label: 'Dify', value: 'dify' },
  ]

  const tabs = [
    { label: 'All', value: 'all', badge: 374, icon: List },
    { label: 'Generated', value: 'generated', badge: 138, icon: Zap },
    { label: 'Published', value: 'published', badge: 201, icon: Upload },
  ]

  const tableData = [
    { id: '1', name: 'api-gateway', status: 'Published', downloads: '1,204' },
    { id: '2', name: 'smart-recruiter', status: 'Generated', downloads: 'N/A' },
    { id: '3', name: 'payment-bridge', status: 'Draft', downloads: '98' },
  ]

  return (
    <DocPage>

      {/* BUTTON */}
      <DocSection title="Button">
        <TwoCol
          left={
            <SpecTable rows={[
              ['height sm',  'h-[36px] px-3 text-xs'],
              ['height md',  'h-[42px] px-4 text-sm'],
              ['height lg',  'h-[46px] px-5 text-sm'],
              ['radius',     'rounded-[var(--radius-base)] — 12px'],
              ['font',       'font-medium'],
              ['transition', 'duration-150 ease'],
              ['icon size',  '16px, gap-[var(--space-tight)]'],
            ]}/>
          }
          right={
            <div className="flex flex-col gap-4">
              <Variant label="variant">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="text">Text</Button>
              </Variant>
              <Variant label="size" spec="sm=36px · md=42px · lg=46px">
                <Button size="sm" variant="secondary">Small</Button>
                <Button size="md" variant="secondary">Medium</Button>
                <Button size="lg" variant="secondary">Large</Button>
              </Variant>
              <Variant label="state">
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
                <Button icon={Plus} iconOnly aria-label="Add" />
                <Button icon={Trash2} iconOnly variant="danger" aria-label="Delete" />
              </Variant>
            </div>
          }
        />
        <PropTable rows={[
          ['variant',  "'primary'|'secondary'|'ghost'|'danger'|'text'", "'primary'", 'Visual style'],
          ['size',     "'sm'|'md'|'lg'",                                 "'md'",      'Height variant'],
          ['loading',  'boolean',                                        'false',     'Shows spinner, disables button'],
          ['icon',     'React.ElementType',                              'undefined', 'Lucide icon — 16px'],
          ['iconOnly', 'boolean',                                        'false',     'Square aspect ratio, no text'],
          ['disabled', 'boolean',                                        'false',     'opacity-40, not interactive'],
        ]}/>
      </DocSection>

      <Divider />

      {/* BADGE */}
      <DocSection title="Badge">
        <TwoCol
          left={
            <SpecTable rows={[
              ['size sm',    'px-2 py-0.5 text-[11px]'],
              ['size md',    'px-3 py-1 text-xs'],
              ['shape pill', 'rounded-[var(--radius-pill)]'],
              ['shape sharp','rounded-[var(--radius-sharp)] — 8px'],
            ]}/>
          }
          right={
            <div className="flex flex-col gap-4">
              <Variant label="variant · pill md">
                <Badge variant="info">Info</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="neutral">Neutral</Badge>
              </Variant>
              <Variant label="shape · sharp sm">
                <Badge variant="info" shape="sharp" size="sm">Info</Badge>
                <Badge variant="success" shape="sharp" size="sm">Success</Badge>
                <Badge variant="warning" shape="sharp" size="sm">Warning</Badge>
                <Badge variant="danger" shape="sharp" size="sm">Danger</Badge>
              </Variant>
            </div>
          }
        />
      </DocSection>

      <Divider />

      {/* INPUT FIELD */}
      <DocSection title="InputField">
        <TwoCol
          left={
            <SpecTable rows={[
              ['height md',  'h-[42px] px-3'],
              ['height lg',  'h-[46px] px-3'],
              ['radius',     'rounded-[var(--radius-sharp)] — 8px'],
              ['label',      'text-xs font-medium'],
              ['error/hint', 'text-[11px] below input'],
            ]}/>
          }
          right={
            <div className="flex flex-col gap-4">
              <Variant label="default">
                <div className="w-56"><InputField label="Username" placeholder="Enter username" required /></div>
                <div className="w-56"><InputField label="Bio" placeholder="Optional text" optional /></div>
              </Variant>
              <Variant label="error + hint">
                <div className="w-56"><InputField label="Email" defaultValue="bad@!" error="Enter a valid email." required /></div>
                <div className="w-56"><InputField label="Password" type="password" hint="Min. 8 characters." required /></div>
              </Variant>
              <Variant label="with icon">
                <div className="w-56"><InputField label="Search" iconLeft={Search} placeholder="Search..." /></div>
                <div className="w-56"><InputField label="Password" type="password" iconRight={Eye} required /></div>
              </Variant>
            </div>
          }
        />
      </DocSection>

      <Divider />

      {/* DROPDOWN */}
      <DocSection title="Dropdown">
        <TwoCol
          left={
            <SpecTable rows={[
              ['trigger h',  'h-[42px] px-3'],
              ['radius',     'rounded-[var(--radius-sharp)] — 8px'],
              ['menu radius','rounded-[var(--radius-base)] — 12px'],
              ['menu max-h', 'max-h-[300px] overflow-y-auto'],
              ['z-index',    'var(--z-dropdown) — 20'],
            ]}/>
          }
          right={
            <div className="flex flex-col gap-4">
              <Variant label="single select">
                <div className="w-56">
                  <Dropdown label="Platform" options={platformOptions} value={dropdown} onChange={v => setDropdown(v as string)} />
                </div>
              </Variant>
              <Variant label="multi select">
                <div className="w-72">
                  <Dropdown type="multi" label="Platforms" options={platformOptions} value={[]} onChange={() => {}} />
                </div>
              </Variant>
            </div>
          }
        />
      </DocSection>

      <Divider />

      {/* CARD */}
      <DocSection title="Card">
        <TwoCol
          left={
            <SpecTable rows={[
              ['radius',       'rounded-[var(--radius-card)] — 15px'],
              ['bg',           'var(--color-bg-surface)'],
              ['header',       'px-5 py-[18px]'],
              ['body',         'px-5 py-5'],
              ['footer',       'px-5 py-3.5 gap-2'],
              ['structure',    'flex flex-col (CardBody flex-1)'],
            ]}/>
          }
          right={
            <div className="flex gap-3 items-stretch">
              <Card className="w-[320px] min-h-[220px]">
                <CardHeader><span className="text-sm font-medium">Default</span><Badge variant="info" size="sm">Active</Badge></CardHeader>
                <CardBody>Routes requests to the appropriate agent component.</CardBody>
                <CardFooter><span className="text-[11px] text-[var(--color-text-tertiary)]">2h ago</span><Button size="sm" variant="ghost">View</Button></CardFooter>
              </Card>
              <Card variant="interactive" onClick={() => {}} className="w-[320px] min-h-[220px]">
                <CardHeader><span className="text-sm font-medium">Interactive</span><Badge variant="success" size="sm">Stable</Badge></CardHeader>
                <CardBody>Hover to see border + background state change.</CardBody>
                <CardFooter><span className="text-[11px] text-[var(--color-text-tertiary)]">4h ago</span><span className="text-xs font-medium text-[var(--color-accent-default)]">Use</span></CardFooter>
              </Card>
            </div>
          }
        />
      </DocSection>

      <Divider />

      {/* AVATAR · SPINNER · PROGRESS */}
      <DocSection title="Avatar · Spinner · ProgressBar">
        <div className="grid grid-cols-3 gap-6">
          <Variant label="avatar" spec="sm=24px · md=32px · radius=pill">
            <Avatar type="icon" size="md" />
            <Avatar type="initials" initials="ZA" size="md" />
            <Avatar type="icon" size="sm" />
            <Avatar type="initials" initials="ZA" size="sm" />
          </Variant>
          <Variant label="spinner" spec="sm=14px · md=20px · border-2">
            <Spinner size="sm" />
            <Spinner size="md" />
          </Variant>
          <div className="flex flex-col gap-3">
            <div className="text-xs font-semibold text-[var(--color-text-primary)] uppercase tracking-wide">ProgressBar</div>
            <div className="text-[11px] font-mono text-[var(--color-accent-default)]">h-[6px] · radius-pill</div>
            <div className="p-4 rounded-[var(--radius-base)] bg-[var(--color-bg-surface)] border border-[var(--color-border-muted)] flex flex-col gap-3">
              <ProgressBar value={65} label="Storage" showValue />
              <ProgressBar value={100} label="Complete" showValue />
              <ProgressBar value={30} label="Upload" showValue />
            </div>
          </div>
        </div>
      </DocSection>

      <Divider />

      {/* FORM CONTROLS */}
      <DocSection title="Toggle · Checkbox · Radio">
        <TwoCol
          left={
            <SpecTable rows={[
              ['toggle track',  'w-9 h-5 radius-pill'],
              ['toggle thumb',  'w-3.5 h-3.5 top-[3px]'],
              ['checkbox',      'w-4 h-4 rounded-[4px]'],
              ['radio',         'w-4 h-4 radius-pill'],
              ['dot (radio)',   '6px radius-pill'],
              ['checked bg',    'var(--color-text-primary)'],
            ]}/>
          }
          right={
            <div className="flex gap-8">
              <div className="flex flex-col gap-3">
                <span className="text-[11px] font-mono text-[var(--color-accent-default)]">toggle</span>
                <Toggle checked={toggle} onChange={setToggle} label="Enabled" />
                <Toggle checked={false} onChange={() => {}} label="Off" />
                <Toggle checked disabled onChange={() => {}} label="Disabled" />
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[11px] font-mono text-[var(--color-accent-default)]">checkbox</span>
                <Checkbox checked={checkbox} onChange={setCheckbox} label="Checked" />
                <Checkbox checked={false} onChange={() => {}} label="Unchecked" />
                <Checkbox checked indeterminate onChange={() => {}} label="Indeterminate" />
                <Checkbox checked={false} disabled onChange={() => {}} label="Disabled" />
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[11px] font-mono text-[var(--color-accent-default)]">radio</span>
                <Radio name="doc" value="a" checked={radio === 'a'} onChange={setRadio} label="Option A" />
                <Radio name="doc" value="b" checked={radio === 'b'} onChange={setRadio} label="Option B" />
                <Radio name="doc" value="c" checked={false} disabled onChange={() => {}} label="Disabled" />
              </div>
            </div>
          }
        />
      </DocSection>

      <Divider />

      {/* TABS */}
      <DocSection title="Tabs">
        <TwoCol
          left={
            <SpecTable rows={[
              ['underline tab',  'h-10 px-3.5 border-b-2'],
              ['pill container', 'p-1 radius-base'],
              ['pill tab',       'h-8 px-3.5 radius-sharp'],
              ['active bg',      'var(--color-bg-raised)'],
              ['active border',  'var(--color-border-muted)'],
            ]}/>
          }
          right={
            <div className="flex flex-col gap-4">
              <Variant label="underline">
                <Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} />
              </Variant>
              <Variant label="pill">
                <Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} variant="pill" />
              </Variant>
            </div>
          }
        />
      </DocSection>

      <Divider />

      {/* TOOLBAR */}
      <DocSection title="Pattern — Toolbar">
        <TwoCol
          left={
            <SpecTable rows={[
              ['container',  'p-1 radius-base bg-surface'],
              ['tab height', 'h-8 px-3.5 radius-sharp'],
              ['icon btn',   'w-8 h-8 radius-sharp'],
              ['divider',    'w-px h-5 mx-1'],
            ]}/>
          }
          right={
            <Toolbar
              tabs={tabs}
              activeTab={activeToolbarTab}
              onTabChange={setActiveToolbarTab}
              actions={[
                { icon: LayoutGrid, onClick: () => setView('grid'), active: view === 'grid', 'aria-label': 'Grid view' },
                { icon: AlignJustify, onClick: () => setView('list'), active: view === 'list', 'aria-label': 'List view' },
                { icon: Filter, onClick: () => {}, 'aria-label': 'Filters' },
              ]}
            />
          }
        />
      </DocSection>

      <Divider />

      {/* ALERT */}
      <DocSection title="Alert">
        <TwoCol
          left={
            <SpecTable rows={[
              ['padding',  'px-4 py-3.5'],
              ['radius',   'rounded-[var(--radius-base)] — 12px'],
              ['border-l', '3px solid var(--color-border-muted)'],
              ['icon',     '16px, color: --color-text-primary (white)'],
              ['title',    'text-sm font-semibold'],
              ['desc',     'text-xs'],
              ['dismiss',  'only when onDismiss passed'],
            ]}/>
          }
          right={
            <div className="flex flex-col gap-2">
              <Alert title="API quota almost full" description="80% of free tier used." onDismiss={() => {}} />
              <Alert variant="success" title="Component published" description="Visible in community catalog." onDismiss={() => {}} />
              <Alert variant="danger" title="API key invalid" description="Generate a new key to continue." onDismiss={() => {}} />
              <Alert variant="warning" title="Breaking change detected" description="This may affect existing workflows." onDismiss={() => {}} />
            </div>
          }
        />
      </DocSection>

      <Divider />

      {/* SKELETON */}
      <DocSection title="Skeleton">
        <TwoCol
          left={
            <SpecTable rows={[
              ['line',     'h-[14px] radius-sharp'],
              ['caption',  'h-[11px] radius-sharp'],
              ['circle',   'radius-pill'],
              ['rect',     'radius-base'],
              ['animation','shimmer 1.5s infinite'],
            ]}/>
          }
          right={
            <div className="flex gap-6 items-start">
              <div className="flex flex-col gap-2 w-40">
                <Skeleton width="80%" height={14} />
                <Skeleton width="60%" height={14} />
                <Skeleton width="90%" height={11} />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton variant="circle" width={32} height={32} />
                <div className="flex flex-col gap-1.5">
                  <Skeleton width={100} height={13} />
                  <Skeleton width={70} height={11} />
                </div>
              </div>
              <Skeleton variant="rect" width={120} height={80} />
            </div>
          }
        />
      </DocSection>

      <Divider />

      {/* TOOLTIP + POPOVER */}
      <DocSection title="Tooltip · Popover">
        <TwoCol
          left={
            <SpecTable rows={[
              ['tooltip padding', 'px-2.5 py-1.5'],
              ['tooltip radius',  'radius-sharp — 8px'],
              ['tooltip bg',      'var(--color-text-primary)'],
              ['tooltip text',    'text-xs font-medium, var(--color-bg-page)'],
              ['arrow',           '6px CSS triangle, inline style'],
              ['trigger',         'hover + focus'],
              ['popover radius',  'radius-base — 12px'],
              ['popover z',       'var(--z-dropdown) — 20'],
            ]}/>
          }
          right={
            <div className="flex flex-col gap-4">
              <Variant label="tooltip — top">
                <Tooltip content="Delete this component" position="top">
                  <Button icon={Trash2} iconOnly variant="danger" aria-label="Delete" />
                </Tooltip>
                <Tooltip content="Add component" position="right">
                  <Button icon={Plus} iconOnly variant="ghost" aria-label="Add" />
                </Tooltip>
              </Variant>
              <Variant label="popover menu">
                <Popover
                  type="menu"
                  trigger={<Button variant="ghost" size="sm">Open menu</Button>}
                  items={[
                    { label: 'Edit', icon: Plus, onClick: () => {} },
                    { label: 'Delete', icon: Trash2, onClick: () => {}, danger: true },
                  ]}
                />
              </Variant>
            </div>
          }
        />
      </DocSection>

      <Divider />

      {/* PAGINATION */}
      <DocSection title="Pagination">
        <TwoCol
          left={
            <SpecTable rows={[
              ['page btn',  'w-8 h-8 (32px) radius-sharp'],
              ['container', 'px-4 py-3 radius-base'],
              ['select',    'pl-2 pr-6 appearance-none'],
              ['sticky',    'fixed bottom-0, left = sidebar width'],
              ['z-index',   'var(--z-toast) — 40'],
            ]}/>
          }
          right={
            <Pagination
              currentPage={page}
              totalPages={12}
              totalItems={120}
              pageSize={10}
              onPageChange={setPage}
              onPageSizeChange={() => {}}
            />
          }
        />
      </DocSection>

      <Divider />

      {/* MODAL */}
      <DocSection title="Modal">
        <TwoCol
          left={
            <SpecTable rows={[
              ['max-w',    'max-w-[440px]'],
              ['radius',   'rounded-[var(--radius-card)] — 15px'],
              ['header',   'px-5 py-[18px]'],
              ['title',    'text-[15px] font-semibold'],
              ['body',     'px-5 py-5 text-sm'],
              ['footer',   'px-5 py-3.5 justify-end gap-2'],
              ['dividers', 'border-[var(--color-border-muted)] — all variants same'],
              ['backdrop', 'var(--color-backdrop) rgba(0,0,0,0.6)'],
              ['z-index',  'var(--z-modal) — 30'],
              ['focus',    'focus-trap-react, Esc closes'],
            ]}/>
          }
          right={
            <div className="flex flex-col gap-3">
              <Button onClick={() => setModal(true)}>Open Modal</Button>
              <Modal
                open={modal}
                onClose={() => setModal(false)}
                title="Add API Key"
                footer={
                  <>
                    <Button variant="secondary" onClick={() => setModal(false)}>Cancel</Button>
                    <Button onClick={() => setModal(false)}>Save Key</Button>
                  </>
                }
              >
                <InputField label="API Key" placeholder="sk-ant-api03-..." required />
              </Modal>
              <p className="text-[11px] text-[var(--color-text-tertiary)]">Warning and danger variants use same header border — intent via title + button only.</p>
            </div>
          }
        />
        <PropTable rows={[
          ['variant', "'default'|'warning'|'danger'", "'default'", 'Intent — affects title copy + footer button only, not header border'],
          ['open',    'boolean',                       'required',  'Controlled visibility'],
          ['onClose', '() => void',                   'required',  'Esc + backdrop click + close button'],
          ['footer',  'React.ReactNode',               'undefined', 'Renders in footer — typically Cancel + action buttons'],
        ]}/>
      </DocSection>

      <Divider />

      {/* TABLE */}
      <DocSection title="Table">
        <TwoCol
          left={
            <SpecTable rows={[
              ['wrap',   'rounded-[var(--radius-base)] border'],
              ['header', 'px-4 py-2.5 text-[11px] uppercase tracking-wide'],
              ['cell',   'px-4 py-3 text-sm'],
              ['select', 'checkbox col w-10 pl-4'],
              ['sort',   'controlled — parent manages sortKey + sortDirection'],
            ]}/>
          }
          right={
            <Table
              columns={[
                { key: 'name' as const, label: 'Component', sortable: true },
                { key: 'status' as const, label: 'Status', render: (v: unknown) => {
                  const s = String(v)
                  return <Badge variant={s === 'Published' ? 'success' : s === 'Generated' ? 'info' : 'neutral'} size="sm">{s}</Badge>
                }},
                { key: 'downloads' as const, label: 'Downloads' },
              ]}
              data={tableData}
              selectable
              selectedRows={selected}
              onSelect={setSelected}
            />
          }
        />
      </DocSection>

      <Divider />

      {/* FILE UPLOAD */}
      <DocSection title="FileUpload">
        <TwoCol
          left={
            <SpecTable rows={[
              ['dropzone',  'px-6 py-8 radius-card border-dashed 1.5px'],
              ['file item', 'px-3 py-2.5 radius-sharp'],
              ['icon wrap', 'w-8 h-8 radius-sharp'],
              ['states',    'uploading → complete → error'],
            ]}/>
          }
          right={
            <div className="max-w-sm">
              <FileUpload accept=".pdf,.png" maxSize={5 * 1024 * 1024} multiple />
            </div>
          }
        />
      </DocSection>

      <Divider />

      {/* TOAST */}
      <DocSection title="Toast">
        <TwoCol
          left={
            <SpecTable rows={[
              ['padding',  'px-4 py-3.5'],
              ['radius',   'rounded-[var(--radius-base)] — 12px'],
              ['max-w',    'max-w-[360px]'],
              ['position', 'fixed bottom-6 right-6'],
              ['z-index',  'var(--z-toast) — 40'],
              ['duration', '4000ms auto-dismiss (0 = persist)'],
            ]}/>
          }
          right={
            <div className="max-w-sm">
              <Toast message="Component published successfully." onDismiss={() => {}} duration={0} />
            </div>
          }
        />
      </DocSection>

      <Divider />

      {/* FORM LAYOUT */}
      <DocSection title="Pattern — FormLayout">
        <TwoCol
          left={
            <SpecTable rows={[
              ['max-w',   '640px'],
              ['radius',  'rounded-[var(--radius-card)] — 15px'],
              ['header',  'px-5 py-[18px] border-b'],
              ['body',    'px-5 py-5 gap-4'],
              ['footer',  'px-5 py-3.5 justify-end gap-2'],
            ]}/>
          }
          right={
            <FormLayout
              title="Edit Profile"
              onSubmit={(e) => e.preventDefault()}
              footer={
                <>
                  <Button variant="ghost" type="button">Discard</Button>
                  <Button type="submit">Save Changes</Button>
                </>
              }
            >
              <FormSection title="General">
                <InputField label="Username" defaultValue="zanexflores" required />
              </FormSection>
              <Divider />
              <FormSection title="Preferences">
                <Toggle checked={toggle} onChange={setToggle} label="Email notifications" />
              </FormSection>
            </FormLayout>
          }
        />
      </DocSection>

      <Divider />

      {/* EMPTY STATE */}
      <DocSection title="Pattern — EmptyState">
        <TwoCol
          left={
            <SpecTable rows={[
              ['padding',   'px-8 py-12'],
              ['radius',    'rounded-[var(--radius-card)] — 15px'],
              ['icon wrap', 'w-14 h-14 (56px) radius-card'],
              ['icon',      '24px'],
              ['desc max-w','max-w-[280px]'],
              ['danger',    'danger-bg + danger-border on icon wrap'],
            ]}/>
          }
          right={
            <div className="grid grid-cols-3 gap-3">
              <EmptyState icon={Package} title="No components" description="Create your first component." action={{ label: 'New', onClick: () => {} }} />
              <EmptyState icon={Search} title="No results" description="Try adjusting filters." action={{ label: 'Clear', onClick: () => {}, variant: 'ghost' }} />
              <EmptyState icon={Trash2} title="Load failed" description="Something went wrong." action={{ label: 'Retry', onClick: () => {}, variant: 'ghost' }} danger />
            </div>
          }
        />
      </DocSection>

    </DocPage>
  )
}
