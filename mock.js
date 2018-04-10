/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import {fetch} from 'edf-utils'

const mockData = fetch.mockData

function initMockData() {
	if (!mockData.customer) {
		mockData.customer = {
			id: 1,
			list: []
		}
	}
}

fetch.mock('v1/ba/customer/queryList', (option) => {
	return {
		"result": true,
		"value": {
			"list": !!mockData.customer && mockData.customer.list ? mockData.customer.list : [],
			"page": {
				"pageSize": option.page && option.page.pageSize ? option.page.pageSize : 50,
				"currentPage": 1,
				"totalPage": 1,
				"totalCount": 1
			}
		}
	}
})

fetch.mock('v1/ba/customer/delete', (option) => {
	let customer = mockData.customer.list, v
	option.forEach((oData, i) => {
		customer.forEach((data, index) => {
			if (option[i].id == data.id) {
				customer.splice(index, 1)
			}
		})
	})
	return {
		"result": true,
		"value": {
			"list": [],
			"page": {
				"pageSize": option.page && option.page.pageSize ? option.page.pageSize : 50,
				"currentPage": 1,
				"totalPage": 1,
				"totalCount": 1
			}
		}
	}
})


fetch.mock('/v1/ba/customer/update', (option) => {
	initMockData()
	let customer = mockData.customer.list, v
	customer.forEach((data, index) => {
		if (option.id == data.id) {
			v = index
		}
	})
	customer[v] = option
	return {result: true, value: option}
})

