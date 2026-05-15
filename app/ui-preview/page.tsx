'use client'

import { useState, useEffect } from 'react'
import {
  Button, InputField, Card, CardHeader, CardBody, CardFooter,
  Badge, Modal, Toast, Divider, Spinner, ProgressBar,
  Toggle, Checkbox, Radio, FileUpload, Tooltip, Avatar,
  Tabs, NavItem, Table, Skeleton, Alert, Popover, Pagination,
  Dropdown,
} from '@/components/ui'
import { Sidebar } from '@/components/patterns/Sidebar'
import { Toolbar } from '@/components/patterns/Toolbar'
import { FormLayout, FormSection } from '@/components/patterns/FormLayout'
import { EmptyState } from '@/components/patterns/EmptyState'
import {
  Plus, Trash2, Edit, GitFork, Search, Eye, Upload,
  LayoutDashboard, Wrench, GitBranch, Filter, LayoutGrid,
  AlignJustify, Zap, List, AlertCircle, Package,
} from 'lucide-react'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h2 className="text-[11px] font-semibold text-[var(--color-accent-default)] uppercase tracking-widest">{title}</h2>
        <div className="flex-1 h-px bg-[var(--color-border-muted)]" />
      </div>
      {children}
    </section>
  )
}

function Row({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <p className="text-[11px] text-[var(--color-text-tertiary)] font-mono">{label}</p>}
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

export default function UIPreview() {
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [])

  const [modalOpen, setModalOpen] = useState(false)
  const [warningModalOpen, setWarningModalOpen] = useState(false)
  const [dangerModalOpen, setDangerModalOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [toggle, setToggle] = useState(true)
  const [checkbox, setCheckbox] = useState(true)
  const [radio, setRadio] = useState('langflow')
  const [activeTab, setActiveTab] = useState('all')
  const [activePillTab, setActivePillTab] = useState('all')
  const [activeNav, setActiveNav] = useState('repositories')
  const [dropdown, setDropdown] = useState<string>('langflow')
  const [multiDropdown, setMultiDropdown] = useState<string[]>(['langflow'])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selected, setSelected] = useState<string[]>([])
  const [activeToolbarTab, setActiveToolbarTab] = useState('all')
  const [view, setView] = useState('grid')
  const [sortKey, setSortKey] = useState<'name' | 'status' | 'downloads'>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const tabs = [
    { label: 'All', value: 'all', icon: List, badge: 374 },
    { label: 'Generated', value: 'generated', icon: Zap, badge: 138 },
    { label: 'Published', value: 'published', icon: Upload, badge: 201 },
  ]

  const navItems = [
    { label: 'Dashboard', value: 'dashboard', icon: LayoutDashboard },
    { label: 'Tools', value: 'tools', icon: Wrench },
    {
      label: 'Repositories',
      value: 'repositories',
      icon: GitBranch,
      count: 5,
      subItems: [
        { label: 'agent-sandbox', value: 'agent-sandbox' },
        { label: 'llm-gateway', value: 'llm-gateway' },
        { label: 'workflow-engine', value: 'workflow-engine' },
        { label: 'mcp-tools', value: 'mcp-tools' },
        { label: 'trustabl-core', value: 'trustabl-core' },
      ],
    },
  ]

  const tableData = [
    { id: '1', name: 'api-gateway', status: 'Published', downloads: '1,204' },
    { id: '2', name: 'smart-recruiter', status: 'Generated', downloads: 'N/A' },
    { id: '3', name: 'payment-bridge', status: 'Draft', downloads: '98' },
  ]

  const dropdownOptions = [
    { label: 'Langflow', value: 'langflow' },
    { label: 'Autogen', value: 'autogen' },
    { label: 'Dify', value: 'dify' },
    { label: 'CrewAI', value: 'crewai' },
  ]

  const handleSort = (key: 'name' | 'status' | 'downloads') => {
    if (key === sortKey) {
      setSortDirection(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
  }

  const sortedTableData = [...tableData].sort((a, b) => {
    const mult = sortDirection === 'asc' ? 1 : -1
    return String(a[sortKey]).localeCompare(String(b[sortKey])) * mult
  })

  return (
    <div className="flex h-screen w-screen bg-[var(--color-bg-page)] overflow-hidden">

      {/* Sidebar */}
      <div className="flex-shrink-0 overflow-hidden">
        <Sidebar
          items={navItems}
          activeValue={activeNav}
          onNavigate={setActiveNav}
          username="zanexflores"
          onCollapse={setSidebarCollapsed}
        />
      </div>

      {/* Right side */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* Topbar */}
        <div
          className="flex-shrink-0 border-b border-[var(--color-border-muted)] bg-[var(--color-bg-surface)] px-8 py-4"
          style={{ zIndex: 'var(--z-overlay)' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[15px] font-semibold text-[var(--color-text-primary)]">Trustabl Design System</h1>
              <p className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">v0.4.0 - UI Preview</p>
            </div>
            <Badge variant="success">All components</Badge>
          </div>
        </div>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden px-8 py-8 flex flex-col gap-12 pb-24">

          {/* Button */}
          <Section title="Button">
            <Row label="variant">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="text">Text</Button>
            </Row>
            <Row label="size">
              <Button variant="secondary" size="sm">Small 36px</Button>
              <Button variant="secondary" size="md">Medium 42px</Button>
              <Button variant="secondary" size="lg">Large 46px</Button>
            </Row>
            <Row label="states">
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
              <Button icon={Plus} iconOnly aria-label="Add" />
              <Button icon={Trash2} iconOnly variant="danger" aria-label="Delete" />
            </Row>
          </Section>

          <Divider />

          {/* NavItem standalone */}
          <Section title="NavItem">
            <Row label="without sub-item">
              <div className="flex flex-col gap-1 w-52">
                <NavItem label="Dashboard" icon={LayoutDashboard} active onClick={() => {}} />
                <NavItem label="Tools" icon={Wrench} onClick={() => {}} />
              </div>
            </Row>
            <Row label="with sub-item">
              <div className="flex flex-col gap-1 w-52">
                <NavItem
                  label="Repositories"
                  icon={GitBranch}
                  count={5}
                  active
                  onClick={() => {}}
                  subItems={[
                    { label: 'agent-sandbox' },
                    { label: 'llm-gateway' },
                    { label: 'workflow-engine' },
                    { label: 'mcp-tools' },
                    { label: 'trustabl-core' },
                  ]}
                />
              </div>
            </Row>
          </Section>

          <Divider />

          {/* InputField */}
          <Section title="InputField">
            <Row label="default">
              <div className="w-64"><InputField label="Username" placeholder="Enter username" required /></div>
              <div className="w-64"><InputField label="Bio" placeholder="Tell us about yourself" optional /></div>
            </Row>
            <Row label="states">
              <div className="w-64"><InputField label="Email" type="email" defaultValue="zane@#!" error="Enter a valid email address." required /></div>
              <div className="w-64"><InputField label="Password" type="password" hint="Min. 8 characters." required /></div>
            </Row>
            <Row label="with icons">
              <div className="w-64"><InputField label="Search" iconLeft={Search} placeholder="Search components..." /></div>
              <div className="w-64"><InputField label="Password" type="password" iconRight={Eye} required /></div>
            </Row>
          </Section>

          <Divider />

          {/* Dropdown */}
          <Section title="Dropdown">
            <Row label="single select">
              <div className="w-64"><Dropdown label="Platform" options={dropdownOptions} value={dropdown} onChange={v => setDropdown(v as string)} /></div>
            </Row>
            <Row label="multi select">
              <div className="w-72"><Dropdown type="multi" label="Platforms" options={dropdownOptions} value={multiDropdown} onChange={v => setMultiDropdown(v as string[])} /></div>
            </Row>
          </Section>

          <Divider />

          {/* Card */}
          <Section title="Card">
            <Row>
              <Card className="w-[320px] min-h-[220px]">
                <CardHeader>
                  <span className="text-sm font-medium text-[var(--color-text-primary)]">Default Card</span>
                  <Badge variant="info" size="sm">Active</Badge>
                </CardHeader>
                <CardBody>Routes requests to the appropriate agent component.</CardBody>
                <CardFooter>
                  <span className="text-[11px] text-[var(--color-text-tertiary)]">2h ago</span>
                  <Button variant="ghost" size="sm">View</Button>
                </CardFooter>
              </Card>
              <Card variant="interactive" onClick={() => {}} className="w-[320px] min-h-[220px]">
                <CardHeader>
                  <span className="text-sm font-medium text-[var(--color-text-primary)]">Interactive Card</span>
                  <Badge variant="success" size="sm">Stable</Badge>
                </CardHeader>
                <CardBody>Hover me — interactive state with border and background change.</CardBody>
                <CardFooter>
                  <span className="text-[11px] text-[var(--color-text-tertiary)]">4h ago</span>
                  <span className="text-xs font-medium text-[var(--color-accent-default)]">Use</span>
                </CardFooter>
              </Card>
            </Row>
          </Section>

          <Divider />

          {/* Badge */}
          <Section title="Badge">
            <Row label="pill md">
              <Badge variant="info">Info</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="neutral">Neutral</Badge>
            </Row>
            <Row label="sharp sm">
              <Badge variant="info" shape="sharp" size="sm">Info</Badge>
              <Badge variant="success" shape="sharp" size="sm">Success</Badge>
              <Badge variant="warning" shape="sharp" size="sm">Warning</Badge>
              <Badge variant="danger" shape="sharp" size="sm">Danger</Badge>
            </Row>
          </Section>

          <Divider />

          {/* Form Controls */}
          <Section title="Form Controls">
            <Row label="toggle">
              <Toggle checked={toggle} onChange={setToggle} label="Email notifications" />
              <Toggle checked={false} onChange={() => {}} label="Off state" />
              <Toggle checked={true} onChange={() => {}} label="Disabled" disabled />
            </Row>
            <Row label="checkbox">
              <Checkbox checked={checkbox} onChange={setCheckbox} label="Checked" />
              <Checkbox checked={false} onChange={() => {}} label="Unchecked" />
              <Checkbox checked={true} indeterminate onChange={() => {}} label="Indeterminate" />
              <Checkbox checked={false} onChange={() => {}} label="Disabled" disabled />
            </Row>
            <Row label="radio">
              <Radio name="platform" value="langflow" checked={radio === 'langflow'} onChange={setRadio} label="Langflow" />
              <Radio name="platform" value="autogen" checked={radio === 'autogen'} onChange={setRadio} label="Autogen" />
              <Radio name="platform" value="dify" checked={radio === 'dify'} onChange={setRadio} label="Dify" disabled />
            </Row>
          </Section>

          <Divider />

          {/* Tabs */}
          <Section title="Tabs">
            <Row label="underline"><Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} /></Row>
            <Row label="pill"><Tabs tabs={tabs} value={activePillTab} onChange={setActivePillTab} variant="pill" /></Row>
          </Section>

          <Divider />

          {/* Toolbar */}
          <Section title="Pattern — Toolbar">
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
          </Section>

          <Divider />

          {/* Avatar + Spinner + Progress + Divider */}
          <Section title="Avatar · Spinner · ProgressBar · Divider">
            <Row label="avatar md">
              <Avatar type="icon" size="md" />
              <Avatar type="initials" initials="ZA" size="md" />
              <Avatar type="photo" src="https://i.pravatar.cc/32" alt="User" size="md" />
            </Row>
            <Row label="avatar sm">
              <Avatar type="icon" size="sm" />
              <Avatar type="initials" initials="ZA" size="sm" />
            </Row>
            <Row label="spinner">
              <Spinner size="sm" />
              <Spinner size="md" />
            </Row>
            <Row label="progress">
              <div className="w-64"><ProgressBar value={65} label="Storage used" showValue /></div>
              <div className="w-64"><ProgressBar value={100} label="Complete" showValue /></div>
            </Row>
            <Row label="divider">
              <div className="w-64"><Divider /></div>
              <div className="flex items-center gap-2 h-8">
                <span className="text-sm text-[var(--color-text-secondary)]">Left</span>
                <Divider orientation="vertical" />
                <span className="text-sm text-[var(--color-text-secondary)]">Right</span>
              </div>
            </Row>
          </Section>

          <Divider />

          {/* Skeleton */}
          <Section title="Skeleton">
            <Row label="lines">
              <div className="flex flex-col gap-2 w-64">
                <Skeleton width="80%" height={14} />
                <Skeleton width="60%" height={14} />
                <Skeleton width="90%" height={11} />
              </div>
            </Row>
            <Row label="avatar + rect">
              <div className="flex items-center gap-3">
                <Skeleton variant="circle" width={32} height={32} />
                <div className="flex flex-col gap-1.5">
                  <Skeleton width={120} height={13} />
                  <Skeleton width={80} height={11} />
                </div>
              </div>
              <Skeleton variant="rect" width={200} height={100} />
            </Row>
          </Section>

          <Divider />

          {/* Alert */}
          <Section title="Alert">
            <Alert title="API quota almost full" description="You've used 80% of your free tier." onDismiss={() => {}} />
            <Alert variant="success" title="Component published" description="Now visible in the community catalog." onDismiss={() => {}} />
            <Alert variant="danger" title="API key invalid" description="Generate a new key to continue." onDismiss={() => {}} />
            <Alert variant="warning" title="Breaking change detected" description="This update may affect existing workflows." onDismiss={() => {}} />
          </Section>

          <Divider />

          {/* Tooltip */}
          <Section title="Tooltip">
            <Row>
              <Tooltip content="Delete component" position="top">
                <Button icon={Trash2} iconOnly variant="danger" aria-label="Delete" />
              </Tooltip>
              <Tooltip content="Edit component" position="right">
                <Button icon={Edit} iconOnly variant="ghost" aria-label="Edit" />
              </Tooltip>
              <Tooltip content="Fork component" position="bottom">
                <Button icon={GitFork} iconOnly variant="ghost" aria-label="Fork" />
              </Tooltip>
              <Tooltip content="Upload" position="left">
                <Button icon={Upload} iconOnly aria-label="Upload" />
              </Tooltip>
            </Row>
          </Section>

          <Divider />

          {/* Popover */}
          <Section title="Popover">
            <Row label="menu">
              <Popover
                type="menu"
                trigger={<Button variant="ghost" size="sm">Open menu ↓</Button>}
                items={[
                  { label: 'Edit', icon: Edit, onClick: () => {} },
                  { label: 'Fork', icon: GitFork, onClick: () => {} },
                  { label: 'Delete', icon: Trash2, onClick: () => {}, danger: true },
                ]}
              />
            </Row>
            <Row label="content">
              <Popover
                type="content"
                trigger={<Button size="sm">Publish ↓</Button>}
                title="Confirm publish"
                description="This will make your component visible to the community."
                footer={
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">Cancel</Button>
                    <Button size="sm">Publish</Button>
                  </div>
                }
              />
            </Row>
          </Section>

          <Divider />

          {/* FileUpload */}
          <Section title="FileUpload">
            <div className="max-w-md">
              <FileUpload accept=".pdf,.png,.jpg" maxSize={10 * 1024 * 1024} multiple />
            </div>
          </Section>

          <Divider />

          {/* Table */}
          <Section title="Table">
            <Table
              columns={[
                { key: 'name' as const, label: 'Component', sortable: true },
                { key: 'status' as const, label: 'Status', render: (v: unknown) => {
                  const s = String(v)
                  return <Badge variant={s === 'Published' ? 'success' : s === 'Generated' ? 'info' : 'neutral'}>{s}</Badge>
                }},
                { key: 'downloads' as const, label: 'Downloads', sortable: true },
              ]}
              data={sortedTableData}
              selectable
              selectedRows={selected}
              onSelect={setSelected}
              sortKey={sortKey}
              sortDirection={sortDirection}
              onSort={handleSort as (key: keyof typeof sortedTableData[0]) => void}
            />
          </Section>

          <Divider />

          {/* Pagination inline */}
          <Section title="Pagination — Inline">
            <Pagination
              currentPage={page}
              totalPages={24}
              totalItems={234}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          </Section>

          <Divider />

          {/* Modal */}
          <Section title="Modal">
            <Row label="default · warning · danger">
              <Button onClick={() => setModalOpen(true)}>Default Modal</Button>
              <Button variant="secondary" onClick={() => setWarningModalOpen(true)}>Warning Modal</Button>
              <Button variant="danger" onClick={() => setDangerModalOpen(true)}>Danger Modal</Button>
            </Row>
            <Modal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              title="Add API Key"
              footer={
                <>
                  <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
                  <Button onClick={() => setModalOpen(false)}>Save Key</Button>
                </>
              }
            >
              <InputField label="API Key" placeholder="sk-ant-api03-••••" required />
            </Modal>
            <Modal
              open={warningModalOpen}
              onClose={() => setWarningModalOpen(false)}
              title="Unsaved Changes"
              variant="warning"
              footer={
                <>
                  <Button variant="secondary" onClick={() => setWarningModalOpen(false)}>Cancel</Button>
                  <Button variant="secondary" onClick={() => setWarningModalOpen(false)}>Discard Changes</Button>
                </>
              }
            >
              <p>You have unsaved changes. Are you sure you want to leave? Your changes will be lost.</p>
            </Modal>
            <Modal
              open={dangerModalOpen}
              onClose={() => setDangerModalOpen(false)}
              title="Delete Component"
              variant="danger"
              footer={
                <>
                  <Button variant="secondary" onClick={() => setDangerModalOpen(false)}>Cancel</Button>
                  <Button variant="danger" onClick={() => setDangerModalOpen(false)}>Delete Permanently</Button>
                </>
              }
            >
              <p>This action cannot be undone. The component and all its data will be permanently deleted.</p>
            </Modal>
          </Section>

          <Divider />

          {/* FormLayout */}
          <Section title="Pattern — FormLayout">
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
                <InputField label="Bio" placeholder="Tell us about yourself" optional />
              </FormSection>
              <Divider />
              <FormSection title="Preferences">
                <Toggle checked={toggle} onChange={setToggle} label="Email notifications" />
              </FormSection>
            </FormLayout>
          </Section>

          <Divider />

          {/* EmptyState */}
          <Section title="Pattern — EmptyState">
            <div className="grid grid-cols-3 gap-4">
              <EmptyState
                icon={Package}
                title="No components yet"
                description="Create your first component to get started."
                action={{ label: 'New Component', onClick: () => {} }}
              />
              <EmptyState
                icon={Search}
                title="No results found"
                description="Try adjusting or clearing your filters."
                action={{ label: 'Clear filters', onClick: () => {}, variant: 'ghost' }}
              />
              <EmptyState
                icon={AlertCircle}
                title="Failed to load"
                description="Something went wrong. Please try again."
                action={{ label: 'Retry', onClick: () => {}, variant: 'ghost' }}
                danger
              />
            </div>
          </Section>

          <Divider />

          {/* Toast static preview */}
          <Section title="Toast — static preview">
            <div className="max-w-sm">
              <Toast message="Component published successfully." onDismiss={() => {}} duration={0} />
            </div>
          </Section>

          <div className="h-20" />
        </main>
      </div>

      {/* Sticky Pagination */}
      <div
        className="fixed bottom-0 right-0"
        style={{ zIndex: 'var(--z-toast)', left: sidebarCollapsed ? 52 : 220 }}
      >
        <Pagination
          variant="sticky"
          currentPage={page}
          totalPages={24}
          totalItems={234}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    </div>
  )
}
