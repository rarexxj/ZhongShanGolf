$(function () {
    $.checkuser();
    var id = $.getUrlParam('id'); //购物车id
    var gid = $.getUrlParam('gid');
    var type=$.getUrlParam('type') //1是正常 2是积分换购
    $.ADDLOAD();

    new Vue({
        el: '#address',
        data: {
            info: {}
        },
        ready: function () {
            var _this = this;
            _this.infoajax();
            _this.$nextTick(function () {
                _this.link();

            })
        },
        methods: {
            infoajax: function () {
                var _this = this;
                $.ajax({
                    url: '/Api/v1/Member/Address',
                    dataType: 'json',
                    type: 'get'
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                        _this.info = rs.data;
                        $.RMLOAD()
                    }
                })
            },
            link: function () {
                $('#address').on('click', '.addlist a', function () {
                    var addid = $(this).parents('.addlist').attr('data-addid');
                    if(type==2){
                        window.location.href = '/Html/html/shopcar/integralsettlement.html?gid=' + gid + '&addid=' + addid
                        return false;
                    }
                    if (gid) {
                        window.location.href = '/Html/html/shopcar/settlement.html?gid=' + gid + '&addid=' + addid
                    }
                });
                $('.submit').on('click', function () {
                    if(type==2){
                        window.location.href = '/Html/html/shopcar/chooseaddaddress.html?gid=' + gid+'&type='+2
                        return false;
                    }
                   if (gid) {
                        window.location.href = '/Html/html/shopcar/chooseaddaddress.html?gid=' + gid
                    }
                })
            }
        }
    })
})