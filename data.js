export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'ttk-edf-app-list-customer',
		children: [{
			name: 'root-content',
			component: 'Layout',
			className: 'ttk-edf-app-list-customer-backgroundColor',
			children: [
				{
					name: 'header',
					component: '::div',
					className: 'ttk-edf-app-list-customer-header',
					children: [{
						name: 'refresh',
						component: '::div',
						className: 'ttk-edf-app-list-customer-header-left',
						children: [{
							name: 'refresh',
							component: 'Button',
							className: 'refresh',
							children: {
								name: 'userIcon',
								className: 'refresh-btn',
								component: 'Icon',
								fontFamily: 'edficon',
								type: 'shuaxin'
							},
							onClick: '{{$load}}'
						}]
					}, {
						name: 'btnGroup',
						component: 'Layout',
						className: 'ttk-edf-app-list-customer-header-right',
						children: [{
							name: 'add',
							component: 'Button',
							children: '新增',
							type: 'primary',
							className: 'btn',
							onClick: '{{$addClick}}'
						}, {
							name: 'del',
							component: 'Button',
							children: '删除',
							className: 'btn',
							onClick: '{{$delClickBatch}}'
						}]
					}]
				}, {
					name: 'content',
					component: 'Layout',
					className: 'ttk-edf-app-list-currency-content',
					children: [{
						name: 'dataGrid',
						component: 'DataGrid',
						headerHeight: 37,
						rowHeight: 35,
						ellipsis: true,
						loading: '{{data.other.loading}}',
						className: '{{$heightCount()}}',
						rowsCount: "{{data.list ? data.list.length : 0}}",
						columns: [{
							name: 'select',
							component: 'DataGrid.Column',
							columnKey: 'operation',
							width: 60,
							header: {
								name: 'header',
								component: 'DataGrid.Cell',
								children: [{
									name: 'chexkbox',
									component: 'Checkbox',
									checked: '{{$isSelectAll("dataGrid")}}',
									onChange: '{{$selectAll("dataGrid")}}',
								}]
							},
							cell: {
								name: 'cell',
								component: 'DataGrid.Cell',
								_power: '({rowIndex})=>rowIndex',
								children: [{
									name: 'select',
									component: 'Checkbox',
									checked: '{{data.list[_rowIndex].selected}}',
									onChange: "{{$selectRow(_rowIndex)}}"
								}]
							}
						}, {
							name: 'code',
							component: 'DataGrid.Column',
							flexGrow: 1,
							columnKey: 'code',
							width: 120,
							// isResizable: true,
							header: {
								name: 'header',
								component: 'DataGrid.Cell',
								children: '编码'
							},
							cell: {
								name: 'cell',
								component: 'DataGrid.Cell',
								_power: '({rowIndex})=>rowIndex',
								className: 'mk-datagrid-cellContent-left',
								children: [{
									name: 'code',
									component: '::a',
									title: '{{data.list[_rowIndex].code}}',
									children: '{{data.list[_rowIndex].code}}',
									onClick: '{{$modifyDetail(data.list[_rowIndex].id)}}'
								}]
							}
						}, {
							name: 'name',
							component: 'DataGrid.Column',
							flexGrow: 1,
							columnKey: 'name',
							width: 120,
							header: {
								name: 'header',
								component: 'DataGrid.Cell',
								children: '名称'
							},
							cell: {
								name: 'cell',
								component: "DataGrid.Cell",
								tip: true,
								className: 'mk-datagrid-cellContent-left',
								value: "{{data.list[_rowIndex].name}}",
								_power: '({rowIndex})=>rowIndex',
							}
						}, {
							name: 'taxNumber',
							component: 'DataGrid.Column',
							flexGrow: 1,
							columnKey: 'taxNumber',
							width: 120,
							header: {
								name: 'header',
								component: 'DataGrid.Cell',
								children: '税号'
							},
							cell: {
								name: 'cell',
								component: "DataGrid.Cell",
								className: 'mk-datagrid-cellContent-left',
								tip: true,
								value: "{{data.list[_rowIndex].taxNumber}}",
								_power: '({rowIndex})=>rowIndex',
							}
						}, {
							name: 'linkman',
							component: 'DataGrid.Column',
							flexGrow: 1,
							columnKey: 'linkman',
							width: 120,
							header: {
								name: 'header',
								component: 'DataGrid.Cell',
								children: '联系人'
							},
							cell: {
								name: 'cell',
								component: "DataGrid.Cell",
								tip: true,
								className: 'mk-datagrid-cellContent-left',
								value: "{{data.list[_rowIndex].linkman}}",
								_power: '({rowIndex})=>rowIndex',
							}
						}, {
							name: 'contactNumber',
							component: 'DataGrid.Column',
							columnKey: 'contactNumber',
							flexGrow: 1,
							width: 120,
							header: {
								name: 'header',
								component: 'DataGrid.Cell',
								children: '联系电话'
							},
							cell: {
								name: 'cell',
								component: "DataGrid.Cell",
								tip: true,
								className: 'mk-datagrid-cellContent-left',
								value: "{{data.list[_rowIndex].contactNumber}}",
								_power: '({rowIndex})=>rowIndex',
							}
						}, {
							name: 'remark',
							component: 'DataGrid.Column',
							columnKey: 'remark',
							flexGrow: 1,
							width: 120,
							header: {
								name: 'header',
								component: 'DataGrid.Cell',
								children: '备注'
							},
							cell: {
								name: 'cell',
								component: "DataGrid.Cell",
								tip: true,
								className: 'mk-datagrid-cellContent-left',
								value: "{{data.list[_rowIndex].remark}}",
								_power: '({rowIndex})=>rowIndex',
							}
						}, {
							name: 'operation',
							component: 'DataGrid.Column',
							columnKey: 'operation',
							width: 100,
							header: {
								name: 'header',
								component: 'DataGrid.Cell',
								children: '操作'
							},
							cell: {
								name: 'cell',
								component: 'DataGrid.Cell',
								_power: '({rowIndex})=>rowIndex',
								children: [{
									name: 'isEnable',
									component: 'Icon',
									fontFamily: 'edficon',
									type: '{{data.list[_rowIndex].isEnable ? "tingyong-" : "qiyong-"}}',
									style: {
										fontSize: 22,
										marginRight: '4px'
									},
									title: '{{data.list[_rowIndex].isEnable ? "已启用" : "已停用"}}',
									onClick: '{{$personStatusClick(data.list[_rowIndex], _rowIndex)}}'
								}, {
									name: 'update',
									component: 'Icon',
									fontFamily: 'edficon',
									type: 'bianji',
									style: {
										fontSize: 22
									},
									title: '编辑',
									onClick: '{{$modifyDetail(data.list[_rowIndex].id)}}'
								}, {
									name: 'remove',
									component: 'Icon',
									fontFamily: 'edficon',
									type: 'shanchu',
									style: {
										fontSize: 22
									},
									title: '删除',
									onClick: '{{$delClick(data.list[_rowIndex])}}'
								}]
							}
						}]
					}]
				},]
		},
			{
				name: 'footer',
				component: '::div',
				className: 'ttk-edf-app-list-customer-footer',
				children: [{
					name: 'pagination',
					component: 'Pagination',
					showSizeChanger: true,
					pageSize: '{{data.pagination.pageSize}}',
					current: '{{data.pagination.current}}',
					total: '{{data.pagination.total}}',
					onChange: '{{$pageChanged}}',
					onShowSizeChange: '{{$pageChanged}}',
				}]
			}]
	}
}

export function getInitState() {
	return {
		data: {
			list: [],
			pagination: {
				current: 1,
				total: 0,
				pageSize: 50
			},
			columns: []
		}
	}
}
