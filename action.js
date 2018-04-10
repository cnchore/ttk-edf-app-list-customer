import React from 'react'
import {action as MetaAction, AppLoader} from 'edf-meta-engine'
import {Menu, Checkbox, DataGrid, Icon} from 'edf-component'
import extend from './extend'
import config from './config'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.extendAction = option.extendAction
        this.config = config.current
        this.webapi = this.config.webapi
    }

    onInit = ({component, injections}) => {
        this.extendAction.gridAction.onInit({component, injections})
        this.component = component
        this.injections = injections

        injections.reduce('init')
        this.load()
    }

    load = async (page) => {
        if (!page) {
            const form = this.metaAction.gf('data.pagination').toJS()
            page = {currentPage: form.current, pageSize: form.pageSize}
        }
        this.metaAction.sf('data.other.loading', true)
        this.getData(page).then((res) => {
            this.injections.reduce('load', res)
            this.metaAction.sf('data.other.loading', false)
        })
    }

    heightCount = () =>{
        let name =''
        if(this.component.props.modelStatus && (this.component.props.modelStatus == 1 || this.component.props.modelStatus == 2)){
            name = "ttk-edf-app-list-customer-contentHeight"
        }
        return name
    }

    getListRowsCount = () => {
        return this.metaAction.gf('data.list').size
    }

    isSelectAll = (gridName) => {
        return this.extendAction.gridAction.isSelectAll(gridName)
    }

    //删除档案
    delClick = (obj) => (e) => {
        this.del([obj])
    }

    //批量删除
    delClickBatch = () => {
        let selectedArrInfo = this.extendAction.gridAction.getSelectedInfo('dataGrid')
        let selectedArr = []
        if (!selectedArrInfo.length) {
            this.metaAction.toast('warning', '请选择客户！')
            return
        }
        selectedArrInfo.forEach((data) => {
            selectedArr.push({id:data.id,ts:data.ts})
        })

        this.del(selectedArr)
    }

    del = async (list) => {
        const ret = await this.metaAction.modal('confirm', {
            title: '删除',
            content: '确认删除?'
        })

        if (ret) {
            let response = await this.webapi.customer.delete(list)
            if (response.length && response.length > 0) {
                response.forEach((data) => {
                    this.metaAction.toast('warn', data.message)
                })
            }else {
                this.metaAction.toast('success', '删除成功！')
            }
            this.load()
        }
    }

    //修改档案
    modifyDetail = (id) => (e) => {
        let personId = id ? id : null

        this.add(personId)
    }

    //新增档案
    addClick = () => {
        this.add()
    }

    add = (id) => {
        let option = {title: '', appName: '', id: id}

        option.title = '客户'
        option.appName = 'ttk-edf-app-card-customer'

        this.addModel(option)
    }

    addModel = async (option) => {
        const ret = await this.metaAction.modal('show', {
            title: option.title,
            className:'ttk-edf-app-list-customer-modal',
            width: 700,
            height: 430,
            children: this.metaAction.loadApp(option.appName, {
                store: this.component.props.store,
                personId: option.id
            }),
        })

        if (ret) {
            this.load()
        }
    }

    selectRow = (rowIndex) => (e) => {
        this.injections.reduce('selectRow', rowIndex, e.target.checked)
    }

    //分页修改
    pageChanged = (currentPage, pageSize) => { 	
        if (pageSize == null || pageSize == undefined) {
            pageSize = this.metaAction.gf('data.pagination').toJS().pageSize
        }
        let page = {currentPage, pageSize}
        this.load(page)
    }

    //获取列表内容
    getData = async (pageInfo) => {
        let response,
            pagination = this.metaAction.gf('data.pagination'),
            page = {
                pageSize: pagination.toJS().pageSize
            }

        if (pageInfo && pageInfo['currentPage']) {
            page.currentPage = pageInfo.currentPage
            page.pageSize = pageInfo.pageSize
        }
        response = await this.webapi.customer.query({page})

        return response
    }

    //人员的停用状态
    personStatusClick = (name, index) => (e) => {
        let status = this.metaAction.gf('data.status')
        this.setStatus(name, index)
    }

    setStatus = async (option, index) => {
        if (option.isEnable) {
            // const ret = await this.metaAction.modal('confirm', {
            //     title: '停用',
            //     content: `您确定要停用${option.name}吗?`,
            //     style:{wordWrap: 'break-word'}
            // })
            //
            // if (ret) {
                option.isEnable = false
                let response = await this.webapi.customer.update(option)
                if (response) {
                    this.metaAction.toast('success', '停用客户成功！')
                    this.injections.reduce('enable', response, index)
                }
            // }
        } else {
            option.isEnable = true
            let response = await this.webapi.customer.update(option)
            if (response) {
                this.metaAction.toast('success', '启用客户成功！')
                this.injections.reduce('enable', response, index)
            }
        }
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        extendAction = extend.actionCreator({...option, metaAction}),
        o = new action({...option, metaAction, extendAction}),
        ret = {...metaAction, ...extendAction.gridAction, ...o}

    metaAction.config({metaHandlers: ret})

    return ret
}
