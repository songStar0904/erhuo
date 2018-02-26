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
        title: '操作',
        width: 160,
        align: 'center',
        handle: ['follow', 'see']
    }
]
const tableData = {
    followersColumns
};

export default tableData;