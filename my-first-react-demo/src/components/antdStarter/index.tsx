import { useState } from 'react'
import {
  App as AntdApp,
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd'
import { PlusOutlined, SendOutlined } from '@ant-design/icons'
import type { TableProps } from 'antd'
import './antdStarter.scss'

type FormValues = {
  name: string
  plan: string
  note?: string
}

type TableRecord = {
  key: string
  name: string
  status: 'Ready' | 'Review' | 'Done'
  owner: string
}

const defaultRows: TableRecord[] = [
  { key: '1', name: 'Landing page refresh', status: 'Ready', owner: 'Ava' },
  { key: '2', name: 'Auth flow cleanup', status: 'Review', owner: 'Noah' },
  { key: '3', name: 'Dashboard card set', status: 'Done', owner: 'Mia' },
]

const columns: TableProps<TableRecord>['columns'] = [
  {
    dataIndex: 'name',
    key: 'name',
    title: 'Task',
  },
  {
    dataIndex: 'owner',
    key: 'owner',
    title: 'Owner',
  },
  {
    dataIndex: 'status',
    key: 'status',
    title: 'Status',
    render: (status: TableRecord['status']) => {
      const colorMap: Record<TableRecord['status'], string> = {
        Done: 'green',
        Ready: 'blue',
        Review: 'gold',
      }

      return <Tag color={colorMap[status]}>{status}</Tag>
    },
  },
]

const AntdStarter = () => {
  const [rows, setRows] = useState(defaultRows)
  const [form] = Form.useForm<FormValues>()
  const { message } = AntdApp.useApp()

  const handleSubmit = (values: FormValues) => {
    setRows((current) => [
      {
        key: crypto.randomUUID(),
        name: `${values.plan}: ${values.name}`,
        owner: values.name,
        status: 'Ready',
      },
      ...current,
    ])

    message.success(`已创建任务：${values.name}`)
    form.resetFields()
  }

  return (
    <section className="antd-starter">
      <div className="antd-starter__header">
        <div>
          <Typography.Text className="antd-starter__eyebrow">Ant Design Starter</Typography.Text>
          <Typography.Title level={2}>一个可直接复用的 Antd 组件模板</Typography.Title>
          <Typography.Paragraph>
            这个示例覆盖了常见的表单、按钮、日期选择器、下拉框、表格和状态标签，适合作为你后续页面的起点。
          </Typography.Paragraph>
        </div>
        <Space wrap>
          <Tag color="processing">React 19</Tag>
          <Tag color="purple">Ant Design 5</Tag>
        </Space>
      </div>

      <div className="antd-starter__grid">
        <Card className="antd-starter__card" title="创建任务">
          <Form<FormValues> form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="负责人"
              name="name"
              rules={[{ message: '请输入负责人名称', required: true }]}
            >
              <Input placeholder="例如：Alice" />
            </Form.Item>

            <Form.Item
              label="任务类型"
              name="plan"
              rules={[{ message: '请选择任务类型', required: true }]}
            >
              <Select
                options={[
                  { label: 'UI 重构', value: 'UI' },
                  { label: '接口联调', value: 'API' },
                  { label: '组件开发', value: 'Component' },
                ]}
                placeholder="选择一个类型"
              />
            </Form.Item>

            <Form.Item label="排期日期" name="schedule">
              <DatePicker className="antd-starter__date-picker" />
            </Form.Item>

            <Form.Item label="备注" name="note">
              <Input.TextArea placeholder="可选备注" rows={4} />
            </Form.Item>

            <Space>
              <Button htmlType="submit" icon={<SendOutlined />} type="primary">
                提交
              </Button>
              <Button icon={<PlusOutlined />} onClick={() => form.resetFields()}>
                重置
              </Button>
            </Space>
          </Form>
        </Card>

        <Card className="antd-starter__card" title="任务列表">
          <Table<TableRecord>
            columns={columns}
            dataSource={rows}
            pagination={false}
            rowKey="key"
            size="middle"
          />
        </Card>
      </div>
    </section>
  )
}

export default AntdStarter
