$(function () {
    $.ADDLOAD();
    $.checkuser();
    new Vue({
        el: '#percen',
        data: {
            info: [],
            ideninfo:[]
        },
        ready: function () {
            var _this = this;
            _this.infoajax();
            _this.idenajax();
            _this.$nextTick(function () {
                _this.guanzhu();

            })
        },
        methods: {
            infoajax: function () {
                var _this = this;
                $.ajax({
                    url: '/Api/v1/Member/CenterInfo',
                    type: 'get',
                    dataType: 'json'
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                        _this.info = rs.data;
                        $.RMLOAD();
                    }
                })
            },
            guanzhu: function () {
                $('.weixin .att').on('click', function () {
                    $('.mask').stop().fadeIn();
                })
                $('.mask').on('click', function () {
                    $(this).stop().fadeOut();
                })
            },
            idenajax:function () {
                var _this=this;
                $.ajax({
                    url:'/Api/v1/MyMember',
                    type:'get',
                    dataType:'json'
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                        _this.ideninfo = rs.data;
                    }
                })
            }
        }
    })
})