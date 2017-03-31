$(function () {
    // $.ADDLOAD();
    $.checkuser();
    new Vue({
        el: '#main',
        data: {
            info: [],
            ininfo:[],
            listinfo:[],
            ajaxdata: {
                pageNo: 1,
                limit: 10,
                wordKey:'',
                goodsCategory: 4
            }
        },
        ready: function () {
            var _this = this;
            _this.infoajax();
            _this.integralajax();
            _this.integrallist();
            _this.$nextTick(function () {
                // _this.updownload();
            })
        },
        methods: {
            infoajax: function () {
                //身份信息
                var _this = this;
                $.ajax({
                    url: '/Api/v1/MyMember',
                    type: 'get'
                }).done(function (rs) {
                    if (rs.returnCode = '200') {
                        _this.info = rs.data;

                    }
                })
            },
            integralajax:function () {
                //积分
                var _this = this;
                $.ajax({
                    url: '/Api/v1/Member/CenterInfo',
                    type: 'get'
                }).done(function (rs) {
                    if (rs.returnCode = '200') {
                        _this.ininfo = rs.data;

                    }
                })

            },
            updownload: function () {
                var _this = this;
                var flag = true;
                $(window).scroll(function () {
                    var H = $('.scroll')[0].getBoundingClientRect().top;
                    var h = $(window).height();
                    if (H - h < 0 && flag == true) {
                        flag = false;
                        _this.ajaxdata.pageNo++;
                        if ( _this.ajaxdata.pageNo > allpage) {
                            $.RMLOAD();
                        } else {
                            setTimeout(function () {
                                flag = true;
                            }, 500)
                            _this.integrallist();
                            $.ADDLOAD();
                        }
                    }
                })
            },
            integrallist:function () {
                var _this=this;
                //积分商品
                $.ajax({
                    url: '/Api/v1/Mall/Goods/List',
                    type: 'get',
                    data: _this.ajaxdata
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                        _this.listinfo=rs.data;
                        allpage=Math.ceil(rs.data.TotalCount/_this.ajaxdata.limit)
                    }
                })
            }
        }
    })
})
