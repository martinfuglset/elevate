'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import { FileText, Download, Eye, MoreHorizontal } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'

interface Document {
  id: number
  name: string
  type: string
  size: string
  status: string
  lastModified: string
  downloads: number
}

const documents: Document[] = [
  {
    id: 1,
    name: 'Q4 Financial Report',
    type: 'PDF',
    size: '2.4 MB',
    status: 'Published',
    lastModified: '2 hours ago',
    downloads: 156
  },
  {
    id: 2,
    name: 'User Manual v2.1',
    type: 'DOCX',
    size: '1.8 MB',
    status: 'Draft',
    lastModified: '1 day ago',
    downloads: 89
  },
  {
    id: 3,
    name: 'Marketing Strategy',
    type: 'PDF',
    size: '3.2 MB',
    status: 'Published',
    lastModified: '3 days ago',
    downloads: 234
  },
  {
    id: 4,
    name: 'API Documentation',
    type: 'MD',
    size: '456 KB',
    status: 'In Review',
    lastModified: '1 week ago',
    downloads: 67
  },
  {
    id: 5,
    name: 'Product Roadmap',
    type: 'PDF',
    size: '1.5 MB',
    status: 'Published',
    lastModified: '2 weeks ago',
    downloads: 189
  }
]

const columns: ColumnDef<Document>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Document Name" />
    ),
    cell: ({ row }) => {
      const document = row.original
      return (
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-muted rounded-lg">
            <FileText className="h-4 w-4" />
          </div>
          <div>
            <div className="font-medium">{document.name}</div>
            <div className="text-sm text-muted-foreground">{document.type} • {document.size}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const getStatusColor = (status: string) => {
        switch (status) {
          case 'Published':
            return 'default'
          case 'Draft':
            return 'secondary'
          case 'In Review':
            return 'outline'
          default:
            return 'outline'
        }
      }
      return <Badge variant={getStatusColor(status)}>{status}</Badge>
    },
  },
  {
    accessorKey: 'downloads',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Downloads" />
    ),
    cell: ({ row }) => {
      const downloads = row.getValue('downloads') as number
      return <div className="font-medium">{downloads}</div>
    },
  },
  {
    accessorKey: 'lastModified',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Modified" />
    ),
    cell: ({ row }) => {
      const lastModified = row.getValue('lastModified') as string
      return <div className="text-muted-foreground">{lastModified}</div>
    },
  },
]

const tabs = [
  { value: 'all', label: 'All Documents' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Drafts' },
  { value: 'review', label: 'In Review' },
]

export function DocumentsTable() {
  return (
    <Card>
      <CardContent className="pt-6">
        <DataTable
          columns={columns}
          data={documents}
          tabs={tabs}
          searchColumn="name"
          searchPlaceholder="Search documents..."
          title="Recent Documents"
        />
      </CardContent>
    </Card>
  )
} 