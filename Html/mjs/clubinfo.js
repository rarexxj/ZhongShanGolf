$(function () {
    $.ADDLOAD();
    $.checkuser();
    var id = $.getUrlParam('id');
    new Vue({
        el: '#box',
        data: {
            info: []
        },
        ready: function () {
            var _this = this;
            _this.infoajax();
            _this.$nextTick(function () {
            })
        },
        methods: {
            infoajax: function () {
                var _this = this;
                $.ajax({
                    url: '/Api/v1/Activity/' + id,
                    dataType: 'json',
                    type: 'get'
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                        _this.info = rs.data;
                        $.RMLOAD()
                    }
                })
            }
        }
    })
})