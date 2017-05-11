$(function () {
    $.ADDLOAD();
    var id=$.getUrlParam('id');
    $.checkuser();
    new Vue({
        el: '#main',
        data: {
            info: [],
            data: {
                orderId:id
            },
            allpage: ''
        },
        ready: function () {
            var _this = this;
            _this.infoajax();

        },
        methods: {
            infoajax: function () {
                var _this = this;
                $.ajax({
                    url: '/Api/v1/Order/logistics/ResKuai',
                    dataType: 'json',
                    type: 'get',
                    data: _this.data
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                        _this.info = rs.data;
                        _this.$nextTick(function () {
                            _this.quanh();
                            $.RMLOAD()
                        })

                    }
                })
            },
            quanh:function () {
                var _height=$('.wz-main').height();
                $('.log-top-shu').height(_height);
            }
        }
    })
})