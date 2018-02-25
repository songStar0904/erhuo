import util from '../../libs/util';
export const followersColumns = [
    {
        title: '昵称',
        align: 'center',
        render: (h, params) => {
            return h('div', [
                h('Avatar', {
                    props: {
                        src: params.row.user_icon
                    }
                }),
                h('strong', `    ${params.row.user_name}`)
            ]);
        }
    },
    {
        title: '性别',
        align: 'center',
        filters: [
            {
                label: '男',
                value: 1
            },
            {
                label: '女',
                value: 2
            }
        ],
        filterMultiple: false,
        filterMethod (value, row) {
            if (value === 1) {
                return row.user_sex === 'male';
            } else if (value === 2) {
                return row.user_sex === 'female';
            }
        },
        render: (h, params) => {
            return h('div', params.row.user_sex === 'male' ? '男' : '女' );
        }
    },
    {
        title: '学校',
        align: 'center',
        render: (h, params) => {
            return h('div', util.formatSchool(params.row.user_sid));
        }
    },
    {
        title: 'Action',
        key: 'action',
        width: 150,
        align: 'center',
        render: (h, params) => {
            return h('div', [
                h('Button', {
                    props: {
                        type: 'primary',
                        size: 'small'
                    },
                    style: {
                        marginRight: '2px'
                    },
                    on: {
                        click: () => {
                            this.show(params.index)
                        }
                    }
                }, '关注TA'),
                h('Button', {
                    props: {
                        type: 'error',
                        size: 'small'
                    },
                    on: {
                        click: () => {
                            this.remove(params.index)
                        }
                    }
                }, '查看TA')
            ]);
        }
    }
]
const tableData = {
    followersColumns
};

export default tableData;